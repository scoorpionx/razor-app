import React, { useState } from "react"
import {
  Alert,
  View,
  ViewStyle,
  TextStyle,
  TouchableHighlight,
  ScrollView,
  SafeAreaView,
} from "react-native"
import { CommonActions } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/native"
import { Feather } from "@expo/vector-icons"
import { Button, Screen, Text, TextField, Wallpaper, Header } from "../../components"
import { useStores } from "../../models"
import { color, spacing, typography } from "../../theme"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
}
const ROLE_WRAPPER: ViewStyle = {
  alignItems: "center",
}
const IMAGE_CONTAINER_INACTIVE: ViewStyle = {
  marginLeft: 8,
  marginTop: spacing[7],
  paddingTop: 27,
  height: 110,
  width: 110,
  borderStyle: "solid",
  borderColor: "#fff",
  borderWidth: 2,
  borderRadius: 90,
  alignContent: "center",
  alignItems: "center",
}
const IMAGE_CONTAINER_ACTIVE: ViewStyle = {
  marginLeft: 8,
  marginTop: spacing[7],
  paddingTop: 35,
  height: 160,
  width: 160,
  borderStyle: "solid",
  borderColor: "#fff",
  borderWidth: 2,
  borderRadius: 90,
  alignContent: "center",
  alignItems: "center",
}
const ROLE_TEXT: TextStyle = {
  ...TEXT,
  marginTop: 10,
}
const INPUT: ViewStyle = {
  borderRadius: spacing[2],
  padding: spacing[2],
  margin: 0,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const SIGNIN: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#5D2555",
}
const SIGNIN_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const SIGIN_TEXT_FIELD: TextInput = {}
const FOOTER: ViewStyle = { backgroundColor: "#20162D" }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}
export const SignInScreen = observer(function SignInScreen() {
  const [clientRole, setClientRole] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [description, setDescription] = useState("")
  // Pull in navigation via hook
  const navigation = useNavigation()
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  const rootStore = useStores()
  // const handleSignIn = async () => {
  //   const result = await rootStore.makeSignIn({
  //     email,
  //     password,
  //     name,
  //     username,
  //     description,
  //     barber: !clientRole,
  //   })
  //   if (result.kind === "ok") {
  //     navigation.dispatch(
  //       CommonActions.reset({
  //         index: 0,
  //         routes: [{ name: "list" }],
  //       }),
  //     )
  //   } else {
  //     navigation.navigate("welcome")
  //   }
  // }

  return (
    <View style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header headerText="POWERED BY RAZOR" style={HEADER} titleStyle={HEADER_TITLE} />
        <Text style={TITLE}>Como você deseja se cadastrar?</Text>
        <ScrollView horizontal={true}>
          <View style={{ ...ROLE_WRAPPER, marginRight: 40, marginLeft: 12 }}>
            <TouchableHighlight
              onPress={() => setClientRole(!clientRole)}
              style={clientRole ? IMAGE_CONTAINER_ACTIVE : IMAGE_CONTAINER_INACTIVE}
            >
              <Feather name="user" size={clientRole ? 80 : 50} color="#fff" />
            </TouchableHighlight>
            <Text style={ROLE_TEXT}>Cliente</Text>
          </View>
          <View style={ROLE_WRAPPER}>
            <TouchableHighlight
              onPress={() => setClientRole(!clientRole)}
              style={clientRole ? IMAGE_CONTAINER_INACTIVE : IMAGE_CONTAINER_ACTIVE}
            >
              <Feather name="briefcase" size={clientRole ? 50 : 80} color="#fff" />
            </TouchableHighlight>
            <Text style={ROLE_TEXT}>Profissional</Text>
          </View>
        </ScrollView>
        <View style={{ marginTop: 40 }}>
          <TextField
            style={SIGIN_TEXT_FIELD}
            label="Nome"
            placeholder="Jorge Souza Santos"
            value={name}
            onChange={(e) => setName(e.nativeEvent.text)}
          />
          <TextField
            style={SIGIN_TEXT_FIELD}
            label="Nome de usuário"
            placeholder="jorge.13x"
            value={username}
            onChange={(e) => setUsername(e.nativeEvent.text)}
          />
          <TextField
            style={SIGIN_TEXT_FIELD}
            label="E-mail"
            placeholder="email@email.com"
            value={email}
            onChange={(e) => setEmail(e.nativeEvent.text)}
            keyboardType="email-address"
            autoCompleteType="email"
          />
          <TextField
            style={SIGIN_TEXT_FIELD}
            label="Senha"
            value={password}
            onChange={(e) => setPassword(e.nativeEvent.text)}
            secureTextEntry
          />
          {clientRole ? null : (
            <TextField
              style={SIGIN_TEXT_FIELD}
              label="Descrição"
              value={description}
              onChange={(e) => setDescription(e.nativeEvent.text)}
              multiline
              numberOfLines={3}
            />
          )}
        </View>
      </Screen>
      <SafeAreaView style={FOOTER}>
        <View style={FOOTER_CONTENT}>
          <Button
            style={SIGNIN}
            textStyle={SIGNIN_TEXT}
            text="CADASTRAR"
            onPress={() =>
              navigation.navigate("upload-image", {
                data: {
                  email,
                  password,
                  name,
                  username,
                  description,
                  barber: !clientRole,
                },
              })
            }
          />
        </View>
      </SafeAreaView>
    </View>
  )
})
