import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

export default class DrawerContainer extends React.Component {


  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Text
          onPress={() => navigation.navigate('Home')}
          style={styles.uglyDrawerItem}>
          Screen 1
        </Text>
        <Text
          onPress={() => navigation.navigate('Settings')}
          style={styles.uglyDrawerItem}>
          Settings
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    paddingTop: 40,
    paddingHorizontal: 20
  },
  uglyDrawerItem: {
    fontSize: 20,
    color: 'blue',
    padding: 15,
    margin: 5,
    borderRadius: 10,
    borderColor: 'blue',
    borderWidth: 1,
    textAlign: 'center',
    backgroundColor: 'white',
    overflow: 'hidden'
  }
})
