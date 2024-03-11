import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import FontAwesome from "react-native-vector-icons";
import {useDispatch} from 'react-redux'
function HotSpot(props) {

  const dispatch=useDispatch();

  console.log(props)
  return (
    <View style={styles.container}>
      <View style={styles.gallery}>
        <Button title="Close" onPress={props.handlePress} />
        <Text>IMAGE SLIDER</Text>
      </View>
      <View style={styles.infosContainer}>
        <Text>{props.name}</Text>
        <Text>{props.desc}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity >
    
          
          </TouchableOpacity>
          <TouchableOpacity >
            <FontAwesome
              name="bookmark-o"
              size={30}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gallery: {
    height: "50%",
    width: "100%",
    backgroundColor: "red",
  },
  infosContainer: {
    height: "50%",
    width: "100%",
    backgroundColor: "yellow",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

});

export default HotSpot;
