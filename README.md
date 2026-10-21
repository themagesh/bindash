# Binance Futures Dashboard

A real-time futures position risk management dashboard for Binance, built with Next.js and designed for Vercel deployment.

## Features

- **Account Overview**: View total wallet balance, margin balance, and unrealized PnL
- **Futures Risk Analysis**:
  - Total unrealized PnL and PnL percentage
  - Maximum and average leverage
  - Margin usage percentage
  - Long/short exposure split
  - Overall risk level classification
- **Open Positions**: Detailed view of positions with entry, mark, liquidation price, and stop-loss/take-profit levels
- **Position Charts**: TradingView technical analysis charts per open position
- **Trade History**: Cumulative realized profits and losses per symbol
- **Goal Tracker**: Compound growth projections toward a target balance

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Binance account with API access (Futures trading permission required to close positions)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd bindash
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Add your Binance API keys to `.env.local`:
```env
BINANCE_API_KEY=your_api_key_here
BINANCE_API_SECRET=your_api_secret_here
BINANCE_TESTNET=false
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Key Setup

1. Go to [Binance API Management](https://www.binance.com/en/my/settings/api-management)
2. Create a new API key
3. **Important Security Settings**:
   - Enable "Read" permissions for viewing data
   - Enable "Enable Futures" if you want to close positions from the dashboard
   - Restrict IP access to your server's IP address
   - Never share your API secret

## Vercel Deployment

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/bindash)

### Manual Deployment

1. Push your code to GitHub

2. Import project in Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. Add Environment Variables in Vercel:
   - Go to Project Settings → Environment Variables
   - Add the following:
     - `BINANCE_API_KEY`: Your Binance API key
     - `BINANCE_API_SECRET`: Your Binance API secret
     - `BINANCE_TESTNET`: `false` (or `true` for testnet)

4. Deploy!

## Project Structure

```
bindash/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── compound/route.js     # Compound goal data endpoint
│   │   │   ├── futures/route.js      # Futures positions, account, and order endpoint
│   │   │   └── trades/route.js       # Futures trade history endpoint
│   │   ├── (dashboard)/
│   │   │   ├── compound/page.js       # Goal tracker page
│   │   │   ├── page.js                # Futures dashboard page
│   │   │   └── trades/page.js         # Trade history page
│   │   ├── layout.js
│   │   └── globals.css
│   ├── components/
│   │   ├── ConnectionRequired.js    # Missing credentials notice
│   │   ├── FuturesPositions.js      # Futures positions table
│   │   ├── FuturesRiskMetrics.js    # Futures risk metrics cards
│   │   ├── GoalModal.js             # Goal tracker modal
│   │   ├── GoalTracker.js           # Goal tracker display
│   │   ├── LoadingSpinner.js        # Loading component
│   │   ├── MarketSentiment.js       # TradingView technical analysis widget
│   │   ├── Navbar.js                # Top navigation
│   │   ├── PendingOrders.js         # Pending limit orders table
│   │   ├── PortfolioHeader.js       # Header with total balance
│   │   ├── PositionCharts.js        # Per-position TradingView charts
│   │   └── TradesHistory.js         # Trade history display
│   └── lib/
│       ├── binance.js               # Binance Futures API integration
│       └── utils.js                 # Utility functions
├── vercel.json                      # Vercel configuration
├── .env.example                     # Environment template
└── README.md
```

## Risk Metrics Explained

| Metric | Description |
|--------|-------------|
| **Risk Level** | Overall assessment: Low, Medium, High, or Very High |
| **Total PnL** | Sum of unrealized profit/loss across open positions |
| **Max / Avg Leverage** | Highest and average leverage across open positions |
| **Margin Usage** | Percentage of margin balance committed to positions |
| **Long / Short Exposure** | Notional value on each side of the book |

## Security Considerations

- API keys are stored as environment variables, never in code
- Read-only API permissions are sufficient for viewing data; the "Force Close" action additionally requires Futures trading permission
- Environment files are gitignored by default
- Never put Binance, Redis, or any other secret in `vercel.json` or source control. Configure secrets in Vercel Project Settings and rotate any credential that has ever been committed.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Charts**: TradingView embedded widgets
- **Binance API**: Binance Futures REST API via Axios
- **Deployment**: Vercel

## License

MIT License - feel free to use and modify for your own projects.
