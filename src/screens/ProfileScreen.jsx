import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Tab, TabView } from "@rneui/themed";
import React from "react";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function ProfileScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const [poisFav, setPoisFav] = useState([]);
  const [index, setIndex] = React.useState(0); //Utilisé pour la gestion du TAB

  useEffect(() => {
    if (user?.token) {
      navigation.navigate("TabNavigator");
    }
  }, []);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${user.token}`
    );

    // const urlencoded = new URLSearchParams();
    // urlencoded.append("token");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      // body: urlencoded,
      redirect: "follow",
    };

    fetch(
      "https://dormir-la-haut-backend.vercel.app/users/myprofile",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setPoisFav((prevPoisFav) => {
          return [...prevPoisFav, ...result.fav_POI];
        });
      })
      .catch((error) => console.log("error", error));
  }, []);

  // console.log("[USER_PS]:",user)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>{user.username}</Text>
        <FontAwesome name='user-circle' size={40} color='white' />
      </View>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: "white",
          height: 3,
        }}
        // variant="primary"
      >
        <Tab.Item
          title="Mes favoris"
          titleStyle={{ fontSize: 12, color: "white" }}
          icon={{ name: "heart-o", type: "font-awesome", color: "white" }}
        />
        <Tab.Item
          title="Mes checklists"
          titleStyle={{ fontSize: 12, color: "white" }}
          icon={{
            name: "check-square-o",
            type: "font-awesome",
            color: "white",
          }}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ backgroundColor: "red", width: "100%" }}>
          <Text h1>Contenu Mes favoris</Text>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: "green", width: "100%" }}>
          <Text h1>Contenu Mes checklists</Text>
        </TabView.Item>
      </TabView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#161D46",
    flex: 1,
    width: "100%",
    paddingTop: 60,
  },
  header: {
    justifyContent:'center',
    alignItems:'center',
    gap:16,
  },
  username: {
    color: "#ffffff",
    fontSize: 32,
    textAlign:'center',
  },
});
