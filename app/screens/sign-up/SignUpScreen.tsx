import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextInput, TextStyle, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { AccountCreationQuestion, Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "app/components"
import { colors, spacing } from "app/theme"
import { useStores } from "app/models"
import { useHeader } from "app/utils/useHeader"
import { Loader } from "../../components/Loader"
import { AUTH_PROBLEMS } from "../../services/api/auth-api"


interface SignUpScreenProps extends AppStackScreenProps<"SignUp"> {
}

export const SignUpScreen: FC<SignUpScreenProps> = observer(function SignUpScreen(_props) {
  const { navigation: { goBack } } = _props
  const { navigation } = _props
  const authPasswordInput = useRef<TextInput>()

  const [authPassword, setAuthPassword] = useState("")
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: { validationError, signUp, isLoading, setIsLoading },
  } = useStores()
  useHeader({
    rightIcon: "back",
    onRightPress: goBack,
  })
  useEffect(() => {
    setEmail("ignite@infinite.red")
    setAuthPassword("ign1teIsAwes0m3")

    return () => {
      setAuthPassword("")
      setEmail("")
    }
  }, [])

  const error = emailError

  async function createAccount() {
    setIsLoading(true)
    try {
      await signUp(email, authPassword)
    } catch (e) {
      if (e.code === AUTH_PROBLEMS.authEmailAlreadyInUse) {
        setEmailError("The email address is already in use by another account");
      }
      else if (e.code === AUTH_PROBLEMS.authInvalidCredential) {
        setEmailError("Invalid email");
      }
    }
    setAttemptsCount(attemptsCount + 1)

    setIsLoading(false)
    if (validationError) return

    setAuthPassword("")
    setEmail("")
    navigation.navigate("Login")
  }

  const PasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )


  return (
    <Screen style={$root} preset={"scroll"} safeAreaEdges={["bottom"]}
    >
      {isLoading && <Loader />}
      <Text testID="login-heading" tx="signUpScreen.createAccount" preset="heading" style={$signIn} />
      {attemptsCount > 2 && <Text tx="loginScreen.hint" size="sm" weight="light" style={$hint} />}

      <TextField
        value={email}
        onChangeText={setEmail}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="loginScreen.emailFieldLabel"
        placeholderTx="loginScreen.emailFieldPlaceholder"
        helper={error}
        status={error ? "error" : undefined}
        onSubmitEditing={() => authPasswordInput.current?.focus()}
      />

      <TextField
        ref={authPasswordInput}
        value={authPassword}
        onChangeText={setAuthPassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden}
        labelTx="loginScreen.passwordFieldLabel"
        placeholderTx="loginScreen.passwordFieldPlaceholder"
        RightAccessory={PasswordRightAccessory}
      />

      <Button
        testID="login-button"
        tx="signUpScreen.signUp"
        textStyle={$tapButtonText}
        style={$tapButton}
        pressedStyle={$tapButtonPressed}
        preset="reversed"
        onPress={createAccount}
      />
      <AccountCreationQuestion
        onPress={() => navigation.navigate("Login")}
        questionTx={"signUpScreen.haveAccountQuestion"}
        actionTextTx={"loginScreen.signIn"}
      />
    </Screen>
  )
})


const $root: ViewStyle = {
  paddingVertical: spacing.xl,
  paddingHorizontal: spacing.lg,
}

const $signIn: TextStyle = {
  marginBottom: spacing.sm,
}


const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.md,
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
  backgroundColor: colors.palette.goldPure,
  borderRadius: spacing.md,
}

const $tapButtonPressed: ViewStyle = {
  backgroundColor: colors.palette.gold900,
}
const $tapButtonText: TextStyle = {
  color: colors.palette.neutral900,
}

