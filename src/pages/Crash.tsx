function Crash() {
  return (
    <>
      <button
        onClick={() => {
          throw new Error('oops')
        }}
      >
        Crash the application (for Sentry testing purposes)
      </button>
    </>
  )
}

export default Crash
