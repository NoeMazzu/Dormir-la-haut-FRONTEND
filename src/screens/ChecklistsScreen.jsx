import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import ChecklistsEditingForm from "../components/Checklists/ChecklistsEditingForm";
import ChecklistsForm from "../components/Checklists/ChecklistsForm";
import { useState } from "react";

export default function ChecklistsScreen ({navigation}) {
  const user = useSelector((state) => state.user.value);



  if (user?.token) {
    navigation.navigate("TabNavigator");
  }

 

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
