import { useRouteError, isRouteErrorResponse } from 'react-router-dom'

const NotFound404 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl md:text-9xl font-bold text-gray-800">404</h1>
        <p className="text-xl md:text-2xl mt-4 md:mt-8 text-gray-600">Page Not Found</p>
        <p className="text-md md:text-lg mt-2 md:mt-4 text-gray-500">
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
