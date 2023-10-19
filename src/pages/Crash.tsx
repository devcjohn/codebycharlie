export const Crash = () => (
  <div className="text-center">
    <button
      onClick={() => {
        throw new Error('oops')
      }}
    >
      Crash the application (for Sentry testing purposes)
    </button>
  </div>
)
