import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Auth from "./src/components/Auth";
import { Provider } from "react-redux";
import { store } from "./src/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import NavigationMenu from "./src/navigation/NavigationMenu";
import "react-native-gesture-handler";

export default function App() {
  const [signedin, setSignedin] = useState(false);

  useEffect(async () => {
    const token = await AsyncStorage.getItem("token");
    setSignedin(!!token);
  }, []);

  return (
    <Provider store={store}>
      <View style={styles.container}>
        {signedin ? <NavigationMenu /> : <Auth setSignedin={setSignedin} />}
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
