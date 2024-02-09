import { RotationCircleLoader, TextLoader } from "react-native-indicator"
import { colors } from "../theme"
import React from "react"
import { ViewStyle, View, TextStyle } from "react-native"

interface LoaderProps {
  size?: number;
  color?: string;
  text?: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

export function Loader(props: LoaderProps) {
  const {
    size = 25,
    color = colors.palette.secondary600,
    text = "Wait a moment",
    containerStyle = $loaderContainer,
    textStyle={}
  } = props

  return (
    <View style={containerStyle}>
      <RotationCircleLoader size={size} color={color} />
      <TextLoader text={text} textStyle={textStyle}/>
    </View>)
}

const $loaderContainer: ViewStyle = { alignItems: "center" }