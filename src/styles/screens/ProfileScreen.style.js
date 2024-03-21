import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		backgroundColor: '#161D46',
		flex: 1,
		width: '100%',
		paddingTop: 60,
		gap: 16,
	},
	header: {
		justifyContent: 'center',
		alignItems: 'center',
		gap: 16,
	},
	subHeader: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 16,
	},
	username: {
		color: '#ffffff',
		fontSize: 48,
		fontFamily: 'JosefinSansRegular',
		textAlign: 'center',
	},
	modalView: {
		margin: 20,
		backgroundColor: '#5050B2',
		borderRadius: 10,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 10,
		shadowRadius: 4,
		elevation: 5,
	},
	centeredView: {
		flex: 1,
		alignItems: 'center',
		paddingTop: 88,
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	modalContainer: {
		backgroundColor: 'white',
		position: 'absolute',
		right: 10,
		top: 60,
		borderRadius: 5,
		padding: 10,
	},

	modalOption: {
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
	},

	modalOptionText: {
		fontSize: 16,
		fontFamily: 'JosefinSansRegular',
	},
	favView: {
		flex: 1,
		gap: 16,
		alignItems: 'center',
		paddingTop: 32,
	},
	modalTitle: {
		marginBottom: 20,
		fontSize: 24,
		fontFamily: 'JosefinSansRegular',
		textAlign: 'center',
		color: 'white',
	},
	modalTextInput: {
		height: 40,
		borderColor: 'white',
		borderWidth: 1,
		marginBottom: 20,
		paddingHorizontal: 10,
		borderRadius: 5,
	},
	modalButton: {
		backgroundColor: 'white',
		borderRadius: 5,
		padding: 10,
		elevation: 2,
		marginBottom: 10,
	},
	modalButton1: {
		backgroundColor: '#C23434',
		borderRadius: 5,
		padding: 10,
		elevation: 2,
		marginBottom: 10,
	},
	modalButtonText: {
		color: 'black',
		textAlign: 'center',
		fontFamily: 'JosefinSansRegular',
	},
	modalButtonText1: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	scrollView: {
		//!Flex: 1 empechait le scroll de fonctionner jusqu'en bas
		// flex: 1,
		marginTop: 10,
		paddingBottom: 24,
		alignItems: 'center',
		gap: 24,
	},
});