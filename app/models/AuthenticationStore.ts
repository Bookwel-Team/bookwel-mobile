import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { UserModel } from "./User"
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    authToken: types.maybe(types.string),
    authEmail: "",
    uid: "",
    user: types.maybeNull(UserModel),
  })
  .actions((store) => ({
    login: flow(function* (password: string, email: string) {
      try {
        const userCredential: FirebaseAuthTypes.UserCredential = yield auth().createUserWithEmailAndPassword(email, password);

        const user = userCredential.user
        store.authEmail = user.email;
        store.uid = user.uid
        store.authToken = yield user.getIdToken();
        __DEV__ && console.tron.log("user logged in!")
      }catch (e) {
        if (e.code === 'auth/email-already-in-use') {
          __DEV__ && console.tron.log("That email address is already in use!")
        }

        __DEV__ && console.tron.error(e.message, e);
        throw e;
      }
    }
    )
  }))
  .views((store) => ({
    get isAuthenticated() {
      return !!store.authToken
    },
    get validationError() {
      if (store.authEmail.length === 0) return "can't be blank"
      if (store.authEmail.length < 6) return "must be at least 6 characters"
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.authEmail))
        return "must be a valid email address"
      return ""
    },
  }))
  .actions((store) => ({
    setAuthToken(value?: string) {
      store.authToken = value
    },
    setAuthEmail(value: string) {
      store.authEmail = value.replace(/ /g, "")
    },
    logout() {
      store.authToken = undefined
      store.authEmail = ""
    },
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}
