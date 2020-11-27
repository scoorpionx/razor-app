import React, { useState, useEffect } from "react"
import { View, ViewStyle, TextStyle, SafeAreaView, TouchableOpacity, Image, ImageStyle, Platform, PermissionsAndroid } from "react-native"
import ImagePicker from 'react-native-image-picker';
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, Wallpaper } from "../../components"
import { color, spacing, typography } from "../../theme"
import Icon from 'react-native-vector-icons/Feather'
import { check, PERMISSIONS, RESULTS, requestMultiple } from 'react-native-permissions';

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
    backgroundColor: color.transparent,
    paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
    color: color.palette.white,
    fontFamily: typography.primary,
    marginTop: 40,
    textAlign: 'center',
    fontSize: 20
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
const IMAGE: ImageStyle = {
    width: 240,
    height: 240,
    alignSelf: 'center',
    borderRadius: 120,
    borderColor: '#BAB6C8',
    borderWidth: 2,
}
const FOOTER: ViewStyle = {}
const FOOTER_CONTENT: ViewStyle = {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
}

export const ProfileScreen = observer(function ProfileScreen() {
    const navigation = useNavigation()
    const [image, setImage] = useState(null)
    const signinSend = () => navigation.navigate("home")

    let options = {
        title: 'Selecione uma imagem',
        chooseFromLibraryButtonTitle: 'Escolher da galeria',
        takePhotoButtonTitle: 'Tirar foto',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
        mediaType: 'photo'
    };

    const pickImage = async () => {
        return await ImagePicker.showImagePicker(options, (response) => {
            if (!response.didCancel) setImage(response)
        })
    }

    return (
        <View style={FULL}>
            <Wallpaper />
            <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
                <Header headerTx="welcomeScreen.poweredBy" style={HEADER} titleStyle={HEADER_TITLE} />
                <View style={{ marginTop: 40, alignSelf: 'center' }}>
                    {
                        image
                            ?
                            <TouchableOpacity onPress={pickImage}>
                                <Image style={IMAGE} source={{ uri: image.uri }} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={pickImage}>
                                <Icon name='camera' size={120} />
                            </TouchableOpacity>
                    }
                </View>
                <Text style={TITLE}>Seu Perfil</Text>
                <Text style={TEXT}>Lucas Santos</Text>
                <Text style={TEXT}>
                    Barbeiro há 6 anos perito na arte de dar o cu e encochar o cliente fazendo piadas sobre o Alexandre Frota!
                </Text>
            </Screen>
            <SafeAreaView style={FOOTER}>
                <View style={FOOTER_CONTENT}>
                    <Button
                        style={BTN}
                        textStyle={BTN_TEXT}
                        text='CONFIRMAR'
                        onPress={signinSend}
                    />
                </View>
            </SafeAreaView>
        </View>
    )
})

