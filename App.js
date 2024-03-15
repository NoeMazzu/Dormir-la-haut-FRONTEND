import { LogBox } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { StyleSheet, View, Text } from "react-native";
import { Provider } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import user from "./src/redux/slices/user";
import poi from "./src/redux/slices/poi";
import {
  ChecklistsScreen,
  HomeScreen,
  LoadingScreen,
  LoginScreen,
  MapScreen,
  MeteoScreen,
  NewsScreen,
  PhotosScreen,
  ProfileScreen,
  RegisterScreen,
} from "./src/screens";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import { useFonts } from 'expo-font';

LogBox.ignoreAllLogs();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const reducers = combineReducers({
  user,
  poi,
});

const persistConfig = { key: "dormirlahaut", storage: AsyncStorage };
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
const persistor = persistStore(store);

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="PhotosScreen" component={PhotosScreen} />
      <Stack.Screen name="NewsScreen" component={NewsScreen} />
      <Stack.Screen name="MeteoScreen" component={MeteoScreen} />
      <Stack.Screen name="ChecklistsScreen" component={ChecklistsScreen} />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Accueil") {
            iconName = "home";
          } else if (route.name === "Mon profil") {
            iconName = "user";
          }

          return <FontAwesomeIcon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#161D46",
        headerShown: false,
        tabBarStyle: { backgroundColor: "#35357F" },
        tabBarLabelStyle : {fontSize: 10, fontFamily: 'JosefinSansRegular'}
      })}
    >
      <Tab.Screen name="Accueil" component={HomeStack} />
      <Tab.Screen name="Mon profil" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  const [fontsLoaded, fontsError] = useFonts({
		JosefinSansRegular: require('./src/assets/fonts/JosefinSans-Regular.ttf'),
		JosefinSansBold: require('./src/assets/fonts/JosefinSans-Bold.ttf'),
		// Add more fonts as needed
	});

	if (!fontsLoaded)
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);

	if (fontsError) console.log(fontsError);
  // AsyncStorage.clear().catch(err => console.error(err))

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
