import { StyleSheet } from "react-native";
 
 export const styles = StyleSheet.create({
    errorText: {
      color: "#FF0000",
      textAlign: "center",
      fontSize: 16,
      marginVertical: 10,
      fontFamily: 'JosefinSansRegular',
    },
    background: {
      flex: 1,
      width: "100%",
    },
    filter: {
      backgroundColor: "rgba(0,0,0,0.5)",
      flex: 1,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 50,
    },
    input: {
      backgroundColor: "#ffffff",
      width: "80%",
      padding: 15,
      margin: 10,
      borderRadius: 10,
      color: "#000000",
    },  
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "center",
      width: "80%",
    },
    cancelButton: {
      backgroundColor: "#C23434",
      padding: 15,
      margin: 10,
      borderRadius: 10,
      width: "48%",
      alignItems: "center",
    },
    signupButton: {
      backgroundColor: "#ffffff",
      padding: 15,
      margin: 10,
      borderRadius: 10,
      width: "48%",
      alignItems: "center",
    },
    buttonText: {
      color: "#fff",
      textAlign: "center",
      fontSize: 16,
      fontFamily: 'JosefinSansRegular',
    },
    buttonText2: {
      color: "#000",
      textAlign: "center",
      fontSize: 16,
      fontFamily: 'JosefinSansRegular',
    },
  
    title: {
      color: "#ffffff",
      fontSize: 60,
      fontFamily: 'JosefinSansRegular',
    },
    desc: {
      color: "#ffffff",
      fontSize: 16,
      textAlign: "center",
      width: "70%",
      marginBottom: 20,
      fontFamily: 'JosefinSansRegular',
    },
  }); 