import stackSvg from '../assets/circleIcons/stack.svg'
import booksSvg from '../assets/circleIcons/books.svg'
import checkmarkSvg from '../assets/circleIcons/checkmark.svg'
import speedometerSvg from '../assets/circleIcons/speedometer.svg'
import toolsSvg from '../assets/circleIcons/tools.svg'
import monitorSvg from '../assets/circleIcons/monitor.svg'

const aboutData = [
  {
    image: stackSvg,
    title: 'Full Stack Development',
    subtitle: 'Building versatile applications from front to back',
  },
  {
    image: monitorSvg,
    title: 'Developer Experience',
    subtitle: 'Empowering productive devs through efficient tooling and clear documentation',
  },
  {
    image: checkmarkSvg,
    title: 'Software Testing',
    subtitle: 'Ensuring software quality with unit, integration, and E2E tests',
  },
  {
    image: speedometerSvg,
    title: 'Agile Methodologies',
    subtitle: 'Implementing Kanban and Scrum for efficient and transparent project management',
  },
  {
    image: booksSvg,
    title: 'Mentoring',
    subtitle: 'Fostering professional growth and knowledge sharing',
  },
  {
    image: toolsSvg,
    title: 'Continuous Integration & Deployment',
    subtitle: 'Automating software delivery',
  },
]

export const About = () => {
  return (
    <div className="mx-14 text-center">
      <h1 className="text-4xl font-bold my-8">About Me</h1>
      <h2>
        Hi, my name is Charlie Johnson. I'm a software engineer.
        <br /> I am currently based in Saint Louis. My specialty is full-stack Javascript
        development, but I have experience with a wide variety of languages and frameworks.
        <br /> I am passionate about building high-quality software and fostering a collaborative
        and inclusive work environment. <br />
        If you'd like to get in touch, please add me on{' '}
        <a href="https://www.linkedin.com/in/devcjohn">linkedIn.</a>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {aboutData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-center align-middle items-center border-gray-500 m-5 p-5 h-150 text-sm"
          >
            <img src={item.image} />
            <h2 className="text-3xl">{item.title}</h2>
            <h3 className="text-lg italic mt-3">{item.subtitle}</h3>
          </div>
        ))}
      </div>
      <h1 className="text-4xl font-bold text-center my-8">About this site</h1>
      <h2>
        View the source code for this website and the tools used to build it{' '}
        <a href="https://github.com/devcjohn/codebycharlie">Here</a>
      </h2>
    </div>
  )
}
