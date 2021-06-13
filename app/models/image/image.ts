import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const ImageModel = types
  .model("Image")
  .props({
    id: types.optional(types.number, 0),
    name: types.optional(types.string, ""),
    url: types.optional(types.string, "")
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type ImageType = Instance<typeof ImageModel>
export interface Image extends ImageType {}
type ImageSnapshotType = SnapshotOut<typeof ImageModel>
export interface ImageSnapshot extends ImageSnapshotType {}
export const createImageDefaultModel = () => types.optional(ImageModel, {})