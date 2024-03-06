import { StyleSheet, Text, View } from "react-native";
import MeteoCard from "../components/MeteoCard";

export default function MeteoScreen () {
    return <View style={styles.container}>
       <Text>MeteoScreen</Text>
        <MeteoCard/>
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