import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const TrainingPlanInputForm: React.FC = () => {
  const [planName, setPlanName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [frequency, setFrequency] = React.useState('');
  const [targetIncreaseRate, setTargetIncreaseRate] = React.useState('');
  const [chest, setChest] = React.useState('');
  const [shoulder, setShoulder] = React.useState('');
  const [back, setBack] = React.useState('');
  const [abs, setAbs] = React.useState('');
  const [arm, setArm] = React.useState('');
  const [forearm, setForearm] = React.useState('');
  const [leg, setLeg] = React.useState('');
  const [calf, setCalf] = React.useState('');

  const handleSubmit = () => {
    console.log({
      planName,
      description,
      startDate,
      endDate,
      frequency,
      targetIncreaseRate,
      chest,
      shoulder,
      back,
      abs,
      arm,
      forearm,
      leg,
      calf,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.form}>
      <Text>トレーニングプラン名</Text>
      <TextInput
        style={styles.input}
        value={planName}
        onChangeText={setPlanName}
        placeholder="プラン名を入力"
      />
      
      <Text>開始日</Text>
      <TextInput
        style={styles.input}
        value={startDate}
        onChangeText={setStartDate}
        placeholder="YYYY-MM-DD"
      />

      <Text>終了日</Text>
      <TextInput
        style={styles.input}
        value={endDate}
        onChangeText={setEndDate}
        placeholder="YYYY-MM-DD"
      />

      <Text>トレーニング頻度（週あたり）</Text>
      <TextInput
        style={styles.input}
        value={frequency}
        onChangeText={setFrequency}
        placeholder="週あたりの回数"
        keyboardType="numeric"
      />

      <Text>全体の目標増加率 (%)</Text>
      <TextInput
        style={styles.input}
        value={targetIncreaseRate}
        onChangeText={setTargetIncreaseRate}
        placeholder="例: 10"
        keyboardType="numeric"
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

      <Text>説明</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="説明を入力"
        multiline
      />

      <Button title="保存" onPress={handleSubmit} />
    </ScrollView>
  );
};

const TrainingPlanScreen: React.FC = () => {
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