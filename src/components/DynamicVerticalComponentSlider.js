import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  useColorScheme,
  Text,
} from "react-native";
import { AntDesign } from "../utils/fontUtils";
import { DefaultThemeProperty } from "../utils/appThemeStyles";

const RenderContent = ({
  dataSource,
  activeIndex,
  fontColor,
  handlePrevious,
  handleNext,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView nestedScrollEnabled={true}>
        <View style={{ marginBottom: 50 }}>
          {activeIndex <= 0 ? null : (
            <TouchableOpacity
              style={styles.previousButton}
              onPress={handlePrevious}
            >
              <AntDesign name="arrowleft" size={24} color={fontColor} />
            </TouchableOpacity>
          )}

          {activeIndex >= dataSource?.length - 1 ? null : (
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <AntDesign name="arrowright" size={24} color={fontColor} />
            </TouchableOpacity>
          )}
          <Text
            style={[
              styles.title,
              {
                fontSize: DefaultThemeProperty.FontSizeNormal,
                color: fontColor,
              },
            ]}
          >
            {dataSource[activeIndex].title}
          </Text>
        </View>
        <View>{dataSource[activeIndex].component}</View>
      </ScrollView>
    </View>
  );
};

const DynamicVerticalComponentSlider = ({ dataSource }) => {
  const theme = useColorScheme();
  const fontColor = theme === "dark" ? DefaultThemeProperty.Light_color2: DefaultThemeProperty.Gray_color3;
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevious = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < dataSource.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const memoizedComponentRender = useMemo(() => {
    return (
      <RenderContent
        dataSource={dataSource}
        activeIndex={activeIndex}
        fontColor={fontColor}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
      />
    );
  }, [activeIndex, dataSource, fontColor]);

  return dataSource && <RenderContent
  dataSource={dataSource}
  activeIndex={activeIndex}
  fontColor={fontColor}
  handlePrevious={handlePrevious}
  handleNext={handleNext}
/>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  previousButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
  nextButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
  title: {
    position: "absolute",
    top: 20,
    alignSelf: "center",
    zIndex: 1,
  },
});

export default DynamicVerticalComponentSlider;
