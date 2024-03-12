import {
  View,
  TouchableOpacity,
  TextInput,
  SectionList,
  Text,
  StyleSheet,
  StatusBar,
} from "react-native";
import ChecklistsEditingForm from "./ChecklistsEditingForm";
import { useState } from "react";
import FontAwesome from "react-native-vector-icons";


export default function ChecklistsForm(props) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) return <ChecklistsEditingForm />;

  const DATA = [
    { title: "Main dishes", data: ["Pizza", "Burger", "Risotto"] },
    { title: "Sides", data: ["French Fries", "Onion Rings", "Fried Shrimps"] },
    { title: "Drinks", data: ["Water", "Coke", "Beer"] },
    { title: "Desserts", data: ["Cheese Cake", "Ice Cream"] },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "pink" , width:'100%'}}>
      <FontAwesome name='gear' size={20} color='white'/>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => 
        <View>
          <Text>{title}</Text>
        </View>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    backgroundColor: "red",
  },
  item: {
    backgroundColor: "yellow",
    width: "80%",
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
  },
});
