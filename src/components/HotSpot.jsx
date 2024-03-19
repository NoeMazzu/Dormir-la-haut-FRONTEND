import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Slider from "../components/Slider";
import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "../redux/slices/poi";

function HotSpot(props) {
  const dispatch = useDispatch();
  const pois = useSelector((state) => state.poi.value);
  const token = useSelector((state) => state.user.value.token);
  const poiFound = pois.POIs.find((element) => element.name === props.name);

  const [isPressed, setIsPressed] = useState(true);
  const [componentHeight, setComponentHeight] = useState(0);
  const [componentWidth, setComponentWidth] = useState(0);

  // get the hotspot dimensions on render to extrapolate slider size
  const onViewLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setComponentHeight(height);
    setComponentWidth(width);
  };

  const isPoiBookmarked = pois.bookmarkedPOIs.some(
    (name) => name === props.name
  );

  function handleBookmark() {
    if (!isPoiBookmarked) {
      fetch("https://dormir-la-haut-backend.vercel.app/users/addAside", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: poiFound._id,
          // token,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          data.result && dispatch(addBookmark(props.name));
        })
        .catch((error) => console.error("Erreur :", error));
    } else {
      fetch("https://dormir-la-haut-backend.vercel.app/users/removeAside", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: poiFound._id,
          // token,
        }),
      })
        .then((response) => response.json())
        .then((data) => data.result && dispatch(removeBookmark(props.name)))
        .catch((error) => console.error("Erreur :", error));
    }
  }

  

  return (
    <View style={styles.container} onLayout={onViewLayout}>
      <View style={styles.deleteLogoContainer}>
        <TouchableOpacity style={styles.deleteLogo}>
          <FontAwesome
            name="close"
            size={30}
            onPress={props.handlePress}
            style={styles.logo}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.photoContainer}>
        <Slider
          playing={false}
          height={componentHeight}
          width={componentWidth}
          photos={props.photos}
        />
      </View>
      <View style={styles.infosContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{props.name}</Text>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.desc}>{props.desc}</Text>
          </ScrollView>
        </View>
        <View style={styles.logosContainer}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={handleBookmark}>
              {isPoiBookmarked ? (
                <FontAwesome name="bookmark" size={30} style={styles.logos}/>
              ) : (
                <FontAwesome name="bookmark-o" size={30} style={styles.logos}/>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "60%",
    width: "90%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#161D46",
    // padding: "4%",
  },
  infosContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  buttonsContainer: {
    flexDirection: "row",
    height: "100%",
    width: "100%",
    justifyContent: "space-between",
    position: "relative", // Ajoutez cette ligne
  },
  photoContainer: {
    overflow: "hidden",
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    zIndex: -1,
  },
  textContainer: {
    width: "100%",
    height: "77%"
  },
  title: {
    fontSize: 20,
    padding: "5%",
    color: "white",
    fontFamily: 'JosefinSansRegular',
  },
  desc: {
    marginHorizontal: "5%",
    color: "white",
    fontFamily: 'JosefinSansRegular',
    fontSize: 14,
  },
  logosContainer: {
    flexDirection: "row",
    padding: "4%",
  },
  deleteLogo: {
    width: "100%",
    alignItems: "flex-end",
    borderRadius: 20,
    backgroundColor: "#161D46",
  },
  deleteLogoContainer: {
    flexDirection: "row",
    borderRadius: 20,
  },
  logo: {
    position: "absolute",
    top: 8,
    right: 12,
    color: "white",
    
    paddingHorizontal: "1.5%",
    padding: "0.5%",
    borderRadius: 20,
  },
  logos: {
    color: "white",
  right: -300, // Position à droite
  },
});

export default HotSpot;
