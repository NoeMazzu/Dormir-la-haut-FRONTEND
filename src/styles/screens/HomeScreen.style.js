import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#161D46",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    flex: 1,
  },
  meteoContainer: {
    width: "50%",
    padding: 4,
    
  },
  meteoButton: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#35357F",
    gap: 20,
    padding: 10,
    justifyContent:'center'
  },
  meteoDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  textMeteo: {
    fontSize: 16,
    color: "white",
    fontFamily: 'JosefinSansRegular',
  },
  textTitle: {
    color: "white",
    fontSize: 20,
    marginRight: 10,
    fontFamily: 'JosefinSansRegular',
  },
  highRigtContainers: {
    width: "50%",
  },
  actusContainers: {
    height: "50%",
    padding: 4,
  },
  buttonNews: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#35357F",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cheklistContainers: {
    height: "50%",
    padding: 4,
  },
  checklistButton: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#35357F",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  topContainer: {
    marginTop: 17,
    flexDirection: "row",
    width: "100%",
    height: "25%",
  },
  mapContainer: {
    width: "100%",
    height: "45%",
    padding: 4,
    borderRadius: 20,
    overflow: "hidden",
  },
  photoContainer: {
    width: "100%",
    height: "30%",
    padding: 4,
    borderRadius: 20,
    overflow: "hidden",
  },
  meteosInfos: {
    // height: "70%",
    gap: 10,
  },
  mapTitle : {
  position: 'absolute', 
  backgroundColor:'yellow', 
  zIndex:1, 
  top: 10,
  left: 10,
  padding: 5,
  backgroundColor: 'rgba(53,53,127,0.2)',
  borderRadius: 10,
},
titleText: {
  color: "white",
  fontSize: 20,
  fontFamily: 'JosefinSansRegular',
}
});

