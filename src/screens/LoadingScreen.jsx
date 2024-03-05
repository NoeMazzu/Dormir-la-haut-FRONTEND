import { StyleSheet, Text, View } from "react-native";

export default function LoadingScreen () {
    return <View style={styles.container}>
       <Text>LoadingScreen</Text> 
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