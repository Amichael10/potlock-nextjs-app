import { z } from "zod";

import {
  applicationReviewSchema,
  challengeSchema,
  fundMatchingPoolSchema,
  newApplicationSchema,
} from "./schemas";

export type FundMatchingPoolInputs = z.infer<typeof fundMatchingPoolSchema>;

export type NewApplicationInputs = z.infer<typeof newApplicationSchema>;

export type ChallengeInputs = z.infer<typeof challengeSchema>;

export type ApplicationReviewInputs = z.infer<typeof applicationReviewSchema>;

export type ConfigProtocol = {
  basis_points: number;
  account_id: string;
};
