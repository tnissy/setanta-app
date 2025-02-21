// src/screens/WorkoutSessionScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
// DBアクセス用のサービスは別ファイルに実装している前提
import { fetchPreviousExerciseData, saveWorkoutSessionData } from '../services/workoutSessionService';

interface ExerciseSession {
  id: string;
  name: string;
  reps: number;
  sets: number;
  weight: number;
}

const WorkoutSessionScreen: React.FC = () => {
  const [exerciseSessions, setExerciseSessions] = useState<ExerciseSession[]>([]);

  useEffect(() => {
    // 選択されたワークアウトセッションからエクササイズリストを取得する（ここではダミーデータを使用）
    const initialExercises: ExerciseSession[] = [
      { id: '1', name: 'Bench Press', reps: 10, sets: 3, weight: 50 },
      { id: '2', name: 'Squat', reps: 12, sets: 3, weight: 70 },
      { id: '3', name: 'Deadlift', reps: 8, sets: 3, weight: 80 },
    ];

    // 各エクササイズについて、過去の実施データがあればコピーする
    const loadInitialData = async () => {
      const updatedExercises = await Promise.all(
        initialExercises.map(async (exercise) => {
          const prevData = await fetchPreviousExerciseData(exercise.id);
          return prevData ? { ...exercise, ...prevData } : exercise;
        })
      );
      setExerciseSessions(updatedExercises);
    };

    loadInitialData();
  }, []);

  // 「前回と同じ内容で実施」
  const handleSameAsLastTime = async () => {
    const updatedExercises = await Promise.all(
      exerciseSessions.map(async (exercise) => {
        const prevData = await fetchPreviousExerciseData(exercise.id);
        return prevData ? { ...exercise, ...prevData } : exercise;
      })
    );
    setExerciseSessions(updatedExercises);
    Alert.alert('更新', '前回のデータをコピーしました！');
  };

  // 「負荷を上げて実施」：例として各エクササイズの負荷を5kgずつ増やす
  const handleIncreaseLoad = () => {
    const updatedExercises = exerciseSessions.map((exercise) => ({
      ...exercise,
      weight: exercise.weight + 5,
    }));
    setExerciseSessions(updatedExercises);
    Alert.alert('更新', '負荷を上げました！');
  };

  // 「完了」：セッションデータをDBに保存する
  const handleComplete = async () => {
    try {
      await saveWorkoutSessionData(exerciseSessions);
      Alert.alert('完了', 'ワークアウトセッションが保存されました！');
      // 必要なら画面遷移などの処理を追加
    } catch (error) {
      console.error('Error saving workout session:', error);
      Alert.alert('エラー', 'セッションの保存に失敗しました。');
    }
  };

  // レップ数・セット数・負荷を手動で更新するためのヘルパー関数
  const updateExerciseField = (id: string, field: 'reps' | 'sets' | 'weight', value: number) => {
    const updatedExercises = exerciseSessions.map((exercise) =>
      exercise.id === id ? { ...exercise, [field]: value } : exercise
    );
    setExerciseSessions(updatedExercises);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>エクササイズ実施</Text>
      {exerciseSessions.map((exercise, index) => (
        <View key={exercise.id} style={styles.exerciseContainer}>
          <Text style={styles.exerciseTitle}>
            {index + 1}. {exercise.name}
          </Text>
          <View style={styles.row}>
            <Text>レップ数: </Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={exercise.reps.toString()}
              onChangeText={(text) => updateExerciseField(exercise.id, 'reps', Number(text))}
            />
          </View>
          <View style={styles.row}>
            <Text>セット数: </Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={exercise.sets.toString()}
              onChangeText={(text) => updateExerciseField(exercise.id, 'sets', Number(text))}
            />
          </View>
          <View style={styles.row}>
            <Text>負荷 (kg): </Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={exercise.weight.toString()}
              onChangeText={(text) => updateExerciseField(exercise.id, 'weight', Number(text))}
            />
          </View>
        </View>
      ))}

      <View style={styles.buttonContainer}>
        <Button title="前回と同じ内容で実施" onPress={handleSameAsLastTime} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="負荷を上げて実施" onPress={handleIncreaseLoad} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="完了" onPress={handleComplete} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  exerciseContainer: {
    marginBottom: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
  },
  exerciseTitle: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 4,
    padding: 8,
    marginLeft: 8,
  },
  buttonContainer: {
    marginVertical: 10,
  },
});

export default WorkoutSessionScreen;