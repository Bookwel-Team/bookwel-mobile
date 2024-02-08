import { Api } from "./api"
import auth from "@react-native-firebase/auth"

export class AuthApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  login(email: string, password: string) {
        return auth().signInWithEmailAndPassword(email, password);
  }

  signUp(email: string, password: string) {
    return auth().createUserWithEmailAndPassword(email, password);
  }
}