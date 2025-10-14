# 🤖 Priced In

An autonomous AI-powered stock trading agent that executes trades on GitHub Actions, built with OpenAI's Agents framework.

<!-- auto start -->

## 💰 Portfolio value: $1,265.82** (115.28% CAGR)

### 📊 Holdings

| Asset | Shares | Value |
|-------|--------|-------|
| Cash | - | $0.10 |
| NVDA | 4.82 | $877.38 |
| GOOGL | 1 | $246.54 |
| XLI | 0.10599999999999998 | $16.30 |
| XLP | 0.4999999999999999 | $39.34 |
| XLU | 0.37999999999999995 | $34.96 |
| XLV | 0.23 | $32.85 |
| XLY | 0.07799999999999994 | $18.35 |

### 📈 Recent trades

- **October 14, 2025 at 12:23:03 AM**: BUY 0.074 XLY @ $233.86/share ($17.31)
- **October 14, 2025 at 12:22:13 AM**: SELL 0.191 XLU @ $90.89/share ($17.36)
- **September 24, 2025 at 12:13:11 PM**: BUY 0.382 XLU @ $85.64/share ($32.71)
- **September 24, 2025 at 12:19:10 AM**: SELL 0.137 XLY @ $237.92/share ($32.60)
- **September 12, 2025 at 12:21:04 AM**: BUY 0.067 XLY @ $237.4/share ($15.91)
- **September 12, 2025 at 12:20:35 AM**: SELL 0.188 XLU @ $85.07/share ($15.99)
- **September 11, 2025 at 12:21:42 AM**: BUY 0.377 XLU @ $84.62/share ($31.90)
- **September 11, 2025 at 12:21:09 AM**: SELL 0.135 XLY @ $232.87/share ($31.44)
- **September 10, 2025 at 12:10:36 PM**: BUY 0.23 XLV @ $138.59/share ($31.88)
- **September 10, 2025 at 12:19:49 AM**: SELL 0.137 XLY @ $235.69/share ($32.29)

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
