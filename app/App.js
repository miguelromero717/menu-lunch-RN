import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import MealsScreen from "./screens/Meals";
import Modal from "./screens/Modal";
import LoginScreen from "./screens/Login";
import RegisterScreen from "./screens/Register";

const OnBoardingNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
  },
  {
    initialRouteName: "Login",
  }
);

const AppNavigator = createStackNavigator(
  {
    Meals: {
      screen: MealsScreen,
    },
  },
  {
    initialRouteName: "Meals",
  }
);

const RootStack = createStackNavigator(
  {
    Main: AppNavigator,
    Modal: Modal,
  },
  {
    mode: "modal",
    headerMode: "none",
  }
);

const BaseStack = createSwitchNavigator(
  {
    OnBoarding: OnBoardingNavigator,
    Root: RootStack,
  },
  {
    initialRouteName: "OnBoarding",
  }
);

export default createAppContainer(BaseStack);
