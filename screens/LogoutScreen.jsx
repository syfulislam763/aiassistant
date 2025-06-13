import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { AuthContext,  } from '../contexts/AuthContext'

const LogoutScreen = ({navigation}) => {
    const {logout} = useContext(AuthContext)
    useEffect(()=>{
        logout()
        navigation.closeDrawer()
    },[])
  return (
    null
  )
}

export default LogoutScreen

const styles = StyleSheet.create({})