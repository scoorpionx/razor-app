import { GeneralApiProblem } from "./api-problem"

export interface User {
  id: number
  name: string
  email: string
  password: string
  cpf: string
  role: string
  description: string
}

export interface Login {
  token: string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem
export type GetLoginResult = { kind: "ok"; token: Login } | GeneralApiProblem
