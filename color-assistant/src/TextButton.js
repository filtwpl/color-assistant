import { StyleSheet, Pressable, Text } from "react-native";

export default function TextButton({ textLabel, onPress, color }) {
  return (
    <Pressable style={styles(color).button} onPress={onPress}>
      <Text style={styles.buttonTextLabel}>
        {textLabel}
      </Text>
    </Pressable>
  )
}

const styles = (props) => StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10,
    marginTop: 10,
    backgroundColor: props,
  },
  buttonTextLabel: {
    color: '#fff',
    fontSize: 18,
  },
})