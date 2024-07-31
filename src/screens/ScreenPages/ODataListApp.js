import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, useColorScheme } from 'react-native';
import { Searchbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { FlashList } from '@shopify/flash-list';
import { DefaultThemeProperty } from '../../utils/appThemeStyles';
import { useNavigation } from '@react-navigation/native';

const STORAGE_KEY = 'page_user_talepconfig';
const INITIAL_COLUMNS = {
  TalepID: true,
  TalepKonu: true,
  ModulID: true,
  GOnaylamaZamani: false,
  TalepZamani: false,
  MasterDurum: false
};

const INITIAL_SEARCH_COLUMNS = {
  TalepID: true,
  TalepKonu: true,
  ModulID: true,
  GOnaylamaZamani: false,
  TalepZamani: false,
  MasterDurum: false
};

const ODataListApp = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');
  const [searchcolumns, setSearchColumns] = useState(INITIAL_SEARCH_COLUMNS);
  const [columns, setColumns] = useState(INITIAL_COLUMNS);
  const [jwtToken, setJwtToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjIzNzkwMjM4LWE2NjEtNDM2Ny04NTY0LTgyNjBlZmZlN2ZmYSIsIlhhZlNlY3VyaXR5QXV0aFBhc3NlZCI6IlhhZlNlY3VyaXR5QXV0aFBhc3NlZCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJkZW5lbWV1c2VyIiwiWGFmU2VjdXJpdHkiOiJYYWZTZWN1cml0eSIsIlhhZkxvZ29uUGFyYW1zIjoicTFZS0xVNHQ4a3ZNVFZXeVVrcEp6VXZOVFMwRkNpanBLQVVrRmhlWDV4ZWxBTVVOall4TlRNMlVhZ0U9IiwiZXhwIjoxNzIyNDMyODY5fQ.tR6qU0NRBECuul4CC1ZkzDHya8dFAFyp5MqZMKcbTm0');

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const backgroundColor = isDarkMode ? '#1a1a1a' : DefaultThemeProperty.Light_color1;
  const fontColor = isDarkMode ? DefaultThemeProperty.Light_color2 : DefaultThemeProperty.Gray_color3;
  const cardBackgroundColor = isDarkMode ? '#424242' : '#ffffff';
  const cardTextColor = isDarkMode ? '#ffffff' : '#000000';
  const navigation = useNavigation();

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const storedColumns = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedColumns) {
          setColumns(JSON.parse(storedColumns));
        }
      } catch (error) {
        console.error('Error loading config from storage:', error);
      }
    };
    loadConfig();
  }, []);

  useEffect(() => {
    fetchData();
  }, [page, query, columns]);

  const fetchData = async () => {
    setLoading(true);
    const selectedColumns = Object.keys(columns).filter(key => columns[key]);
    const filterQuery = buildFilterQuery();

    try {
      const response = await axios.get(
        `http://10.10.16.10:1150/api/odata/Talepler?$select=${selectedColumns.join(',')}&$expand=ModulID($select=ModulKodu,ModulAdi),TalepTipID($select=TalepTipAdi),TalepDurumID($select=TalepDurumID,TalepDurumKodu,TalepDurumAdi,MasterDurum),TalepEdenPersonelID($select=PersonelAdi)&$orderby=TalepID desc&$count=true&$skip=${page * 20}&$top=20${filterQuery ? "&$filter=" + filterQuery : ""}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        }
      );
      setData(page === 0 ? response.data.value : [...data, ...response.data.value]);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const buildFilterQuery = () => {
    const filters = [];
    if (searchcolumns.TalepID && query) filters.push(`TalepID eq ${query}`);
    if (searchcolumns.TalepKonu && query) filters.push(`contains(TalepKonu, '${query}')`);
    // Diğer kolonlar için benzer şekilde ekleme yapabilirsiniz.
    // MasterDurum'u Kapalı olanları çekmek için filtre ekleyin
    filters.push("TalepDurumID/MasterDurum eq 'Kapali'");
    return filters.length ? filters.join(' or ') : null;
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSearch = () => {
    setPage(0);
    fetchData();
  };

  const handleColumnToggle = async (key) => {
    const updatedColumns = { ...columns, [key]: !columns[key] };
    setColumns(updatedColumns);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedColumns));
    } catch (error) {
      console.error('Error saving config to storage:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }) + ' ' + date.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderRequestCard = (item) => (
    <TouchableOpacity key={item.TalepID} onPress={() => navigation.navigate('TaskDetails', { task: item })}>
      <View style={[styles.card, { backgroundColor: cardBackgroundColor, borderColor: 'red' }]}>
        <Text style={[styles.projectName, { color: cardTextColor }]}>Talep Konusu: {item.TalepKonu}</Text>
        <Text style={[styles.bodyText, { color: cardTextColor }]}>Talep ID: {item.TalepID}</Text>
        <Text style={[styles.bodyText, { color: cardTextColor }]}>Talep Eden: {item.TalepEdenPersonelID?.PersonelAdi}</Text>
        <Text style={[styles.bodyText, { color: cardTextColor }]}>Talep Tipi: {item.TalepTipID?.TalepTipAdi}</Text>
        <Text style={[styles.bodyText, { color: cardTextColor }]}>Tarih: {formatDate(item.TalepZamani)}</Text>
        <Text style={[styles.bodyText, { color: cardTextColor }]}>Durum: {item.TalepDurumID?.MasterDurum}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View>
      <Searchbar
        placeholder="Ara..."
        onChangeText={(text) => setQuery(text)}
        value={query}
        onSubmitEditing={handleSearch}
        style={styles.searchbar}
      />
      <Text style={[styles.headerText, { color: fontColor }]}>Kapalı Talepler</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {renderHeader()}
      <FlashList
        data={data}
        renderItem={({ item }) => renderRequestCard(item)}
        keyExtractor={(item) => item.TalepID.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color={fontColor} /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  searchbar: {
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  projectName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bodyText: {
    fontSize: 14,
  },
});

export default ODataListApp;
