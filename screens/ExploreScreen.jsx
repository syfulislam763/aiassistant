import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ExploreScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Explore us!</Text>
    </View>
  )
}

export default ExploreScreen

const styles = StyleSheet.create({
  container:{
    flex:1, justifyContent:'center',alignItems:'center'
  }
})