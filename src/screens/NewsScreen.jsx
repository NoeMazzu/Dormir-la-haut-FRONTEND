import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import LittleNews from "../components/LittleNews";
import ModalNews from "../components/ModalNews";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"; // BOUTON LOGOUT
import { setLogout } from "../redux/slices/user"; // BOUTON LOGOUT

const NewsScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch(); // BOUTON LOGOUT

  // BOUTON LOGOUT
  const handleLogout = () => {
    // Dispatch l'action pour déconnecter l'utilisateur
    dispatch(setLogout());

    // Redirige vers l'écran de connexion (ou où vous le souhaitez)
    navigation.navigate("LoadingScreen");
  };

  useEffect(() => {
    if (!user?.token) {
      navigation.navigate("TabNavigator");
    }
  }, []);
  const [actuData, setActuData] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    fetch("https://dormir-la-haut-backend.vercel.app/newsApi")
      .then((response) => response.json())
      .then((data) => {
        const uniqueActuData = data.articles.filter(
          (article, index, arr) =>
            index === arr.findIndex((a) => a.title === article.title)
        );

        setActuData(uniqueActuData);
      });
  }, []);

  const handleNewsClick = (index) => {
    setSelectedNews(actuData[index]);
  };

  const handleCloseModal = () => {
    setSelectedNews(null);
  };

  const actu = actuData.map((data, i) => {
    const limitedDescription =
      data.description.length > 75
        ? data.description.substring(0, 75) + "..."
        : data.description;
    const limitedTitle =
      data.title.length > 40 ? data.title.substring(0, 40) + "..." : data.title;

    return (
      <LittleNews
        key={i}
        title={limitedTitle}
        description={limitedDescription}
        onPress={() => handleNewsClick(i)}
      />
    );
  });

  return (
    <View style={styles.filter}>
      <Text style={styles.title}>Actualités</Text>
      {/* // BOUTON LOGOUT */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      {/* // BOUTON LOGOUT */}
      <ScrollView style={styles.scrollView}>{actu}</ScrollView>

      {selectedNews && (
        <ModalNews
          title={selectedNews.title}
          description={selectedNews.description}
          visible={!!selectedNews}
          onClose={handleCloseModal}
          image={selectedNews.urlToImage}
          date={selectedNews.publishedAt}
        />
      )}
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
  logoutButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default NewsScreen;
