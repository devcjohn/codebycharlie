import stackSvg from '../assets/icons/circleIcons/stack.svg'
import booksSvg from '../assets/icons/circleIcons/books.svg'
import checkmarkSvg from '../assets/icons/circleIcons/checkmark.svg'
import speedometerSvg from '../assets/icons/circleIcons/speedometer.svg'
import toolsSvg from '../assets/icons/circleIcons/tools.svg'
import monitorSvg from '../assets/icons/circleIcons/monitor.svg'
import linkedinSvg from '../assets/icons/linkedin.svg'

const aboutData = [
  {
    image: stackSvg,
    title: 'Full Stack Development',
    subtitle: 'Building versatile applications from front to back',
    alt: 'Stack of 3 squares',
  },
  {
    image: monitorSvg,
    title: 'Developer Experience',
    subtitle: 'Empowering productive devs through efficient tooling and clear documentation',
    alt: 'Computer monitor',
  },
  {
    image: checkmarkSvg,
    title: 'Software Testing',
    subtitle: 'Ensuring software quality with unit, integration, and E2E tests',
    alt: 'Checkmark',
  },
  {
    image: speedometerSvg,
    title: 'Agile Methodologies',
    subtitle: 'Implementing Kanban and Scrum for efficient and transparent project management',
    alt: 'Speedometer',
  },
  {
    image: booksSvg,
    title: 'Mentoring',
    subtitle: 'Fostering professional growth and knowledge sharing',
    alt: '3 books',
  },
  {
    image: toolsSvg,
    title: 'Continuous Integration & Deployment',
    subtitle: 'Automating software delivery',
    alt: 'Wrench and Screwdriver',
  },
]

export const AboutMe = () => {
  return (
    <div className="mx-14 text-center">
      <p className="pt-6 font-body font-normal leading-relaxed text-gray-700">
        <br /> I am based in Saint Louis.
        <br /> My specialty is full-stack Javascript development, but I have experience with a wide
        variety of languages and frameworks.
        <br /> I am passionate about building high-quality software and fostering a collaborative
        and inclusive work environment. <br />
      </p>
      <ConnectWithMe />
      <div>
        <h2 className="text-center font-header text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl">
          What I offer
        </h2>
        <div className="grid grid-cols-1 md:mx-20 md:grid-cols-2">
          {aboutData.map(({ title, subtitle, alt, image }, index) => (
            <div key={index} className="m-5 flex flex-col items-center border-gray-500 p-5 ">
              <img src={image} className="align-middle" alt={alt} />
              <h2 className="mt-2 font-header text-xl md:text-2xl">{title}</h2>
              <h3 className="mt-3 font-body text-sm italic md:text-lg">{subtitle}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const ConnectWithMe = () => {
  return (
    <div className="flex flex-col justify-center py-20 md:flex-row">
      <div className="flex items-center justify-center">
        <p className="font-header text-lg font-semibold uppercase text-gray-700">
          Connect with me &nbsp;
        </p>
      </div>
      <div className="flex items-center justify-center">
        <a href="https://www.linkedin.com/in/devcjohn">
          <img src={linkedinSvg} className="h-10 w-10" alt="LinkedIn Logo" />
        </a>
      </div>
    </div>
  )
}