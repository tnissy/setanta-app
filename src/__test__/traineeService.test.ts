import { ensureTraineeDocument } from '../services/traineeService';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

// FILE: src/services/traineeService.test.ts


// Create mutable fake objects to simulate Firebase behavior.
const fakeAuth: { currentUser: { uid: string; displayName: string; email: string } | null } = { currentUser: null };
const fakeFirestore = {};
const fakeDocRef = {};

// Create mocks for firebase modules
jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(() => fakeAuth),
}));

jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn(() => ({})),
    doc: jest.fn(() => fakeDocRef),
    getDoc: jest.fn(),
    setDoc: jest.fn(),
    serverTimestamp: jest.fn(() => 'FAKE_TIMESTAMP'),
}));

describe('ensureTraineeDocument', () => {
    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;

    beforeEach(() => {
        // Clear mocks and reset fakeAuth currentUser.
        fakeAuth.currentUser = null;
        jest.clearAllMocks();
        console.log = jest.fn();
        console.error = jest.fn();
    });

    afterEach(() => {
        console.log = originalConsoleLog;
        console.error = originalConsoleError;
    });

    it('should log when no authenticated user', async () => {
        // currentUser is null
        fakeAuth.currentUser = null;

        await ensureTraineeDocument();

        expect(console.log).toHaveBeenCalledWith('認証ユーザが見つかりません');
    });

    it('should create trainee document if it does not exist', async () => {
        // Setup currentUser
        fakeAuth.currentUser = {
            uid: 'user-001',
            displayName: 'Test User',
            email: 'test@example.com',
        };

        // Mock getDoc to return a snapshot with exists() false.
        (getDoc as jest.Mock).mockResolvedValue({
            exists: () => false,
        });

        await ensureTraineeDocument();

        // Expect doc was called with correct parameters.
        expect(doc).toHaveBeenCalledWith(expect.any(Object), 'trainees', 'user-001');

        // Expected trainee data
        const expectedData = {
            name: 'Test User',
            email: 'test@example.com',
            weight: null,
            gender: 'other',
            createdAt: 'FAKE_TIMESTAMP',
        };

        // Verify setDoc was called with our fake doc reference and expected data.
        expect(setDoc).toHaveBeenCalledWith(fakeDocRef, expectedData);
        expect(console.log).toHaveBeenCalledWith('トレイニーのドキュメントを作成しました:', expectedData);
    });

    it('should not create document and log already exists if trainee document exists', async () => {
        // Setup currentUser
        fakeAuth.currentUser = {
            uid: 'user-002',
            displayName: 'Existing User',
            email: 'existing@example.com',
        };

        // Mock getDoc to return snapshot with exists() true.
        (getDoc as jest.Mock).mockResolvedValue({
            exists: () => true,
        });

        await ensureTraineeDocument();

        expect(console.log).toHaveBeenCalledWith('トレイニーのドキュメントは既に存在します');
        expect(setDoc).not.toHaveBeenCalled();
    });

    it('should log error when setDoc fails', async () => {
        // Setup currentUser
        fakeAuth.currentUser = {
            uid: 'user-003',
            displayName: 'Error User',
            email: 'error@example.com',
        };

        // Mock getDoc to return snapshot with exists() false.
        (getDoc as jest.Mock).mockResolvedValue({
            exists: () => false,
        });

        // Mock setDoc to reject with an error.
        const errorMessage = new Error('setDoc failure');
        (setDoc as jest.Mock).mockRejectedValue(errorMessage);

        await ensureTraineeDocument();

        // Expected trainee data
        const expectedData = {
            name: 'Error User',
            email: 'error@example.com',
            weight: null,
            gender: 'other',
            createdAt: 'FAKE_TIMESTAMP',
        };

        expect(setDoc).toHaveBeenCalledWith(fakeDocRef, expectedData);
        expect(console.error).toHaveBeenCalledWith('トレイニーのドキュメント作成に失敗しました:', errorMessage);
    });
});

// 閉じる: "jest テストを実行するには、拡張機能のインストールをおすすめします。"