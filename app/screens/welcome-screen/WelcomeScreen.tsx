import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Button, Text } from "../../components"
import { isRTL } from "../../i18n"
import { AppStackScreenProps } from "../../navigators" // @demo remove-current-line
import { colors, spacing } from "../../theme"
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle"

const welcomeLogo = require("../../../assets/login-logo.png")
const welcomeFace = require("../../../assets/images/welcome-face.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(
  _props, // @demo remove-current-line
) {
  // @demo remove-block-start
  const { navigation } = _props

  function goToLogin() {
    navigation.navigate("Login")
  }
  function goToSignUp() {
    navigation.navigate("SignUp");
  }
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <View style={$container}>
      <View style={$topContainer}>
        <Image source={welcomeLogo} style={$welcomeLogo} resizeMode="contain"/>
        <Text
          testID="welcome-heading"
          style={$welcomeHeading}
          tx="welcomeScreen.readyForLaunch"
          preset="heading"
        />
        <Text tx="welcomeScreen.exciting" preset="subheading" />
        <Image style={$welcomeFace} source={welcomeFace} resizeMode="contain" />
      </View>

      <View style={[$bottomContainer, $bottomContainerInsets]}>
        {/* <Text tx="welcomeScreen.postscript" size="md" /> */}
        <Button
          testID="next-screen-button"
          textStyle={$tapButtonText}
          style={$tapButton}
          pressedStyle={$tapButtonPressed}
          preset="reversed"
          tx="welcomeScreen.letsGo"
          onPress={goToLogin}
        />
        <Button
          testID="next-screen-button"
          style={$signUpButton}
          pressedStyle={$signUpButtonPressed}
          textStyle={$signUpButtonText}
          preset="reversed"
          tx="welcomeScreen.createAccount"
          onPress={goToSignUp}
          />
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.xxl
}

const $bottomContainer: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
}
const $welcomeLogo: ImageStyle = {
  height: 150,
  width: "100%",
  marginBottom: spacing.md,
}

const $welcomeFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.md,
}
// common button styles
const $buttons: ViewStyle = {
  borderRadius: spacing.md,
  marginBottom: spacing.md
}

const $tapButton: ViewStyle = {
  ...$buttons,
  marginTop: spacing.xs,
  backgroundColor: colors.palette.goldPure,
}

const $tapButtonPressed:ViewStyle = {
  backgroundColor: colors.palette.gold900,
}
const $tapButtonText: TextStyle = {
  color: colors.palette.neutral900,
}
const $signUpButton: ViewStyle = {
  ...$buttons,
  backgroundColor: "transparent",
  borderWidth: 2,
  borderColor: colors.palette.secondary600
}
const $signUpButtonText: TextStyle = {
  color: colors.palette.neutral900
}
const $signUpButtonPressed: ViewStyle = {
  backgroundColor: colors.palette.secondary100
}