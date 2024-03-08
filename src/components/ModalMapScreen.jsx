import React from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ModalMapScreen = ({ _id, name, coordinates, desc, photo, type }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View
            style={{
              height: (1 / 2) * screenHeight,
              width: (68 / 70) * screenWidth,
              backgroundColor: "black",
              borderRadius: 10,
            }}
          >
            <View style={{ backgroundColor: "yellow", height: 200 }}>
              <Image
                source={{ uri: "https://ibb.co/b2KXFBC" }}
                style={{ height: 100, width: 100 }}
              />
            </View>
            <View style={{ backgroundColor: "red" }}>
              <Text style={styles.iconTitle}>{name}</Text>
              <Text style={styles.desc}>{desc}</Text>
            </View>
            <View style={styles.bottom}>
              <TouchableOpacity onPress={() => dispatch(addPois(POIs[i]))}>
                <FontAwesome
                  name="star-o"
                  size={30}
                  color="#fff"
                  style={styles.icons}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => dispatch(setAddPOIs(POIs))}>
                <FontAwesome
                  name="bookmark-o"
                  size={30}
                  color="#fff"
                  style={styles.icons}
                />
              </TouchableOpacity>
            </View>
          </View>
      </Modal>
    </View>
  );
};

export default ModalMapScreen;