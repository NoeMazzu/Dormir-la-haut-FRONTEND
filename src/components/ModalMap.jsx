import React from "react";
import { Dimensions } from 'react-native';
import { Image, Modal, Text, TouchableOpacity, View, StyleSheet } from "react-native";

const ModalMap = (props) => {

  const screenHeight = Dimensions.get("screen").height;
  const screenWidth = Dimensions.get("screen").width;

  return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {
        }}
      >
        <View style={{
            height: (1 / 2) * screenHeight,
            width: (68 / 70) * screenWidth,
            backgroundColor: "black",
            borderRadius: 10, }} >
          <View style={{ backgroundColor: "brown", height: 200 }}>
            <Image
              source={{ uri: "https://ibb.co/b2KXFBC" }}
              style={{ height: 100, width: 100 }}
            />
          </View>
          <View style={{ backgroundColor: "lightpink" }}>
            <Text style={styles.iconTitle}>{props.name}</Text>
            <Text style={styles.desc}>{props.desc}</Text>
          </View>
          <View style={styles.bottom}>
            {/* <TouchableOpacity onPress={() => dispatch(addPois(POIs[i]))}>
              <FontAwesome
                name="star-o"
                size={30}
                color="#fff"
                style={styles.icons}
              />
            </TouchableOpacity> */}
            {/* <TouchableOpacity onPress={() => dispatch(setAddPOIs(POIs))}>
              <FontAwesome
                name="bookmark-o"
                size={30}
                color="#fff"
                style={styles.icons}
              />
            </TouchableOpacity> */}
          </View>
        </View>
      </Modal>
  );
};
const styles = StyleSheet.create({
  iconTitle: {
    fontSize: 20,
    paddingTop: 10,
    paddingLeft: 20,
    color: 'white',
  },
  desc: {
    padding: 20,
    color: 'white',
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'pink',
    hieght: 100,
  },
  delete: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
  },
  deleteButton: {
    color: 'white',
  },
  icons: {
    color: 'white',
  },
  Save: {
    color: 'white',
  },
  Star: {
    color: 'white',
  },
});


export default ModalMap;