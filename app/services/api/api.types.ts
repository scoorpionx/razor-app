import { GeneralApiProblem } from "./api-problem"
import { UserSnapshot } from "../../models/user"

export type GetLoginResult = { kind: "ok"; user: UserSnapshot } | GeneralApiProblem
export type GetBarbersResults = { kind: "ok"; barbers: UserSnapshot[] } | GeneralApiProblem
