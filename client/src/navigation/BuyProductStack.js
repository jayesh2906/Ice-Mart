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
          height: 50,
        },
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerTitleStyle: {
          fontSize: "1.2rem",
        },
      }}
      // initialRouteName="Address"
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
          headerTitle: "Choose delivey location",
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
          // headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default BuyProductStack;
