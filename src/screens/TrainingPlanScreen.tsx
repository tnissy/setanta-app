// src/screens/TrainingPlanScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

interface TrainingPlan {
  id: string;
  title: string;
  description: string;
}

const TrainingPlanScreen: React.FC = () => {
  const [plans, setPlans] = useState<TrainingPlan[]>([
    { id: '1', title: 'プランA', description: '筋力アッププラン' },
    { id: '2', title: 'プランB', description: '持久力向上プラン' },
  ]);

  const renderPlanItem = ({ item }: { item: TrainingPlan }) => (
    <View style={styles.planItem}>
      <Text style={styles.planTitle}>{item.title}</Text>
      <Text style={styles.planDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>トレーニング計画</Text>
      <FlatList
        data={plans}
        keyExtractor={(item) => item.id}
        renderItem={renderPlanItem}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>新規計画作成</Text>
      </TouchableOpacity>
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
  planItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
  planTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  planDescription: {
    fontSize: 16,
    color: '#555',
  },
  button: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TrainingPlanScreen;