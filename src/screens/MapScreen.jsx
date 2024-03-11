import { StyleSheet, View, Image, Text, Modal, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HotSpot from "../components/HotSpot";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export default function MapScreen({ navigation }) {
  const POIs = useSelector(({ poi }) => poi.value.POIs);
  const user = useSelector((token) => token.user.value.token);
  const [isVisible, setIsVisible] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState("");

  useEffect(() => {
    if (user) {
      navigation.navigate("TabNavigator");
    }
  }, [user]);

  // Je récupère les infos des pois depuis le store redux et j'en garde seulement 50 sur la mapScreen.
  // Puis je l'enregistre dans un état local.
  useEffect(() => {
    if (POIs.length > 0) {
      // j'ai ajouté un if => vérifier si il y a les pois dans le store avant de les push
      setMarkers(POIs.slice(0, 50));
    }
    // console.log(JSON.stringify((markers).length, null, 2))
  }, []);

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
    setIsVisible(true);
  };

  const Markers = () => {
    return markers.map((poi, i) => {
      console.log(poi);
      return (
        <Marker
          key={i}
          coordinate={{
            latitude: poi.coordinates.longitude,
            longitude: poi.coordinates.latitude,
          }}
          onPress={() => handleMarkerPress(poi)}
        ></Marker>
      );
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        mapeType="terrain"
        initialRegion={{
          latitude: 45.7542305,
          longitude: 4.8386187,
          latitudeDelta: 2,
          longitudeDelta: 2,
        }}
        style={{ flex: 1 }}
      >
        <Marker
          title="My position"
          pinColor="#fecb2d"
          coordinate={{ latitude: 45.7542305, longitude: 4.8386187 }}
        />
        <Markers />
      </MapView>
      <Modal
        animationType="slide"
        visible={isVisible}
        onRequestClose={() => handleCloseModal()}
      >
        <HotSpot
          name={selectedMarker.name}
          desc={selectedMarker.desc}
          handlePress={handleCloseModal}
        />
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({});
