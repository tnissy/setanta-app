import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { workoutSessionSchema, WorkoutSession } from '../types/workoutSession';

const WorkoutSessionScreen: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [workoutName, setWorkoutName] = useState('');
  const [exercises, setExercises] = useState('');

  const handleSaveSession = async () => {
    try {
      const sessionData: WorkoutSession = {
        userId,
        workout: {
          name: workoutName,
          exercises: exercises.split(',').map(item => ({
            exerciseType: item.trim(),
          })),
        },
      };

      workoutSessionSchema.parse(sessionData);

      await addDoc(collection(db, 'workoutSessions'), sessionData);
      Alert.alert('成功', 'ワークアウトセッションが保存されたよ！');

      setUserId('');
      setWorkoutName('');
      setExercises('');
    } catch (error: any) {
      Alert.alert('エラー', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ワークアウトセッション記録</Text>
      <TextInput
        style={styles.input}
        placeholder="ユーザーID"
        value={userId}
        onChangeText={setUserId}
      />
      <TextInput
        style={styles.input}
        placeholder="ワークアウト名"
        value={workoutName}
        onChangeText={setWorkoutName}
      />
      <TextInput
        style={styles.input}
        placeholder="エクササイズ種別リスト (カンマ区切り)"
        value={exercises}
        onChangeText={setExercises}
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveSession}>
        <Text style={styles.buttonText}>保存</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WorkoutSessionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});