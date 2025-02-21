import exerciseTypeList from '../assets/exerciseTypeList.json';

export interface ExerciseSet {
  weight: number | string;
  reps: number | string;
}

export interface ExerciseSession {
  id: string;
  exerciseType: string;
  sets: ExerciseSet[];
  memo: string;
  status: '未実施' | '完了';
}

export interface WorkoutSessionData {
  workout: {
    name: string;
    exercises: ExerciseSession[];
  };
}

/**
 * ダミーのワークアウトセッションデータを返す関数
 */
export const fetchWorkoutSession = async (sessionId: string): Promise<WorkoutSessionData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        workout: {
          name: "ダミーワークアウト",
          exercises: [
            {
              id: "1",
              exerciseType: "ベンチプレス",
              sets: [
                { weight: 55, reps: 12 },
                { weight: 55, reps: 12 },
                { weight: 55, reps: 12 }
              ],
              memo: "",
              status: "未実施"
            },
            {
              id: "2",
              exerciseType: "スクワット",
              sets: [
                { weight: 75, reps: 10 },
                { weight: 75, reps: 10 },
                { weight: 75, reps: 10 }
              ],
              memo: "",
              status: "未実施"
            },
            {
              id: "3",
              exerciseType: "デッドリフト",
              sets: [
                { weight: 95, reps: 8 },
                { weight: 95, reps: 8 },
                { weight: 95, reps: 8 }
              ],
              memo: "",
              status: "未実施"
            }
          ]
        }
      });
    }, 500);
  });
};

/**
 * 指定されたエクササイズIDに対して、前回の実施データをダミーで返す関数
 * （今回は簡略化しているが、必要に応じて詳細なデータに拡張可能）
 */
export const fetchPreviousExerciseData = async (
  exerciseId: string
): Promise<Partial<ExerciseSession> | null> => {
  const dummyData: { [key: string]: Partial<ExerciseSession> } = {
    '1': { /* 前回のデータがあればここに記述 */ },
    '2': { /* 前回のデータがあればここに記述 */ },
    // 追加可能
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyData[exerciseId] || null);
    }, 500);
  });
};

/**
 * ワークアウトセッションのデータを保存する処理（モック実装）
 * 実際のDB保存は行わず、コンソール出力で代用
 */
export const saveWorkoutSessionData = async (
  sessionData: WorkoutSessionData
): Promise<void> => {
  console.log('Mock saving workout session data:', sessionData);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};

/**
 * ダミーのエクササイズタイプリストを返す関数
 * （src/assets/exerciseTypeList.json の内容を返却）
 */
export const fetchExerciseTypeList = async (): Promise<any[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(exerciseTypeList);
    }, 300);
  });
};