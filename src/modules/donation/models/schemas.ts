import { UseFormReturn } from "react-hook-form";
import {
  infer as FromSchema,
  array,
  boolean,
  literal,
  nativeEnum,
  number,
  object,
  preprocess,
  string,
} from "zod";

import { NEAR_TOKEN_DENOM } from "@/common/constants";
import { AvailableBalance } from "@/modules/core";

import {
  DONATION_MAX_MESSAGE_LENGTH,
  DONATION_MIN_NEAR_AMOUNT_ERROR,
} from "../constants";
import {
  DonationAllocationStrategyEnum,
  DonationPotDistributionStrategy,
} from "../types";
import {
  isDonationAmountSufficient,
  isMatchingPotSelected,
} from "../utils/validation";

export const donationTokenSchema = literal(NEAR_TOKEN_DENOM)
  .or(string().min(6))
  .default(NEAR_TOKEN_DENOM)
  .describe('Either "NEAR" or FT contract account id.');

export const donationAmountSchema = preprocess(
  (x) => parseFloat(x as string),

  number({ message: "Must be a positive number." })
    .positive("Must be a positive number.")
    .finite()
    .safe()
    .transform((n) => number().safeParse(n).data ?? 0),
);

export const donationSchema = object({
  tokenId: donationTokenSchema,

  amount: donationAmountSchema.describe(
    "Amount of the selected tokens to donate.",
  ),

  recipientAccountId: string().optional().describe("Recipient account id."),
  referrerAccountId: string().optional().describe("Referrer account id."),
  potAccountId: string().optional().describe("Pot account id."),

  potDonationDistribution: array(
    object({ account_id: string(), amount: donationAmountSchema }),
  )
    .refine((recipients) => recipients.length > 0, {
      message: "You have to select at least one recipient.",
    })
    .optional(),

  message: string()
    .max(DONATION_MAX_MESSAGE_LENGTH)
    .optional()
    .describe("Donation message."),

  allocationStrategy: nativeEnum(DonationAllocationStrategyEnum, {
    message: "Incorrect allocation strategy.",
  }).default(DonationAllocationStrategyEnum.direct),
  bypassProtocalFee: boolean().default(false),
  bypassCheffFee: boolean().default(false),
  potDistributionStrategy: nativeEnum(DonationPotDistributionStrategy, {
    message: "Incorrect donation distribution strategy.",
  }).default(DonationPotDistributionStrategy.evenly),
})
  .refine(isMatchingPotSelected, { message: "Pot is not selected." })
  .refine(isDonationAmountSufficient, {
    /**
     *? NOTE: Due to an unknown issue,
     *?  this message doesn't end up in react-hook-form's `formState.errors`.
     *?  Please make sure it's always manually provided to the corresponding input field.
     */
    message: DONATION_MIN_NEAR_AMOUNT_ERROR,
  });

export type DonationInputs = FromSchema<typeof donationSchema>;

export type DonationAllocationInputs = Pick<
  AvailableBalance,
  "balanceFloat"
> & {
  isBalanceSufficient: boolean;
  minAmountError: string | null;
  form: UseFormReturn<DonationInputs>;
};
