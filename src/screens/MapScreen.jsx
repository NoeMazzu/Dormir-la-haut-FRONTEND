import { View, Modal } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import HotSpot from "../components/HotSpot";
import { setPOIs } from "../redux/slices/poi";

export default function MapScreen({ navigation }) {
  const POIs = useSelector(({ poi }) => poi.value);
  const user = useSelector((token) => token.user.value.token);
  const [isVisible, setIsVisible] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState("");
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!user?.token) {
  //     navigation.navigate("TabNavigator");
  //   }
  // }, []);

  // Je récupère les infos des pois depuis le store redux et j'en garde seulement 50 sur la mapScreen.
  // Puis je l'enregistre dans un état local.
  useEffect(() => {
    if (!user?.token) {
      navigation.navigate("TabNavigator");
    };

    fetch("https://dormir-la-haut-backend.vercel.app/poi")
      .then((response) => response.json())
      .then((data) => {
        dispatch(setPOIs(data.poi));
      });

    if (POIs.length > 0) {
      // j'ai ajouté un if => vérifier si il y a les pois dans le store avant de les push
      setMarkers(POIs.slice(0, 50));
    };
    // console.log(JSON.stringify((markers).length, null, 2))
  }, []);

  //   useEffect(() => {
  //   fetch("https://dormir-la-haut-backend.vercel.app/poi")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       dispatch(setPOIs(data.poi));
  //     });
  // }, []);

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
    setIsVisible(true);
  };

  const Markers = () => {
    return markers.map((poi, i) => {
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
