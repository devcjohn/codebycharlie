import { useRouteError, isRouteErrorResponse } from 'react-router-dom'

const NotFound404 = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 md:text-9xl">404</h1>
        <p className="mt-4 text-xl text-gray-600 md:mt-8 md:text-2xl">Page Not Found</p>
        <p className="mt-2 text-base text-gray-500 md:mt-4 md:text-lg">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>
      </div>
    </div>
  )
}

export const FallbackComponent = () => {
  const error = useRouteError()

  console.error(error)

  if (!isRouteErrorResponse(error)) {
    return (
      <>
        <div>An unknown error has occurred</div>
      </>
    )
  }

  if (error.status === 404) {
    return <NotFound404 />
  }
  /* given error is an ErrorResponse generated from a 4xx/5xx Response thrown from an action/loader, but not 404 */
  return (
    <>
      <div>An error has occurred</div>
      <div>{`${error.status} - ${error.statusText} - ${error.data} - ${error.internal} - ${error.error}`}</div>
    </>
  )
}
