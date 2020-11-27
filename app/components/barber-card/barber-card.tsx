import React, { useState } from "react"
import { View, ViewStyle, TextStyle, Image, ImageStyle, FlexStyle } from "react-native"
import { Text, Button } from "../../components"
import { color, spacing, typography } from "../../theme"
import { BarberCardProps } from './barber-card.props'
const tempProfileImage = require('../../screens/home-screen/lucas.jpeg')

const TEXT: TextStyle = {
    color: color.palette.white,
    fontFamily: typography.primary,
    textAlign: 'justify'
}
const BOLD: TextStyle = { fontWeight: "bold" }
const TITLE: TextStyle = {
    ...TEXT,
    ...BOLD,
    fontSize: 28,
    lineHeight: 38,
    marginBottom: 10
}
const BARBER_CARD_WRAPPER: FlexStyle = {
    alignItems: 'center',
    alignContent: 'center',
}
const BARBER_CARD: ViewStyle = {
    backgroundColor: '#e1bee7',
    borderRadius: 15,
    marginBottom: 10,
    padding: 20,
    maxHeight: '100%',
    maxWidth: '100%',
}
const CARD_CONTENT: ViewStyle = {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between'
}
const PROFILE_IMAGE: ImageStyle = {
    maxWidth: '100%',
    width: 140,
    height: 140,
    borderRadius: 100,
    borderColor: '#BAB6C8',
    borderWidth: 2,
}
const TEXT_WRAPPER: ViewStyle = {
    padding: 15,
    marginLeft: 120
}
const PROFILE_IMAGE_WRAPPER: ViewStyle = {}
const BTN_WRAPPER: ViewStyle = {
    justifyContent: 'space-around'
}
const BTN_ACTIVE: ViewStyle = {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
    backgroundColor: '#00ff44',
    marginTop: spacing[2],
    marginRight: spacing[2]
}
const BTN_INACTIVE: ViewStyle = {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
    backgroundColor: '#828583',
    marginTop: spacing[2],
    marginRight: spacing[2]
}
const BTN_TEXT: TextStyle = {
    ...TEXT,
    ...BOLD,
    fontSize: 13,
    letterSpacing: 2,
}

export function BarberCard(props: BarberCardProps) {
    const [appointment, setAppointment] = useState(false)
    return (
        <View style={BARBER_CARD_WRAPPER}>
            <View style={BARBER_CARD}>
                <View style={CARD_CONTENT}>
                    <View style={PROFILE_IMAGE_WRAPPER}>
                        <Image source={tempProfileImage} style={PROFILE_IMAGE} />
                    </View>
                    <View style={TEXT_WRAPPER}>
                        <Text style={TITLE}>Lucas Santos</Text>
                        <Text style={TEXT}>
                            Barbeiro há 6 anos perito na arte de dar o cu e encochar o cliente fazendo piadas sobre o Alexandre Frota!
                        </Text>
                        <Text style={TEXT}>
                            Agende já seu horário!
                        </Text>
                    </View>
                </View>
                <View style={BTN_WRAPPER}>
                    <Button
                        style={!appointment ? BTN_ACTIVE : BTN_INACTIVE}
                        textStyle={BTN_TEXT}
                        text={!appointment ? 'SOLICITAR AGENDAMENTO' : 'AGENDAMENTO SOLICITADO'}
                        onPress={() => setAppointment(!appointment)}
                    />
                    <Button
                        style={appointment ? { ...BTN_ACTIVE, backgroundColor: '#f00' } : BTN_INACTIVE}
                        disabled={!appointment}
                        textStyle={BTN_TEXT}
                        text='CANCELAR AGENDAMENTO'
                        onPress={() => setAppointment(!appointment)}
                    />
                </View>
            </View>
        </View>

    )
}