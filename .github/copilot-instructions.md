<!-- Binance Dashboard Project Instructions -->

## Project Overview
This is a Binance Portfolio Risk Management Dashboard built with Next.js for Vercel deployment.

## Development

### Running Locally
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

## Configuration

### Environment Variables
Add these to your `.env.local` file (local) or Vercel dashboard (production):
- `BINANCE_API_KEY` - Your Binance API key
- `BINANCE_API_SECRET` - Your Binance API secret
- `BINANCE_TESTNET` - Set to `true` for testnet mode

## Key Files

### API Routes
- `src/app/api/futures/route.js` - Futures positions, account, and order endpoint
- `src/app/api/trades/route.js` - Futures trade history endpoint
- `src/app/api/compound/route.js` - Compound goal data endpoint

### Libraries
- `src/lib/binance.js` - Binance Futures API integration
- `src/lib/utils.js` - Utility functions and hooks

### Components
- `src/components/FuturesPositions.js` - Futures positions table
- `src/components/FuturesRiskMetrics.js` - Futures risk metrics cards
- `src/components/PositionCharts.js` - Per-position TradingView charts
- `src/components/MarketSentiment.js` - TradingView technical analysis widget
- `src/components/PortfolioHeader.js` - Header with total balance
- `src/components/PendingOrders.js` - Pending limit orders table
- `src/components/GoalModal.js` - Goal tracker modal
- `src/components/GoalTracker.js` - Goal tracker display
- `src/components/TradesHistory.js` - Trade history display
- `src/components/ConnectionRequired.js` - Missing credentials notice
- `src/components/LoadingSpinner.js` - Loading component

## Deployment to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy
