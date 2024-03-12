import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import { Alert } from "react-native";

const ChecklistsScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user.value);

  const getDefaultChecklists = () => [
    {
      title: "Checklist 1",
      items: [
        { text: "Basket", checked: false },
        { text: "Serviette", checked: false },
        { text: "...", checked: false },
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
  ];

  const [checklists, setChecklists] = useState([]);
  const [newItemTexts, setNewItemTexts] = useState(checklists.map(() => ""));
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const loadChecklists = async () => {
      try {
        let loadedChecklists = [];

        if (user?.token) {
          const storageKey = `checklists_${user.token}`;
          const storedChecklists = await AsyncStorage.getItem(storageKey);

          if (storedChecklists) {
            loadedChecklists = JSON.parse(storedChecklists);
          }
        }

        // Ensure default checklists are available
        loadedChecklists = loadedChecklists.length
          ? loadedChecklists
          : getDefaultChecklists();

        setChecklists(loadedChecklists);
      } catch (error) {
        console.error("Error loading checklists:", error);
      }
    };

    loadChecklists();
  }, [user?.token]);

  useEffect(() => {
    const saveChecklists = async () => {
      try {
        if (user?.token) {
          const storageKey = `checklists_${user.token}`;
          await AsyncStorage.setItem(storageKey, JSON.stringify(checklists));
        }
      } catch (error) {
        console.error("Error saving checklists:", error);
      }
    };

    saveChecklists();
  }, [checklists, user?.token]);

  const addItemToChecklist = (checklistIndex) => {
    if (newItemTexts[checklistIndex].trim() !== "") {
      const newItem = { text: newItemTexts[checklistIndex], checked: false };
      const updatedChecklists = [...checklists];
      updatedChecklists[checklistIndex].items.push(newItem);
      setChecklists(updatedChecklists);

      const updatedItemTexts = [...newItemTexts];
      updatedItemTexts[checklistIndex] = "";
      setNewItemTexts(updatedItemTexts);

      // Réinitialiser l'élément sélectionné
      setSelectedItem(null);
    }
  };

  const handleItemPress = (checklistIndex, itemIndex) => {
    setSelectedItem({ checklistIndex, itemIndex });
  };

  const handleDeleteItem = (checklistIndex, itemIndex) => {
    const updatedChecklists = [...checklists];
    updatedChecklists[checklistIndex].items.splice(itemIndex, 1);
    setChecklists(updatedChecklists);
    // Réinitialiser l'élément sélectionné après la suppression
    setSelectedItem(null);
  };
  const iconColor = "#161D46";
  const handleAddChecklist = () => {
    const newChecklist = {
      title: `Checklist ${checklists.length + 1}`,
      items: [],
    };

    setChecklists((prevChecklists) => [...prevChecklists, newChecklist]);
  };
  const handleDeleteChecklist = (checklistIndex) => {
    // Afficher la boîte de dialogue de confirmation
    Alert.alert(
      "Confirmation",
      "Voulez-vous vraiment supprimer cette checklist ?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Supprimer",
          onPress: () => {
            const updatedChecklists = [...checklists];
            updatedChecklists.splice(checklistIndex, 1);
            setChecklists(updatedChecklists);
          },
        },
      ]
    );
  };
  return (
    <View style={styles.filter}>
      <Text style={styles.title}>
        Retrouvez ici vos checklists pour votre prochaine sortie :
      </Text>
      <TouchableOpacity
        style={styles.addChecklistButton}
        onPress={handleAddChecklist}
      >
        <Text style={styles.addChecklistButtonText}>
          + Ajouter une checklist
        </Text>
      </TouchableOpacity>
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
                {selectedItem &&
                  selectedItem.checklistIndex === checklistIndex &&
                  selectedItem.itemIndex === itemIndex && (
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() =>
                        handleDeleteItem(checklistIndex, itemIndex)
                      }
                    >
                      <Icon
                        name="trash"
                        style={[styles.deleteButtonIcon, { color: iconColor }]}
                      />
                    </TouchableOpacity>
                  )}
              </TouchableOpacity>
            ))}
            <TextInput
              style={styles.textInput}
              placeholder="Nom de l'item"
              value={newItemTexts[checklistIndex]}
              onChangeText={(text) => {
                const updatedItemTexts = [...newItemTexts];
                updatedItemTexts[checklistIndex] = text;
                setNewItemTexts(updatedItemTexts);
              }}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                const newItem = { text: "Nouvel item", checked: false };
                addItemToChecklist(checklistIndex, newItem);
              }}
            >
              <Text style={styles.addButtonLabel}>+ Ajouter un item</Text>
            </TouchableOpacity>
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
    flex: 1, // Pour occuper l'espace disponible à droite du texte
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonLabel: {
    color: "#ffffff",
    fontSize: 16,
  },
  textInput: {
    backgroundColor: "#ffffff",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#FFFFFF", // Blanc
    fontSize: 16,
  },
  deleteButtonIcon: {
    fontSize: 26, // Ajustez cette valeur pour la taille désirée
  },
  addChecklistButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addChecklistButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export default ChecklistsScreen;
