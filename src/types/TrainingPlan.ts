import { z } from "zod";

export const trainingPlanSchema = z.object({
    planName: z.string(),
    description: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    frequency: z.number(),
    targetIncreaseRate: z.number(),
    goals: z.object({
        chest: z.number(),
        shoulder: z.number(),
        back: z.number(),
        abs: z.number(),
        arm: z.number(),
        forearm: z.number(),
        leg: z.number(),
        calf: z.number(),
    }),
    createdAt: z.date(),
});

export type TrainingPlan = z.infer<typeof trainingPlanSchema>;