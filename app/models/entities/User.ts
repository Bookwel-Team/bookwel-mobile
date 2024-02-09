import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"


export enum UserStatus {
  ADMIN="ADMIN",
  CLIENT="CLIENT"
}

export const UserModel = types
  .model("User")
  .props({
    id:	types.string,
    first_name:	types.string,
    last_name:	types.string,
    email:	types.string,
    status: types.enumeration(Object.values(UserStatus))
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface User extends Instance<typeof UserModel> {}
export interface UserSnapshotOut extends SnapshotOut<typeof UserModel> {}
export interface UserSnapshotIn extends SnapshotIn<typeof UserModel> {}
export const createUserDefaultModel = () => types.optional(UserModel, {
  id: "",
  status: UserStatus.CLIENT,
  last_name: "",
  first_name: "",
  email: "",
})
