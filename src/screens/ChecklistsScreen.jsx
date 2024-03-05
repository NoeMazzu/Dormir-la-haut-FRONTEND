import { StyleSheet, Text, View } from "react-native";

export default function ChecklistsScreen () {
    return <View style={styles.container}>
        <Text>ChecklistsScreen</Text>
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