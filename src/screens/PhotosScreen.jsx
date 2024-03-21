import {
  Text,
  View,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons/faEllipsis";
import { styles } from '../styles/screens/PhotosScreen.style'

export default function PhotosScreen({ navigation, route }) {
  const user = useSelector((state) => state.user.value);
  const data = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const galleryPhoto = route.params.photoHomePage;
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (!user?.token) {
      navigation.navigate("LoadingScreen");
    }
  });

  return (
    <SafeAreaView style={styles.container}>
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
              style={{ resizeMode: "cover", height: 120 }}
            />
            <View style={styles.headerItem}>
              <Text style={styles.textItem}>{item.name}</Text>
              <TouchableOpacity
                onPress={() => {
                  setSelectedItem(item);
                  setModalVisible(!modalVisible);
                }}
              >
                <FontAwesomeIcon icon={faEllipsis} size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      ></FlatList>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => {navigation.navigate("MapScreen", selectedItem); setModalVisible(!modalVisible)}} style={styles.modalTouchableVoirSurLaCarte}
            >
              <Text style={styles.modalText}>Voir sur la carte</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalTouchableFermer} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.modalText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
