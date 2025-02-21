import { z } from "zod";

export const workoutSessionSchema = z.object({
  userId: z.string(), // ユーザーID
  workout: z.object({
    name: z.string(), // ワークアウトの名前
    exercises: z.array(
      z.object({
        exerciseType: z.string(), // 各エクササイズの種別を実施順に格納
      })
    ),
  }),
  // ※ 1ユーザごとに最大10種類のワークアウトセッションが登録可能
});

export type WorkoutSession = z.infer<typeof workoutSessionSchema>;