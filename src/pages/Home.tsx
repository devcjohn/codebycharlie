import { About } from './About'

export const Home = () => {
  return (
    <>
      <div className="bg-laptop relative bg-cover bg-center bg-no-repeat py-8">
        <div
          className="absolute inset-0 z-20 bg-gradient-to-r from-gray-600 to-gray-950 opacity-80 bg-cover
      bg-center bg-no-repeat"
        />
        <div className="container relative z-30 px-30 py-40">
          <div className="flex flex-col items-center justify-center lg:flex-row">
            <div className="rounded-full border-8 border-primary shadow-xl z-30">
              <img
                src="/src/assets/img/headshot.webp"
                alt="headshot"
                className="h-48 rounded-full sm:h-56"
              />
            </div>
            <div className=" md:pt-8 md:pl-8 z-30">
              <h1 className="text-center font-header text-4xl text-white md:text-6xl">
                Hi, I'm Charlie Johnson
              </h1>
              <div className="flex flex-col justify-center pt-3 sm:flex-row sm:pt-5 lg:justify-start">
                <div className="flex items-center justify-center pl-0 sm:justify-start md:pl-1">
                  <p className="font-body text-lg uppercase text-white">
                    Full Stack Software Engineer
                  </p>
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
