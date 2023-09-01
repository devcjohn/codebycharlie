import './Home.css'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="flex justify-around list-none">
      <nav>
        <ul>
          <li>
            <Link className="no-underline text-blue-500 hover:text-blue-700" to="/WordGame">
              Word Game
            </Link>
          </li>
          <li>
            <Link className="no-underline text-blue-500 hover:text-blue-700" to="/About">
              About
            </Link>
          </li>
          <li>
            <Link className="no-underline text-blue-500 hover:text-blue-700" to="/FormFillDemo">
              Form Fill Demo
            </Link>
          </li>
          <li>
            <Link className="no-underline text-blue-500 hover:text-blue-700" to="/Crash">
              Crash
            </Link>
          </li>
          <li>
            <Link className="no-underline text-blue-500 hover:text-blue-700" to="/Contact">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Home
