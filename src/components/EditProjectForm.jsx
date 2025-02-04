import { useState } from "react"
import { useMutation } from "@apollo/client"
import { GET_PROJECTS } from "../queries/projectQueries"
import { UPDATE_PROJECT } from "../mutations/projectMutations"
export default function EditProjectForm({project}) {
    // console.log('ndio hii', project)
    const [name, setName] = useState(project.name)
    const [description, setDescription] = useState(project.description)
    const [status, setStatus] = useState('')

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: { id: project.id, name, description, status },
        refetchQueries: [{ query: GET_PROJECTS, variables: { id: project.id}}]
    })

    const onSubmit = (e) => {
        e.preventDefault()
        if(!name || !description || !status) {
            return alert('Please fill in all fields')
        }

        updateProject(name, description, status)
        
        setName('')
        setDescription('')
        setStatus('new')
    }

  return (
    <div className="mt-5">
        <h4>Update Project Details</h4>
        <form className="formg-roup" onSubmit={onSubmit}>
            <input className="form-control mt-3" placeholder="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <textarea className="form-control mt-3" placeholder="Description" type="text" value={description} onChange={(e) => setDescription(e.target.value)}> </textarea>
            <select id="status" className="form-select mt-3" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="new">Not Started</option>
                <option value="progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>

            <button type='submit' className="btn btn-primary btn-sm">Submit</button>
        </form>
    </div>
  )
}
