import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as React from "react";
import { ImageSlider } from "react-native-image-slider-banner";
import { useSelector } from "react-redux";
export default function HomeScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);

  if (user?.token) {
    navigation.navigate("TabNavigator");
  }

  const gallery = [
    { img: "https://source.unsplash.com/1024x768/?nature" },
    { img: "https://source.unsplash.com/1024x768/?water" },
    {
      img: "https://media.licdn.com/dms/image/D4D03AQFJjZ-tYqWp9A/profile-displayphoto-shrink_200_200/0/1676368422779?e=2147483647&v=beta&t=5vOpwfuZMga8eaL7P_riZ9_hsuIBvN6A4P70IhsWx-k",
    },
    { img: "https://source.unsplash.com/1024x768/?tree" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.meteoContainer} >
          <TouchableOpacity style={styles.meteoButton} onPress={()=> {navigation.navigate('MeteoScreen')}}>
            <Text style={styles.textTitle}>METEO</Text>
            <View style={styles.meteosInfos}>
            {meteoHome}
            </View>
            <FontAwesomeIcon
            icon={faCircleChevronRight}
            color="#fff"
            size={20}
          />
          </TouchableOpacity>
        </View>
        <View style={styles.highRigtContainers}>
          <View style={styles.actusContainers}>
            <TouchableOpacity style={styles.buttonNews} onPress={()=> {navigation.navigate('NewsScreen')}}>
              <Text style={styles.textTitle}>ACTUS</Text>
              <FontAwesomeIcon
            icon={faCircleChevronRight}
            color="#fff"
            size={20}
          />
            </TouchableOpacity>
          </View>
          <View style={styles.cheklistContainers}>
            <TouchableOpacity  style={styles.checklistButton} onPress={()=> {navigation.navigate('ChecklistsScreen')}}>
            <Text style={styles.textTitle}>CHECKLISTS</Text>

            <FontAwesomeIcon
            icon={faCircleChevronRight}
            color="#fff"
            size={20}
          />
          </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.mapContainer}
        onPress={() => {
          navigation.navigate("MapScreen");
        }}
      >
        <MapView
          mapType="terrain"
          initialRegion={{
            latitude: 45.7,
            longitude: 6.4,
            latitudeDelta: 2,
            longitudeDelta: 2,
          }}
          style={{ flex: 1, height: "100%", width: "100%", borderRadius: 10 }}
          sharedTransitionTag="tag"
        ></MapView>
      </TouchableOpacity>
      <TouchableOpacity style={styles.photoContainer} onPress={()=> {navigation.navigate('PhotosScreen')}}>
        <ImageSlider data={gallery} caroselImageContainerStyle={{ resizeMode: 'cover' }} caroselImageStyle={{ resizeMode: 'cover' }} showIndicator={true} activeIndicatorStyle={{backgroundColor:'#35357F', alignItems:'center'}}/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#161D46",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    flex: 1,
  },
  meteoContainer: {
    width: "50%",
    padding: 4,
  },
  meteoButton: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#35357F',
    gap:10,
    padding: 10,
  },
  meteoDetails:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  textMeteo :{
    fontSize: 16, 
    color: 'white'
  },
  textTitle:{
    color: 'white',
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
  },
  highRigtContainers: {
    width: "50%",
  },
  actusContainers: {
    height: "50%",
    padding: 4,
  },
  buttonNews: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#35357F',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
  },
  cheklistContainers: {
    height: "50%",
    padding: 4,
  },
  checklistButton: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#35357F',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',

  },
  topContainer: {
    flexDirection: "row",
    width: "100%",
    height: "30%",
  },
  mapContainer: {
    width: "100%",
    height: "35%",
    padding:4,
  },
  photoContainer: {
    width: "100%",
    height: "35%",
    padding: 4,
  },
  meteosInfos:{
    height: '70%',
gap: 10,
  }
});
