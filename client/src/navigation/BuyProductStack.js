import { createStackNavigator } from "@react-navigation/stack";
import AddressScreen from "./screens/AddressScreen";
import CartScreen from "./screens/CartScreen";
import PaymentScreen from "./screens/PaymentScreen";
import ThankYouScreen from "./screens/ThankYouScreen";

const Stack = createStackNavigator();

const BuyProductStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#0275d8",
        },
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerTitleStyle: {
          fontSize: "1.5rem",
        },
      }}
    >
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerTitle: "My Cart",
        }}
      />
      <Stack.Screen
        name="Address"
        component={AddressScreen}
        options={{
          headerTitle: "Your Address",
        }}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{
          headerTitle: "Payment Details",
        }}
      />
      <Stack.Screen
        name="ThankYou"
        component={ThankYouScreen}
        options={{
          headerTitle: "",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default BuyProductStack;
