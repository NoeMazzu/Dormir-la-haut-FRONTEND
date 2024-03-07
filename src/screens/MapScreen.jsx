import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  Modal
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function MapScreen({navigation}) {
  const user = useSelector((state) => state.user.value);

  if (user?.token) {
    navigation.navigate("TabNavigator");
  }
  const [markersToShow, setMarkersToShow] = useState([]);

  const POIs = useSelector(({ user }) => user.value.POIs);

  const screenHeight = Dimensions.get("screen").height;
  const screenWidth = Dimensions.get("screen").width;

  useEffect(() => {
    fetch("https://dormir-la-haut-backend.vercel.app/poi")
      .then((response) => response.json())
      .then((data) => {
        setMarkersToShow(data.poi);
      });
  }, []);

  const markers = markersToShow.map((data, i) => {
    return (
      <Marker
        key={i}
        coordinate={{
          latitude: POIs[i].coordinates.longitude,
          longitude: POIs[i].coordinates.latitude,
        }}
        calloutOffset={{ x: 0.0, y: 0.0 }}
        calloutAnchor={{ x: 0.5, y: 8 }}
      >
        <Callout tooltip={true}>
          <View style={{
              height: (1 / 2) * screenHeight,
              width: (68 / 70) * screenWidth,
              backgroundColor: "black",
              borderRadius: 10,
            }}
          >
           <View style={{backgroundColor: 'yellow', height: 200}}>
            <Image source={{uri:'https://ibb.co/b2KXFBC'}}
                style={{height: 100,width: 100}}/>
           </View>
            <View style={{backgroundColor: 'red'}}>
              <Text style={styles.iconTitle}>{POIs[i].name}</Text>
              <Text style={styles.desc}>{POIs[i].desc}</Text>
            </View>
            <View style={styles.bottom}>
              <TouchableOpacity onPress={() => dispatch(removePhoto(POIs[i]))}>
                <FontAwesome
                  name="star-o"
                  size={30}
                  color="#fff"
                  style={styles.icons}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => dispatch(removePhoto(POIs[i]))}>
                <FontAwesome
                  name="bookmark-o"
                  size={30}
                  color="#fff"
                  style={styles.icons}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Callout>
      </Marker>
    );
  })
  return markers;
}

function newModal () {
  return (
    <Modal>
      <Text>New Modal</Text>
    </Modal>
  )
}

export default function MapScreen() {

  // useEffect(() => {
  //   fetch("https://dormir-la-haut-backend.vercel.app/poi")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setMarkersToShow(data.poi);
  //     });
  // }, []);

  // const markers =
  //   POIs &&
  //   POIs.map((data, i) => {
  //     return (
  //       <Marker
  //         key={i}
  //         coordinate={{
  //           latitude: data.coordinates.longitude,
  //           longitude: data.coordinates.latitude,
  //         }}
  //         calloutOffset={{ x: 0.0, y: 0.0 }}
  //         calloutAnchor={{ x: 0.5, y: 8 }}
  //       >
  //         <Callout tooltip={true}>
  //           <View
  //             style={{
  //               height: (1 / 2) * screenHeight,
  //               width: (68 / 70) * screenWidth,
  //               backgroundColor: "#2A346A",
  //               borderRadius: 10,
  //             }}
  //           >
  //             <View>
  //               <ImageSlider
  //                 style={styles.photo}
  //                 data={refugePics}
  //                 preview={false}
  //                 caroselImageStyle={{ height: "100%" }}
  //               />
  //             </View>
  //             <View>
  //               <Text style={styles.iconTitle}>{data.name}</Text>
  //               <Text style={styles.desc}>{data.desc}</Text>
  //             </View>
  //             <View style={styles.bottom}>
  //               <TouchableOpacity onPress={() => dispatch(removePhoto(data))}>
  //                 <FontAwesome
  //                   name="star-o"
  //                   size={30}
  //                   color="#000000"
  //                   style={styles.swipeLeft}
  //                 />
  //               </TouchableOpacity>
  //               <TouchableOpacity onPress={() => dispatch(removePhoto(data))}>
  //                 <FontAwesome
  //                   name="bookmark-o"
  //                   size={30}
  //                   color="#000000"
  //                   style={styles.swipeLeft}
  //                 />
  //               </TouchableOpacity>
  //             </View>
  //           </View>
  //         </Callout>
  //       </Marker>
  //     );
  //   });

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
      {/* {markers} */}
      <Markers />
    </MapView>
  );
}
const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
  iconTitle: {
    fontSize: 20,
    paddingTop: 10,
    paddingLeft: 20,
    color: "white",
  },
  desc: {
    padding: 20,
    color: "white",
  },
  bottom: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: 'pink',
    hieght: 100,
  },
  delete: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },
  deleteButton: {
    color: "white",
  },
  icons: {
    color: "white",
  },
  Save: {
    color: "white",
  },
  Star: {
    color: "white",
  },
});
