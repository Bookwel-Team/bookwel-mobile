import { Text } from "./Text"
import React from "react"
import { TxKeyPath } from "../i18n"
import { GestureResponderEvent, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { spacing } from "../theme"

interface AccountCreationQuestionProps {
  questionTx?: TxKeyPath
  question?: string
  actionTextTx?: TxKeyPath
  actionText?: string
  onPress: (event: GestureResponderEvent) => void
}

export function AccountCreationQuestion(props: AccountCreationQuestionProps) {
  return <View style={$questionContainer}>
    <Text tx={props.questionTx} text={props.question} />
    <TouchableOpacity onPress={props.onPress}>
      <Text tx={props.actionTextTx} style={$actionText} />
    </TouchableOpacity>
  </View>
}

const $actionText: TextStyle = {
  textDecorationLine: "underline",
  fontWeight: "bold",
  marginLeft: spacing.xs,
  marginRight: spacing.xs,
}
const $questionContainer: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  marginTop: spacing.md,
  justifyContent: "flex-end",
}
