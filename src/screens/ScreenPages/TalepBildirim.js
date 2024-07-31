import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';

const data = [
  { id: '1', type: 'Açık Talepler', count: "xXx", color: '#303030', subItems: [{ id: '1-1', type: 'Alt Açık Talep 1', count: 'x1', color: '#303030' }, { id: '1-2', type: 'Alt Açık Talep 2', count: 'x2', color: '#303030' }] },
  { id: '2', type: 'Kapalı Talepler', count: "xXx", color: '#303030', subItems: [{ id: '2-1', type: 'Alt Kapalı Talep 1', count: 'x1', color: '#303030' }] },
  { id: '3', type: 'İptal Edilen Talepler', count: "xXx", color: '#303030', subItems: [] },
  { id: '4', type: 'Reddedilen Talepler', count: "xXx", color: '#303030', subItems: [] },
];

const TalepBildirim = () => {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity 
        onPress={() => toggleExpand(item.id)} 
        style={[styles.card, { backgroundColor: item.color }]} 
      >
        <View style={styles.iconContainer}>
          {/* Add icons if needed */}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.countText}>{item.count}</Text>
          <Text style={styles.typeText}>{item.type}</Text>
        </View>
      </TouchableOpacity>
      {expandedItems[item.id] && item.subItems && (
        <FlatList
          data={item.subItems}
          renderItem={renderSubItem}
          keyExtractor={(subItem) => subItem.id}
          style={styles.subItemList}
        />
      )}
    </View>
  );

  const renderSubItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: item.color, marginLeft: 20 }]}>
      <View style={styles.textContainer}>
        <Text style={styles.countText}>{item.count}</Text>
        <Text style={styles.typeText}>{item.type}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    margin: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'red',
  },
  iconContainer: {
    marginRight: 16,
  },
  textContainer: {
    flexDirection: 'column',
  },
  countText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  typeText: {
    fontSize: 16,
    color: '#aaa',
  },
  subItemList: {
    paddingLeft: 52,
  },
});

export default TalepBildirim;
