# 🤖 Priced In [ARCHIVED]

> **Note**: This repository has been archived. It served as an experimental AI-powered autonomous stock trading agent that ran from June to October 2025.

## 📊 Final Results

**Initial Investment:** $1,000.00  
**Final Portfolio Value:** $1,389.80  
**Total Return:** +38.98% (~$389.80 gain)  
**Annualized Return (CAGR):** 136.67%  
**Trading Period:** June 24, 2025 - October 15, 2025 (~113 days)  
**Total Trades Executed:** 60+ trades

### Final Holdings

| Asset | Shares | Value |
|-------|--------|-------|
| Cash | - | $0.03 |
| NVDA (Nvidia) | 4.82 | $959.42 |
| GOOGL (Google) | 1 | $290.10 |
| XLI (Industrial Sector ETF) | 0.106 | $16.35 |
| XLP (Consumer Staples ETF) | 0.729 | $55.72 |
| XLU (Utilities Sector ETF) | 0.380 | $34.07 |
| XLV (Health Care Sector ETF) | 0.23 | $33.87 |
| XLY (Consumer Discretionary ETF) | 0.001 | $0.24 |

## 🎯 The Experiment

This project explored the capabilities and limitations of autonomous AI agents in financial decision-making by creating a fully automated trading bot that:

1. **Operated independently** - Made all trading decisions without human intervention
2. **Ran on GitHub Actions** - Executed trades every 6 hours via scheduled workflows
3. **Used OpenAI's Agents framework** - Leveraged GPT-4 with function calling for decision-making
4. **Had full market access** - Could research stocks, check prices, and execute trades
5. **Self-documented** - Updated its own README with portfolio performance after each session

### How It Worked

The agent followed a systematic approach each trading session:

1. **Think** - Used structured reasoning to plan its approach
2. **Portfolio Review** - Checked current holdings and performance
3. **Market Research** - Searched the web for market trends, news, and opportunities
4. **Analysis** - Evaluated potential trades based on momentum, news, and technical factors
5. **Execution** - Made buy/sell decisions within risk management constraints
6. **Logging** - Recorded all decisions and reasoning in `agent.log`

The system prompt instructed the agent to:
- Focus on growth while managing risk
- Never put all capital in a single position
- Maintain some cash reserve for flexibility
- Track performance against the initial $1,000 investment
- **Always think before acting** using a dedicated "think" tool

## 🔧 Technical Implementation

Built with:
- **Node.js + TypeScript** for the core agent logic
- **OpenAI Agents Framework** (`@openai/agents`) for AI orchestration
- **GPT-4.1-mini** for decision-making and web search
- **GitHub Actions** for scheduled execution (every 6 hours)
- **Git automation** for portfolio persistence and README updates

### Key Features

- **Web Search Integration**: Agent could research stocks and market conditions in real-time
- **Fractional Shares**: Supported buying partial shares for precise capital allocation
- **Persistent Memory**: Maintained conversation history across sessions via `thread.json`
- **Automated Logging**: Every decision and trade was logged with timestamps
- **Self-Updating Dashboard**: Automatically updated README with current portfolio state

### Architecture

```typescript
// Core tools available to the agent
- think: Structured reasoning before actions
- get_portfolio: Check current holdings
- get_net_worth: Calculate total value
- get_stock_price: Fetch current prices
- buy: Execute purchase orders
- sell: Execute sell orders
- web_search: Research markets and news
```

The agent operated with full autonomy within these constraints:
- Started with $1,000 cash
- Could only trade during market hours (via real-time price APIs)
- Had to manage its own cash balance
- Self-imposed risk management rules (no single-stock concentration)

## 📈 What We Learned

### Successes

1. **Technical Feasibility**: Autonomous AI trading agents can be built and operate reliably
2. **Positive Returns**: The agent achieved ~39% returns over ~4 months
3. **Consistent Execution**: Successfully ran 100+ automated trading sessions without failures
4. **Risk Management**: Generally followed diversification principles
5. **Momentum Capture**: Effectively identified and traded on momentum in tech stocks (especially NVDA)

### Limitations & Observations

