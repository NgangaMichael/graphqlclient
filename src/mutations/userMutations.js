// import {gql} from '@apollo/client'

// const ADD_USER = gql`
//     mutation addUser($name: String!, $email: String!, $password: String!){
//         addUser(name: $name, email: $email, password: $password) {
//             id,
//             name,
//             email,
//             password
//         }
//     }
// `

// const DELETE_USER = gql`
//     mutation deleteUser($id: ID!) {
//         deleteUser(id: $id){
//             id,
//             name,
//             email,
//             password
//         }
//     }
// `

// export {ADD_USER, DELETE_USER}

// mutations/userMutations.js
import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser($name: String!, $email: String!, $password: String!) {
    registerUser(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password)
  }
`;