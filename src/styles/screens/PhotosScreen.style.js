import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161D46",
    justifyContent: "center",
    paddingTop: 20,
  },
  mainTitle: {
    color: "#ffffff",
    fontSize: 45,
    fontFamily: "JosefinSansRegular",
  },
  liste: {
    width: "100%",
    borderRadius: 10,
  },
  textItem: {
    color: "white",
    backgroundColor: "rgba(53,53,127,0.2)",
    fontSize: 12,
    borderRadius: 10,
    padding: 5,
    numberOfLines: 1,
    maxWidth: "60%",
    fontFamily: "JosefinSansRegular",
  },
  spotContainer: {
    width: "50%",
    padding: 2,
  },
  headerItem: {
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "#161D46",
    borderRadius: 10,
    alignItems: "center",
    padding: 15,
  },
  modalText: {
    fontFamily: "JosefinSansRegular",
    color: "white",
  },
  modalTouchableVoirSurLaCarte: {
    backgroundColor:"#5050B2",
    margin: 16,
    padding: 10,
    borderRadius: 10,
    width: 140,
    alignItems: 'center'
  },
  modalTouchableFermer: {
    backgroundColor:"#C23434",
    margin: 16,
    padding: 10,
    borderRadius: 10,
    width: 140,
    alignItems: 'center'
  }
});
