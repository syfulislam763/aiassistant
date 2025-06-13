import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Image,ScrollView,TouchableOpacity } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { BASE_URL, image_bg, social_media } from '../constants/Constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import PasswordInput from '../components/PasswordInput';


export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);

  const isok = {
    "Account created successfully!": true
  }

  const handleSignUp = async () => {
    try{
      if (username && password && password === confirmPassword) {
        const response = await axios.post(
          BASE_URL+"create_user/",
          {
            email: email,
            username: username,
            password: password
          },
          {
            headers:{
              'Content-Type': 'application/json'
            }
          }
        );
        
        
        if(isok[response.data.message]){
          navigation.navigate('Login');
        }else{
          console.log("something went wrong!!");
        }
        
      }else{
        console.log({email, username})
      }
    }catch(e){
      console.log("Error", e)
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
              height: 200,
              justifyContent:'center',
              alignItems:'center'
            }}>
              <Text style={{fontSize:35,color:'#1F41BB',fontWeight:'600'}}>Create Account</Text>
              <Text style={{fontSize:20, marginTop:10}}>Create an account so you can take advantage of new AI solution!</Text>
            </View>

            

            <View style={{
              height:220,
              justifyContent:'center',
              alignItems:'center'
            }}>
              
              <TextInput placeholder="Email" value={email} onChangeText={(e) => setEmail(e)} style={styles.input} />

              <TextInput placeholder="Name" value={username} onChangeText={setUsername} style={styles.input} />

              <PasswordInput
                title="Password"
                password={password}
                setPassword={setPassword}
                isVisible={isVisible1}
                setIsVisible={setIsVisible1}
              />
              {/* <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} /> */}

              <PasswordInput
                title="Confirm Password"
                password={confirmPassword}
                setPassword={setConfirmPassword}
                isVisible={isVisible2}
                setIsVisible={setIsVisible2}
              />
              {/* <TextInput placeholder="Confirm Password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} style={styles.input} /> */}
              
            </View>


            <View style={{height:100, justifyContent:'center',alignItems:'center'}}>
              <TouchableOpacity onPress={()=>handleSignUp()} activeOpacity={0.8} style={styles.btn}>
                      <Text style={styles.btnText}>Sign up</Text>
              </TouchableOpacity>
            </View>

            <View style={{height:100, alignItems:'center', justifyContent:'center'}}>
              <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate("Login")}>
                <Text style={{fontSize:20}}>Already have an account</Text>
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
