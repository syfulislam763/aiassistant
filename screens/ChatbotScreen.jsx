import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../constants/Constants';
import { AuthContext } from '../contexts/AuthContext';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

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

    flatListRef.current?.scrollToEnd({ animated: true });
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
      keyboardVerticalOffset={keyboardVisible ? 100 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <FlatList
            ref={flatListRef}
            contentContainerStyle={{ padding: 10, paddingBottom: 80 }}
            data={messages}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
            onLayout={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
            ListHeaderComponent={() => (
              <View
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
              </View>
            )}
            renderItem={({ item }) => (
              <View
                style={item.user ? styles.userMessage : styles.botMessage}
              >
                <Text style={{ color: '#fff' }}>{item.text}</Text>
              </View>
            )}
            keyExtractor={(_, index) => index.toString()}
          />

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type a message"
              value={message}
              onChangeText={setMessage}
              onSubmitEditing={sendMessage}
              blurOnSubmit={false}
            />
            <Button title="Send" onPress={sendMessage} />
          </View>
        </View>
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
    padding: 8,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 5,
    padding: 5,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#3b82f6',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#1f2937',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
});
