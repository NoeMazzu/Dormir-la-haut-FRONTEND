import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ModalMapScreen } from "../components/ModalMapScreen";

export default function MapScreen({ navigation }) {
  const POIs = useSelector(({ poi }) => poi.value.POIs);
  const user = useSelector((token) => token.user.value.token);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [markers, setMarkers] = useState([]);
  // Je récupère les infos des pois depuis le store redux et j'en garde seulement 50 sur la mapScreen.
  // Puis je l'enregistre dans un état local.
  useEffect(() => {
    if (POIs.length > 0) {
      // j'ai ajouté un if => vérifier si il y a les pois dans le store avant de les push
      setMarkers(POIs.slice(0, 50));
      console.log(JSON.stringify(markers.length, null, 2));
    }
  }, []);

  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const renderMarkers = () => {
    return markers.map((poi, i) => {
      return (
        <Marker
          key={i}
          coordinate={{
            latitude: poi.coordinates.longitude,
            longitude: poi.coordinates.latitude,
          }}
          onPress={ModalMapScreen}
        ></Marker>
      );
    });
  };

  if (user) {
    navigation.navigate("TabNavigator");
  }

  return (
    <MapView
      mapeType="terrain"
      initialRegion={{
        latitude: 45.7542305,
        longitude: 4.8386187,
        latitudeDelta: 2,
        longitudeDelta: 2,
      }}
      style={styles.map}
    >
      <Marker
        title="My position"
        pinColor="#fecb2d"
        coordinate={{ latitude: 45.7542305, longitude: 4.8386187 }}
      />
      {showModal()}
    </MapView>
  );
}
const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
});
