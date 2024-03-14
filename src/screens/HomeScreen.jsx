import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView 
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { setPOIs } from "../redux/slices/poi";
import { setLogout } from "../redux/slices/user";
import { useState, useEffect } from "react";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import Slider from "../components/Slider";
import { purgePersistor } from '../redux/slices/poi';
 
export default function HomeScreen({ navigation }) {

  const dispatch = useDispatch();
  // dispatch(setLogout())
  //  dispatch(purgePersistor());
  const user = useSelector((state) => state.user.value);

  const massifFavs = [
    { massif: "Chartreuse", temp: 1, weatherIcon: "01d" },
    { massif: "Vanoise", temp: 2, weatherIcon: "01d" },
    { massif: "Belledonne", temp: 3, weatherIcon: "01d" },
  ];
  const [meteoData, setMeteoData] = useState([]);
  const [meteoDataTmp, setMeteoDataTmp] = useState([]);
  const [meteoDataTest, setMeteoDataTest] = useState([]);
  const [photoHomePage, setPhotoHomePage] = useState([])

  useEffect(() => {
    if (!user?.token) {
      return navigation.navigate("LoadingScreen");
    }
    fetch("https://dormir-la-haut-backend.vercel.app/poi")
      .then((response) => response.json())
      .then((data) => {
        const photoDDB = data.poi.reduce((acc, item) => {
          return acc.concat(item.photos);
        }, []);
        setPhotoHomePage(...photoHomePage, photoDDB)
        
      })
    const url = `https://dormir-la-haut-backend.vercel.app/meteo/${massifFavs.join(
      ","
    )}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setMeteoData(data.meteoInfo);
        setMeteoDataTmp((prevMeteoDataTmp) => {
          const newData = [...prevMeteoDataTmp, ...data.meteoInfo];
          return newData;
        });
        return data.meteoInfo;
      })
      .then((patate) => {
        setMeteoDataTest((prevMeteoData) => {
          const meteoDay = patate.map((item) => ({
            massif: item.massif,
            meteoData: item.meteoData[0],
          }));
          const newData = [...prevMeteoData, ...meteoDay];
          return newData;
        });
      });
  }, []);

  const meteoCards = meteoDataTest.map((data, i) => {
    return (
      <View key={i} style={styles.meteoDetails}>
        <Text style={styles.textMeteo}>{data.massif}</Text>
        <View style={styles.meteoDetails}>
          <Text style={styles.textMeteo}>{data.meteoData.data.temp}°C</Text>
          <Image
            source={{
              uri: `https://openweathermap.org/img/wn/${data.meteoData.data.weatherIcon}@2x.png`,
            }}
            style={{ height: 20, width: 20, backgroundColor: "red" }}
          />
        </View>
      </View>
    );
  });

  const meteoHome = massifFavs.map((data, i) => {
    return (
      <View key={i} style={styles.meteoDetails}>
        <Text style={styles.textMeteo}>{data.massif}</Text>
        <View style={styles.meteoDetails}>
          <Text style={styles.textMeteo}>{data.temp}°C</Text>
          <Image
            source={{
              uri: `https://openweathermap.org/img/wn/${data.weatherIcon}@2x.png`,
            }}
            style={{ height: 20, width: 20, backgroundColor: "red" }}
          />
        </View>
      </View>
    );
  });
 
  // get the hotspot dimensions on render to extrapolate slider size
  const [componentHeight, setComponentHeight] = useState(0);
  const [componentWidth, setComponentWidth] = useState(0);

  const onViewLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setComponentHeight(height);
    setComponentWidth(width);
  };

  return (
    <View style={styles.container} onLayout={onViewLayout}>
      <View style={styles.topContainer}>
        <View style={styles.meteoContainer}>
          <TouchableOpacity
            style={styles.meteoButton}
            onPress={() => {
              navigation.navigate("MeteoScreen");
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.textTitle}>METEO</Text>
              <FontAwesome name="arrow-circle-right" color="#fff" size={20} />
            </View>

            <View style={styles.meteosInfos}>{meteoHome}</View>
            <FontAwesomeIcon
              icon={faCircleChevronRight}
              color="#fff"
              size={20}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.highRigtContainers}>
          <View style={styles.actusContainers}>
            <TouchableOpacity
              style={styles.buttonNews}
              onPress={() => {
                navigation.navigate("NewsScreen");
              }}
            >
              <Text style={styles.textTitle}>ACTUS</Text>
              <FontAwesome name="arrow-circle-right" color="#fff" size={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.cheklistContainers}>
            <TouchableOpacity
              style={styles.checklistButton}
              onPress={() => {
                navigation.navigate("ChecklistsScreen");
              }}
            >
              <Text style={styles.textTitle}>CHECKLISTS</Text>

              <FontAwesome name="arrow-circle-right" color="#fff" size={20} />
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
          style={{ flex: 1 }}
          sharedTransitionTag="tag"
          provider="google"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.photoContainer}
        onPress={() => {
          navigation.navigate("PhotosScreen");
        }}
      ><View style={styles.mapTitle}><Text style={styles.titleText}>Voir les photos</Text></View>
        <Slider playing={true} height={componentHeight} width={componentWidth} photos={photoHomePage} />
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
    backgroundColor: "#35357F",
    gap: 10,
    padding: 10,
  },
  meteoDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  textMeteo: {
    fontSize: 16,
    color: "white",
    fontFamily: 'JosefinSansRegular',
  },
  textTitle: {
    color: "white",
  },
  textTitle: {
    color: "white",
    fontSize: 20,
    // fontWeight: "bold",
    marginRight: 10,
    fontFamily: 'JosefinSans',
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
    backgroundColor: "#35357F",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cheklistContainers: {
    height: "50%",
    padding: 4,
  },
  checklistButton: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#35357F",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  topContainer: {
    marginTop: 17,
    flexDirection: "row",
    width: "100%",
    height: "25%",
  },
  mapContainer: {
    width: "100%",
    height: "45%",
    padding: 4,
    borderRadius: 20,
    overflow: "hidden",
  },
  photoContainer: {
    width: "100%",
    height: "30%",
    padding: 4,
    borderRadius: 20,
    overflow: "hidden",
  },
  meteosInfos: {
    height: "70%",
    gap: 10,
  },
  mapTitle : {
  position: 'absolute', 
  backgroundColor:'yellow', 
  zIndex:1, 
  top: 10,
  left: 10,
  padding: 5,
  backgroundColor: 'rgba(53,53,127,0.2)',
  borderRadius: 10,
},
titleText: {
  color: "white",
  fontSize: 16,
  fontWeight: "bold",
  fontFamily: 'JosefinSans-Regular',
}
});
