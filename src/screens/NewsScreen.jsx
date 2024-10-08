import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
} from "react-native";
import LittleNews from "../components/LittleNews";
import ModalNews from "../components/ModalNews";
import { useSelector } from "react-redux";
import { styles } from '../styles/screens/NewsScreen.style'


export default function NewsScreen  ({ navigation })  {
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    if (!user?.token) {
      navigation.navigate("LoadingScreen");
    }
  }, []);
  const [actuData, setActuData] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    const myHeaders = new Headers();
      myHeaders.append("authorization", `bearer ${user.token}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch("https://dormir-la-haut-backend.vercel.app/newsApi", requestOptions)
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
