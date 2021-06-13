import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { CommonActions } from "@react-navigation/native"
import { ViewStyle, SafeAreaView, View, TextStyle, TextInput } from "react-native"
import { Button, Screen, Text, TextField, Wallpaper, Header } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing, typography } from "../../theme"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const LOGIN: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#5D2555",
}
const LOGIN_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const LOGIN_TEXT_FIELD: TextInput = {}
const LOGIN_BTN: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#5D2555",
  marginBottom: spacing[4],
}
const FOOTER: ViewStyle = { backgroundColor: "#20162D" }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}

export const LoginScreen = observer(function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  const rootStore = useStores()
  // Pull in navigation via hook
  const navigation = useNavigation()
  const handleLogin = async () => {
    const result = await rootStore.makeLogin({ identifier: email, password })
    if (result.kind === "ok") {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "list" }],
        }),
      )
    } else {
      navigation.navigate("welcome")
    }
  }
  const handleSignIn = () => navigation.navigate("signin")
  return (
    <View style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header headerText="POWERED BY RAZOR" style={HEADER} titleStyle={HEADER_TITLE} />
        <TextField
          style={LOGIN_TEXT_FIELD}
          textStyle={LOGIN_TEXT}
          label="E-mail"
          placeholder="email@email.com"
          value={email}
          onChange={(e) => setEmail(e.nativeEvent.text)}
          keyboardType="email-address"
          autoCompleteType="email"
        />
        <TextField
          style={LOGIN_TEXT_FIELD}
          textStyle={LOGIN_TEXT}
          label="Senha"
          value={password}
          onChange={(e) => setPassword(e.nativeEvent.text)}
          secureTextEntry
        />
      </Screen>
      <SafeAreaView style={FOOTER}>
        <View style={FOOTER_CONTENT}>
          <Button style={LOGIN_BTN} textStyle={LOGIN_TEXT} text="LOGIN" onPress={handleLogin} />
          <Button
            style={LOGIN_BTN}
            textStyle={LOGIN_TEXT}
            text="CADASTRAR"
            onPress={handleSignIn}
          />
        </View>
      </SafeAreaView>
    </View>
  )
})
