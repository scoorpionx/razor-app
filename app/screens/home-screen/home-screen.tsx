import React from "react"
import { View, ViewStyle, TextStyle, SafeAreaView, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Screen, Wallpaper, TextField } from "../../components"
import { color, spacing } from "../../theme"
import Icon from 'react-native-vector-icons/Feather'
import { BarberCard } from "../../components/barber-card/barber-card"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
    backgroundColor: color.transparent,
    paddingHorizontal: spacing[4],
}
const HEADER: TextStyle = {
    paddingTop: spacing[3],
    paddingBottom: spacing[4] + spacing[1],
    paddingHorizontal: 0,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center'
}
const INPUT: ViewStyle = {
    borderRadius: spacing[2],
    padding: spacing[2],
    margin: 0
}
const ICON_WRAPPER: ViewStyle = {
    paddingTop: 15
}
const FOOTER: ViewStyle = {
    alignItems: 'center'
}
const FOOTER_CONTENT: ViewStyle = {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
}


export const HomeScreen = observer(function HomeScreen() {
    const navigation = useNavigation()
    return (
        <View style={FULL}>
            <Wallpaper />
            <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
                <View style={HEADER} >
                    <TextField placeholder="Buscar" inputStyle={INPUT} style={{ flex: 1, marginRight: 10 }} />
                    <View style={ICON_WRAPPER}>
                        <Icon name='search' size={30} color='#5D2555' />
                    </View>
                </View>
                <ScrollView>
                    <BarberCard />
                    <BarberCard />
                    <BarberCard />
                    <BarberCard />
                    <BarberCard />
                    <BarberCard />
                </ScrollView>
            </Screen>
            <SafeAreaView style={FOOTER}>
                <View style={FOOTER_CONTENT}>
                    <Icon.Button
                        name='user'
                        size={30}
                        color='#5D2555'
                        backgroundColor='transparent'
                        onPress={() => navigation.navigate("profile")}
                    />
                </View>
            </SafeAreaView>
        </View>
    )
})
