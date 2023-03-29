import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { Dimensions, Alert,Platform } from "react-native";
import { Button, Divider } from "@rneui/base";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

//configuración global y permisos
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
//función que manda la notificación
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "Ubicación cambiada!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

//obtener el token de dispositivo
async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

const widthScreen = Dimensions.get("window").width;

export default function ChangeAddress(props) {
  const { setShowModal } = props;
  const [location, setLocation] = useState(null);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "denied") {
        try {
          const loc = await Location.getCurrentPositionAsync({});
          console.log("Latitude", loc);
          setLocation({
            latitude: loc.coords.latitude,
            longitud: loc.coords.longitude,
            latitudeDelta: 0.004757,
            longitudDelta: 0.006866,
          });
        } catch (error) {
          console.log("error", error);
        }
      } else {
        //alert
      }
    })();
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const save = async () =>{
    await sendPushNotification(expoPushToken);
  }

  return (
    <View>
      {/* {location && (
        <MapView
          style={styles.map}
          initialRegion={location}
          showsUserLocation={true}
          minZoomLevel={15}
          onRegionChange={(region) => setLocation(region)}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitud: location.longitude,
            }}
            title="mi ubicación"
            draggable
          />
        </MapView>
      )} */}
      <View style={{ flex: 1, alignItems: "center", marginTop: 10 }}>
        <Divider color="tomato" width={2} style={styles.divider} />
      </View>
      <View style={styles.containerButtons}>
        <Button
          title="Cancelar ubicación"
          containerStyle={styles.btnDangerConatiner}
          buttonStyle={styles.btnDanger}
          onPress={() => setShowModal(false)}
        />
        <Button
          title="Guardar"
          containerStyle={styles.btnSuccessContainer}
          buttonStyle={styles.btnSuccess}
          onPress={save}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: 560,
  },
  divider: {
    width: "100%",
  },
  containerButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  btnSuccessContainer: {
    width: "50%",
    padding: 10,
  },
  btnDangerConatiner: {
    padding: 10,
  },
  btnDanger: {
    backgroundColor: "#a60a0d",
  },
  btnSuccess: {
    backgroundColor: "#00a680",
  },
});
