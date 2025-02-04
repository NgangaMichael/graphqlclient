import { Link } from "react-router-dom"

export default function ProjectCard({project}) {
  return (
    <div className="col-md-4">
        <div className="card my-2">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <h6 className="card-title">{project.name}</h6>
                    <Link className="btn btn-light btn-sm" to={`/projects/${project.id}`}>View</Link>
                </div>
                <p className="small">Status: <strong>{project.status}</strong></p>
            </div>
        </div>
    </div>
  )
}
