import React, { useEffect, useState } from "react";
import { View, useColorScheme, ActivityIndicator, Text } from "react-native";
import { DefaultThemeProperty } from "../utils/appThemeStyles";

const CustomLoader = ({dataSource}) => {
  const [load, setLoad] = useState(true);
  const theme = useColorScheme();
  const fontColor =
    theme === "dark"
      ? DefaultThemeProperty.Light_color2
      : DefaultThemeProperty.Gray_color3;

     useEffect(()=>{
      setLoad(true);
        setTimeout(() => {
          if(dataSource === null || dataSource === undefined || dataSource.length === 0){
          setLoad(false)
        }
        }, 10000);
    
     },[dataSource])

  return load ? (
    <View style={{ marginTop: 20 }}>
      <Text
        style={{
          fontSize: DefaultThemeProperty.FontSizeNormal,
          alignSelf: "center",
          justifyContent: "center",
          color: fontColor,
        }}
      >
        Loading...
      </Text>
      <ActivityIndicator color={fontColor} style={{ marginLeft: 8 }} />
    </View>
  ):(<>
  
  <View style={{ justifyContent:"space-between", flexDirection:"row", alignSelf: "center", marginTop:10 }}>
          <Text style={{color:fontColor, justifyContent:"center",alignSelf:"center"}}>Data Not Found, so there is no data to show! {" "}</Text>
          </View>
  </>);
};

export default CustomLoader;
