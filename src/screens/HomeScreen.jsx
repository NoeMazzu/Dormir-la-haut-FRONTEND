import { StyleSheet, Text, View, Dimensions } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.meteoContainer}>
          <View style={styles.meteoText}>
            <Text>METEOContainer</Text>
          </View>
        </View>
        <View style={styles.highRigtContainers}>
          <View style={styles.actusContainers}>
            <Text>ACTUS / Small Containers</Text>
          </View>
          <View style={styles.cheklistContainers}>
            <Text>CHECKLISTS / Small Containers</Text>
          </View>
        </View>
      </View>
      <View style={styles.mapContainer}>
        <Text>MAP</Text>
      </View>
      <View style={styles.photoContainer}>
        <Text>PHOTOS</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#161D46",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    flex:1,
  },
  meteoContainer: {
    backgroundColor: "yellow",
    width: "50%",
    paddingRight: 4,
  },
  highRigtContainers: {
    width: "50%",
  },
  actusContainers: {
    backgroundColor: "green",
    height: "50%",
  },
  cheklistContainers: {
    backgroundColor: "lightgreen",
    height: "50%",
  },
  topContainer: {
    flexDirection: "row",
    width: "100%",
    height: "30%",
  },
  mapContainer: {
    backgroundColor: "purple",
    width: "100%",
    height: "30%",
  },
  photoContainer: {
    backgroundColor: "pink",
    width: "100%",
    height: "30%",
  },

});
