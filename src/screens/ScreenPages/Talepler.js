import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme, ScrollView } from "react-native";
import { Searchbar } from 'react-native-paper';
import { DefaultThemeProperty } from "../../utils/appThemeStyles";
import { useNavigation } from '@react-navigation/native';

const dummyRequests = [
  {
    id: 'GNC243530',
    projectName: 'KENDİN YÖNET V2',
    requester: 'MERT KUŞKAPAN',
    status: 'AÇIK',
    date: '6.02.2024',
    points: 21
  },
  {
    id: 'GNC245195',
    projectName: 'FUAR',
    requester: 'KORAY YAMAN',
    status: 'AÇIK',
    date: '27.03.2024',
    points: 1
  },
  {
    id: 'GNC245195',
    projectName: 'FUAR',
    requester: 'Günay Çevik',
    status: 'AÇIK',
    date: '25.07.2025',
    points: 15
  },
];

const Talepler = () => {
  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const backgroundColor = isDarkMode ? '#1a1a1a' : DefaultThemeProperty.Light_color1;
  const fontColor = isDarkMode ? DefaultThemeProperty.Light_color2 : DefaultThemeProperty.Gray_color3;
  const cardBackgroundColor = isDarkMode ? '#424242' : '#ffffff';
  const cardTextColor = isDarkMode ? '#ffffff' : '#000000';
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const filteredRequests = dummyRequests.filter(request =>
    request.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.requester.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.date.includes(searchQuery)
  );

  const renderRequestCard = (item) => (
    <TouchableOpacity key={item.id} onPress={() => navigation.navigate('TaskDetails', { task: item })}>
      <View style={[styles.card, { backgroundColor: cardBackgroundColor, borderColor: 'red' }]}>
        <Text style={[styles.projectName, { color: cardTextColor }]}>{item.projectName}</Text>
        <Text style={[styles.bodyText, { color: cardTextColor }]}>Talep No: {item.id}</Text>
        <Text style={[styles.bodyText, { color: cardTextColor }]}>Talep Eden: {item.requester}</Text>
        <Text style={[styles.bodyText, { color: cardTextColor }]}>Durum: {item.status}</Text>
        <Text style={[styles.bodyText, { color: cardTextColor }]}>Tarih: {item.date}</Text>
        <View style={styles.pointsBadge}>
          <Text style={styles.pointsText}>{item.points} P</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.header, { color: fontColor }]}>Açık Talepler</Text>
      <Searchbar
        placeholder="Talep Ara"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
        inputStyle={{ color: 'black' }} 
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {filteredRequests.map(renderRequestCard)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchbar: {
    marginBottom: 16,
    zIndex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  card: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    position: 'relative', // Ensure points badge is correctly positioned
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bodyText: {
    fontSize: 14,
  },
  pointsBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#4a69bd',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  pointsText: {
    color: 'white',
    fontSize: 12,
  },
});

export default Talepler;
