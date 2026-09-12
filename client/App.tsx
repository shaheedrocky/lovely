import "./global.css";
import React, { useState } from "react";
import { LogBox, StatusBar } from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigation from "./src/navigation/AuthNavigation";
import { navigationRef, devNav } from "./src/lib";
import { ThemeProvider, useTheme } from "./src/theme";
import { ToastProvider } from "./src/components/ui/ToastContext";

LogBox.ignoreAllLogs();

const AppContent: React.FC = () => {
  const [currentScreenName, setCurrentScreenName] = useState<
    string | undefined
  >(() => devNav.getLastRoute() || "Splash");
  const { isDark, navigationTheme } = useTheme();

  const isSplashScreen = currentScreenName === "Splash";

  const getStatusBarStyle = () => {
    if (isSplashScreen) {
      return "light-content";
    }
    return isDark ? "light-content" : "dark-content";
  };

  return (
    <>
      <StatusBar barStyle={getStatusBarStyle()} />
      <NavigationContainer
        ref={navigationRef}
        theme={navigationTheme}
        initialState={devNav.getNavState()}
        onReady={() => {
          const currentRoute = navigationRef.getCurrentRoute();
          if (currentRoute?.name) {
            devNav.setLastRoute(currentRoute.name);
            setCurrentScreenName(currentRoute.name);
          }
        }}
        onStateChange={(state) => {
          devNav.setNavState(state);
          const currentRoute = navigationRef.getCurrentRoute();
          if (currentRoute?.name) {
            devNav.setLastRoute(currentRoute.name);
            setCurrentScreenName(currentRoute.name);
          }
        }}
      >
        <SafeAreaView
          edges={isSplashScreen ? [] : ["top", "left", "right", "bottom"]}
          className={
            isSplashScreen
              ? "flex-1 bg-primary-700"
              : "flex-1 bg-background-light dark:bg-background-dark"
          }
        >
          <AuthNavigation />
        </SafeAreaView>
      </NavigationContainer>
    </>
  );
};

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;