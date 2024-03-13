import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Modal,
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
        { text: "Chaussette", checked: false },
        { text: "T-shirt", checked: false },
        { text: "K-Way", checked: false },
        { text: "...", checked: false },
      ],
    },
    {
      title: "Checklist 2",
      items: [
        { text: "Basket", checked: false },
        { text: "Serviette", checked: false },
        { text: "Chaussette", checked: false },
        { text: "T-shirt", checked: false },
        { text: "K-Way", checked: false },
        { text: "...", checked: false },
      ],
    },
    // Add more checklists as needed
  ];

  const [checklists, setChecklists] = useState([]);
  const [newItemTexts, setNewItemTexts] = useState(getDefaultChecklists().map(() => ""));
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAddingChecklist, setIsAddingChecklist] = useState(false);
  const [newChecklistTitle, setNewChecklistTitle] = useState("");

  useEffect(() => {
    const loadChecklists = async () => {
      try {
        let loadedChecklists = [];

        if (user?.token) {
          const storageKey = `checklists_${user.token}`;
          const storedChecklists = await AsyncStorage.getItem(storageKey);

          if (storedChecklists) {
            loadedChecklists = JSON.parse(storedChecklists);
          } else {
            // Si aucune checklist n'est stockée, utilisez les checklists par défaut
            loadedChecklists = getDefaultChecklists();

            // Sauvegardez les checklists par défaut dans le AsyncStorage
            await AsyncStorage.setItem(storageKey, JSON.stringify(loadedChecklists));
          }
        }

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

  const testData = async () => {
    const value = await AsyncStorage.getItem(`checklists_${user.token}`);
    console.log('[VALUE ASYNCSTORAGE]:',value)}
    testData();
  const addDefaultChecklists = async () => {
    try {
      if (user?.token) {
        const storageKey = `checklists_${user.token}`;
        const storedChecklists = await AsyncStorage.getItem(storageKey);

        if (!storedChecklists) {
          // Si aucune checklist n'est stockée, utilisez les checklists par défaut
          const defaultChecklists = getDefaultChecklists();

          // Sauvegardez les checklists par défaut dans le AsyncStorage
          await AsyncStorage.setItem(storageKey, JSON.stringify(defaultChecklists));

          // Mettez à jour l'état avec les checklists par défaut
          setChecklists(defaultChecklists);
        }
      }
    } catch (error) {
      console.error("Error adding default checklists:", error);
    }
  };

  useEffect(() => {
    // Appelez la fonction pour ajouter les checklists par défaut lors de la première connexion
    addDefaultChecklists();
  }, [user?.token]);

  const addItemToChecklist = (checklistIndex, newItem) => {
    const updatedChecklists = [...checklists];
    updatedChecklists[checklistIndex].items.push(newItem);
    setChecklists(updatedChecklists);

    // Réinitialiser l'élément sélectionné
    setSelectedItem(null);
  };

  const handleItemPress = (checklistIndex, itemIndex) => {
    const updatedChecklists = [...checklists];
    updatedChecklists[checklistIndex].items[itemIndex].checked =
      !updatedChecklists[checklistIndex].items[itemIndex].checked;
    setChecklists(updatedChecklists);
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
  const iconColor1 = "white";

  const handleAddChecklist = () => {
    setIsAddingChecklist(true);
  };

  const handleConfirmAddChecklist = () => {
    const newChecklist = {
      title: newChecklistTitle || `Checklist ${checklists.length + 1}`,
      items: [],
    };

    setChecklists((prevChecklists) => [...prevChecklists, newChecklist]);
    setIsAddingChecklist(false);
    setNewChecklistTitle("");
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
      Vos checklists 
    </Text>
    <TouchableOpacity
      style={styles.addChecklistButton}
      onPress={handleAddChecklist}
    >
      <Text style={styles.addChecklistButtonText}>
        + Ajouter une checklist
      </Text>
    </TouchableOpacity>

    {/* Boîte de dialogue pour ajouter une nouvelle checklist */}
    <Modal
      animationType="slide"
      transparent={true}
      visible={isAddingChecklist}
      onRequestClose={() => {
        setIsAddingChecklist(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Nouvelle Checklist</Text>
          <TextInput
            style={styles.modalTextInput}
            placeholder="Titre de la checklist"
            placeholderTextColor="#A9A9A9"
            value={newChecklistTitle}
            onChangeText={(text) => setNewChecklistTitle(text)}
          />
          <TouchableOpacity
            style={styles.modalButton}
            onPress={handleConfirmAddChecklist}
          >
            <Text style={styles.modalButtonText}>Confirmer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton1}
            onPress={() => {
              setIsAddingChecklist(false);
              setNewChecklistTitle("");
            }}
          >
            <Text style={styles.modalButtonText1}>Annuler</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>

    <ScrollView style={styles.scrollView}>
      {checklists.map((checklist, checklistIndex) => (
        <View key={checklistIndex} style={styles.checklistContainer}>
          <View style={styles.checklistHeader}>
            <Text style={styles.checklistTitle}>{checklist.title}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteChecklist(checklistIndex)}
            >
              <Icon
                name="trash"
                style={[styles.deleteButtonIcon, { color: iconColor1 }]}
              />
            </TouchableOpacity>
          </View>
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
                    onPress={() => handleDeleteItem(checklistIndex, itemIndex)}
                  >
                    <Icon
                      name="trash"
                      style={[styles.deleteButtonIcon, { color: iconColor1 }]}
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
              const newItem = { text: newItemTexts[checklistIndex] || "Nouvel item", checked: false };
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
    marginLeft: 87,
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    marginTop: 10,
  },
  checklistContainer: {
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
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
    backgroundColor: "#1E2A4A",
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
    flex: 1,
  },
  addButton: {
    backgroundColor: "#5050B2",
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
    color: "#FFFFFF", 
    fontSize: 16,
  },
  deleteButtonIcon: {
    fontSize: 26, 
    marginTop: 5,
  },
  addChecklistButton: {
    backgroundColor: "#5050B2",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addChecklistButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  checklistHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  deleteButton: {
    padding: 1,
    marginRight: 5,
    marginBottom: 10,
  },
  
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 22,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#5050B2",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 10,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: 'white',
  },
  modalTextInput: {
    height: 40,
    width: 200,
    borderColor: "white",
    color: 'white',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    textAlign: 'center'
  },
  modalButton: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
  },
  modalButton1: {
    backgroundColor: "#C23434",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
  },
  modalButtonText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalButtonText1: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default ChecklistsScreen;
