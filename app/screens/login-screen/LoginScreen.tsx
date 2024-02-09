import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle } from "react-native"
import {
  AccountCreationQuestion,
  Button,
  Icon,
  Screen,
  Text,
  TextField,
  TextFieldAccessoryProps,
} from "../../components"
import { useStores } from "../../models"
import { AppStackScreenProps } from "../../navigators"
import { colors, spacing } from "../../theme"
import { useHeader } from "../../utils/useHeader"
import { Loader } from "../../components/Loader"
import { showSnackBar } from "../../utils/snackBar"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {
}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const { navigation: { goBack } } = _props
  const { navigation } = _props
  const authPasswordInput = useRef<TextInput>()

  const [authPassword, setAuthPassword] = useState("")
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [attemptsCount, setAttemptsCount] = useState(0)

  const {
    authenticationStore: { login: performLogin, setIsLoading, isLoading },
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

  const error = emailError || passwordError

  async function login() {
    setIsLoading(true)
    try {
      await performLogin(email, authPassword)
    } catch (e) {
      console.error(e.message)
      showSnackBar("Verify your password or your email!", "error")
      setIsLoading(false)
      setAttemptsCount(attemptsCount + 1)
      return
    }

    setIsLoading(false)
    setAuthPassword("")
    setEmail("")
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
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      {isLoading && <Loader />}
      <Text testID="login-heading" tx="loginScreen.signIn" preset="heading" style={$signIn} />
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
        onSubmitEditing={login}
        RightAccessory={PasswordRightAccessory}
      />

      <Button
        testID="login-button"
        tx="loginScreen.tapToSignIn"
        textStyle={$tapButtonText}
        style={$tapButton}
        pressedStyle={$tapButtonPressed}
        preset="reversed"
        onPress={login}
      />
      <AccountCreationQuestion
        onPress={() => navigation.navigate("SignUp")}
        questionTx={"loginScreen.dontHaveAccountQuestion"}
        actionTextTx={"signUpScreen.signUp"}
      />
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
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
