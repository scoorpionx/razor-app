import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ImageModel } from "../image/image"
/**
 * Model description here for TypeScript hints.
 */
export const UserModel = types
  .model("User")
  .props({
    id: types.optional(types.number, 0),
    username: types.optional(types.string, ""),
    name: types.optional(types.string, ""),
    email: types.optional(types.string, ""),
    barber: types.optional(types.boolean, false),
    description: types.optional(types.string, ""),
    jwt: types.optional(types.string, ""),
    image: types.optional(ImageModel, {}),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type UserType = Instance<typeof UserModel>
export interface User extends UserType {}
type UserSnapshotType = SnapshotOut<typeof UserModel>
export interface UserSnapshot extends UserSnapshotType {}
export const createUserDefaultModel = () => types.optional(UserModel, {})
