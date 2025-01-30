import { FaTrash } from "react-icons/fa"
import { useMutation } from "@apollo/client"
import { DELETE_CLIENT } from "../mutations/clientMutations"
import {GET_CLIENTS} from "../queries/clientQueries.js"

export default function ClientRow({client}) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    // this first option for fetching queries after deletion is easy but if done many times it will slow down your system 
    // refetchQueries: [{query: GET_CLIENTS}],

    // for teh below code, we update using cache which is easier, but it has an error so we have a code on the app.js that sorst the error out 
    update(cache, {data: {deleteClient}}) {
      const {clients} = cache.readQuery({
        query: GET_CLIENTS
      });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {clients: clients.filter(client => client.id !== deleteClient.id)}
      })
    }
  })
  return (
    <>
        <tr>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td>
                <button className="btn btn-danger btn-sm" onClick={deleteClient}><FaTrash /></button>
            </td>
        </tr>
    </>
  )
}
