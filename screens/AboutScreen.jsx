import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text>About us</Text>
    </View>
  )
}

export default AboutScreen

const styles = StyleSheet.create({
    container:{
      flex:1, justifyContent:'center',alignItems:'center'
    }
})