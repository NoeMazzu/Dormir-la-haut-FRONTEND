import { useState, useEffect } from "react";
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
import {
  loadBookmarks,
  addBookmark,
  removeBookmark,
} from "../redux/slices/poi";

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
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: poiFound._id,
          token,
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
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: poiFound._id,
          token,
        }),
      })
        .then((response) => response.json())
        .then((data) => data.result && dispatch(removeBookmark(props.name)))
        .catch((error) => console.error("Erreur :", error));
    }
  }

  let star;
  if (isPressed) {
    star = <FontAwesome name="star-o" size={30} />;
  } else {
    star = <FontAwesome name="star" size={30} />;
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
            <TouchableOpacity onPress={() => setIsPressed(!isPressed)}>
              {star}
            </TouchableOpacity>
            <TouchableOpacity onPress={handleBookmark}>
              {isPoiBookmarked ? (
                <FontAwesome name="bookmark" size={30} />
              ) : (
                <FontAwesome name="bookmark-o" size={30} />
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
    zIndex: -1,
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
    padding: "3%",
  },
  deleteLogo: {
    width: "100%",
    alignItems: "flex-end",
  },
  deleteLogoContainer: {
    flexDirection: "row",
  },
  logo: {
    position: "absolute",
    top: 8,
    right: 12,
    color: "#35357F",
  },
});

export default HotSpot;
