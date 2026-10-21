export default function ConnectionRequired({ product = 'Binance account' }) {
  return (
    <div className="mx-auto flex min-h-[420px] max-w-xl items-center justify-center px-4 py-10">
      <div className="w-full rounded-2xl border border-yellow-500/30 bg-gray-800/70 p-6 text-center shadow-xl">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/15 text-2xl">
          🔐
        </div>
        <h1 className="text-xl font-semibold text-white">Connect your {product}</h1>
        <p className="mt-2 text-sm leading-6 text-gray-400">
          Live account data is unavailable because Binance credentials are not configured or were rejected.
          No portfolio, position, or order data is being fabricated.
        </p>
        <div className="mt-5 rounded-xl border border-gray-700 bg-gray-900/70 p-4 text-left">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Local setup</p>
          <code className="mt-2 block break-words text-xs text-blue-300">
            BINANCE_API_KEY=your_key
            <br />
            BINANCE_API_SECRET=your_secret
          </code>
          <p className="mt-3 text-xs leading-5 text-gray-500">
            Put these values in <code className="text-gray-300">.env.local</code> or your Vercel Environment Variables.
            Never commit secrets to Git or place them in <code className="text-gray-300">vercel.json</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
