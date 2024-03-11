import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import { useSelector } from "react-redux";
<<<<<<< HEAD
import ChecklistsEditingForm from "../components/Checklists/ChecklistsEditingForm";
import ChecklistsForm from "../components/Checklists/ChecklistsForm";
import { useState } from "react";
=======
import { useEffect } from "react";
>>>>>>> b7f7be0d060e702440e2aa66db181efd46d8282f

export default function ChecklistsScreen ({navigation}) {
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    if (!user?.token) {
      navigation.navigate("TabNavigator");
    }
  }, []);
  return (
      <ScrollView style={styles.container}>
        <ChecklistsForm/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
});
