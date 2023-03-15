import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { isEmpty, size } from "lodash";
import { Image, Input, Button, Icon } from "@rneui/base";
import Loading from "../../../../kernel/components/Loading";
import { useState } from "react";
import { validateEmail } from "../../../../kernel/components/validationEmail";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import axios from "../../../../kernel/http-client.gateway";
import { async } from "@firebase/util";

export default function CreateAccount() {
  const auth = getAuth();
  const payload = {
    email: "",
    password: "",
    repeatPassword: "",
  };
  const [show, setShow] = useState(false);
  const [error, setError] = useState(payload);
  const [data, setData] = useState(payload);
  const [showPassword, setShowPassword] = useState(true);
  const [showRepeatPassword, setShowRepeatPassword] = useState(true);
  //const auth = getAuth();
  const changePayload = (e, type) => {
    setData({ ...data, [type]: e.nativeEvent.text });
  };
  const CreateUser = () => {
    if (
      !(
        isEmpty(data.email) ||
        isEmpty(data.password) ||
        isEmpty(data.repeatPassword)
      )
    ) {
      //validamos que ningun campo este vacio
      if (validateEmail(data.email)) {
        //validamos que el correo sea valido dominio y demas
        if (size(data.password) >= 6) {
          //validamos el tamaño de la contraseña
          if (data.password === data.repeatPassword) {
            setShow(true);
            createUserWithEmailAndPassword(auth, data.email, data.password)
              .then((userCredential) => {
                // Signed in
                (async () => {
                  try {
                    const user = userCredential.user;
                    (async () => {
                      try {
                        const object = {
                          birthday: null,
                          full_name: null,
                          user: {
                            email: user.email,
                            uid: user.uid,
                            image_profile: "",
                          },
                        };
                        const response = await axios.doPost("/person/", object);
                        console.log("servidor", response);
                        setShow(false);
                      } catch (error) {
                        setError({
                          email: "",
                          password: "No se pudo crear el usuario",
                        });
                        setShow(false);
                        const errorCode = error.code;
                        const errorMessage = error.message;
                      }
                    })();
                  } catch (error) {
                    setShow(false);
                    console.log("error", error);
                  }
                })();
                const user = userCredential.user;
                console.log("Usuario Creado", user);
                // ...
              })
              .catch((error) => {
                setShow(false);
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
              });
          } else {
            setError({
              repeatPassword: "Ups, las contraseñas no coinciden",
              password: "",
            });
          }
        } else {
          setError({
            password: "Ups, la contraseña debe tener al menos 6 caracteres",
            repeatPassword: "",
          });
        }
      } else {
        setError({ email: "Ups, parece que este correo no es valido" });
      }
    } else {
      setError({
        email: isEmpty(data.email) ? "Ups, no olvides este campo" : "",
        password: isEmpty(data.password) ? "Ups, no olvides este campo" : "",
        repeatPassword: isEmpty(data.repeatPassword)
          ? "Ups, no olvides este campo"
          : "",
      });
    }
  };

  return (
    <KeyboardAwareScrollView>
      <Image
        source={require("../../../../assets/logo.png")}
        resizeMode="contain"
        style={styles.logo}
      />
      <View style={styles.viewForm}>
        <View style={styles.container}>
          <Input
            placeholder="Correo electronico"
            keyboardType="email-address"
            rightIcon={
              <Icon type="material-community" name="email-outline" size={22} />
            }
            containerStyle={styles.input}
            onChange={(e) => changePayload(e, "email")}
            errorMessage={error.email}
          />
          <Input
            placeholder="Contraseña"
            rightIcon={
              <Icon
                type="material-community"
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={22}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            secureTextEntry={showPassword}
            onChange={(e) => changePayload(e, "password")}
            errorMessage={error.password}
          />

          <Input
            placeholder="Repetir contraseña"
            rightIcon={
              <Icon
                type="material-community"
                name={showRepeatPassword ? "eye-off-outline" : "eye-outline"}
                size={22}
                onPress={() => setShowRepeatPassword(!showRepeatPassword)}
              />
            }
            secureTextEntry={showRepeatPassword}
            onChange={(e) => changePayload(e, "repeatPassword")}
            errorMessage={error.repeatPassword}
          />
          <Button
            title="Crea Cuenta"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={CreateUser}
          />
        </View>
        <Loading show={show} text="Registrando Usuario" />
      </View>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  viewForm: {
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  input: {
    width: "100%",
    marginVertical: 20,
  },
  btnContainer: {
    marginVertical: 20,
    width: "95%",
  },
  btn: {
    backgroundColor: "#fe5d63",
  },
});
