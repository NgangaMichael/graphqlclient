import { Link, useParams } from "react-router-dom"
import Spinner from "../components/Spinner"
import ClientInfo from "../components/ClientInfo"
import DeleteProjectButton from "../components/DeleteProjectButton"
import EditProjectForm from "../components/EditProjectForm"
import { useQuery } from "@apollo/client"
import { GET_SINGLE_PROJECTS } from "../queries/projectQueries"

export default function ProjectsDetails() {
    const {id} = useParams()
    const {loading, error, data} = useQuery(GET_SINGLE_PROJECTS, 
        {variables: {id}})
    if (loading) return <Spinner />;
    if (error) return <p>Error :</p>;

  return (
    <>
        {!loading && !error && (
            <div className="mx-auto w-75 card p-5 mt-5">
                <Link className="btn btn-light btn-sm d-inline ms-auto" to='/'>Back</Link>
                <h1>{data.project.name}</h1>
                <p>{data.project.description}</p>
                <h5>Status: {data.project.status}</h5>

                <ClientInfo client={data.project.client}/>

                <EditProjectForm project={data.project} />

                <DeleteProjectButton projectId={data.project.id} />
            </div>
        )}
    </>
  )
}
