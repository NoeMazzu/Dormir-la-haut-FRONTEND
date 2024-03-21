import { StyleSheet, Text, View, ScrollView,TouchableOpacity,Modal } from "react-native";
import MeteoCard from "../components/MeteoCard";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import SelectMultiple from 'react-native-select-multiple';
import { styles } from '../styles/screens/MeteoScreen.style'

export default function MeteoScreen({navigation}) {
  const user = useSelector((state) => state.user.value);

  // const massifFavs = ["Chartreuse", "Vanoise", "Belledonne","Beaufortain"];
  //TODO placer l'état massifFavs dans le store
  const[massifFavs,setMassifFavs] = useState([]);
  const [meteoData, setMeteoData] = useState([]);
  const [meteoDataTmp, setMeteoDataTmp] = useState([]);
  const [meteoDataTest, setMeteoDataTest] = useState([]);
  //Etat utilisé lors de l'ajout de massif
  const [selectedMassif, setSelectedMassif] = useState([]);

  const massifs = [ "Chartreuse","Bornes-Aravis", "Vercors","Lauziere et Grand Arc",
  "Belledonne", "Mont Blanc","Vanoise", "Beaufortain","Aiguilles Rouge", "Bauges",
  "Grandes Rousses - Arves", "Cerces-Ambin", "Ecrins", "Taillefer-Matheysine","Chablais","Queyras","Bugey"]

  //TODO Gerer les useEffect en *2 - OK 2 comportements différents ici - le premier uniquement au chargement
  //TODO - le second au chargement et lors du changement d'état massifFavs
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user?.token) {
          navigation.navigate("LoadingScreen");
          return; // Retourner immédiatement si le token utilisateur est manquant
        }
  
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${user.token}`);
  
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };
        const response = await fetch("https://dormir-la-haut-backend.vercel.app/users/myprofile", requestOptions);
        const firstData = await response.json();
        setMassifFavs([...firstData.meteo]);
        
        // Mettre à jour l'état avec les données retournées
      } catch (error) {
        console.error('Erreur lors de l\'exécution des appels API MYPROFILE :', error);
      }
    };
  
    fetchData();
  
  }, []);
  

  useEffect(() => {
    const url = `https://dormir-la-haut-backend.vercel.app/meteo/${massifFavs.join(',')}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => 
      {
        setMeteoData(data.meteoInfo);
        setMeteoDataTmp(prevMeteoDataTmp => {
          const newData = [...prevMeteoDataTmp, ...data.meteoInfo];
          return newData
        })
        return data.meteoInfo;
      })        
      .then((data) =>
      {
        setMeteoDataTest(prevMeteoData => {
          const meteoDay = data.map(item => ({massif: item.massif, meteoData: item.meteoData[0]}));
          const newData = [...prevMeteoData, ...meteoDay];
          return newData;
      })});;
  }, [massifFavs]);

  const updateMeteoByDate = (index,day) => {
    return setMeteoDataTest(prevMeteoData => 
      {
        const updatedMeteoCard = { ...meteoDataTmp[index].meteoData[day] };
        // updatedMeteoCard.meteoData[0].today.temp = updateMeteoData.meteoData[0];
        const updatedPrevMeteoData = [...prevMeteoData];
        updatedPrevMeteoData[index].meteoData = updatedMeteoCard;
        return updatedPrevMeteoData;            
      });
  };

  const onSelectionsChange = (selectedMassif) => {
    setSelectedMassif(() => selectedMassif);
  };

  const meteoCards = meteoDataTest.map((data, i) => {
    return (
      <MeteoCard
        key={i}
        massif={data.massif}
        weatherIcon={`https://openweathermap.org/img/wn/${data.meteoData.data.weatherIcon}@2x.png`}
        temp = {data.meteoData.data.temp}
        windSpe = {data.meteoData.data.windSpe*3.6}
        windOri = {data.meteoData.data.windOri}
        time = {data.meteoData.time}
        onPress0={() => updateMeteoByDate(i,0)}
        onPress3={() => updateMeteoByDate(i,1)}
        onPress5={() => updateMeteoByDate(i,2)}

      />
    );
  });

//Gestion des fonctionnalités d'ajout de massif pour la météo
const [modalVisible, setModalVisible] = useState(false);

const openModal = () => {
  setModalVisible(true);
  setSelectedMassif(() => massifFavs);
};

const majMeteoBdd = async (massifString) => 
{
  try
  {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Bearer ${user.token}`);

    const urlencoded = new URLSearchParams();
    // urlencoded.append("token", user.token);
    urlencoded.append("newMeteo", massifString);

    const requestOptions = 
    {
      method: 'PATCH',
      headers: myHeaders,
      body: urlencoded.toString(),
      redirect: 'follow'
    };

const result = await fetch("https://dormir-la-haut-backend.vercel.app/users/addmeteo2", requestOptions);
const response = await result.json();
}
catch (error) {
  console.error('Error fetching data:', error);
}}


const closeModal = () => {
  // Mise à jour de l'état massifFavs
  const newMassifFavs = selectedMassif.map(item => item.value);
  setMassifFavs(newMassifFavs);

  majMeteoBdd(newMassifFavs.join(','));

  // Mise à jour des autres états
  setModalVisible(false);
  setMeteoData([]);
  setMeteoDataTmp([]);
  setMeteoDataTest([]);
};

// console.log('[SELECTED MASSIF]',selectedMassif)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Météo des massifs</Text>

      <TouchableOpacity onPress={openModal}>
        <FontAwesome style ={styles.addIcon} name='plus-circle' size={32} color='white' />
      </TouchableOpacity>
      {/* Utiliser ScrollView pour permettre le défilement */}
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={styles.scrollView}>
              <SelectMultiple
                items={massifs}
                selectedItems={selectedMassif}
                onSelectionsChange={onSelectionsChange}
                labelStyle={{fontFamily:'JosefinSansRegular'}}
              />
            </ScrollView>
            <TouchableOpacity style = {styles.okButton} onPress={closeModal}>
              <Text style = {styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>       
        </View>
      </Modal>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Utiliser la méthode map pour créer un composant MeteoCard pour chaque massif */}
        {meteoCards}
      </ScrollView>
    </View>
  );
}


