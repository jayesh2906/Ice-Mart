import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfieScreen";
import { useSelector } from "react-redux";
import BuyProductStack from "./BuyProductStack";

const Tab = createBottomTabNavigator();

const NavigationMenu = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "ice-cream-outline" : "ice-cream";
            } else if (route.name === "My Cart") {
              iconName = focused ? "cart-outline" : "cart";
            } else if (route.name === "My Profile") {
              iconName = focused ? "person-outline" : "person";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#0275d8",
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
          name="My Cart"
          component={BuyProductStack}
          options={({ route }) => ({
            headerShown: false,
            ...(cartItems.length && { tabBarBadge: cartItems.length }),
            tabBarBadgeStyle: { marginTop: -6 },
            tabBarStyle: {
              display: getTabBarVisibility(route),
            },
          })}
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

const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";

  if (
    routeName === "Address" ||
    routeName === "Payment" ||
    routeName === "ThankYou"
  ) {
    return "none";
  } else {
    return "flex";
  }
};

export default NavigationMenu;

const styles = StyleSheet.create({});
