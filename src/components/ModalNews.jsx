import React from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ModalNews = ({ title, description, visible, onClose, image, date }) => {
  /* Convertir une date au format ISO (2024-03-03T08:00:29Z) au format 
   suivant : 3 Mars 2024     */
  const shortDate = date.slice(0, 10);
  const originalDate = new Date(shortDate);
  function getMonthName(monthIndex) {
    const monthNames = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ];
    return monthNames[monthIndex];
  }
  const formattedDate = `${originalDate.getDate()} ${getMonthName(
    originalDate.getMonth()
  )} ${originalDate.getFullYear()}`;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView>
            <Image source={{ uri: image }} style={styles.modalImage} />
            <Text style={styles.modalTitle}>{title}</Text>
            <Text style={styles.modalDescription}>{description}</Text>
          </ScrollView>
          <View style={styles.bottomContent}>
            <Text style={styles.dateStyle}>{formattedDate}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#161D46",
  },
  modalDescription: {
    fontSize: 18,
    color: "#161D46",
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: "#161D46",
    borderRadius: 5,
    padding: 10,
    marginTop: 15,
    alignSelf: "flex-end",
  },
  closeButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  modalImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  bottomContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  dateStyle: {
    fontWeight: "bold",
  },
});

export default ModalNews;
