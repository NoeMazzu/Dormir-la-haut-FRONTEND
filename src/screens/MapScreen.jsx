import { View, Modal } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import poi, { loadBookmarks } from "../redux/slices/poi";
import HotSpot from "../components/HotSpot";
import NewHotSpot from "../components/NewHotSpot ";
import { setPOIs } from "../redux/slices/poi";

export default function MapScreen({ navigation }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.value);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState("");
  const [POIsFromDataBase, setPOIsFromDataBase] = useState([]);
  const [isVisibleAddSpot, setIsVisibleAddSpot] = useState(false);
  const [countAddPoi, setCountAddPoi] = useState(0);

  const [newSpotCoord, setNewSpotCoord] = useState(null);

  useEffect(() => {
    if (!user?.token) {
      navigation.navigate("LoadingScreen");
    }
    // get all available pois
    fetch("https://dormir-la-haut-backend.vercel.app/poi")
      .then((response) => response.json())
      .then((data) => {
        setPOIsFromDataBase(data.poi)
        dispatch(setPOIs(data.poi))
      });

    // fetch bookmarked pois for the logged user
    fetch("https://dormir-la-haut-backend.vercel.app/users/myprofile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          // create new array with only the POIS names
          const POIS_names = data.fav_POI.map((e) => e.name);
          dispatch(loadBookmarks(POIS_names));
        }
      });
  }, [countAddPoi]);

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
    setIsVisible(true);
  };

  console.log('[POISFROMDATABASE',POIsFromDataBase.length)

  const Markers = () => {
    return POIsFromDataBase.map((poi, i) => {
      return (
        <Marker
          key={i}
          coordinate={{
            latitude: poi.coordinates.latitude,
            longitude: poi.coordinates.longitude,
          }}
          onPress={() => handleMarkerPress(poi)}
        ></Marker>
      );
    });
  };

  const handleAddSpot = () => {
    setIsVisibleAddSpot(true);
  };

  const handleCloseAddSpot = () => {
    setIsVisibleAddSpot(false);
    setCountAddPoi(prevCount => prevCount + 1);
  };

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider="google"
        mapeType="terrain"
        initialRegion={{
          latitude: 45.7542305,
          longitude: 4.8386187,
          latitudeDelta: 2,
          longitudeDelta: 2,
        }}
        style={{ flex: 1 }}
        onLongPress={(e) => {
          setNewSpotCoord(e.nativeEvent.coordinate);
          handleAddSpot();
        }}
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
        onRequestClose={() => setIsVisible(false)}
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
            photos={selectedMarker.photos}
            handlePress={handleCloseModal}
          />
        </View>
      </Modal>
      <Modal
        animationType="fade"
        visible={isVisibleAddSpot}
        transparent={true}
        onRequestClose={() => setIsVisibleAddSpot(false)}
      >
        <NewHotSpot onClose={handleCloseAddSpot} location={newSpotCoord} />
      </Modal>
    </View>
  );
}
