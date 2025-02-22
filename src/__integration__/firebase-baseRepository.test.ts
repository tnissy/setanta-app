import { BaseRepository } from '../services/baseRepository';

describe('firebase-baseRepository のテスト', () => {

    afterAll(async () => {
        const repo = BaseRepository.getInstance();
        await repo.logout();  // logout メソッドが存在する場合は接続を終了
    });

    test('トレイニー情報を正しく取得できる', async () => {
        const repo = BaseRepository.getInstance();
        await repo.loginWithEmail('mo2.ayase@gmail.com', 'test4545');
        const traineeData = await repo.getTrainee();
        expect(traineeData).toBeDefined();
        console.log(traineeData);
    });

    // test('トレイニー情報を取得できない', async () => {
    //     const repo = BaseRepository.getInstance();
    //     try {
    //         await repo.loginWithEmail('test@example.com', 'password123');
    //     } catch (error) {
    //         // 無効な認証エラーをキャッチして無視する
    //     }
    //     const traineeData = await repo.getTrainee();
    //     expect(traineeData).toBeNull();
    // });
});