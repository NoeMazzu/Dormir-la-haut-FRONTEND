import { View, Modal } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import HotSpot from "../components/HotSpot";

export default function MapScreen({ navigation }) {
  const POIs = useSelector((state) => state.poi.value);
  const user = useSelector((state) => state.user.value);
  const [isVisible, setIsVisible] = useState(false);
  // const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user?.token) {
      navigation.navigate("LoadingScreen");
    }
  }, []);

  // Je récupère les infos des pois depuis le store redux et j'en garde seulement 50 sur la mapScreen.
  // Puis je l'enregistre dans un état local.
  useEffect(() => {
    if (!user?.token) {
      navigation.navigate("TabNavigator");
    }
  });

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
    setIsVisible(true);
  };

  const Markers = () => {
    return POIs.map((poi, i) => {
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
        transparent={true}
        animationType="slide"
        visible={isVisible}
        onRequestClose={() => handleCloseModal()}
      >
        <View
          style={{
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <HotSpot
            name={selectedMarker.name}
            desc={selectedMarker.desc}
            handlePress={handleCloseModal}
          />
        </View>
      </Modal>
    </View>
  );
}
