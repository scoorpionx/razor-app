import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import {
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
  Image,
  ImageStyle,
  FlexStyle,
  SafeAreaView,
} from "react-native"
import { Text, Button } from "../../components"
import { color, spacing, typography } from "../../theme"
import { User } from "../../models/user/user"
const tempProfileImage = require("./lucas.jpeg")

const TEXT: TextStyle = {
  color: "#4F4F4F",
  fontFamily: typography.primary,
  lineHeight: 25,
  textAlign: "center",
}

const BOLD: TextStyle = { fontWeight: "bold" }

const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  color: color.palette.darkPlum,
  fontSize: 28,
  lineHeight: 38,
  marginBottom: 10,
}

const BARBER_CARD_WRAPPER: FlexStyle = {
  alignItems: "center",
  maxWidth: 327,
  marginRight: 40,
}

const BARBER_CARD: ViewStyle = {
  backgroundColor: color.palette.white,
  borderRadius: spacing[1],
  padding: 20,
  paddingTop: 90,
  paddingBottom: 65,
  top: 75,
  maxHeight: "100%",
  maxWidth: "100%",
}

const CARD_CONTENT: ViewStyle = {}

const PROFILE_IMAGE: ImageStyle = {
  width: 145,
  height: 145,
}

const TEXT_WRAPPER: ViewStyle = {}

const PROFILE_IMAGE_WRAPPER: ViewStyle = {
  overflow: "hidden",
  alignItems: "center",
  maxWidth: "100%",
  width: 160,
  height: 160,
  borderRadius: 100,
  borderColor: color.palette.white,
  borderWidth: spacing[2],
  position: "absolute",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 12,
  },
  shadowOpacity: 0.58,
  shadowRadius: 16.0,
  elevation: 24,
}

const BTN_WRAPPER: ViewStyle = {
  justifyContent: "space-around",
}

const BTN: ViewStyle = {
  paddingVertical: spacing[2],
  paddingHorizontal: spacing[1],
  backgroundColor: "#34B7F1",
  top: 25,
  borderBottomRightRadius: spacing[1],
  borderBottomLeftRadius: spacing[1],
  width: "100%",
}

const BTN_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
  color: color.palette.white,
}

const FOOTER: ViewStyle = {
  width: "100%",
}

const FOOTER_CONTENT: ViewStyle = {
  flexDirection: "row",
  // paddingVertical: spacing[4],
  // paddingHorizontal: spacing[4],
  width: "100%",
}

export interface BarberCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  item: User
}

/**
 * Describe your component here
 */
export const BarberCard = observer(function BarberCard(props: BarberCardProps) {
  const { item: barber } = props
  const [appointment, setAppointment] = useState(false)
  // const styles = flatten([CONTAINER, style])

  return (
    <View style={BARBER_CARD_WRAPPER}>
      <View style={PROFILE_IMAGE_WRAPPER}>
        <Image style={PROFILE_IMAGE} source={{ uri: barber.image.url }} />
      </View>
      <View style={BARBER_CARD}>
        <View style={CARD_CONTENT}>
          <Text style={TITLE}>{barber.name}</Text>
          <View style={TEXT_WRAPPER}>
            <Text style={TEXT}>{barber.description}</Text>
          </View>
        </View>
      </View>
      <SafeAreaView style={FOOTER}>
        <View style={FOOTER_CONTENT}>
          {!appointment && (
            <TouchableOpacity
              style={
                !appointment
                  ? BTN
                  : {
                      ...BTN,
                      backgroundColor: "#828583",
                    }
              }
              onPress={() => setAppointment(!appointment)}
            >
              <Text style={BTN_TEXT}>{!appointment ? "SOLICITAR" : "AGENDAMENTO"}</Text>
              <Text style={BTN_TEXT}>{!appointment ? "AGENDAMENTO" : "SOLICITADO"}</Text>
            </TouchableOpacity>
          )}
          {appointment && (
            <TouchableOpacity
              style={
                appointment
                  ? {
                      ...BTN,
                      backgroundColor: "#f00",
                    }
                  : {
                      ...BTN,
                      backgroundColor: "#828583",
                    }
              }
              onPress={() => setAppointment(!appointment)}
            >
              <Text style={BTN_TEXT}>CANCELAR</Text>
              <Text style={BTN_TEXT}>AGENDAMENTO</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </View>
  )
})
