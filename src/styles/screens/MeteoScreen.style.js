import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
      fontFamily: 'JosefinSansRegular',
    },
    title: {
      color: "#ffffff",
      fontSize: 45,
      marginLeft: 15,
      fontFamily: 'JosefinSansRegular',
    },
    scrollView: {
      //!Flex: 1 empechait le scroll de fonctionner jusqu'en bas
      // flex: 1, 
      marginTop: 10,
      paddingBottom:24,
      alignItems:'center',
      gap:24,
    },
  });