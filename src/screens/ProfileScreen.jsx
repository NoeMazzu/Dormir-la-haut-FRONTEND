import {
	Text,
	View,
	Modal,
	TouchableOpacity,
	ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Tab, TabView } from '@rneui/themed';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { setLogout } from '../redux/slices/user';
import FavCard from '../components/FavCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles/screens/ProfileScreen.style'

export default function ProfileScreen({ navigation }) {
	const user = useSelector(state => state.user.value);
	const dispatch = useDispatch();
	const [poisFav, setPoisFav] = useState([]);
	const [index, setIndex] = React.useState(0); //Utilisé pour la gestion du TAB
	const [logoutModalVisible, setLogoutModalVisible] = useState(false);
	const [checklistData, setChecklistData] = useState([]);
	const [selectedItem,setSelectedItem] = useState();

	useEffect(() => {
		if (!user?.token) {
			navigation.navigate('TabNavigator');
		}
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const myHeaders = new Headers();
				myHeaders.append('Content-Type', 'application/json');
				myHeaders.append('Authorization', `Bearer ${user.token}`);

				const requestOptions = {
					method: 'GET',
					headers: myHeaders,
					redirect: 'follow',
				};
				//TODO - Voir pour passer sur une seule route avec instruction POPULATE sur la DB
				const firstResponse = await fetch(
					'https://dormir-la-haut-backend.vercel.app/users/myprofile',
					requestOptions,
				);
				const firstData = await firstResponse.json();
				const datatest = await firstData.fav_POI.map(item => item._id); //MAJ pour prendre en compte le populate de la route
				const firstDataStr = await datatest.join(',');
				if (firstDataStr) {
					const secondResponse = await fetch(
						`https://dormir-la-haut-backend.vercel.app/poi/listOfPoi?poisFav=${firstDataStr}`,
					);
					const secondData = await secondResponse.json();

					setPoisFav(prevPoisFav => [...secondData]);
				} else {
					setPoisFav(() => []);
				}
			} catch (error) {
				console.error("Erreur lors de l'exécution des appels API :", error);
			}
		};

		//Récupération des données de checklists depuis le AsyncStorage
		const testData = async () => {
			try {
				const value = await AsyncStorage.getItem(`checklists_${user.token}`);
				const parsedValue = JSON.parse(value);
				setChecklistData(parsedValue || []);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		testData();

		fetchData();
	}, [index]);

	// Fonction appelée par le BOUTON LOGOUT
	const handleLogout = () => {
		// Dispatch l'action pour déconnecter l'utilisateur
		dispatch(setLogout());
		// Redirige vers l'écran de connexion
		navigation.navigate('LoadingScreen');
	};

	const navigateToChecklistByTitle = title => {
    // Recherchez la checklist correspondante dans checklistData
    const checklist = checklistData.find(item => item.title === title);
    if (checklist) {
        // Si une checklist correspondante est trouvée, naviguez vers ChecklistScreen avec son ID
        navigation.navigate('ChecklistsScreen', { checklistId: checklist.id });
    } else {
        console.warn(`Checklist with title ${title} not found.`);
    }
};

	//Creation de la liste des Bookmarks utilisant le composant FavCard
	// const handlePress = async (item) => {
	// 	await setSelectedItem(item);
	// 	navigation.navigate("MapScreen", selectedItem);
	//   };

	const tabFav = poisFav.map((item, index) => {
    return (
        <TouchableOpacity key={index} onPress={() => {navigation.navigate("MapScreen", item)}}>
            <FavCard
                key={index}
                title={item.name}
                poiType={item.type}
                imageUrl={item.photos[0].url}
            />
        </TouchableOpacity>
    );
});


	//Creation de la liste des favoris utilisant le composant CheckList
	const tabChecklists = checklistData.map((item, index) => {
		return (
      <TouchableOpacity key={index} onPress={() => navigateToChecklistByTitle(item.title)}>
      <FavCard
          key={index}
          title={item.title}
          poiType={`${item.items.length} items`}
          imageUrl={'https://media.istockphoto.com/id/1303877287/fr/vectoriel/liste-de-contr%C3%B4le-papier-et-pictogramme-plat-au-crayon.jpg?s=612x612&w=0&k=20&c=SIl78tq5-Ao4AZGw6C5dryrXj3XSiuctK4fHBBciuDI='}
      />
  </TouchableOpacity>
		);
	});

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={styles.subHeader}>
					<Text style={styles.username}>{user.username}</Text>
					<FontAwesome
						name='sign-out'
						size={24}
						color='white'
						onPress={() => setLogoutModalVisible(true)}
					/>
					<Modal
						animationType='slide'
						transparent={true}
						visible={logoutModalVisible}
						onRequestClose={() => {
							setLogoutModalVisible(false);
						}}
					>
						<View style={styles.centeredView}>
							<View style={styles.modalView}>
								<Text style={styles.modalTitle}>Déconnexion ?</Text>
								<TouchableOpacity
									style={styles.modalButton}
									onPress={() => {
										setLogoutModalVisible(false);
										handleLogout(); // Appeler la fonction de déconnexion
									}}
								>
									<Text style={styles.modalButtonText}>Confirmer</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={styles.modalButton1}
									onPress={() => setLogoutModalVisible(false)}
								>
									<Text style={styles.modalButtonText1}>Annuler</Text>
								</TouchableOpacity>
							</View>
						</View>
					</Modal>
				</View>
				<FontAwesome name='user-circle' size={40} color='white' />
			</View>
			<Tab
				value={index}
				onChange={e => setIndex(e)}
				indicatorStyle={{
					backgroundColor: 'white',
					height: 3,
				}}
			>
				<Tab.Item
					title='Mes Spots'
					titleStyle={{
						fontSize: 12,
						color: 'white',
						fontFamily: 'JosefinSansRegular',
					}}
					icon={{ name: 'bookmark', type: 'font-awesome', color: 'white' }}
				/>
				<Tab.Item
					title='Mes checklists'
					titleStyle={{
						fontSize: 12,
						color: 'white',
						fontFamily: 'JosefinSansRegular',
					}}
					icon={{
						name: 'check-square-o',
						type: 'font-awesome',
						color: 'white',
					}}
				/>
			</Tab>

			<TabView value={index} onChange={setIndex} animationType='spring'>
				<TabView.Item style={{ backgroundColor: '#161D46', width: '100%' }}>
					<View style={styles.favView}>
						<ScrollView contentContainerStyle={styles.scrollView}>
							{tabFav}
						</ScrollView>
					</View>
				</TabView.Item>
				<TabView.Item style={{ backgroundColor: '161D46', width: '100%' }}>
					<View style={styles.favView}>
						<ScrollView contentContainerStyle={styles.scrollView}>
							{tabChecklists}
						</ScrollView>
					</View>
				</TabView.Item>
			</TabView>
		</View>
	);
}
