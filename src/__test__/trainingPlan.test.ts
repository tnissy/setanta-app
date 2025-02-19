import { TrainingPlan } from '../types/trainingPlan';

describe('TrainingPlan Structure', () => {
  it('should create a valid TrainingPlan object', () => {
    const plan: TrainingPlan = {
      id: 'plan001',
      planName: 'Summer Strength',
      description: 'Build muscle for summer!',
      startDate: '2025-06-01',
      endDate: '2025-08-31',
      frequency: 3,
      targetIncreaseRate: 10,
      goals: {
        chest: 10,
        shoulder: 8,
        back: 12,
        abs: 5,
        arm: 10,
        forearm: 7,
        leg: 20,
        calf: 5,
      },
      createdAt: new Date('2025-01-01'),
    };

    expect(plan.id).toBe('plan001');
    expect(plan.planName).toBe('Summer Strength');
    expect(plan.frequency).toBe(3);
    expect(plan.goals.chest).toBe(10);
    expect(plan.createdAt.toISOString()).toBe(new Date('2025-01-01').toISOString());
  });
});