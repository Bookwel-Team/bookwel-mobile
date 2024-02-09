import { Api } from "./api"
import auth from "@react-native-firebase/auth"

export class AuthApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  login(email: string, password: string) {
    return auth().signInWithEmailAndPassword(email, password)
  }

  signUp(email: string, password: string) {
    return auth().createUserWithEmailAndPassword(email, password)
  }
}

export const AUTH_PROBLEMS = {
  authEmailAlreadyInUse: "auth/email-already-in-use",
  emailInvalid: "auth/invalid-email",
  weakPassword: "auth/weak-password",
  wrongPassword: "auth/wrong-password",
  authInvalidCredential: "auth/invalid-credential",
  userNotFund: "auth/user-not-found",
  userDisabled: "auth/user-disabled",
} as const