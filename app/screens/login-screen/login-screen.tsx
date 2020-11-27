import React, { useState } from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, Wallpaper, TextField } from "../../components"
import { color, spacing, typography } from "../../theme"
import { Api } from "../../services/api"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
    backgroundColor: color.transparent,
    paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
    color: color.palette.white,
    fontFamily: typography.primary,
    marginTop: 40
}
const BOLD: TextStyle = { fontWeight: "bold" }
const TITLE: TextStyle = {
    ...TEXT,
    ...BOLD,
    fontSize: 28,
    lineHeight: 38,
    textAlign: "center",
}
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
const INPUT: ViewStyle = {
    borderRadius: spacing[2],
    padding: spacing[2],
    margin: 0
}
const BTN: ViewStyle = {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
    backgroundColor: "#5D2555",
    marginTop: spacing[4],
    marginBottom: spacing[4]
}
const BTN_TEXT: TextStyle = {
    ...TEXT,
    ...BOLD,
    marginTop: 0,
    fontSize: 13,
    letterSpacing: 2,
}

export const LoginScreen = observer(function LoginScreen() {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const nextScreen = async () => {
        try {
            // const api = new Api();
            // await api.logIn({
            //     email,
            //     password,
            // })
            navigation.navigate("home")
        } catch (error) {

        }
    }

    return (
        <View style={FULL}>
            <Wallpaper />
            <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
                <Header headerTx="welcomeScreen.poweredBy" style={HEADER} titleStyle={HEADER_TITLE} />
                <Text style={TITLE} text="Faça Login" />
                <View style={{ marginTop: 40 }}>
                    <TextField
                        placeholder="E-mail"
                        inputStyle={INPUT}
                        keyboardType={'email-address'}
                        value={email}
                        onChangeText={(e) => { setEmail(e) }}
                    />
                    <TextField
                        placeholder="Senha"
                        inputStyle={INPUT}
                        secureTextEntry={true}
                        keyboardType={'visible-password'}
                        textContentType={"password"}
                        passwordRules={'minlength: 8'}
                        value={password}
                        onChangeText={(e) => { setPassword(e) }}
                    />
                    <Button
                        style={BTN}
                        textStyle={BTN_TEXT}
                        text="CONFIRMAR"
                        onPress={nextScreen}
                    />
                </View>
            </Screen>
        </View>
    )
})
