import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
export default function PhotosScreen ({ navigation }) {

export default function PhotosScreen ({navigation}) {
  const user = useSelector((state) => state.user.value);

  if (user?.token) {
    navigation.navigate("TabNavigator");
  }
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