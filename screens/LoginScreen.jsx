import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Image,ScrollView,TouchableOpacity } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { BASE_URL, image_bg, social_media } from '../constants/Constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import PasswordInput from '../components/PasswordInput';


export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const handleLogin = async () => {
    try {
      if (email && password){
        console.log(email, password)
        const response = await axios.post(
          BASE_URL+"login",
          {
            email: email,
            password: password,
          },
          {
            headers: {
              'Content-Type': 'application/json'
            },
          }
        );
        

        console.log(response.data)
        if(response.status == 200 && response.data['session_id']){
          login(response.data)
        }


      }
      
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ImageBackground 
          source={image_bg}
          resizeMode='cover'
          style={{
            flex: 1,
            width:'auto',
            padding: 16
          }}
        >
          <View>
            
            <View style={{
              height: 250,
              justifyContent:'center',
              alignItems:'center'
            }}>
              <Text style={{fontSize:35,color:'#1F41BB',fontWeight:'600'}}>Login Here</Text>
              <Text style={{fontSize:20, marginTop:10}}>Welcome back You've been missed!</Text>
            </View>

            

            <View style={{
              height:150,
              justifyContent:'center',
              alignItems:'center'
            }}>
              <TextInput placeholder="Email" value={email} onChangeText={(e) => setEmail(e)} style={styles.input} />
              <View style={{height:20}}></View>
              <PasswordInput
                title="Password"
                password={password}
                setPassword={setPassword}
                isVisible={isVisible}
                setIsVisible={setIsVisible}
              />
              {/* <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={(e) => setPassword(e)} style={styles.input} /> */}
            </View>

            <View style={{height:50, alignItems:'flex-end'}}>
              <Text style={{color:'black', fontSize: 15, fontWeight:'bold'}}>Forgot your password?</Text>
            </View>

            <TouchableOpacity onPress={()=>handleLogin()} activeOpacity={0.8} style={styles.btn}>
                    <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>

            <View style={{height:100, alignItems:'center', justifyContent:'center'}}>
              <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate("SignUp")}>
                <Text style={{fontSize:20}}>Create new account</Text>
              </TouchableOpacity>
            </View>

            <View style={{
              height:100,
              justifyContent:'center',
              alignItems:'center'
            }}>
              <Text style={{marginBottom:30,fontSize:18}}>Or continue with</Text>
              <View>
                <Image source={social_media}/>
              </View>
            </View>

          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 0, backgroundColor:'#ebfcf6' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5, width:'100%' },
  btn:{
    width:'100%',
    height: 50,
    backgroundColor:'#1F41BB',
    alignItems:'center',
    justifyContent:"center",
    borderRadius:10
  },
  btnText:{color:'#ffffff', fontSize: 25, fontWeight:'bold'},
});
