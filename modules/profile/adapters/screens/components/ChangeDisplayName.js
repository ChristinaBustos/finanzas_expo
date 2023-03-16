import { StyleSheet, Text, View } from 'react-native'
import { Input, Button, Image, Icon } from "@rneui/base";
import React,{useState} from 'react'

export default function ChangeDisplayName() {
  const [displayName, setDisplayName] = useState("")
  return (
    <View>
      <Text>Actualización de Nombre</Text>
      <Input
          placeholder="Nombre Completo"
          keyboardType="displayName"
          containerStyle={styles.input}
          onChange={(event) => setDisplayName(event.nativeEvent.text)}
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