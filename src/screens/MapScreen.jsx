import { View, Modal } from 'react-native';
import { Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadBookmarks } from '../redux/slices/poi';
import HotSpot from '../components/HotSpot';
import NewHotSpot from '../components/NewHotSpot ';
import { setPOIs } from '../redux/slices/poi';
import MapView from 'react-native-map-clustering';

export default function MapScreen({ navigation, route }) {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user.value);
	const [isVisible, setIsVisible] = useState(false);
	const [selectedMarker, setSelectedMarker] = useState('');
	const [POIsFromDataBase, setPOIsFromDataBase] = useState([]);
	const [isVisibleAddSpot, setIsVisibleAddSpot] = useState(false);
	const [countAddPoi, setCountAddPoi] = useState(0);

  const [newSpotCoord, setNewSpotCoord] = useState(null);
  //newState to rerender with route
    // const [routeState, setRouteState] = useState();
    // route.params && setRouteState(preroute => route.params);

  useEffect(() => {
    if (!user?.token) {
      navigation.navigate("LoadingScreen");
    }
    // get all available pois
    fetch("https://dormir-la-haut-backend.vercel.app/poi")
      .then((response) => response.json())
      .then((data) => {
        setPOIsFromDataBase(data.poi);
        dispatch(setPOIs(data.poi));
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

	const handleMarkerPress = marker => {
		setSelectedMarker(marker);
		setIsVisible(true);
	};

	const Markers = () => {
		return POIsFromDataBase.map((poi, i) => {
			return (
				<Marker
					key={i}
					pinColor={poi.name === selectedMarker.name ? 'green' : 'red'}
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

	const defaultRegion = {
		latitude: 45.7,
		longitude: 6.4,
		latitudeDelta: 2,
		longitudeDelta: 2,
	};

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider="google"
        mapeType="terrain"
        initialRegion={route.params ? {latitude: route.params.coordinates.latitude, longitude: route.params.coordinates.longitude, latitudeDelta: 0.1,longitudeDelta: 0.1} :{latitude: 45.7, longitude: 6.4, latitudeDelta: 2,longitudeDelta: 2}}
        style={{ flex: 1 }}
        onLongPress={(e) => {
          setNewSpotCoord(e.nativeEvent.coordinate);
          handleAddSpot();
        }}
      >
        {user.location ? (
          <Marker
            title="My position"
            pinColor="#fecb2d"
            coordinate={user.location}
          />
        ) : null}
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
