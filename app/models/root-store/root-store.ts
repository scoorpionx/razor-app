import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { UserModel, UserSnapshot } from "../user/user"
import { GetLoginResult, GetBarbersResults } from "../../services/api"
import { withEnvironment } from "../extensions/with-environment"
/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types
  .model("RootStore")
  .props({
    user: types.optional(UserModel, {}),
    barbers: types.optional(types.array(UserModel), []),
  })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    saveUser: (userSnapshot: UserSnapshot) => {
      self.user = UserModel.create(userSnapshot)
    },
    saveBarbers: (userSnapshot: UserSnapshot[]) => {
      const barbersModel = userSnapshot.map(i => UserModel.create(i))
      self.barbers = barbersModel
    }
  }))
	.actions((self) => ({
		makeLogin: async (data: any)  => {
			const result: GetLoginResult = await self.environment.api.login(data)
			if(result.kind === "ok") {
				self.saveUser(result.user)
			}
      return result
		},
    makeSignIn: async (data: any, image: any)  => {
			const result: GetLoginResult = await self.environment.api.signin(data, image)
			if(result.kind === "ok") {
				self.saveUser(result.user)
			}
      return result
		},
    getBarbers: async _ => {
      const result: GetBarbersResults = await self.environment.api.getBarbers()
      if(result.kind === "ok") {
				self.saveBarbers(result.barbers)
			}
      return result.kind
    }
	})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
