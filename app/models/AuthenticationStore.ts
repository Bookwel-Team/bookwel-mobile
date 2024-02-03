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
  .actions((store) => {
    const loginSuccess = flow(function* (user: FirebaseAuthTypes.User) {
      store.authEmail = user.email
      store.uid = user.uid
      store.authToken = yield user.getIdToken()
    })

    const loginFail = (e) => {
      if (e.code === "auth/email-already-in-use") {
        __DEV__ && console.tron.log("That email address is already in use!")
      } else if (e.code === "auth/invalid-credential") {
        __DEV__ && console.error("The supplied auth credential is incorrect, malformed or has expired.")
      } else {
        __DEV__ && console.tron.error(e.message, e)
      }
    }

    const login = flow(function* (email: string, password: string) {
      try {
        const userCredential: FirebaseAuthTypes.UserCredential = yield auth().signInWithEmailAndPassword(email, password)
        const user = userCredential.user
        yield loginSuccess(user)
        __DEV__ && console.tron.log("user logged in!")
      } catch (e) {
        loginFail(e)
        throw e
      }
    })

    return { login }
  }).actions(store => {
    const logoutSuccess = () => {
      store.authToken = undefined
      store.authEmail = ""
    }
    const logoutFail = (e) => {
      __DEV__ && console.tron.error("fail to logout", e)
    }

    const logout = flow(function* () {
      try {
        yield auth().signOut()
        logoutSuccess()
      } catch (e) {
        logoutFail(e)
        throw e
      }
    })

    return { logout }
  })
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
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {
}

export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {
}
