import { StyleSheet, Pressable, Text } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function IconButton({ iconCode, onPress }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <MaterialIcons
        name={iconCode} 
        size={20} 
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