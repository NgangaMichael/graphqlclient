import {gql} from '@apollo/client'

const GET_PROJECTS = gql`
    query getProjects {
        projects{
            id,
            name,
            status
        }
    }
`

const GET_SINGLE_PROJECTS = gql`
    query getSingleProjects($id: ID!) {
        project(id: $id) {
            id,
            name,
            description,
            status,
            client {
                id,
                name,
                email,
                phone
            }
        }
    }
`

export {GET_PROJECTS, GET_SINGLE_PROJECTS}