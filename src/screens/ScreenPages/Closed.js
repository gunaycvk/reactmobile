import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, useColorScheme, ScrollView, TouchableOpacity } from "react-native";
import { Card, Searchbar } from 'react-native-paper'; 
import axios from 'axios';
import { DefaultThemeProperty } from "../../utils/appThemeStyles";

const api = axios.create({
    baseURL: 'http://10.10.16.10:1150/api/odata',
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjIzNzkwMjM4LWE2NjEtNDM2Ny04NTY0LTgyNjBlZmZlN2ZmYSIsIlhhZlNlY3VyaXR5QXV0aFBhc3NlZCI6IlhhZlNlY3VyaXR5QXV0aFBhc3NlZCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJkZW5lbWV1c2VyIiwiWGFmU2VjdXJpdHkiOiJYYWZTZWN1cml0eSIsIlhhZkxvZ29uUGFyYW1zIjoicTFZS0xVNHQ4a3ZNVFZXeVVrcEp6VXZOVFMwRkNpanBLQVVrRmhlWDV4ZWxBTVVOall4TlRNMlVhZ0U9IiwiZXhwIjoxNzIyMjY0MDAxfQ._M9WUmufOJeS8duFCF4GYSB1LF41Es3RLrrOP6XELsw',
    },
    timeout: 60000, // 60 saniye timeout
});

const Closed = ({ navigation, route }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const backgroundColor = isDarkMode ? '#1a1a1a' : DefaultThemeProperty.Light_color1;
  const fontColor = isDarkMode ? DefaultThemeProperty.Light_color2 : DefaultThemeProperty.Gray_color3;
  const cardBackgroundColor = isDarkMode ? '#424242' : '#ffffff';
  const cardTextColor = isDarkMode ? '#ffffff' : '#000000';

  const fetchTasks = async (retryCount = 3) => {
    try {
      const response = await api.get("/Talepler?$select=TalepID,TalepKonu,ModulID&$expand=ModulID($select=ModulKodu,ModulAdi),TalepTipID($select=TalepTipAdi)&$filter=TalepID eq 53 or contains(TalepKonu, 'Üretim')&$orderby=TalepID desc&$count=true&$skip=2&$top=5");
      setTasks(response.data.value);
      setLoading(false);
    } catch (error) {
      if (retryCount > 0) {
        console.log(`Retrying... (${3 - retryCount + 1})`);
        fetchTasks(retryCount - 1);
      } else {
        console.error('API request failed:', error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const onChangeSearch = query => setSearchQuery(query);

  const renderTaskCard = ({ item }) => (
    <TouchableOpacity key={item.TalepID} onPress={() => navigation.navigate('TaskDetails', { task: item })}>
      <Card style={[styles.card, { backgroundColor: cardBackgroundColor, borderColor: 'red' }]} elevation={2}>
        <Card.Title title={item.ModulID.ModulAdi} titleStyle={{ color: cardTextColor }} />
        <Card.Content>
          <Text style={[styles.bodyText, { color: cardTextColor }]}>Talep No: {item.TalepID}</Text>
          <Text style={[styles.bodyText, { color: cardTextColor }]}>Konu: {item.TalepKonu}</Text>
          <Text style={[styles.bodyText, { color: cardTextColor }]}>Modül: {item.ModulID.ModulKodu}</Text>
          <Text style={[styles.bodyText, { color: cardTextColor }]}>Talep Tipi: {item.TalepTipID?.TalepTipAdi}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  const filteredTasks = tasks.filter(task =>
    task.TalepKonu.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.TalepID.toString().includes(searchQuery) ||
    task.ModulID.ModulKodu.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.ModulID.ModulAdi.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (task.TalepTipID?.TalepTipAdi || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <Text style={[styles.header, { color: fontColor }]}>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.header, { color: fontColor }]}>Kapalı Talepler</Text>
      <Searchbar
        placeholder="Talep Ara"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
        inputStyle={{ color: 'black' }}
      />
      <ScrollView>
        <View style={styles.cardContainer}>
          {filteredTasks.map(task => renderTaskCard({ item: task }))}
        </View>
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
  cardContainer: {
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold'
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

export default Closed;
