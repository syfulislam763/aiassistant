import { StyleSheet, Text, View, ImageBackground, Image, Button, TouchableOpacity} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ellipse1, Group2, Group3, image_bg, welcome_image } from '../constants/Constants'

const LayoutScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{backgroundColor:'#ebfcf6', flex:1, justifyContent:'center', width:'100%'}}>
        
        <ImageBackground
            source={image_bg}
            style={{
                flex:1,
                width:"auto",
                paddingTop:30
            }}
        >
            

            <View style={{
                height:350
            }}>
                <Image 
                    source={welcome_image}
                    resizeMode='contain'
                    style={{height:350, width:'auto'}}
                />
            </View>

            <View style={{
                width: '100%',
                height: 200,
                justifyContent:'center',
                alignItems:'center'
            }}>
                <Text style={{color:'#1F41BB', fontSize:40}}>
                    Make your order smoother with AI Assistant!
                </Text>
            </View>


            <View style={styles.btnContainer}>

                <TouchableOpacity onPress={()=>navigation.navigate('Login')} activeOpacity={0.8} style={styles.btn}>
                    <Text style={styles.btnText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>navigation.navigate('SignUp')} activeOpacity={0.5} style={{...styles.btn, backgroundColor:'#ffffff'}}><Text style={{...styles.btnText,color:'black'}} >Register</Text></TouchableOpacity>

            </View>
        </ImageBackground>


    </SafeAreaView>
  )
}

export default LayoutScreen

const styles = StyleSheet.create({
    btnContainer:{
        height:250,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    btn:{
        width:150,
        height: 50,
        backgroundColor:'#1F41BB',
        alignItems:'center',
        justifyContent:"center",
        borderRadius:10
    },
    btnText:{color:'#ffffff', fontSize: 25, fontWeight:'bold'},
    
})