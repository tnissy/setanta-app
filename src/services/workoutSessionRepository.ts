import firebaseApp from '../firebaseConfig';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { WorkoutSession } from '../types/workoutSession';

export class WorkoutSessionRepository {
	static async createWorkoutSession(workoutSession: WorkoutSession): Promise<void> {
		const db = getFirestore(firebaseApp);
		try {
			await addDoc(collection(db, 'workoutSessions'), workoutSession);
			console.log('ワークアウトセッションの作成に成功しました');
		} catch (error) {
			console.error('ワークアウトセッション作成エラー:', error);
			throw error;
		}
	}
}
