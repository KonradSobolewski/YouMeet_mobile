import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Settings extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Settings',
    drawerIcon: () => (
        <Ionicons name="md-settings" size={18}/>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Settings</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
