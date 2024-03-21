import { useState, useEffect } from 'react';
import {
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import { styles } from '../styles/screens/LoadingScreen.style'

export default function LoadingScreen ({ navigation }) {

	const [imageLoaded, setImageLoaded] = useState(false);

	const user = useSelector(state => state.user.value);

	useEffect(() => {
		if (user?.token) {
			navigation.navigate('TabNavigator');
		}
	}, []);

	const handleImageLoad = () => {
		setImageLoaded(true);
	};

	return (
		<ImageBackground
			source={require('../../src/assets/img/Image-background.jpg')}
			resizeMode='cover'
			style={styles.background}
			onLoad={handleImageLoad}
		>
			{imageLoaded ? (
				<View style={styles.filtre}>
					<View style={styles.logoContainer}>
						<Image
							style={styles.logo}
							source={require('../assets/img/logoDormirLaHaut.png')}
						/>
					</View>
					<Text style={styles.infoText}>
  Veuillez créer un compte ou vous connecter pour accéder à l'application
</Text>
					<View style={styles.buttonContainer} >
						<TouchableOpacity
							style={styles.signup}
							onPress={() => navigation.navigate('RegisterScreen')}
						>
							<Text style={styles.buttonTextI}>S'inscrire</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.signin}
							onPress={() => navigation.navigate('LoginScreen')}
						>
							<Text style={styles.buttonTextU}>Se connecter</Text>
						</TouchableOpacity>
					</View>
				</View>
			) : null}
		</ImageBackground>
	);
};


