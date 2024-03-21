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

const styles = StyleSheet.create({
	filtre: {
		backgroundColor: 'rgba(0,0,0,0.5)',
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	background: {
		flex: 1,
		width: '100%',
	},
	signin: {
		backgroundColor: '#ffffff',
		padding: 15,
		margin: 10,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#35357F',
		width: '50%',
	},
	signup: {
		backgroundColor: '#35357F',
		padding: 15,
		margin: 10,
		borderRadius: 10,
		color: '#ffffff',
		width: '50%',
	},
	forgotPassword: {
		marginTop: 20,
	},
	forgotPasswordText: {
		color: '#ffffff',
		fontSize: 16,
		textDecorationLine: 'underline',
		fontFamily: 'JosefinSansRegular',
	},
	buttonTextU: {
		color: '#000000',
		textAlign: 'center',
		fontSize: 18,
		fontFamily: 'JosefinSansRegular',
	},
	buttonTextI: {
		color: '#ffffff',
		textAlign: 'center',
		fontSize: 18,
		fontFamily: 'JosefinSansRegular',
	},
  buttonContainer: {
    marginBottom: "60%",
    marginTop: "15%",
    width: "100%",
    alignItems: "center",
	marginTop: '0%', // Ajuster cette valeur selon vos besoins
  },
	logo: {
		height: '70%',
		width: '100%',
	},
	logoContainer: {
		justifyContent: 'flex-start',
		height: '50%',
		width: '50%',
	},
	infoText: {
		color: '#ffffff',
		fontSize: 16,
		textAlign: 'center',
		marginVertical: 10, // Ajoutez une marge pour l'espace vertical
		fontFamily: 'JosefinSansRegular',
	  },
});
