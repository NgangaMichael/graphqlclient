import { useState } from "react"
import { FaUser } from "react-icons/fa"
import { useMutation } from "@apollo/client"
import { ADD_CLIENT } from "../mutations/clientMutations"
import { GET_CLIENTS } from "../queries/clientQueries"

export default function Addclientmodal() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: { name, email, phone },
        update(cache, {data: {addClient}}) {
            const { clients } = cache.readQuery({ query: GET_CLIENTS });
            cache.writeQuery({
                query: GET_CLIENTS,
                data: { clients: [...clients, addClient] }
            })
        }
    })

    const onSubmit = (e) => {
        e.preventDefault()
        if(name === '' || email === '' || phone === '') {
            return alert('Please fill in all fields')
        }

        addClient(email, phone, name )
        setName('')
        setEmail('')
        setPhone('')
    }
  return (
    <>
        <div className="container mt-4">
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addcliemtModal">
        Add Client
        </button>

        <div className="modal fade" id="addcliemtModal" tabindex="-1" aria-labelledby="addclientModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="addclientModalLabel">Add Client</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form className="formg-roup" onSubmit={onSubmit}>
                    <input className="form-control mt-3" placeholder="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <input className="form-control mt-3" placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input className="form-control mt-3" placeholder="Phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />

                    <button className="btn btn-success btn-sm mt-3" type="submit">Add</button>
                </form>
            </div>
            </div>
        </div>
        </div>
        </div>
    </>
  )
}
