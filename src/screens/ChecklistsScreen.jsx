import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChecklistsScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    if (!user?.token) {
      navigation.navigate("LoadingScreen");
    }
  }, []);

  const [checklists, setChecklists] = useState([
    {
      title: "Checklist 1",
      items: [
        { text: "Item 1.1", checked: false },
        { text: "Item 1.2", checked: false },
        { text: "Item 1.3", checked: false },
      ],
    },
    {
      title: "Checklist 2",
      items: [
        { text: "Item 2.1", checked: false },
        { text: "Item 2.2", checked: false },
        { text: "Item 2.3", checked: false },
      ],
    },
    // Add more checklists as needed
  ]);
  useEffect(() => {
    const loadChecklists = async () => {
      try {
        const storedChecklists = await AsyncStorage.getItem("checklists");
        if (storedChecklists) {
          setChecklists(JSON.parse(storedChecklists));
        }
      } catch (error) {
        console.error("Error loading checklists:", error);
      }
    };

    loadChecklists();
  }, []);

  useEffect(() => {
    const saveChecklists = async () => {
      try {
        await AsyncStorage.setItem("checklists", JSON.stringify(checklists));
      } catch (error) {
        console.error("Error saving checklists:", error);
      }
    };

    saveChecklists();
  }, [checklists]);

  const handleItemPress = (checklistIndex, itemIndex) => {
    const updatedChecklists = [...checklists];
    updatedChecklists[checklistIndex].items[itemIndex].checked =
      !updatedChecklists[checklistIndex].items[itemIndex].checked;
    setChecklists(updatedChecklists);
  };


  return (
    <View style={styles.filter}>
      <Text style={styles.title}>
        Retrouvez ici vos checklists pour votre prochaine sortie :
      </Text>
      <ScrollView style={styles.scrollView}>
        {checklists.map((checklist, checklistIndex) => (
          <View key={checklistIndex} style={styles.checklistContainer}>
            <Text style={styles.checklistTitle}>{checklist.title}</Text>
            {checklist.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                style={styles.checklistItem}
                onPress={() => handleItemPress(checklistIndex, itemIndex)}
              >
                <View
                  style={[
                    styles.checkbox,
                    item.checked && styles.checkedCheckbox,
                  ]}
                >
                  {item.checked && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.checklistItemText}>{item.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  filter: {
    backgroundColor: "#161D46",
    flex: 1,
    width: "100%",
    paddingTop: 40,
  },
  title: {
    color: "#ffffff",
    fontSize: 35,
    marginHorizontal: 30,
  },
  scrollView: {
    flex: 1,
    marginTop: 10,
  },
  checklistContainer: {
    marginBottom: 20,
  },
  checklistTitle: {
    color: "#ffffff",
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 20,
  },
  checklistItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2196F3",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    marginRight: 10,
    backgroundColor: "#ffffff",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  checkedCheckbox: {
    backgroundColor: "#4CAF50",
  },
  checkmark: {
    color: "#ffffff",
  },
  checklistItemText: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export default ChecklistsScreen;