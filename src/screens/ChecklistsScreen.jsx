import React, { useEffect, useState } from 'react';
import {
	ScrollView,
	Text,
	TouchableOpacity,
	View,
	TextInput,
	Modal,
} from 'react-native';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Alert } from 'react-native';
import { styles } from '../styles/screens/ChecklistsScreen.style';

export default function ChecklistsScreen({ navigation }) {
	const user = useSelector(state => state.user.value);
	const [checklists, setChecklists] = useState([]);
	const [selectedItem, setSelectedItem] = useState(null);
	const [isAddingChecklist, setIsAddingChecklist] = useState(false);
	const [newChecklistTitle, setNewChecklistTitle] = useState('');

	const getDefaultChecklists = () => [
		{
			title: 'Checklist 1',
			items: [
				{ text: 'Basket', checked: false },
				{ text: 'Serviette', checked: false },
				{ text: 'Chaussette', checked: false },
				{ text: 'T-shirt', checked: false },
				{ text: 'K-Way', checked: false },
				{ text: '...', checked: false },
			],
		},
		{
			title: 'Checklist 2',
			items: [
				{ text: 'Basket', checked: false },
				{ text: 'Serviette', checked: false },
				{ text: 'Chaussette', checked: false },
				{ text: 'T-shirt', checked: false },
				{ text: 'K-Way', checked: false },
				{ text: '...', checked: false },
			],
		},
	];

	const [newItemTexts, setNewItemTexts] = useState(
		getDefaultChecklists().map(() => ''),
	);

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
						loadedChecklists = getDefaultChecklists();
						await AsyncStorage.setItem(
							storageKey,
							JSON.stringify(loadedChecklists),
						);
					}
				}

				setChecklists(loadedChecklists);
			} catch (error) {
				console.error('Error loading checklists:', error);
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
				console.error('Error saving checklists:', error);
			}
		};

		saveChecklists();
	}, [checklists, user?.token]);

	const testData = async () => {
		const value = await AsyncStorage.getItem(`checklists_${user.token}`);
	};
	testData();
	const addDefaultChecklists = async () => {
		try {
			if (user?.token) {
				const storageKey = `checklists_${user.token}`;
				const storedChecklists = await AsyncStorage.getItem(storageKey);

				if (!storedChecklists) {
					const defaultChecklists = getDefaultChecklists();

					await AsyncStorage.setItem(
						storageKey,
						JSON.stringify(defaultChecklists),
					);
					setChecklists(defaultChecklists);
				}
			}
		} catch (error) {
			console.error('Error adding default checklists:', error);
		}
	};

	useEffect(() => {
		addDefaultChecklists();
	}, [user?.token]);

	const addItemToChecklist = (checklistIndex, newItem) => {
		const updatedChecklists = [...checklists];
		updatedChecklists[checklistIndex].items.push(newItem);
		setChecklists(updatedChecklists);
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
		setSelectedItem(null);
	};

	const iconColor = '#161D46';
	const iconColor1 = 'white';

	const handleAddChecklist = () => {
		setIsAddingChecklist(true);
	};

	const handleConfirmAddChecklist = () => {
		const newChecklist = {
			title: newChecklistTitle || `Checklist ${checklists.length + 1}`,
			items: [],
		};

		setChecklists(prevChecklists => [...prevChecklists, newChecklist]);
		setIsAddingChecklist(false);
		setNewChecklistTitle('');
	};

	const handleDeleteChecklist = checklistIndex => {
		Alert.alert(
			'Confirmation',
			'Voulez-vous vraiment supprimer cette checklist ?',
			[
				{
					text: 'Annuler',
					style: 'cancel',
				},
				{
					text: 'Supprimer',
					onPress: () => {
						const updatedChecklists = [...checklists];
						updatedChecklists.splice(checklistIndex, 1);
						setChecklists(updatedChecklists);
					},
				},
			],
		);
	};

	return (
		<View style={styles.filter}>
			<Text style={styles.title}>Vos checklists</Text>
			<TouchableOpacity
				style={styles.addChecklistButton}
				onPress={handleAddChecklist}
			>
				<Text style={styles.addChecklistButtonText}>
					+ Ajouter une checklist
				</Text>
			</TouchableOpacity>

			<Modal
				animationType='slide'
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
							placeholder='Titre de la checklist'
							placeholderTextColor='#A9A9A9'
							value={newChecklistTitle}
							onChangeText={text => setNewChecklistTitle(text)}
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
								setNewChecklistTitle('');
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
									name='trash'
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
											onPress={() =>
												handleDeleteItem(checklistIndex, itemIndex)
											}
										>
											<Icon
												name='trash'
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
							onChangeText={text => {
								const updatedItemTexts = [...newItemTexts];
								updatedItemTexts[checklistIndex] = text;
								setNewItemTexts(updatedItemTexts);
							}}
						/>
						<TouchableOpacity
							style={styles.addButton}
							onPress={() => {
								const newItemText = newItemTexts[checklistIndex].trim(); // Trim pour enlever les espaces vides avant et après le texte
								if (newItemText !== '') {
									const newItem = { text: newItemText, checked: false };
									addItemToChecklist(checklistIndex, newItem);
									// Réinitialiser le champ d'entrée pour le nouvel élément après l'ajout
									const updatedItemTexts = [...newItemTexts];
									updatedItemTexts[checklistIndex] = ''; // Réinitialiser à une chaîne vide
									setNewItemTexts(updatedItemTexts);
								}
							}}
						>
							<Text style={styles.addButtonLabel}>+ Ajouter un item</Text>
						</TouchableOpacity>
					</View>
				))}
			</ScrollView>
		</View>
	);
}