1. **Market Timing Dependency**: Results heavily influenced by being active during a tech bull market
2. **Heavy Tech Concentration**: Final portfolio was ~69% NVDA, showing concentration risk
3. **Short-Term Focus**: Primarily made short-term momentum trades rather than long-term investments
4. **Cost Considerations**: Real-world trading costs (fees, spreads, taxes) not simulated
5. **Limited Market Context**: No access to fundamental analysis, financial statements, or complex technical indicators
6. **Reasoning Quality**: While "think" tool provided transparency, reasoning was sometimes superficial
7. **No Backtesting**: Performance not validated across different market conditions

### Trading Patterns

Analyzing the 60+ trades:
- **Initial Phase** (June): Aggressive buying of tech stocks (TSLA, NVDA, PLTR, GOOGL)
- **Mid Phase** (July-Aug): Active rotation between sector ETFs (XLI, XLP, XLU, XLV, XLY)
- **Late Phase** (Sep-Oct): Consolidation into core positions, mostly holding NVDA
- **Average Hold Time**: Short-term (often 6-48 hours), typical of momentum trading
- **Win Rate**: Not explicitly tracked, but frequent small trades suggest active management style

## 🎓 Key Takeaways

1. **AI can trade, but context matters**: The agent made reasonable decisions within its programmed constraints, but lacked deep market understanding
2. **Transparency is crucial**: The "think" tool requirement provided valuable insight into the agent's reasoning
3. **Bull markets help**: Results likely wouldn't replicate in bearish or volatile conditions
4. **Automation works**: GitHub Actions proved to be a reliable platform for scheduled agent execution
5. **AI is a tool, not magic**: The agent followed patterns similar to novice momentum traders

## ⚠️ Important Disclaimers

- **Educational Purpose Only**: This was an experiment in AI capabilities, not investment advice
- **Past Performance ≠ Future Results**: The positive returns occurred during favorable market conditions
- **Not Financial Advice**: This project does not constitute financial, investment, or trading advice
- **Significant Risks**: Real trading involves substantial risk of loss. Never invest money you can't afford to lose
- **Simulated Environment**: While using real price data, this didn't execute real trades or account for real-world costs
- **No Endorsement**: Results should not be interpreted as endorsement of autonomous trading systems

## 📚 Resources

- [Agent Source Code](./agent.ts) - The complete trading agent implementation
- [System Prompt](./system-prompt.md) - Instructions given to the AI agent
- [Trading Log](./agent.log) - Complete log of all decisions and trades
- [Portfolio History](./portfolio.json) - Final state of holdings and trade history
- [GitHub Actions Workflow](./.github/workflows/trading-agent.yml) - Automation configuration

## 🔍 For Researchers & Developers

If you're interested in AI agents or algorithmic trading:

1. **Study the logs**: `agent.log` contains the complete decision-making history
2. **Review the prompt**: `system-prompt.md` shows how the agent was instructed
3. **Examine the code**: `agent.ts` demonstrates OpenAI Agents framework usage
4. **Analyze trades**: `portfolio.json` has the complete trade history with timestamps and prices

### Running Locally (Historical)

While the live trading is archived, you can still run the code locally to study it:

```bash
git clone https://github.com/AnandChowdhary/priced-in.git
cd priced-in
npm install
export OPENAI_API_KEY="your-api-key-here"
npm start
```

**Note**: This will make real API calls and modify `portfolio.json`. Consider working on a fork or branch.

## 🙏 Acknowledgments

This experiment was made possible by:
- **OpenAI** for the Agents framework and GPT-4 capabilities
- **GitHub Actions** for reliable automation infrastructure
- The open-source community for tools and inspiration

## 💭 Final Thoughts

This project demonstrated that autonomous AI trading agents are technically feasible and can operate successfully in favorable market conditions. However, it also highlighted important limitations:

- AI lacks the nuanced judgment of experienced traders
- Success was heavily dependent on market timing and conditions
- Concentration risk emerged despite risk management instructions
- Real-world complexity (costs, regulations, market microstructure) wasn't fully captured

The future of AI in trading likely involves human-AI collaboration rather than full autonomy, with AI handling data analysis and pattern recognition while humans provide strategic oversight and risk management.

Thank you for following this experiment! 🚀

---

## 📄 License

[MIT](./LICENSE) © [Anand Chowdhary](https://anandchowdhary.com)

**Repository Status**: Archived as of December 2025
