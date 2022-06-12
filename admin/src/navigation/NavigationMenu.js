import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "./screens/HomeScreen";
import AddProductScreen from "./screens/AddProductScreen";
import ProfileScreen from "./screens/ProfieScreen";

const Tab = createBottomTabNavigator();

const NavigationMenu = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "ice-cream-outline" : "ice-cream";
            } else if (route.name === "Add Product") {
              iconName = focused ? "add-circle-outline" : "add-circle";
            } else if (route.name === "My Profile") {
              iconName = focused ? "person-outline" : "person";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: { paddingBottom: 5, fontSize: 15 },
          tabBarStyle: {
            paddingTop: 10,
            height: 60,
            backgroundColor: "#F5FFFA",
          },
        })}
        initialRouteName="Home"
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Add Product"
          component={AddProductScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="My Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default NavigationMenu;
