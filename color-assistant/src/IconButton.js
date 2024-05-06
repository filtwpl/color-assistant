import { StyleSheet, Pressable, Text } from "react-native";
import { Image } from 'expo-image';
import Ionicons from '@expo/vector-icons/Ionicons';
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
//import { all } from '@awesome.me/free-regular-svg-icons/icons'

// library.add(...all)

export default function IconButton({ iconCode, onPress }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Ionicons
        name={iconCode} 
        size={18} 
        color="#25292e" 
        style={styles.buttonIcon} 
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 40,
    margin: 10,
  },
})