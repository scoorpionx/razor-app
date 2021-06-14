import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, TextStyle, View, ViewStyle } from "react-native"
import { Screen, Text, Wallpaper, Header, BarberCard } from "../../components"
import { color, alternativeSpacing, typography, spacing } from "../../theme"
import { useStores } from "../../models"
import { User } from "../../models/user/user"

const ROOT: ViewStyle = {
  flex: 1,
  backgroundColor: color.palette.darkPlum,
  paddingHorizontal: alternativeSpacing.large,
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
const HEADER_CONTAINER: ViewStyle = {
  marginTop: alternativeSpacing.huge,
  marginBottom: alternativeSpacing.medium,
}

const BARBER_LIST: ViewStyle = {
  marginBottom: alternativeSpacing.large,
}

export const ListScreen = observer(function ListScreen() {
  const [refreshing, setRefreshing] = useState(false)
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  const rootStore = useStores()
  const { barbers } = rootStore

  // Pull in navigation via hook
  // const navigation = useNavigation()
  useEffect(() => {
    fetchBarbers()
  }, [])

  const fetchBarbers = () => {
    setRefreshing(true)
    rootStore.getBarbers()
    setRefreshing(false)
  }

  const renderBarber = ({ item }) => {
    const barber: User = item
    return <BarberCard key={item.id} item={barber} />
  }

  return (
    <Screen style={ROOT} preset="fixed">
      <Wallpaper />
      <Header headerText="POWERED BY RAZOR" style={HEADER} titleStyle={HEADER_TITLE} />
      <View style={HEADER_CONTAINER}>
        <Text preset="header" text="Barbeiros" />
      </View>
      <FlatList
        style={BARBER_LIST}
        data={rootStore.barbers}
        renderItem={renderBarber}
        extraData={{ extraDataForMobX: barbers.length > 0 ? barbers[0].id : "" }}
        keyExtractor={(item) => item.id}
        onRefresh={fetchBarbers}
        refreshing={refreshing}
        horizontal
      />
    </Screen>
  )
})
