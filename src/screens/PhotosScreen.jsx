import { StyleSheet, Text, View } from "react-native";

export default function PhotosScreen () {
    return <View style={styles.container}>
        <Text>PhotosScreen</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });