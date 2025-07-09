import React from 'react'
import { View, Text, Modal, TouchableOpacity, StyleSheet,ActivityIndicator } from 'react-native'

const CustomModal = ({isVisible, onClose}) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={() => onClose(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ActivityIndicator size="large" color="#17CBCF" />
        </View>
      </View>
    </Modal>    
  )
}

export default CustomModal

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});