import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

// トップページ（ホーム画面）
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ホーム画面</Text>
      <Button
        title="トレーニング計画入力へ"
        onPress={() => navigation.navigate('TrainingPlan')}
      />
    </View>
  );
}

// トレーニング計画入力画面
function TrainingPlanScreen() {
  // 各入力項目のstateを定義
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [frequencyPerWeek, setFrequencyPerWeek] = useState('');
  const [targetIncreaseRate, setTargetIncreaseRate] = useState('');
  const [chest, setChest] = useState('');
  const [shoulder, setShoulder] = useState('');
  const [back, setBack] = useState('');
  const [abs, setAbs] = useState('');
  const [arm, setArm] = useState('');
  const [forearm, setForearm] = useState('');
  const [leg, setLeg] = useState('');
  const [calf, setCalf] = useState('');

  const handleSubmit = () => {
    // ここでバリデーションやAPI送信の処理を追加してね
    console.log({
      startDate,
      endDate,
      frequencyPerWeek,
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
    alert('トレーニング計画が保存されたよ！');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>トレーニング計画入力</Text>
      
      <Text>開始日</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        value={startDate}
        onChangeText={setStartDate}
      />

      <Text>終了日</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        value={endDate}
        onChangeText={setEndDate}
      />

      <Text>週あたりのトレーニング回数</Text>
      <TextInput
        style={styles.input}
        placeholder="例: 3"
        keyboardType="numeric"
        value={frequencyPerWeek}
        onChangeText={setFrequencyPerWeek}
      />

      <Text>全体の目標増加率 (%)</Text>
      <TextInput
        style={styles.input}
        placeholder="例: 10"
        keyboardType="numeric"
        value={targetIncreaseRate}
        onChangeText={setTargetIncreaseRate}
      />

      <Text style={styles.subtitle}>部位ごとの目標増加率 (%)</Text>
      
      <Text>胸</Text>
      <TextInput
        style={styles.input}
        placeholder="例: 8"
        keyboardType="numeric"
        value={chest}
        onChangeText={setChest}
      />

      <Text>肩</Text>
      <TextInput
        style={styles.input}
        placeholder="例: 7"
        keyboardType="numeric"
        value={shoulder}
        onChangeText={setShoulder}
      />

      <Text>背中</Text>
      <TextInput
        style={styles.input}
        placeholder="例: 9"
        keyboardType="numeric"
        value={back}
        onChangeText={setBack}
      />

      <Text>腹</Text>
      <TextInput
        style={styles.input}
        placeholder="例: 6"
        keyboardType="numeric"
        value={abs}
        onChangeText={setAbs}
      />

      <Text>上腕</Text>
      <TextInput
        style={styles.input}
        placeholder="例: 8"
        keyboardType="numeric"
        value={arm}
        onChangeText={setArm}
      />

      <Text>前腕</Text>
      <TextInput
        style={styles.input}
        placeholder="例: 5"
        keyboardType="numeric"
        value={forearm}
        onChangeText={setForearm}
      />

      <Text>腿</Text>
      <TextInput
        style={styles.input}
        placeholder="例: 10"
        keyboardType="numeric"
        value={leg}
        onChangeText={setLeg}
      />

      <Text>脛</Text>
      <TextInput
        style={styles.input}
        placeholder="例: 4"
        keyboardType="numeric"
        value={calf}
        onChangeText={setCalf}
      />

      <Button title="保存" onPress={handleSubmit} />
    </ScrollView>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen
          name="TrainingPlan"
          component={TrainingPlanScreen}
          options={{ title: 'トレーニング計画入力' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});