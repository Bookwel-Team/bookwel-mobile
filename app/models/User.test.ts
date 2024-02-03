import { createUserDefaultModel, UserModel, UserStatus } from "./User"

test("can be created", () => {
  const instance = UserModel.create({
    id: "1",
    email: "john@maiol.com",
    first_name: "John",
    last_name: "Paul",
    status: UserStatus.CLIENT,
  })

  expect(instance).toBeTruthy()
})

test("optional can be created", ()=>{
  const instance = createUserDefaultModel();
  expect(instance).toBeTruthy();
})
