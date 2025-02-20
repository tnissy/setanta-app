import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import firebaseApp from '../firebaseConfig';
import { getTraineeDocument } from '../services/traineeService';

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const TraineeInfoScreen: React.FC = () => {
  const [trainee, setTrainee] = useState<any>(null);
  const [weight, setWeight] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // トレイニー情報を取得する関数
  const fetchTraineeData = async () => {
    // まずトレイニーのドキュメントが存在するか確認・作成
    await getTraineeDocument();
    const user = auth.currentUser;
    if (user) {
      const traineeDocRef = doc(db, 'trainees', user.uid);
      const traineeSnap = await getDoc(traineeDocRef);
      if (traineeSnap.exists()) {
        const data = traineeSnap.data();
        setTrainee(data);
        setWeight(data.weight ? String(data.weight) : '');
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTraineeData();
  }, []);

  // 体重更新処理
  const handleUpdate = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("エラー", "認証ユーザが見つかりません");
      return;
    }
    const traineeDocRef = doc(db, 'trainees', user.uid);
    const parsedWeight = parseFloat(weight);
    if (isNaN(parsedWeight)) {
      Alert.alert("エラー", "体重は数値で入力してください");
      return;
    }
    try {
      await updateDoc(traineeDocRef, { weight: parsedWeight });
      Alert.alert("成功", "体重を更新しました");
      // 更新後に最新の情報を再取得
      fetchTraineeData();
    } catch (error) {
      console.error(error);
      Alert.alert("エラー", "更新に失敗しました");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>読み込み中...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>名前: {trainee?.name}</Text>
      <Text style={styles.label}>メール: {trainee?.email}</Text>
      <Text style={styles.label}>体重 (kg):</Text>
      <TextInput
        style={styles.input}
        value={weight}
        onChangeText={setWeight}
        keyboardType="decimal-pad"
      />
      <Button title="更新" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 15,
  },
});

export default TraineeInfoScreen;