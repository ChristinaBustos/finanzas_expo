import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'

export default function ChangeAddress() {
  const [address, setAddress] = useState("")
  return (
    <View>
      <Text>Actualización de Dirección</Text>
      <Input
          placeholder="Dirección"
          keyboardType="Address"
          containerStyle={styles.input}
          onChange={(event) => setEmail(event.nativeEvent.text)}
          errorMessage={error.email}
          autoCapitalize='none'
        />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    width: '70%',
  }

})