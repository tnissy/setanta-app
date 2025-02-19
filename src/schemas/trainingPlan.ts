import { z } from 'zod';

const numberString = z.string().refine(
  (val) => !isNaN(Number(val)) && val !== '',
  { message: '数値を入力してください' }
);

const dateString = z.string().regex(
  /^\d{4}-\d{2}-\d{2}$/,
  { message: '正しい日付形式で入力してください (YYYY-MM-DD)' }
);

export const trainingGoalsSchema = z.object({
  chest: numberString,
  shoulder: numberString,
  back: numberString,
  abs: numberString,
  arm: numberString,
  forearm: numberString,
  leg: numberString,
  calf: numberString,
});

export const trainingPlanSchema = z.object({
  planName: z.string().min(1, { message: 'プラン名を入力してください' }),
  description: z.string(),
  startDate: dateString,
  endDate: dateString,
  frequency: numberString,
  targetIncreaseRate: numberString,
  goals: trainingGoalsSchema,
}).refine((data) => {
  const start = new Date(data.startDate);
  const end = new Date(data.endDate);
  return start <= end;
}, {
  message: "終了日は開始日より後の日付を指定してください",
  path: ["endDate"],
});

export type TrainingPlanFormData = z.infer<typeof trainingPlanSchema>;
