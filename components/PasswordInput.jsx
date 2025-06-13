import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PasswordInput = ({title, password, setPassword, isVisible, setIsVisible}) => {

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={title}
                value={password}
                secureTextEntry={!isVisible}
                onChangeText={e => setPassword(e)}
            />
            <TouchableOpacity
                style={styles.icon}
                onPress={() => setIsVisible(!isVisible)}
            >
                <Icon
                    name={isVisible ? 'eye-off' : 'eye'}
                    size={24}
                    color="gray"
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        justifyContent:'center',
        width:"100%"
    },
    input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5, width:'100%' },
    icon: {
        position: 'absolute',
        right: 10,
        bottom:10,
        paddingTop:10,
        paddingBottom:10,
        paddingRight: 5
    },
});

export default PasswordInput;
