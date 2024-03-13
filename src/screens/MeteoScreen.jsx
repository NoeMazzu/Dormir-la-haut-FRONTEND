import { StyleSheet, Text, View, ScrollView,TouchableOpacity,Modal } from "react-native";
import MeteoCard from "../components/MeteoCard";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import SelectMultiple from 'react-native-select-multiple';

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

  //TODO Gerer les useEffect en *2
  useEffect(() => {
    if (!user?.token) {
      navigation.navigate("LoadingScreen");
    }
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
      .then((patate) =>
      {
        setMeteoDataTest(prevMeteoData => {
          const meteoDay = patate.map(item => ({massif: item.massif, meteoData: item.meteoData[0]}));
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
        // console.log('[PrevMeteoData]', updatedPrevMeteoData[index]);
        return updatedPrevMeteoData;            
      });
  };

  //TODO - Revoir le nom de variable - peut preter à confusion - PATATE
  const onSelectionsChange = (massifSelected) => {
    setSelectedMassif(()=> massifSelected);
  };

  // console.log('[METEODATATEST]:',meteoDataTest)
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
};

const majMeteoBdd = async (massifString) => 
{
  // console.log('[LAUNCH FUNCTION - MassifString]',typeof massifString)
  try
  {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("token", user.token);
    urlencoded.append("newMeteo", massifString);

    const requestOptions = 
    {
      method: 'PATCH',
      headers: myHeaders,
      body: urlencoded.toString(),
      redirect: 'follow'
    };
    console.log('[REQUEST OPTIONS METEO2:',requestOptions)

const result = await fetch("https://dormir-la-haut-backend.vercel.app/users/addmeteo2", requestOptions);
const response = await result.json();
console.log('RESULTFETCH METEO2:',result)
}
catch (error) {
  console.error('Error fetching data:', error);
}}


const closeModal = () => {
  // Mise à jour de l'état massifFavs
  const newMassifFavs = selectedMassif.map(item => item.value);
  setMassifFavs(newMassifFavs);
  // console.log('[NEW MASSIF FAV]',newMassifFavs)
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
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Utiliser la méthode map pour créer un composant MeteoCard pour chaque massif */}
        {meteoCards}
      </ScrollView>
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
              />
            </ScrollView>
            <TouchableOpacity style = {styles.okButton} onPress={closeModal}>
              <Text style = {styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>       
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#161D46",
    flex: 1,
    width: "100%",
    paddingTop: 60,
    gap: 40,
  },
  addIcon: {
    alignSelf:'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Arrière-plan semi-transparent
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    height: '75%',
    padding: 20,
    borderRadius: 10,
  },
  okButton: {
    backgroundColor: '#161D46',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  okButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  title: {
    color: "#ffffff",
    fontSize: 45,
    marginLeft: 15,
  },
  scrollView: {
    flex: 1,
    marginTop: 10,
    alignItems:'center',
    gap:24,
  },
});
