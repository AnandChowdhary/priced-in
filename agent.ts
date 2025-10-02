import { Agent, AgentInputItem, run, tool } from "@openai/agents";
import { existsSync } from "fs";
import { appendFile, readFile, writeFile } from "node:fs/promises";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import invariant from "tiny-invariant";
import { z } from "zod";

invariant(process.env.OPENAI_API_KEY, "OPENAI_API_KEY is not set");
const client = new OpenAI();

const log = (message: string) => {
  message = `[${new Date().toISOString()}] ${message}`;
  console.log(message);
  appendFile("agent.log", message + "\n");
};

const portfolioSchema = z.object({
  cash: z.number(),
  holdings: z.record(z.string(), z.number()),
  history: z.array(
    z.object({
      date: z.string().datetime(),
      type: z.enum(["buy", "sell"]),
      ticker: z.string(),
      shares: z.number(),
      price: z.number(),
      total: z.number(),
    })
  ),
});

const webSearch = async (query: string): Promise<string> => {
  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: `Please use web search to answer this query from the user and respond with a short summary in markdown of what you found:\n\n${query}`,
    tools: [{ type: "web_search_preview" }],
  });
  return response.output_text;
};

const getStockPrice = async (ticker: string): Promise<number> => {
  const response = await client.responses.parse({
    model: "gpt-4.1-mini",
    input: `What is the current price of the stock ticker $${ticker}? Please use web search to get the latest price and then answer in short.`,
    tools: [{ type: "web_search_preview" }],
    text: { format: zodTextFormat(z.object({ price: z.number() }), "price") },
  });
  if (!response.output_parsed) throw new Error("Failed to get stock price");
  return response.output_parsed.price;
};

const getPortfolio = async (): Promise<z.infer<typeof portfolioSchema>> => {
  const portfolioData = await readFile("portfolio.json", "utf-8");
  const portfolio = portfolioSchema.parse(JSON.parse(portfolioData));
  return portfolio;
};

const getPortfolioTool = tool({
  name: "get_portfolio",
  description: "Get your portfolio",
  parameters: z.object({}),
  async execute() {
    const portfolio = await getPortfolio();
    log(`💹 Fetched portfolio: $${portfolio.cash}`);
    return `Your cash balance is $${portfolio.cash}.
Current holdings:
${Object.entries(portfolio.holdings)
  .map(([ticker, shares]) => `  - ${ticker}: ${shares} shares`)
  .join("\n")}\n\nTrade history:
${portfolio.history
  .map(
    (trade) =>
      `  - ${trade.date} ${trade.type} ${trade.ticker} ${trade.shares} shares at $${trade.price} per share, for a total of $${trade.total}`
  )
  .join("\n")}`;
  },
});

const getNetWorthTool = tool({
  name: "get_net_worth",
  description: "Get your current net worth (total portfolio value)",
  parameters: z.object({}),
  async execute() {
    const netWorth = await calculateNetWorth();
    const portfolio = await getPortfolio();
    const annualizedReturn = await calculateAnnualizedReturn(portfolio);

    log(
      `💰 Current net worth: $${netWorth} (${annualizedReturn}% annualized return)`
    );

    return `Your current net worth is $${netWorth}
- Cash: $${portfolio.cash}
- Holdings value: $${(netWorth - portfolio.cash).toFixed(2)}
- Annualized return: ${annualizedReturn}% (started with $1,000)
- ${netWorth >= 1000 ? "📈 Up" : "📉 Down"} $${Math.abs(
      netWorth - 1000
    ).toFixed(2)} from initial investment`;
  },
});

const buyTool = tool({
  name: "buy",
  description: "Buy a given stock at the current market price",
  parameters: z.object({
    ticker: z.string(),
    shares: z.number().positive(),
  }),
  async execute({ ticker, shares }) {
    const price = await getStockPrice(ticker);
    const portfolio = await getPortfolio();
    if (portfolio.cash < shares * price)
      return `You don't have enough cash to buy ${shares} shares of ${ticker}. Your cash balance is $${portfolio.cash} and the price is $${price} per share.`;

    portfolio.holdings[ticker] = (portfolio.holdings[ticker] ?? 0) + shares;
    portfolio.history.push({
      date: new Date().toISOString(),
      type: "buy",
      ticker,
      shares,
      price,
      total: shares * price,
    });
    portfolio.cash = Math.round((portfolio.cash - shares * price) * 100) / 100;
    await writeFile("portfolio.json", JSON.stringify(portfolio, null, 2));

    log(`💰 Purchased ${shares} shares of ${ticker} at $${price} per share`);
    return `Purchased ${shares} shares of ${ticker} at $${price} per share, for a total of $${
      shares * price
    }. Your cash balance is now $${portfolio.cash}.`;
  },
});

