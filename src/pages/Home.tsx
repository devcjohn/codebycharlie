import { About } from './About'

export const Home = () => {
  return (
    <>
      <div className="relative bg-laptop bg-cover bg-center bg-no-repeat py-8">
        <div
          className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-950 bg-cover bg-center
      bg-no-repeat opacity-80"
        />
        <div className="relative z-30 py-36">
          <div className="flex flex-col items-center justify-center lg:flex-row">
            <div className="rounded-full border-8  shadow-xl">
              <img src="/img/headshot.webp" alt="headshot" className="h-48 rounded-full sm:h-56" />
            </div>
            <div className="mt-4 md:mt-0 md:pl-8 md:pt-8 ">
              <h1 className="text-center text-4xl text-white md:text-6xl">
                Hi, I&apos;m Charlie Johnson
              </h1>
              <div className="flex flex-col justify-center pt-3 sm:flex-row sm:pt-5 lg:justify-start">
                <div className="flex items-center justify-center pl-0 sm:justify-start md:pl-1">
                  <p className="text-lg uppercase text-white">Full Stack Software Engineer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <About />
    </>
  )
}
