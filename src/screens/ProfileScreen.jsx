import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function ProfileScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const [poisFav, setPoisFav] = useState([]);
  console.log('[USER:',user.token)

  if (user?.token) {
    navigation.navigate("TabNavigator");
  }

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
      .then((result) => setPoisFav(prevPoisFav => 
        {
        const newPoisList = ([...prevPoisFav],[...result.fav_POI])
        return newPoisList
      }))
      .catch((error) => console.log("error", error));
  },[]);
  console.log(["POIS"], poisFav);
  return (
    <View style={styles.container}>
      <Text>ProfilScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
