// screens/ListScreen.js

import React, { useEffect, useState } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar 
} from 'react-native';
import axios from 'axios';

export default function ListScreen({ navigation, route }) {
  const [sensors, setSensors] = useState([]);
  const [apiUrl, setApiUrl] = useState(route.params?.apiUrl || 'http://localhost:3001');

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/sensors`);
      setSensors(data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => fetchData(), [apiUrl]);

  // adicionando botão de config no header
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text 
          onPress={() => navigation.navigate('Config', { apiUrl, setApiUrl })}
          style={styles.headerButton}
        >
          ⚙️
        </Text>
      )
    });
  }, [navigation, apiUrl]);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate('Detail', { sensor: item, apiUrl })}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text>Valor: <Text style={styles.value}>{item.value}</Text></Text>
      <Text>
        Status:{' '}
        <Text style={[
          styles.status, 
          item.status === 'OK' ? styles.ok : styles.alert
        ]}>
          {item.status}
        </Text>
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={sensors}
        keyExtractor={i => i.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f7',
  },
  headerButton: {
    marginRight: 16,
    fontSize: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    // sombra iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // elevação Android
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  value: {
    fontWeight: '700',
  },
  status: {
    fontWeight: '700',
  },
  ok: {
    color: '#2e7d32', // verde
  },
  alert: {
    color: '#c62828', // vermelho
  },
});
