import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Dimensions } from "react-native";
import { useEffect, useState } from "react";

export default function MapScreen() {
  const [markersToShow, setMarkersToShow] = useState([]);

  useEffect(() => {
    fetch("https://dormir-la-haut-backend.vercel.app/poi")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.poi);
        const markers = data.poi.map((data, i) => {
          return <Marker key={i} coordinate={{ latitude: data.coordinates.latitude, longitude: data.coordinates.longitude }} title={data.name} />;
        })
        setMarkersToShow(...markersToShow, markers)
      })
  }, []);

  return (
    <View>
      <MapView
        mapeType="hybrid"
        initialRegion={{
          latitude: 45.7,
          longitude: 6.4,
          latitudeDelta: 2,
          longitudeDelta: 2,
        }}
        style={styles.map}
      >
        <Marker
          title="My position"
          pinColor="#fecb2d"
          coordinate={{ latitude: 0, longitude: 0 }}
        />
        {markersToShow}
      </MapView>
    </View>
  );
}
const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
