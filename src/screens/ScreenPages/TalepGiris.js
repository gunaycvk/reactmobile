import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Platform,
  KeyboardAvoidingView,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { TextInput, Text } from "@react-native-material/core";
import Icon from 'react-native-vector-icons/MaterialIcons';
import DrawerView from "../../navigation/DrawerView";
import { DefaultThemeProperty } from "../../utils/appThemeStyles"; // Corrected path

const TalepGiris = ({ navigation, route }) => {
  const [form, setForm] = useState({
    tarih: new Date().toLocaleDateString(),
    tip: '',
    tur: '',
    proje: '',
    modulu: '',
    talepEden: '',
    talepSorumlusu: '',
    konu: '',
    aciklama: '',
  });

  const [dropdownVisible, setDropdownVisible] = useState(null);
  const scrollViewRef = useRef();

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
    setDropdownVisible(null);
  };

  const toggleDropdown = (name) => {
    setDropdownVisible(dropdownVisible === name ? null : name);
  };

  const dropdownOptions = {
    tip: ['HATA', 'YENI'],
    tur: ['Option 1', 'Option 2'], // Add your options here
    proje: ['Proje 1', 'Proje 2'], // Add your options here
    modulu: ['Modül 1', 'Modül 2'], // Add your options here
  };

  const renderDropdown = (name, options) => (
    <View style={{ margin: 16 }}>
      <TouchableOpacity onPress={() => toggleDropdown(name)} style={styles.dropdown}>
        <Text style={styles.dropdownText}>{form[name] || name.charAt(0).toUpperCase() + name.slice(1)}</Text>
        <Icon name="arrow-drop-down" size={24} color={DefaultThemeProperty.Light_color1} />
      </TouchableOpacity>
      {dropdownVisible === name && (
        <View style={styles.dropdownOptions}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => handleChange(name, option)}
              style={styles.dropdownOption}
            >
              <Text style={styles.dropdownOptionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  const handleSubmit = () => {
    console.log('Form submitted:', form);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollView}
          ref={scrollViewRef}
  
        >
          <Text style={styles.title}>Yeni Talep Formu</Text>
          <TextInput
            label="Tarih"
            value={form.tarih}
            style={{ margin: 16, backgroundColor: DefaultThemeProperty.Light_color1 }}
            disabled
          />
          {renderDropdown('tip', dropdownOptions.tip)}
          {renderDropdown('tur', dropdownOptions.tur)}
          {renderDropdown('proje', dropdownOptions.proje)}
          {renderDropdown('modulu', dropdownOptions.modulu)}
          <TextInput
            label="Talep Eden"
            value={form.talepEden}
            placeholder="Ad Soyad"
            style={{ margin: 16, backgroundColor: DefaultThemeProperty.Gray_color4 }}
            onChangeText={(value) => handleChange('talepEden', value)}
          />
          <TextInput
            label="Talep Sorumlusu"
            value={form.talepSorumlusu}
            placeholder="Ad Soyad"
            style={{ margin: 16, backgroundColor: DefaultThemeProperty.Gray_color4 }}
            onChangeText={(value) => handleChange('talepSorumlusu', value)}
          />
          <Text style={styles.subtitle}>Detaylı Açıklama</Text>
          <TextInput
            label="Konu"
            value={form.konu}
            style={{ margin: 16, backgroundColor: DefaultThemeProperty.Gray_color4 }}
            onChangeText={(value) => handleChange('konu', value)}
          />
          <View style={{ margin: 16, backgroundColor: DefaultThemeProperty.Gray_color4, height: 150 }}>
            <TextInput
              label="Açıklama"
              value={form.aciklama}
              style={{ flex: 1, paddingTop: 0, textAlignVertical: 'top' }}
              multiline
              numberOfLines={10}
              onChangeText={(value) => handleChange('aciklama', value)}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Vazgeçççww"
              onPress={() => {}}
              style={[styles.button, styles.cancelButton]}
              color={DefaultThemeProperty.Danger_color} // Set the color here
            />
         
            <Button
              title="Kaydet"
              onPress={handleSubmit}
              style={styles.button}
              color={DefaultThemeProperty.Primary_color} // Set the color here
            />
          
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DefaultThemeProperty.Dark_color2,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: DefaultThemeProperty.Light_color1,
  },
  subtitle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: DefaultThemeProperty.Light_color1,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: DefaultThemeProperty.Gray_color2,
    borderRadius: 5,
    backgroundColor: DefaultThemeProperty.Gray_color4,
  },
  dropdownText: {
    color: DefaultThemeProperty.Light_color1,
  },
  dropdownOptions: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: DefaultThemeProperty.Gray_color2,
    borderRadius: 5,
    backgroundColor: DefaultThemeProperty.Gray_color4,
  },
  dropdownOption: {
    padding: 10,
  },
  dropdownOptionText: {
    color: DefaultThemeProperty.Light_color1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
  },
  cancelButton: {
    marginRight: 10,
  },
});

export default TalepGiris;