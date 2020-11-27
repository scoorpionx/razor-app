import React, { useState } from "react"
import { View, ViewStyle, TextStyle, TouchableHighlight, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, Wallpaper, TextField } from "../../components"
import { color, spacing, typography } from "../../theme"
import Icon from 'react-native-vector-icons/Feather'
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
const TITLE: TextStyle = {
    ...TEXT,
    ...BOLD,
    fontSize: 28,
    lineHeight: 38,
    textAlign: "center",
}
const ROLE_WRAPPER: ViewStyle = {
    alignItems: 'center',
}
const IMAGE_CONTAINER_INACTIVE: ViewStyle = {
    marginLeft: 8,
    marginTop: spacing[7],
    paddingTop: 27,
    height: 110,
    width: 110,
    borderStyle: 'solid',
    borderColor: '#5D2555',
    borderWidth: 2,
    borderRadius: 90,
    alignContent: 'center',
    alignItems: 'center',
}
const IMAGE_CONTAINER_ACTIVE: ViewStyle = {
    marginLeft: 8,
    marginTop: spacing[7],
    paddingTop: 35,
    height: 160,
    width: 160,
    borderStyle: 'solid',
    borderColor: '#5D2555',
    borderWidth: 2,
    borderRadius: 90,
    alignContent: 'center',
    alignItems: 'center',
}
const ROLE_TEXT: TextStyle = {
    ...TEXT,
    marginTop: 10
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

export const SigninScreen = observer(function SigninScreen() {
    const navigation = useNavigation()
    const [clientRole, setClientRole] = useState(true)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [cpf, setCpf] = useState('')
    const [description, setDescription] = useState('')

    const signinSend = async () => {
        try {
            const api = new Api();
            await api.signIn({
                email,
                password,
                name,
                cpf,
                role: clientRole ? 'client' : 'barber',
                description
            })
            navigation.navigate("uploadImage")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={FULL}>
            <Wallpaper />
            <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
                <Header headerTx="welcomeScreen.poweredBy" style={HEADER} titleStyle={HEADER_TITLE} />
                <Text style={TITLE}>
                    Como você deseja se cadastrar?
                </Text>
                <ScrollView horizontal={true}>
                    <View style={{ ...ROLE_WRAPPER, marginRight: 40, marginLeft: 12 }}>
                        <TouchableHighlight
                            onPress={() => setClientRole(!clientRole)}
                            style={clientRole ? IMAGE_CONTAINER_ACTIVE : IMAGE_CONTAINER_INACTIVE}>
                            <Icon name='user' size={clientRole ? 80 : 50} color='#5D2555' />
                        </TouchableHighlight>
                        <Text style={ROLE_TEXT}>Cliente</Text>
                    </View>
                    <View style={ROLE_WRAPPER}>
                        <TouchableHighlight
                            onPress={() => setClientRole(!clientRole)}
                            style={clientRole ? IMAGE_CONTAINER_INACTIVE : IMAGE_CONTAINER_ACTIVE}>
                            <Icon name='briefcase' size={clientRole ? 50 : 80} color='#5D2555' />
                        </TouchableHighlight>
                        <Text style={ROLE_TEXT}>Profissional</Text>
                    </View>
                </ScrollView>
                <View style={{ marginTop: 40 }}>
                    <TextField
                        placeholder="Nome"
                        inputStyle={INPUT}
                        value={name}
                        onChangeText={(e) => { setName(e) }}
                    />
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
                    <TextField
                        placeholder="Confirmar Senha"
                        inputStyle={INPUT}
                        secureTextEntry={true}
                        keyboardType={'visible-password'}
                        textContentType={"password"}
                        passwordRules={'minlength: 8'}
                        value={confirmPassword}
                        onChangeText={(e) => { setConfirmPassword(e) }}
                    />
                    <TextField
                        placeholder="CPF"
                        inputStyle={INPUT}
                        keyboardType={'numbers-and-punctuation'}
                        value={cpf}
                        onChangeText={(e) => { setCpf(e) }}
                    />
                    {
                        clientRole ?
                            null
                            :
                            <TextField
                                placeholder="Descrição"
                                inputStyle={INPUT}
                                multiline
                                numberOfLines={3}
                                value={description}
                                onChangeText={(e) => { setDescription(e) }}
                            />
                    }
                    <Button
                        style={BTN}
                        textStyle={BTN_TEXT}
                        text="CONFIRMAR"
                        onPress={signinSend}
                    />
                </View>
            </Screen>
        </View>
    )
})
