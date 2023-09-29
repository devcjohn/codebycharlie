import { useRouteError, isRouteErrorResponse } from 'react-router-dom'

export const FallbackComponent = () => {
  const error = useRouteError()

  console.error(error)

  if (isRouteErrorResponse(error)) {
    /* given error is an ErrorResponse generated from a 4xx/5xx Response thrown from an action/loader */
    return (
      <>
        <div>An error has occurred</div>
        <div>{`${error.status} - ${error.statusText} - ${error.data} - ${error.internal} - ${error.error}`}</div>
      </>
    )
  }
  return (
    <>
      <div>An unknown error has occurred</div>
    </>
  )
}
