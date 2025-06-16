// screens/DetailScreen.js

import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis
} from 'victory';

export default function DetailScreen({ route }) {
  const { sensor, apiUrl } = route.params;
  const [history, setHistory] = useState(sensor.history || []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${apiUrl}/sensors/${sensor.id}`);
      setHistory(response.data.history);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Histórico de {sensor.name}</Text>

      <View style={styles.chartContainer}>
        <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
          {/* Eixo X: índice do ponto */}
          <VictoryAxis
            tickFormat={(t) => `#${t}`}
          />
          {/* Eixo Y: valor do sensor */}
          <VictoryAxis dependentAxis />

          <VictoryLine
            data={history.map((value, idx) => ({ x: idx + 1, y: value }))}
          />
        </VictoryChart>
      </View>

      <Button title="Atualizar" onPress={fetchHistory} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 18,
    marginBottom: 12
  },
  chartContainer: {
    height: 250,
    marginBottom: 24
  }
});
