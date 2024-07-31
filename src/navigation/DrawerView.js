import { StyleSheet, SafeAreaView, useColorScheme } from "react-native";
import { useDrawerProgress } from "@react-navigation/drawer";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { DefaultThemeProperty } from "../utils/appThemeStyles";

const DrawerView = ({ children, style }) => {
  const navigation = useNavigation();
  const drawerProgress = useDrawerProgress();
  const theme = useColorScheme();
  const viewStyles = useAnimatedStyle(() => {
    const scale = interpolate(drawerProgress?.value, [0, 1], [1, 0.8]);
    const borderRadius = interpolate(drawerProgress?.value, [0, 1], [1, 40]);

    return {
      transform: [{ scale }],
      borderRadius,
    };
  });

  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };

  return (
    <Animated.View style={[styles.container, style, viewStyles]}>
      <SafeAreaView
        style={{
          flex: 1,
          padding:0,
          backgroundColor:
            theme === "dark"
              ? DefaultThemeProperty.Dark_color2
              : DefaultThemeProperty.Light_color1,
        }}
      >
        {children}
      </SafeAreaView>
  </Animated.View>
  );
};

export default DrawerView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
