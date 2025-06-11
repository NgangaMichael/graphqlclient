import {gql} from '@apollo/client'

const GET_USERS = gql`
    query getUsers {
        clients {
            id,
            name,
            email,
            password
        }
    }
`

export {GET_USERS}