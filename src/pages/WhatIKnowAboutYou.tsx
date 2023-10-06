export const WhatIKnowAboutYou = () => {
  const timing = window.performance.timing
  const timingKeys = Object.getOwnPropertyNames(Object.getPrototypeOf(timing))

  const perf = timingKeys
    .map((k) => {
      const val = (window.performance.timing as any)[k]
      const actualVal = typeof val === 'number' && !!val ? val : null
      if (!actualVal) {
        return null
      }
      return { k, val: new Date(actualVal).getMilliseconds() }
    })
    .filter((x) => x)

  // Alternate way to get performance data keys/data
  //const performanceEntries = performance.getEntriesByType('navigation')

  const props = {
    appName: navigator.appVersion,
    glob: window.global,
    devicePixelRatio: window.devicePixelRatio,
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
    outerHeight: window.outerHeight,
    outerWidth: window.outerWidth,
    locationbarVisibility: window.locationbar.visible,
    menubarVisibility: window.menubar.visible,
    cookieEnabled: navigator.cookieEnabled,
    doNotTrack: navigator.doNotTrack,
    hardwareConcurrency: navigator.hardwareConcurrency,
    language: navigator.language,
    languages: navigator.languages,
    maxTouchPoints: navigator.maxTouchPoints,
    onLine: navigator.onLine,
    pdfViewerEnabled: navigator.pdfViewerEnabled,
    platform: navigator.platform,
    product: navigator.product,
    productSub: navigator.productSub,
    userAgent: navigator.userAgent,
    userAgentData: navigator.userAgentData,
    webDriver: navigator.webDriver,
    GPUShaderStage: navigator.GPUShaderStage,
    GPUTextureUsage: navigator.GPUTextureUsage,
    performance: window.performance,
    activeElement: document.activeElement,
    isConnected: document.isConnected,
    lastModified: document.lastModified,
    readyState: document.readyState,
    referrer: document.referrer,
    currentTime: document.timeline.currentTime,
    perf,
  }
  return (
    <>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </>
  )
}
