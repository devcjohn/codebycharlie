export const Portfolio = () => {
  return (
    <div className="container py-16 md:py-20" id="portfolio">
      <h2 className="text-center font-header text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl">
        Portfolio
      </h2>
      <h3 className="pt-6 text-center font-header text-xl font-medium text-black sm:text-2xl lg:text-3xl">
        Here&apos;s some of my past projects
      </h3>
      <div className="mx-auto grid w-full grid-cols-1 gap-8 pt-12 sm:w-3/4 md:gap-10 lg:w-full lg:grid-cols-2">
        <a
          href="https://www.resilia.com/nonprofit-platform"
          className="mx-auto transition-all hover:scale-105 md:mx-0"
        >
          <img
            src="src/assets/images/resilia-initatives.webp"
            className="w-full shadow"
            alt="Screenshot of Resilia app"
            title="Resilia App"
          />
        </a>
        <a
          href="https://www.wwt.com/case-study/driving-delightful-shopping-experiences-at-schnucks-that-extend-beyond-the-brick-and-mortar"
          className="mx-auto transition-all hover:scale-105 md:mx-0 "
        >
          <img
            src="src/assets/images/schnucks-rewards.webp"
            className="w-full shadow"
            alt="iPhone showing Scnucks Rewards App Homescreen"
            title="Schnucks Rewards App"
          />
        </a>

        <a
          href="https://www.wwt.com/article/bluetooth-low-energy-mobile-development"
          className="mx-auto transition-all hover:scale-105 md:mx-0"
        >
          <img
            src="src/assets/images/blern.webp"
            className="w-full shadow"
            alt="iPhone showing Pulse Oximetry App Homescreen"
            title="Pulse Oximetry App"
          />
        </a>
        <a
          href="https://www.wwt.com/rpm"
          className="mx-auto transition-all hover:scale-105 md:mx-0"
        >
          <img
            src="src/assets/images/rpm-dashboard.webp"
            className="w-full shadow"
            alt="Richard Petty Motorsports Pit Crew member looking at racing dashboard"
            title="Richard Petty Motorsports Dashboard"
          />
        </a>
      </div>
    </div>
  )
}
