# 🤖 Priced In

An autonomous AI-powered stock trading agent that executes trades on GitHub Actions, built with OpenAI's Agents framework.

<!-- auto start -->

## 💰 Portfolio value: $1,203.09** (209.68% CAGR)

### 📊 Holdings

| Asset | Shares | Value |
|-------|--------|-------|
| Cash | - | $0.04 |
| NVDA | 4.82 | $857.91 |
| GOOGL | 1 | $206.09 |
| XLI | 0.10599999999999998 | $16.23 |
| XLP | 0.8899999999999999 | $73.40 |
| XLY | 0.212 | $49.42 |

### 📈 Recent trades

- **August 20, 2025 at 12:18:41 AM**: BUY 0.319 XLP @ $82.75/share ($26.40)
- **August 20, 2025 at 12:18:13 AM**: SELL 0.101 XLK @ $261.62/share ($26.42)
- **August 19, 2025 at 12:18:57 AM**: BUY 0.064 XLK @ $266.27/share ($17.04)
- **August 19, 2025 at 12:18:36 AM**: SELL 0.2 XLP @ $81.91/share ($16.38)
- **August 18, 2025 at 12:20:49 AM**: BUY 0.31 XLP @ $82.02/share ($25.43)
- **August 18, 2025 at 12:20:36 AM**: SELL 0.084 HEI @ $307.91/share ($25.86)
- **August 14, 2025 at 12:19:35 AM**: BUY 0.16 XLY @ $229.85/share ($36.78)
- **August 14, 2025 at 12:19:21 AM**: SELL 0.242 XLI @ $152.48/share ($36.90)
- **August 13, 2025 at 12:20:02 AM**: BUY 0.037 XLK @ $268.21/share ($9.92)
- **August 13, 2025 at 12:19:48 AM**: SELL 0.076 XLV @ $131.19/share ($9.97)

<!-- auto end -->

- [🧠 Logs](./agent.log)
- [🧑‍💻 System prompt](./system-prompt.md)
- [📁 Source code](./agent.ts)

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/AnandChowdhary/priced-in.git
cd priced-in
```

2. Install dependencies:

```bash
npm install
```

3. Set up your OpenAI API key:

```bash
export OPENAI_API_KEY="your-api-key-here"
```

## 🏃‍♂️ Running the agent

The agent's portfolio is stored in `portfolio.json`:

```json
{
  "cash": 95.44,
  "holdings": {
    "AAPL": 4,
    "CLNE": 56
  },
  "history": [
    {
      "date": "2025-06-21T12:43:07.141Z",
      "type": "buy",
      "ticker": "AAPL",
      "shares": 4,
      "price": 201.5,
      "total": 806
    }
  ]
}
```

- **cash**: Available cash balance for trading
- **holdings**: Current stock positions (ticker: number of shares)
- **history**: Complete record of all trades

### Local execution

Run the trading agent manually:

```bash
npm start
```

This will execute one trading session where the agent will:

1. Check the current portfolio
2. Analyze market conditions
3. Make trading decisions
4. Update the portfolio

### Automated execution via GitHub Actions

The agent is configured to run automatically every hour via GitHub Actions. To enable this:

1. Fork this repository
2. Go to Settings → Secrets and variables → Actions
3. Add a new repository secret named `OPENAI_API_KEY` with your OpenAI API key
4. The agent will now run automatically every hour

You can also trigger a manual run from the Actions tab in your GitHub repository.

## ⚠️ Disclaimer

This is an experimental AI trading agent for educational purposes. Real trading involves significant risk. Never invest money you cannot afford to lose.

## 📄 License

[MIT](./LICENSE) © [Anand Chowdhary](https://anandchowdhary.com)
