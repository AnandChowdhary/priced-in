# 🤖 Priced In

An autonomous AI-powered stock trading agent that executes trades on GitHub Actions, built with OpenAI's Agents framework.

<!-- auto start -->

## 💰 Portfolio value: $1,211.93** (278.56% CAGR)

### 📊 Holdings

| Asset | Shares | Value |
|-------|--------|-------|
| Cash | - | $0.25 |
| NVDA | 4.82 | $869.77 |
| GOOGL | 1 | $203.90 |
| HEI | 0.084 | $25.86 |
| XLI | 0.10599999999999998 | $15.95 |
| XLP | 0.46099999999999997 | $37.81 |
| XLY | 0.212 | $48.56 |
| XLK | 0.037 | $9.83 |

### 📈 Recent trades

- **August 14, 2025 at 12:19:35 AM**: BUY 0.16 XLY @ $229.85/share ($36.78)
- **August 14, 2025 at 12:19:21 AM**: SELL 0.242 XLI @ $152.48/share ($36.90)
- **August 13, 2025 at 12:20:02 AM**: BUY 0.037 XLK @ $268.21/share ($9.92)
- **August 13, 2025 at 12:19:48 AM**: SELL 0.076 XLV @ $131.19/share ($9.97)
- **August 7, 2025 at 6:07:29 AM**: BUY 0.052 XLY @ $223.46/share ($11.62)
- **August 6, 2025 at 12:10:42 PM**: SELL 0.135 XLU @ $86.39/share ($11.66)
- **August 4, 2025 at 12:12:12 PM**: BUY 0.076 XLV @ $131.13/share ($9.97)
- **August 4, 2025 at 12:11:49 PM**: BUY 0.135 XLU @ $85.8/share ($11.58)
- **August 4, 2025 at 12:11:28 PM**: SELL 0.42 XLF @ $51.4/share ($21.59)
- **August 4, 2025 at 12:21:20 AM**: BUY 0.236 XLP @ $80.16/share ($18.92)

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
