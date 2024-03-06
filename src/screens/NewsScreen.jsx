import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import LittleNews from "../components/LittleNews";

const NewsScreen = ({ navigation }) => {
  // Exemple de données pour les actualités
  const newsData = [
    {
      title: "Nouvelle 1",
      description: "Description de la nouvelle 1.",
    },
    {
      title: "Nouvelle 2",
      description: "Description de la nouvelle 2.",
    },
    {
      title: "Nouvelle 2",
      description: "Description de la nouvelle 2.",
    },
    {
      title: "Nouvelle 2",
      description: "Description de la nouvelle 2.",
    },
    {
      title: "Nouvelle 2",
      description: "Description de la nouvelle 2.",
    },
    {
      title: "Nouvelle 2",
      description: "Description de la nouvelle 2.",
    },
    {
      title: "Nouvelle 2",
      description: "Description de la nouvelle 2.",
    },
    {
      title: "Nouvelle 2",
      description: "Description de la nouvelle 2.",
    },
    {
      title: "Nouvelle 2",
      description: "Description de la nouvelle 2.",
    },
    {
      title: "Nouvelle 2",
      description: "Description de la nouvelle 2.",
    },
    {
      title: "Nouvelle 2",
      description: "Description de la nouvelle 2.",
    },
    {
      title: "Nouvelle 2",
      description: "Description de la nouvelle 2.",
    },
  ];

  return (
    <View style={styles.filter}>
      <Text style={styles.title}>Actualités</Text>

      {/* Utilisez ScrollView pour permettre le défilement */}
      <ScrollView style={styles.scrollView}>
        {/* Utilisez la méthode map pour créer un composant LittleNews pour chaque actualité */}
        {newsData.map((news, index) => (
          <LittleNews
            key={index}
            title={news.title}
            description={news.description}
            onPress={() => {
              // Gérer l'événement du bouton ici
            }}
          />
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
    fontSize: 45,
    marginLeft: 15,
  },
  scrollView: {
    flex: 1,
    marginTop: 10,
  },
});

export default NewsScreen;
