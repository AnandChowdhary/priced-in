# 🤖 Priced In

An autonomous AI-powered stock trading agent that executes trades on GitHub Actions, built with OpenAI's Agents framework.

<!-- auto start -->

## 💰 Portfolio value: $1,149.55** (472.23% CAGR)

### 📊 Holdings

| Asset | Shares | Value |
|-------|--------|-------|
| Cash | - | $0.08 |
| NVDA | 4.82 | $815.06 |
| GOOGL | 1 | $189.73 |
| RCL | 0.146 | $51.62 |
| HEI | 0.084 | $27.04 |
| XLI | 0.43 | $66.02 |

### 📈 Recent trades

- **July 3, 2025 at 12:07:35 PM**: BUY 0.106 XLI @ $148.16/share ($15.70)
- **July 3, 2025 at 6:07:01 AM**: BUY 0.101 XLI @ $148.16/share ($14.96)
- **July 3, 2025 at 12:17:56 AM**: BUY 0.094 XLI @ $148.16/share ($13.93)
- **July 2, 2025 at 12:07:32 PM**: BUY 0.129 XLI @ $148.01/share ($19.09)
- **July 2, 2025 at 6:06:55 AM**: BUY 0.084 HEI @ $321.51/share ($27.01)
- **July 2, 2025 at 12:17:45 AM**: BUY 0.146 RCL @ $315.1/share ($46.00)
- **July 1, 2025 at 6:05:53 PM**: SELL 0.885 NVDA @ $154.45/share ($136.69)
- **June 30, 2025 at 6:06:24 PM**: BUY 0.441 NVDA @ $158.04/share ($69.70)
- **June 30, 2025 at 12:07:38 PM**: BUY 0.444 NVDA @ $157.75/share ($70.04)
- **June 29, 2025 at 6:05:40 PM**: SELL 40 NIO @ $3.46/share ($138.40)

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
