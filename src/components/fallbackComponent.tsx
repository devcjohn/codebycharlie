import { useRouteError } from 'react-router-dom'

export const FallbackComponent = () => {
  const routeError: any = useRouteError()

  console.error(routeError)

  return (
    <>
      <div>An error has occurred</div>
      <div>{routeError.statusText || routeError.message || ''}</div>
    </>
  )
}
