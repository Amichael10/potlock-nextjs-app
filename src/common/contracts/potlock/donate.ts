import { MemoryCache } from "@wpdas/naxios";

import { naxiosInstance } from "@/common/api/near";
import { POTLOCK_DONATE_CONTRACT_ID } from "@/common/constants";

import {
  Config,
  DirectDonation,
  DirectDonationArgs,
} from "./interfaces/donate.interfaces";

/**
 * NEAR Contract API
 */
export const contractApi = naxiosInstance.contractApi({
  contractId: POTLOCK_DONATE_CONTRACT_ID,
  cache: new MemoryCache({ expirationTime: 10 }), // 10 seg
});

// READ METHODS

/**
 * Get donate contract config
 */
export const getConfig = () => contractApi.view<{}, Config>("get_config");

/**
 * Get direct donations
 */
export const getDonations = (args: { fromIndex?: number; limit?: number }) =>
  contractApi.view<typeof args, DirectDonation[]>("get_donations", {
    args,
  });

/**
 * Get donations for a recipient id
 */
export const getDonationsForRecipient = (args: { recipient_id: string }) =>
  contractApi.view<typeof args, DirectDonation[]>(
    "get_donations_for_recipient",
    {
      args,
    },
  );

/**
 * Get donations for donor id
 */
export const getDonationsForDonor = (args: { donor_id: string }) =>
  contractApi.view<typeof args, DirectDonation[]>("get_donations_for_donor", {
    args,
  });

export const donateNearDirectly = (
  args: DirectDonationArgs,
  depositAmountYocto: string,
) =>
  contractApi.call<typeof args, DirectDonation>("donate", {
    args,
    deposit: depositAmountYocto,
    callbackUrl: window.location.href,
  });
