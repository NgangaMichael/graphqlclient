import { useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { GET_PROJECTS } from "../queries/projectQueries"
import { GET_CLIENTS } from "../queries/clientQueries"
import { ADD_PROJECT } from "../mutations/projectMutations"

export default function Addprojectmodal() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [clientId, setClientid] = useState('')
    const [status, setStatus] = useState('new')

    // get clints for select 
    const {loading, error, data} = useQuery(GET_CLIENTS)

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: { name, description, clientId, status },
        update(cache, {data: {addProject}}) {
            const { projects } = cache.readQuery({ query: GET_PROJECTS });
            cache.writeQuery({
                query: GET_PROJECTS,
                data: { projects: [...projects, addProject] }
            })
        }
    })

    const onSubmit = (e) => {
        e.preventDefault()
        if(name === '' || description === '' || status === '') {
            return alert('Please fill in all fields')
        }

        console.log(name, description, clientId, status)
        addProject(name, description, clientId, status)
        
        setName('')
        setDescription('')
        setStatus('new')
        setClientid('')
    }

    if(loading) return null;
    if(error) return 'something went wrong';

  return (
    <>

        {!loading && !error && (
            <>
                <div className="container mt-4">
                <button type="button" className="btn btn-dark btn-sm" data-bs-toggle="modal" data-bs-target="#addprojectModal">
                Add Project
                </button>

                <div className="modal fade" id="addprojectModal" tabindex="-1" aria-labelledby="addprojectModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="addprojectModalLabel">Add Project</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className="formg-roup" onSubmit={onSubmit}>
                            <input className="form-control mt-3" placeholder="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            <textarea className="form-control mt-3" placeholder="Description" type="text" value={description} onChange={(e) => setDescription(e.target.value)}> </textarea>
                            <select id="status" className="form-select mt-3" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="new">Not Started</option>
                                <option value="progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                            <select id="clientId" className="form-select mt-3" value={clientId} onChange={(e) => setClientid(e.target.value)}>
                                <option value="">Select client</option>
                                {data.clients.map((client) => (
                                    <option key={client.id} value={client.id}>{client.name}</option>
                                ))}
                            </select>
                            <button className="btn btn-success btn-sm mt-3" type="submit">Add</button>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
                </div>
            </>
        )}
    </>
  )
}
