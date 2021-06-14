import React, { useState, useEffect } from "react"
import {
  View,
  ViewStyle,
  TextStyle,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ImageStyle,
} from "react-native"
import { useNavigation, CommonActions } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { useStores } from "../../models"
import { Button, Header, Screen, Text, Wallpaper } from "../../components"
import { color, spacing, typography } from "../../theme"
import { Feather as Icon } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
  marginTop: 40,
  textAlign: "center",
  fontSize: 20,
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
  marginBottom: spacing[4],
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
  alignSelf: "center",
  borderRadius: 120,
  borderColor: "#BAB6C8",
  borderWidth: 2,
}
const FOOTER: ViewStyle = {}
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}

export const UploadImageScreen = observer(function UploadImageScreen({ route }) {
  const navigation = useNavigation()
  const { data } = route.params
  const [image, setImage] = useState(null)
  const [permission, setPermission] = useState(false)
  const rootStore = useStores()

  useEffect(() => {
    ;async (_) => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== "granted") {
        alert("Desculpe, precisamos de acesso à câmera para continuar")
        setPermission(false)
      }
    }
  }, [])

  useEffect(() => {
    ;async (_) => {
      if (!permission) {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== "granted") {
          alert("Desculpe, precisamos de acesso à câmera para continuar")
          setPermission(false)
        }
      }
    }
  }, [permission])

  const handleSignIn = async (_) => {
    const result = await rootStore.makeSignIn(data, image)
    if (result.kind === "ok") {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "list" }],
        }),
      )
    } else {
      alert("Erro na requisição")
      alert(result.kind)
    }
  }

  const pickImage = async (_) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    })
    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  return (
    <View style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header headerTx="welcomeScreen.poweredBy" style={HEADER} titleStyle={HEADER_TITLE} />
        <View style={{ marginTop: 40, alignSelf: "center" }}>
          {image ? (
            <TouchableOpacity onPress={pickImage}>
              <Image style={IMAGE} source={{ uri: image }} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={pickImage}>
              <Icon name="camera" size={120} />
            </TouchableOpacity>
          )}
        </View>
        <Text style={TITLE}>Seu Perfil</Text>
        <Text style={TEXT}>{data.name}</Text>
        <Text style={TEXT}>{data.description}</Text>
      </Screen>
      <SafeAreaView style={FOOTER}>
        <View style={FOOTER_CONTENT}>
          <Button style={BTN} textStyle={BTN_TEXT} text="CONFIRMAR" onPress={handleSignIn} />
        </View>
      </SafeAreaView>
    </View>
  )
})
