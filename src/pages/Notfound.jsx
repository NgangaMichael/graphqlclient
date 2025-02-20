import { FaExclamationTriangle } from "react-icons/fa"
import { Link } from "react-router-dom"

export default function Notfound() {
  return (
    <div className="d-flex flex-column justofy-content-center align-items-center mt-5">
        <FaExclamationTriangle className="text-danger" size='5em' />
        <h1>404</h1>
        <p className="lead">Sorry This Page does not Exist</p>
        <Link to='/'>Go Back</Link>
    </div>
  )
}
