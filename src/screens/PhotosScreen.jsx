import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import ImageGallery from "@paraboly/react-native-gallery";

export default function PhotosScreen ({navigation}) {
  const user = useSelector((state) => state.user.value);
  console.log(user)

  if (user?.token) {
    navigation.navigate("TabNavigator");
  }

  const gallery = [
    {source:{ uri: "https://source.unsplash.com/1024x768/?nature" }},
    {source:{ uri: "https://source.unsplash.com/1024x768/?nature" }},
    {source:{ uri: "https://source.unsplash.com/1024x768/?nature" }},
    {source:{ uri: "https://source.unsplash.com/1024x768/?nature" }},
  ];

  return (
    <View style={styles.container}>
      <ImageGallery 
          data={gallery}
          loadingSource={require("../assets/img/loading.gif")}/>
      <Text>PhotosScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
