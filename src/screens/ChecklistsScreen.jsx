import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function ChecklistsScreen ({navigation}) {
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    if (!user?.token) {
      navigation.navigate("TabNavigator");
    }
  }, []);
  return (
    <View style={styles.container}>
      <Text>ChecklistsScreen</Text>
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
