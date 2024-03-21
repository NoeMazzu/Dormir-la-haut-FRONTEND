import {
  Alert,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import SelectMultiple from 'react-native-select-multiple';
import { styles } from '../styles/components/NewHotSpot.style'

function NewHotSpot(props) {
  // const userName = useSelector((state) => state.user.value.username);

  const [newSpotTitle, setNewSpotTitle] = useState(null);
  const [newSpotDesc, setNewSpotDesc] = useState(null);
  const [newSpotType, setNewSpotType] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [disableButton, setDisableButton] = useState(false);
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [lastValue, setLastValue] = useState();
  const formData = new FormData();

  const handleSelectionsChange = types => {
      setNewSpotType(types.slice(-1));
  };

  useEffect(() => {
      if (newSpotType && newSpotType.length > 0) {
          setLastValue(newSpotType[0].value);
      }
  }, [newSpotType]);

  //Informations à envoyer par la route à la BDD
  const newSpot = {
      name: newSpotTitle,
      coordinates: props.location,
      desc: newSpotDesc,
      photos: [{ url: null }],
      // username: userName,
      type: lastValue,
      isPublic: true,
  };

  // Image Picker (pour choisir une image locale)
  const pickImageAsync = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: false,
          quality: 0.5,
      });
      if (!result.canceled) {
          setSelectedImage(result.assets[0].uri);
      } else {
          alert('You did not select any image.');
      }
  };

  const handleSubmit = async () => {
      if (!newSpotTitle || !newSpotDesc || !newSpotType) {
          return setError('Tous les champs doivent être remplis.');
      }
      setFetchLoading(true);
      formData.append('photoNewPoi', {
          uri: selectedImage,
          name: 'photo.jpg',
          type: 'image/jpeg',
      });

      const uploadPhoto = await fetch(
          'https://dormir-la-haut-backend.vercel.app/cloudinary/upload-image-mewen',
          { method: 'POST', body: formData },
      );

      const uploadResult = await uploadPhoto.json();

      if (uploadResult.cdn_url) {
          newSpot.photos[0].url = uploadResult.cdn_url;

          fetch('https://dormir-la-haut-backend.vercel.app/poi', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(newSpot),
          })
              .then(
                  response => response.json(),
              )
              .then(data => console.log('final result', data))
              .finally(
                  props.onClose,
                  Alert.alert('Merci', 'Votre Spot a bien été envoyé !'),
                  setFetchLoading(false),
                  setNewSpotDesc(null),
                  setNewSpotTitle(null),
                  setNewSpotType(null),
                  setSelectedImage(null),
              );
      }
  };

  function GalleryToShow() {
      if (!fetchLoading && !selectedImage) {
          return (
              <View style={styles.gallery}>
                  <TouchableOpacity
                      onPress={pickImageAsync}
                      style={styles.boutonUpload}
                  >
                      <FontAwesomeIcon name='upload' size={60} color={'white'} />
                      <Text style={styles.textUpload}>UPLOADER UNE PHOTO*</Text>
                  </TouchableOpacity>
                  {error ? (
                      <View style={{ position: 'absolute', bottom: 10 }}>
                          <Text style={styles.errorText}>{error}</Text>
                      </View>
                  ) : null}
              </View>
          );
      } else if (selectedImage && !fetchLoading) {
          return (
              <View style={styles.gallery}>
                  <Image
                      source={{ uri: selectedImage }}
                      style={{ height: 150, width: 200 }}
                  />
              </View>
          );
      } else if (fetchLoading) {
          <View style={styles.gallery}>
              <Text>LOADING...</Text>
          </View>;
      }
  }

  return (
      <View style={styles.container}>
          <View style={styles.subContainer}>
              <GalleryToShow />
              <View style={styles.infosContainer}>
                  {/* {error ? <Text style={styles.errorText}>{error}</Text> : null} */}
                  <TextInput
                      style={styles.input}
                      onChangeText={value => setNewSpotTitle(value)}
                      value={newSpotTitle}
                      placeholder='Nom du spot*'
                      placeholderTextColor='#808080'
                      maxLength={30}
                  ></TextInput>
                  <TextInput
                      style={styles.input}
                      onChangeText={value => setNewSpotDesc(value)}
                      value={newSpotDesc}
                      placeholder='Description du spot*'
                      placeholderTextColor='#808080'
                      maxLength={300}
                  ></TextInput>
                  <TouchableOpacity
                      style={styles.typeButton}
                      onPress={() => setModalVisible(true)}
                  >
                      <Text style={styles.typeButtonText}>Choisissez un type*</Text>
                  </TouchableOpacity>
                  <Modal
                      animationType='slide'
                      transparent={true}
                      visible={modalVisible}
                      onRequestClose={() => {
                          setModalVisible(false);
                      }}
                  >
                      <View style={styles.modalBackground}>
                          <View style={styles.modalContent}>
                              <SelectMultiple
                                  style={styles.selectMultiple}
                                  items={[
                                      { label: 'Cabane', value: 'Cabane' },
                                      { label: 'Bivouac', value: 'Bivouac' },
                                      { label: 'Gîte', value: 'Gîte' },
                                      { label: 'Refuge', value: 'Refuge' },
                                      { label: 'Autre', value: 'Autre' },
                                  ]}
                                  selectedItems={newSpotType}
                                  onSelectionsChange={handleSelectionsChange}
                                  rowStyle={{
                                      borderBottomWidth: 1,
                                      borderBottomColor: 'white',
                                      padding: 10,
                                      backgroundColor: '#5050B2',
                                  }}
                                  labelStyle={{ fontSize: 18, color: 'white' }}
                                  checkboxStyle={{
                                      width: 20,
                                      height: 20,
                                      marginRight: 10,
                                      tintColor: 'white',
                                  }}
                                  selectedCheckboxStyle={{ tintColor: '#00FF00' }}
                                  single
                              />
                              <TouchableWithoutFeedback
                                  onPress={() => setModalVisible(false)}
                              >
                                  <View
                                      style={{
                                          backgroundColor: 'transparent',
                                          padding: 10,
                                          alignItems: 'center',
                                      }}
                                  >
                                      <Text style={{ color: 'white', fontSize: 20 }}>Fermer</Text>
                                  </View>
                              </TouchableWithoutFeedback>
                          </View>
                      </View>
                  </Modal>
                  <View style={styles.buttonsContainer}>
                      <TouchableOpacity
                          style={styles.cancelButton}
                          onPress={props.onClose}
                      >
                          <Text style={styles.buttonText}>Annuler</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                          disabled={disableButton}
                          style={styles.submitButton}
                          onPress={() => {
                              handleSubmit();
                          }}
                      >
                          <Text style={styles.buttonText2}>Soumettre</Text>
                      </TouchableOpacity>
                  </View>
              </View>
          </View>
      </View>
  );
}



export default NewHotSpot;