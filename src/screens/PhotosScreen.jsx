import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import Slider from "../components/Slider";


export default function PhotosScreen ({navigation}) {
  const user = useSelector((state) => state.user.value);
  console.log(user)

  if (user?.token) {
    navigation.navigate("TabNavigator");
  }

  return (
    <View style={styles.container}>
      <Slider />
      <Slider />
      <Slider />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161D46",
    alignItems: "center",
    justifyContent: "center",
    gap:5,
  },
});
