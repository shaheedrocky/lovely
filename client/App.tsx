import "./global.css";
import React, { useState } from "react";
import { StatusBar } from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigation from "./src/navigation/AuthNavigation";
import { navigationRef } from "./src/lib";

const App = () => {
  const [currentScreenName, setCurrentScreenName] = useState<
    string | undefined
  >("Splash");

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={
          currentScreenName === "Splash" ? "light-content" : "dark-content"
        }
      />
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          const currentRoute = navigationRef.getCurrentRoute();
          setCurrentScreenName(currentRoute?.name);
          console.log("Current Screen:", currentRoute?.name);
        }}
        onStateChange={() => {
          const currentRoute = navigationRef.getCurrentRoute();
          setCurrentScreenName(currentRoute?.name);
          console.log("Current Screen:", currentRoute?.name);
        }}
      >
        <SafeAreaView
          edges={currentScreenName === "Splash" ? [] : ["top", "left", "right", "bottom"]}
          className={`flex-1 ${
            currentScreenName === "Splash" ? "bg-primary-700" : "bg-white"
          }`}
        >
          <AuthNavigation />
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;