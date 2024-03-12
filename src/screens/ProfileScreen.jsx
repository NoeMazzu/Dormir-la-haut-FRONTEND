import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Tab, TabView } from "@rneui/themed";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Icon } from "react-native-elements";
import { setLogout } from "../redux/slices/user"; // BOUTON LOGOUT

export default function ProfileScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const [poisFav, setPoisFav] = useState([]);
  const [index, setIndex] = React.useState(0); //Utilisé pour la gestion du TAB
  const [logoutModalVisible, setLogoutModalVisible] = useState(false); //BOUTONLOGOUT

  useEffect(() => {
    if (!user?.token) {
      navigation.navigate("TabNavigator");
    }
  }, []);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${user.token}`);

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
          return [...result.fav_POI];
        });
      })
      .catch((error) => console.log("error", error));
  }, []);

  // Fonction appelée par le BOUTON LOGOUT
  const handleLogout = () => {
    // Dispatch l'action pour déconnecter l'utilisateur
    dispatch(setLogout());
    // Redirige vers l'écran de connexion
    navigation.navigate("LoadingScreen");
  };

  // console.log("[USER_PS]:",user)
  console.log("[POISFAV:", poisFav);
  const tabFav = poisFav.map((item, index) => {
    return (
      <View key={index}>
        <Text>Fav ID :{item}</Text>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.subHeader}>
          <Text style={styles.username}>{user.username}</Text>
          <FontAwesome
            name="gear"
            size={20}
            color="white"
            onPress={() => setLogoutModalVisible(true)}
          />
          <Modal
            transparent={true}
            animationType="slide"
            visible={logoutModalVisible}
            onRequestClose={() => setLogoutModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              {/* Contenu du modal de déconnexion */}
              <TouchableOpacity
                onPress={() => {
                  setLogoutModalVisible(false);
                  handleLogout(); // Appeler la fonction de déconnexion
                }}
                style={styles.modalOption}
              >
                <Text style={styles.modalOptionText}>Déconnexion</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setLogoutModalVisible(false)}
                style={styles.modalOption}
              >
                <Text style={styles.modalOptionText}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
        <FontAwesome name="user-circle" size={40} color="white" />
      </View>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: "white",
          height: 3,
        }}
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
          <View>{tabFav}</View>
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
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  subHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  username: {
    color: "#ffffff",
    fontSize: 32,
    textAlign: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    position: "absolute",
    right: 10,
    top: 60,
    borderRadius: 5,
    padding: 10,
  },

  modalOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },

  modalOptionText: {
    fontSize: 16,
  },
});