const sellTool = tool({
  name: "sell",
  description: "Sell a given stock at the current market price",
  parameters: z.object({
    ticker: z.string(),
    shares: z.number().positive(),
  }),
  async execute({ ticker, shares }) {
    const portfolio = await getPortfolio();
    if (portfolio.holdings[ticker] < shares)
      return `You don't have enough shares of ${ticker} to sell. You have ${portfolio.holdings[ticker]} shares.`;

    const price = await getStockPrice(ticker);
    portfolio.holdings[ticker] = (portfolio.holdings[ticker] ?? 0) - shares;
    portfolio.history.push({
      date: new Date().toISOString(),
      type: "sell",
      ticker,
      shares,
      price,
      total: shares * price,
    });
    portfolio.cash = Math.round((portfolio.cash + shares * price) * 100) / 100;
    await writeFile("portfolio.json", JSON.stringify(portfolio, null, 2));

    log(`💸 Sold ${shares} shares of ${ticker} at $${price} per share`);
    return `Sold ${shares} shares of ${ticker} at $${price} per share, for a total of $${
      shares * price
    }. Your cash balance is now $${portfolio.cash}.`;
  },
});

const getStockPriceTool = tool({
  name: "get_stock_price",
  description: "Get the current price of a given stock ticker",
  parameters: z.object({
    ticker: z.string(),
  }),
  async execute({ ticker }) {
    const price = await getStockPrice(ticker);
    log(`🔖 Searched for stock price for ${ticker}: $${price}`);
    return price;
  },
});

const webSearchTool = tool({
  name: "web_search",
  description: "Search the web for information",
  parameters: z.object({
    query: z.string(),
  }),
  async execute({ query }) {
    log(`🔍 Searching the web for: ${query}`);
    const result = await webSearch(query);
    return result;
  },
});

const thinkTool = tool({
  name: "think",
  description: "Think about a given topic",
  parameters: z.object({
    thought_process: z.array(z.string()),
  }),
  async execute({ thought_process }) {
    thought_process.forEach((thought) => log(`🧠 ${thought}`));
    return `Completed thinking with ${thought_process.length} steps of reasoning.`;
  },
});

const calculateNetWorth = async (): Promise<number> => {
  const portfolio = await getPortfolio();
  let totalHoldingsValue = 0;
  for (const [ticker, shares] of Object.entries(portfolio.holdings))
    if (shares > 0) {
      try {
        const price = await getStockPrice(ticker);
        totalHoldingsValue += shares * price;
      } catch (error) {
        log(`⚠️ Failed to get price for ${ticker}: ${error}`);
      }
    }

  const netWorth =
    Math.round((portfolio.cash + totalHoldingsValue) * 100) / 100;
  return netWorth;
};

const calculateCAGR = (days: number, currentValue: number): number => {
  const startValue = 1000;
  const years = days / 365;
  const cagr = Math.pow(currentValue / startValue, 1 / years) - 1;
  return cagr;
};

