import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  InteractionManager,
} from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../constants/Constants';
import { AuthContext } from '../contexts/AuthContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ChatbotScreen({ navigation }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [triger, setTriger] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const { user, logout } = useContext(AuthContext);
  const flatListRef = useRef();

  const sendMessage = () => {
    if (message) {
      setMessages([
        ...messages,
        { text: message.trim(), user: true },
        { text: '...', user: false },
      ]);
      setTriger(message.trim());
      setMessage('');
    }
  };

  useEffect(() => {
    const handleApi = async () => {
      try {
        if (triger) {
          const response = await axios.post(
            BASE_URL + 'chatbot/',
            { message: triger },
            {
              headers: {
                'Content-Type': 'application/json',
                'session-id': user?.session_id,
              },
            }
          );

          if (response.status === 200) {
            const msg = messages.slice(0, messages.length - 1);
            setMessages([...msg, { text: response.data.mama, user: false }]);
            setTriger('');
          }
        }
      } catch (error) {
        console.error('Error posting data:', error);
      }
    };

    if (!user) {
      navigation.closeDrawer();
      logout();
    } else {
      handleApi();
    }

    InteractionManager.runAfterInteractions(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    });
  }, [triger]);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true)
    );
    const hideSub = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false)
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={keyboardVisible ?100 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <LinearGradient
          colors={['#FFFFFF', '#CAF7FA', '#BAE5E8', '#ADF4F9', '#FFFFFF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.container}
        >
          <View style={{ flex: 1 }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              ref={flatListRef}
              data={messages}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ padding: 10, paddingBottom: 20 }}
              onContentSizeChange={() =>
                InteractionManager.runAfterInteractions(() =>
                  flatListRef.current?.scrollToEnd({ animated: true })
                )
              }
              onLayout={() =>
                InteractionManager.runAfterInteractions(() =>
                  flatListRef.current?.scrollToEnd({ animated: true })
                )
              }
              ListHeaderComponent={() => {
                return messages.length > 0 ? (null): (<View
                  style={{
                    height: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: '#e3bb07' }}>
                    Hello {user.username}! Start your order placement with AI
                    assistant
                  </Text>
                </View>)
              }}
              renderItem={({ item }) => (
                <View style={item.user ? styles.userMessage : styles.botMessage}>
                  <Text style={{ color: '#fff', flexWrap: 'wrap' }}>{item.text}</Text>
                </View>
              )}
              keyExtractor={(_, index) => index.toString()}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type a message"
              value={message}
              onChangeText={setMessage}
              onSubmitEditing={sendMessage}
              blurOnSubmit={false}
            />
            <Pressable onPress={sendMessage}>
              <MaterialIcons name="send" size={24} color="black" />
            </Pressable>
          </View>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 0 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 10,
    
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#00000050',
    padding: 15,
    marginBottom: 10,
    maxWidth: '90%',
    minWidth: '20%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#00000050',
    padding: 15,
    marginBottom: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    maxWidth: '90%',
    minWidth: '20%',
  },
});
