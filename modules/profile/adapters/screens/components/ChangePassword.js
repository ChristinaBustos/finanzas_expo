import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function ChangePassword() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  return (
    <View>
      <Text>Actualización de Contraseña </Text>
      <Input
        placeholder="Contraseña Actual"
        containerStyle={styles.input}
        onChange={(event) => setPassword(event.nativeEvent.text)}
        secureTextEntry={showPassword}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            color="#007bff"
            onPress={() => setShowPassword(!showPassword)}
          ></Icon>
        }
        errorMessage={error.password}
      />
      <Input
        placeholder="Contraseña Nueva"
        containerStyle={styles.input}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            onPress={() => setShowPassword(!showPassword)}
            size={22}
          />
        }
        secureTextEntry={showPassword}
        onChange={(e) => changePayLoad(e, "password")}
        errorMessage={error.password}
      />
      <Input
        placeholder="Repetir contraseña Nueva"
        containerStyle={styles.input}
        rightIcon={
          <Icon
            type="material-community"
            name={showRepeatPassword ? "eye-off-outline" : "eye-outline"}
            onPress={() => setShowRepeatPassword(!showRepeatPassword)}
            size={22}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "70%",
  },
});
