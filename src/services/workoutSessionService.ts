// src/services/workoutSessionService.ts

export interface ExerciseSession {
    id: string;
    name: string;
    reps: number;
    sets: number;
    weight: number;
  }
  
  /**
   * 指定されたエクササイズIDに対して、前回の実施データをダミーで返す関数
   * DBアクセスは行わず、モックデータを返す
   */
  export const fetchPreviousExerciseData = async (
    exerciseId: string
  ): Promise<Partial<ExerciseSession> | null> => {
    // ダミーデータの定義
    const dummyData: { [key: string]: Partial<ExerciseSession> } = {
      '1': { reps: 12, sets: 3, weight: 55 },
      '2': { reps: 10, sets: 4, weight: 75 },
      // 必要に応じて追加のダミーデータを設定可能
    };
  
    // 非同期処理を模倣するためにsetTimeoutを利用
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dummyData[exerciseId] || null);
      }, 500);
    });
  };
  
  /**
   * エクササイズセッションのデータをDBに保存する処理（モック実装）
   * 実際の保存処理は行わず、コンソールに出力するだけ
   */
  export const saveWorkoutSessionData = async (
    sessionData: ExerciseSession[]
  ): Promise<void> => {
    console.log('Mock saving workout session data:', sessionData);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  };