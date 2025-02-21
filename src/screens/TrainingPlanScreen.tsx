// filepath: /Users/nsgctty/dev/setanta-app/src/screens/TrainingPlanScreen.tsx
import React, { useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { createTrainingPlan, getTraineeDocument } from '../services/Repository';
import { TrainingPlan } from '../types/TrainingPlan';

const TrainingPlanInputForm: React.FC = () => {
  const [chest, setChest] = React.useState('');
  const [shoulder, setShoulder] = React.useState('');
  const [back, setBack] = React.useState('');
  const [abs, setAbs] = React.useState('');
  const [arm, setArm] = React.useState('');
  const [forearm, setForearm] = React.useState('');
  const [leg, setLeg] = React.useState('');
  const [calf, setCalf] = React.useState('');
  const [targetDate, setTargetDate] = React.useState(
    new Date().toISOString().slice(0, 10) // 今日の日付をデフォルトでセット
  );

  const handleSubmit = async () => {
    const trainingPlan: TrainingPlan = {
      planId: "",
      userId: "dummyUser", // ここは実際のユーザーID取得に変更する
      targetDate: targetDate,
      targetIncreaseRates: {
        chest: Number(chest),
        shoulder: Number(shoulder),
        back: Number(back),
        abs: Number(abs),
        arm: Number(arm),
        forearm: Number(forearm),
        leg: Number(leg),
        calf: Number(calf),
      },
      createdAt: new Date(),
    };

    try {
      await createTrainingPlan(trainingPlan);
      Alert.alert("成功", "トレーニング計画が保存されました！");
      // フォームのリセット
      setChest('');
      setShoulder('');
      setBack('');
      setAbs('');
      setArm('');
      setForearm('');
      setLeg('');
      setCalf('');
      setTargetDate(new Date().toISOString().slice(0, 10));
    } catch (error: any) {
      console.error("Error adding training plan:", error);
      Alert.alert("エラー", "トレーニング計画の保存に失敗しました。");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.form}>
      <Text style={styles.subtitle}>目標日</Text>
      <TextInput
        style={styles.input}
        value={targetDate}
        onChangeText={setTargetDate}
        placeholder="YYYY-MM-DD"
      />

      <Text style={styles.subtitle}>部位ごとの目標増加率 (%)</Text>

      <Text>胸</Text>
      <TextInput
        style={styles.input}
        value={chest}
        onChangeText={setChest}
        placeholder="例: 8"
        keyboardType="numeric"
      />

      <Text>肩</Text>
      <TextInput
        style={styles.input}
        value={shoulder}
        onChangeText={setShoulder}
        placeholder="例: 7"
        keyboardType="numeric"
      />

      <Text>背中</Text>
      <TextInput
        style={styles.input}
        value={back}
        onChangeText={setBack}
        placeholder="例: 9"
        keyboardType="numeric"
      />

      <Text>腹筋</Text>
      <TextInput
        style={styles.input}
        value={abs}
        onChangeText={setAbs}
        placeholder="例: 6"
        keyboardType="numeric"
      />

      <Text>上腕</Text>
      <TextInput
        style={styles.input}
        value={arm}
        onChangeText={setArm}
        placeholder="例: 8"
        keyboardType="numeric"
      />

      <Text>前腕</Text>
      <TextInput
        style={styles.input}
        value={forearm}
        onChangeText={setForearm}
        placeholder="例: 5"
        keyboardType="numeric"
      />

      <Text>大腿</Text>
      <TextInput
        style={styles.input}
        value={leg}
        onChangeText={setLeg}
        placeholder="例: 10"
        keyboardType="numeric"
      />

      <Text>下腿</Text>
      <TextInput
        style={styles.input}
        value={calf}
        onChangeText={setCalf}
        placeholder="例: 4"
        keyboardType="numeric"
      />

      <Button title="保存" onPress={handleSubmit} />
    </ScrollView>
  );
};

const TrainingPlanScreen: React.FC = () => {
  useEffect(() => {
    // 画面がマウントされたタイミングで、トレイニーのドキュメント存在確認＆作成を実施
    getTraineeDocument();
  }, []);

  return (
    <View style={styles.container}>
      <TrainingPlanInputForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: 'bold',
  },
});

export default TrainingPlanScreen;