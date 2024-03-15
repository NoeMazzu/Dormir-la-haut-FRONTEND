import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Slider from "../components/Slider";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons/faEllipsis";

export default function PhotosScreen({ navigation, route }) {
  const user = useSelector((state) => state.user.value);
  const data = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const galleryPhoto = route.params.photoHomePage;
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    if (!user?.token) {
      navigation.navigate("LoadingScreen");
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Photos</Text>
      <FlatList
        style={styles.liste}
        data={galleryPhoto}
        horizontal={false}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.spotContainer}>
            <Image
              source={{ uri: item.url }}
              style={{ resizeMode: "cover", height: 120, borderWidth: 10 }}
            />
            <View style={styles.headerItem}>
              <Text style={styles.textItem}>{item.name}</Text>
              <TouchableOpacity onPress={()=> {
                setSelectedItem(item);
                setModalVisible(!modalVisible)
              }}>
                <FontAwesomeIcon icon={faEllipsis} size={20} color="white"/>
              </TouchableOpacity>
            </View>
          </View>
        )}
      ></FlatList>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => navigation.navigate("MapScreen", selectedItem)}>
              <Text>Voir sur la carte</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161D46",
    justifyContent: "center",
    paddingTop: 20,
  },
  mainTitle: {
    color: "#ffffff",
    fontSize: 45,
  },
  liste: {
    width: "100%",
  },
  textItem: {
    color: "white",
    backgroundColor: "rgba(53,53,127,0.2)",
    fontSize: 11,
    borderRadius: 10,
    padding: 5,
    numberOfLines: 1,
    maxWidth: "60%",
  },
  spotContainer: {
    width: "50%",
    padding: 2,
  },
  headerItem: {
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
