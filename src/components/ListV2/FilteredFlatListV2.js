import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  useColorScheme,
  Text,
  StyleSheet,
} from "react-native";
import { AntDesign, Ionicons } from "../../utils/fontUtils";
import {
  AppThemeStyle,
  DefaultThemeProperty,
  GradientColors,
  GradientLightColors,
} from "../../utils/appThemeStyles";
import { LinearGradient } from "expo-linear-gradient";
import CustomLoader from "../CustomLoader";

import { FlashList } from "@shopify/flash-list";

const FilteredFlatListV2 = ({
  flatlistHeaderContent = null,
  dataSource = null,
  isShowHeader = null,
  loadMoreDataSourceTrigger = null,
  refreshDataSourceTrigger = null,
  RenderItem = null,
  // marginBottom = 100,
}) => {
  const theme = useColorScheme();
  const flatListRef = useRef();
  const [loading, setLoading] = useState(false);

  const toTop = () => {
    flatListRef?.current?.scrollToOffset({ animated: true, offset: 0 });
  };

  const toBottom = () => {
    flatListRef?.current?.scrollToEnd({ animated: true });
  };

  const loadMoreData = () => {
    setLoading(true);
    loadMoreDataSourceTrigger && loadMoreDataSourceTrigger();
    autocloseSpinner();
  };
  const refreshDataSource = () => {
    setLoading(true);
    refreshDataSourceTrigger && refreshDataSourceTrigger();
    autocloseSpinner();
  };

  const autocloseSpinner = () => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const RenderHeader = () => (
    <>
      <LinearGradient
        colors={theme === "light" ? GradientLightColors : GradientColors}
        start={{ x: 0, y: 0.7 }}
        end={{ x: 1, y: 0 }}
        style={{
          opacity: 1.0,
          position: "relative",
          marginBottom: 5,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={toBottom}
          style={[
            AppThemeStyle.transparent_button,
            { height: 40, alignSelf: "flex-start" },
          ]}
        >
          <AntDesign
            style={[
              AppThemeStyle.default_Text,
              { marginRight: 5, marginLeft: 5 },
            ]}
            name="caretdown"
            size={23}
            color={DefaultThemeProperty.Light_color1}
          />
        </TouchableOpacity>
        <ScrollView horizontal nestedScrollEnabled={true}>
          {flatlistHeaderContent && flatlistHeaderContent}
        </ScrollView>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={toTop}
          style={[AppThemeStyle.transparent_button, { height: 40 }]}
        >
          <AntDesign
            style={[
              AppThemeStyle.default_Text,
              { marginRight: 5, marginLeft: 5 },
            ]}
            name="caretup"
            size={23}
            color="white"
          />
        </TouchableOpacity>
      </LinearGradient>
    </>
  );

  return (
    <>
      {dataSource && dataSource.length > 0 ? (
        <>
          {isShowHeader ? <RenderHeader /> : null}
          <FlashList
            data={dataSource}
            renderItem={RenderItem} // gösterilecek item
            onEndReachedThreshold={0.5}
            viewabilityConfig={{
              waitForInteraction: true,
              itemVisiblePercentThreshold: 50,
              minimumViewTime: 200,
            }}
            keyExtractor={(item, index) => index}
            refreshing={loading}
            onRefresh={refreshDataSource} // yukarı kaydırınca refleshler
            onEndReached={loadMoreData} // aşağı indikçe yeniler
            ref={flatListRef}
            estimatedItemSize={dataSource?.length}
            ListHeaderComponentStyle={{ backgroundColor: "#ccc" }}
            ItemSeparatorComponent={() => <View style={styles.divider} />}
          />
        </>
      ) : (
        <View style={{ justifyContent: "center", alignSelf: "center" }}>
          {loading ? (
            <CustomLoader dataSource={dataSource} />
          ) : (
            <Ionicons
              name="reload"
              size={24}
              color={"white"}
              onPress={() => {
                refreshDataSource();
              }}
            />
          )}
        </View>
      )}
    </>
  );
};

export default FilteredFlatListV2;
const styles = StyleSheet.create({
  divider: {
    width: "100%",
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#DDD",
  },
});
