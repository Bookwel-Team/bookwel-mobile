import Snackbar from "react-native-snackbar"
import { colors } from "../theme"

type Level = "info" | "error" | "success"

export function showSnackBar(message: string, level: Level) {
  let backgroundColor: string = colors.palette.neutral600
  let textColor: string = colors.palette.neutral100

  if (level === "error") {
    backgroundColor = colors.palette.angry500
  } else if (level === "info") {
    textColor = colors.palette.secondary400
  }
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_LONG,
    backgroundColor,
    textColor,
  })
}