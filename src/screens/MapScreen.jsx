import MapView, { Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {StyleSheet} from "react-native"
import { Dimensions } from 'react-native';


export default function MapScreen({ navigation }) {
  const POIs = useSelector(({ poi }) => poi.value.POIs);
  const user = useSelector((token) => token.user.value.token);

  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null)
  // => récupérer 50 points d'intérets et les mettres dans un useSate en le mettant dans un UseEffect
  //   (ça permet de push dans le useState au lancement du composant + de le mettre à jour si besoin grace au dépendances du UseEffect)
  useEffect(() => {
    if (POIs.length > 0) {
      // j'ai ajouté un if => vérifier si il y a les pois dans le store avant de les push
      setMarkers(POIs.slice(0, 50));
    }
  }, []);

  const handleMarkerClick = (index) => {
    setSelectedMarker(markers[index]);
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
          onPress={() => handleNewsClick(i)}
        >
        </Marker>
      );
    });
  };

  if (user) {
    navigation.navigate('TabNavigator');
  }

  return (
    <MapView
      mapeType='terrain'
      initialRegion={{
        latitude: 45.7542305,
        longitude: 4.8386187,
        latitudeDelta: 2,
        longitudeDelta: 2,
      }}
      style={{map: {
             width: Dimensions.get('screen').width,
           height: Dimensions.get('screen').height,
           }}}
    >
      <Marker
        title='My position'
        pinColor='#fecb2d'
        coordinate={{ latitude: 45.7542305, longitude: 4.8386187 }}
      />
      {renderMarkers()}
    </MapView>
  );
}
