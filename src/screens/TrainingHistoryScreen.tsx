// src/screens/TrainingHistoryScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

interface TrainingHistory {
  id: string;
  date: string;
  exercise: string;
  details: string;
}

const TrainingHistoryScreen: React.FC = () => {
  const [history, setHistory] = useState<TrainingHistory[]>([
    { id: '1', date: '2025-02-01', exercise: 'ベンチプレス', details: '3セット x 10回' },
    { id: '2', date: '2025-02-03', exercise: 'スクワット', details: '4セット x 8回' },
  ]);

  const renderHistoryItem = ({ item }: { item: TrainingHistory }) => (
    <View style={styles.historyItem}>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.exercise}>{item.exercise}</Text>
      <Text style={styles.details}>{item.details}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>トレーニング履歴</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={renderHistoryItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  historyItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  exercise: {
    fontSize: 16,
    color: '#007AFF',
  },
  details: {
    fontSize: 14,
    color: '#555',
  },
});

export default TrainingHistoryScreen;