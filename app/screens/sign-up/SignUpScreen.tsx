import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextInput, TextStyle, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button,Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "app/components"
import { spacing, colors } from "app/theme"
import { useStores } from "app/models"
import { useHeader } from "app/utils/useHeader"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface SignUpScreenProps extends AppStackScreenProps<"SignUp"> { }

export const SignUpScreen: FC<SignUpScreenProps> = observer(function SignUpScreen(_props) {
  const {navigation : {goBack}} = _props;
  const authPasswordInput = useRef<TextInput>()

  const [authPassword, setAuthPassword] = useState("")
  const [email, setEmail] = useState("");
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: { validationError, login: performLogin },
  } = useStores()
  useHeader({
    rightIcon: "back",
    onRightPress: goBack
  })
  useEffect(() => {
    // TODO
    // Here is where you could fetch credentials from keychain or storage
    // and pre-fill the form fields.
    setEmail("ignite@infinite.red")
    setAuthPassword("ign1teIsAwes0m3")

    // Return a "cleanup" function that React will run when the component unmounts
    return () => {
      setAuthPassword("")
      setEmail("");
    }
  }, [])

  const error = isSubmitted ? validationError : ""

  async function login() {
    await performLogin(email, authPassword);
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (validationError) return

    // Make a request to your server to get an authentication token.
    // If successful, reset the fields and set the token.
    setIsSubmitted(false)
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
    <Screen style={$root} preset="auto" safeAreaEdges={["top", "bottom"]}
    >
     <Text testID="login-heading" tx="signUpScreen.createAccount" preset="heading" style={$signIn} />
      {/* <Text tx="loginScreen.enterDetails" preset="subheading" style={$enterDetails} /> */}
      {attemptsCount > 2 && <Text tx="loginScreen.hint" size="sm" weight="light" style={$hint} />}

      <TextField
        value={email}
        onChangeText={(email)=>{
          setEmail(email);
        }}
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
        tx="signUpScreen.signUp"
        textStyle={$tapButtonText}
        style={$tapButton}
        pressedStyle={$tapButtonPressed}
        preset="reversed"
        onPress={login}
      />
    </Screen>
  )
})


const $root: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $signIn: TextStyle = {
  marginBottom: spacing.sm,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.lg,
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
  borderRadius: spacing.md
}

const $tapButtonPressed:ViewStyle = {
  backgroundColor: colors.palette.gold900,
}
const $tapButtonText: TextStyle = {
  color: colors.palette.neutral900,
}
