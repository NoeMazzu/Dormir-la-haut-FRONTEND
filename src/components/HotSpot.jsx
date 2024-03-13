import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Slider from "../components/Slider";
import { useSelector } from "react-redux";

function HotSpot(props) {
  const pois = useSelector((state) => state.poi.value);
  const token = useSelector((state) => state.user.value.token);
  const poiFound = pois.find((element) => element.name === props.name);

  // console.log("[HOTSPOT POI.ID]", poiFound._id);

  const handleBookmark = () => {
    return (
      fetch("https://dormir-la-haut-backend.vercel.app/poi/poiBookMark", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          poiId: poiFound._id,
        }),
      })
        .then((response) => response.json())
        // .then((data) => console.log(data))
        .catch((error) => console.error("Erreur :", error))
    );
  };

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
        <Slider playing={false} height={componentHeight} width={componentWidth} />
      </View>
      <View style={styles.infosContainer}>
        <View>
          <Text style={styles.title}>{props.name}</Text>
          <Text style={styles.desc}>{props.desc}</Text>
        </View>
        <View style={styles.logosContainer}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity>
              <FontAwesome name="star-o" size={30} style={{}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleBookmark}>
              <FontAwesome name="bookmark-o" size={30} style={{}} />
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
    backgroundColor: "#35357F",
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
  },
  photoContainer: {
    overflow: "hidden",
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    zIndex: -1
  },
  title: {
    fontSize: 20,
    padding: "5%",
    color: "white",
  },
  desc: {
    paddingBottom: "5%",
    paddingHorizontal: "5%",
    color: "white",
  },
  logosContainer: {
    flexDirection: "row",
    padding: "3%"
  },
  deleteLogo: {
    width: "100%",
    alignItems: "flex-end",
  },
  deleteLogoContainer: {
    flexDirection: "row",
  },
  logo: {
    position: 'absolute',
    top: 8,
    right:  12,
    color: "#35357F"
  },
});

export default HotSpot;
