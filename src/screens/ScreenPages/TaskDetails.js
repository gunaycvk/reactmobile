import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme, ScrollView } from "react-native";
import { DefaultThemeProperty } from "../../utils/appThemeStyles";
import { useNavigation } from '@react-navigation/native';

const TaskDetails = ({ route }) => {
  const { task } = route.params;
  const navigation = useNavigation();
  const theme = useColorScheme();
  const backgroundColor = theme === 'dark' ? '#1a1a1a' : DefaultThemeProperty.Light_color1;
  const fontColor = theme === 'dark' ? DefaultThemeProperty.Light_color2 : DefaultThemeProperty.Gray_color3;
  const buttonBackgroundColor = theme === 'dark' ? '#333' : DefaultThemeProperty.Light_color1;
  const buttonTextColor = theme === 'dark' ? '#fff' : DefaultThemeProperty.Gray_color3;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={[styles.card, { backgroundColor, borderColor: 'red', borderWidth: 2 }]}>
          <Text style={[styles.header, { color: fontColor }]}>Talep Detayları</Text>
          <View style={styles.detailsContainer}>
            <Text style={[styles.detailLabel, { color: fontColor }]}>Talep No:</Text>
            <Text style={[styles.detailValue, { color: fontColor }]}>{task.TalepID || 'N/A'}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={[styles.detailLabel, { color: fontColor }]}>Konu:</Text>
            <Text style={[styles.detailValue, { color: fontColor }]}>{task.TalepKonu || 'N/A'}</Text>
          </View>
          {task.ModulID && (
            <>
              <View style={styles.detailsContainer}>
                <Text style={[styles.detailLabel, { color: fontColor }]}>Modül Kodu:</Text>
                <Text style={[styles.detailValue, { color: fontColor }]}>{task.ModulID.ModulKodu || 'N/A'}</Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={[styles.detailLabel, { color: fontColor }]}>Modül Adı:</Text>
                <Text style={[styles.detailValue, { color: fontColor }]}>{task.ModulID.ModulAdi || 'N/A'}</Text>
              </View>
            </>
          )}
          <View style={styles.detailsContainer}>
            <Text style={[styles.detailLabel, { color: fontColor }]}>G. Onaylama Zamanı:</Text>
            <Text style={[styles.detailValue, { color: fontColor }]}>{task.GOnaylamaZamani || 'N/A'}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={[styles.detailLabel, { color: fontColor }]}>Talep Zamanı:</Text>
            <Text style={[styles.detailValue, { color: fontColor }]}>{task.TalepZamani || 'N/A'}</Text>
          </View>
          {/* Diğer alanlar için benzer şekilde ekleyin */}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.button, { backgroundColor: buttonBackgroundColor, borderColor: 'red', borderWidth: 2 }]}
        >
          <Text style={[styles.buttonText, { color: buttonTextColor }]}>Geri Dön</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    padding: 16,
    borderRadius: 10,
    elevation: 5,
    marginBottom: 16,
    borderColor: 'red',
    borderWidth: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailValue: {
    fontSize: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: DefaultThemeProperty.Gray_color3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TaskDetails;