const calculateAnnualizedReturn = async (
  portfolio: z.infer<typeof portfolioSchema>
): Promise<string> => {
  if (portfolio.history.length === 0) return "0.00";

  const firstTradeDate = new Date(portfolio.history[0].date);
  const currentDate = new Date();

  let totalHoldingsValue = 0;
  for (const [ticker, shares] of Object.entries(portfolio.holdings))
    if (shares > 0) {
      try {
        const price = await getStockPrice(ticker);
        totalHoldingsValue += shares * price;
      } catch (error) {
        log(`⚠️ Failed to get price for ${ticker}: ${error}`);
      }
    }

  const currentTotalValue = portfolio.cash + totalHoldingsValue;
  log(`💰 Current total value: $${currentTotalValue}`);

  const days =
    (currentDate.getTime() - firstTradeDate.getTime()) / (1000 * 60 * 60 * 24);
  log(`🗓 Days since first trade: ${days.toFixed(2)}`);

  if (days < 1) {
    log("⏳ Not enough time has passed to compute CAGR accurately.");
    return "N/A";
  }

  const cagr = calculateCAGR(days, currentTotalValue);
  log(`💰 CAGR: ${cagr * 100}%`);

  return (cagr * 100).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const calculatePortfolioValue = async (): Promise<{
  totalValue: number;
  holdings: Record<string, { shares: number; value: number }>;
}> => {
  const portfolio = await getPortfolio();
  const holdingsWithValues: Record<string, { shares: number; value: number }> =
    {};
  let totalHoldingsValue = 0;

  for (const [ticker, shares] of Object.entries(portfolio.holdings)) {
    if (shares > 0) {
      try {
        const price = await getStockPrice(ticker);
        const value = Math.round(shares * price * 100) / 100;
        holdingsWithValues[ticker] = { shares, value };
        totalHoldingsValue += value;
      } catch (error) {
        log(`⚠️ Failed to get price for ${ticker}: ${error}`);
        holdingsWithValues[ticker] = { shares, value: 0 };
      }
    }
  }

  const totalValue =
    Math.round((portfolio.cash + totalHoldingsValue) * 100) / 100;
  return { totalValue, holdings: holdingsWithValues };
};

const loadThread = async (): Promise<AgentInputItem[]> => {
  try {
    if (existsSync("thread.json")) {
      const threadData = await readFile("thread.json", "utf-8");
      return JSON.parse(threadData);
    }
  } catch (error) {
    log(`⚠️ Failed to load thread history: ${error}`);
  }
  return [];
};

const saveThread = async (thread: AgentInputItem[]) => {
  try {
    await writeFile("thread.json", JSON.stringify(thread, null, 2));
    log(`💾 Saved thread history (${thread.length} items)`);
  } catch (error) {
    log(`❌ Failed to save thread history: ${error}`);
  }
};

const updateReadme = async () => {
  try {
    const portfolio = await getPortfolio();
    const { totalValue, holdings } = await calculatePortfolioValue();
    const readmeContent = await readFile("README.md", "utf-8");
    const recentTrades = portfolio.history.slice(-20).reverse();
    const annualizedReturn = await calculateAnnualizedReturn(portfolio);
    const portfolioSection = `<!-- auto start -->

## 💰 Portfolio value: $${totalValue.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}** (${annualizedReturn}% CAGR)

### 📊 Holdings

| Asset | Shares | Value |
|-------|--------|-------|
| Cash | - | $${portfolio.cash.toFixed(2)} |
${Object.entries(holdings)
  .map(
    ([ticker, data]) =>
      `| ${ticker} | ${data.shares} | $${data.value.toFixed(2)} |`
  )
  .join("\n")}

### 📈 Recent trades

${
  recentTrades.length > 0
    ? recentTrades
        .map(
          (trade) =>
            `- **${new Date(trade.date).toLocaleString("en-US", {
              timeZone: "UTC",
              dateStyle: "long",
              timeStyle: "medium",
            })}**: ${trade.type.toUpperCase()} ${trade.shares} ${
              trade.ticker
            } @ $${trade.price}/share ($${trade.total.toFixed(2)})`
        )
        .slice(0, 10)
        .join("\n")
    : "- No trades yet"
}

<!-- auto end -->`;

    const updatedReadme = readmeContent.replace(
      /<!-- auto start -->[\s\S]*<!-- auto end -->/,
      portfolioSection
    );

    await writeFile("README.md", updatedReadme);
    log(`📝 Updated README with portfolio value: $${totalValue}`);
  } catch (error) {
    log(`❌ Failed to update README: ${error}`);
  }
};

const agent = new Agent({
  name: "Assistant",
  instructions: await readFile("system-prompt.md", "utf-8"),
  tools: [
    thinkTool,
    webSearchTool,
    buyTool,
    sellTool,
    getStockPriceTool,
    getPortfolioTool,
    getNetWorthTool,
  ],
});

log("Starting agent");

const thread = await loadThread();
run(
  agent,
  thread.concat({
    role: "user",
    content: `It's ${new Date().toLocaleString(
      "en-US"
    )}. Time for your trading analysis! Review your portfolio, scan the markets for opportunities, and make strategic trades to grow your initial $1,000 investment. Good luck! 📈`,
  }),
  { maxTurns: 100 }
)
  .then((result) => {
    log(`🎉 Agent finished: ${result.finalOutput}`);
    return result;
  })
  .then((result) => saveThread(result.history))
  .then(() => updateReadme())
  .catch((error) => console.error("An error occurred", error));
