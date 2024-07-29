import { useEffect, useMemo, useState } from "react";

import Big from "big.js";

import { Donation } from "@/common/api/potlock";
import { DonationInfo } from "@/common/api/potlock/account";
import { useAccountDonationsSent } from "@/common/api/potlock/hooks";
import { SUPPORTED_FTS } from "@/common/constants";

import { nearToUsdWithFallback } from "../utils";

const sortByDate = (
  donationA: DonationInfo | Donation,
  donationB: DonationInfo | Donation,
) =>
  new Date(donationB.donated_at).getTime() -
  new Date(donationA.donated_at).getTime();

const useDonationsSent = (accountId?: string) => {
  const [donations, setDonations] = useState<DonationInfo[]>();
  const [directDonations, setDirectDonations] = useState<DonationInfo[]>();
  const [matchedDonations, setMatchedDonations] = useState<DonationInfo[]>();

  const { data: donationsData } = useAccountDonationsSent({
    accountId: accountId || "",
    page_size: 9999,
  });

  useEffect(() => {
    if (accountId) {
      const direct: DonationInfo[] = [];
      const matched: DonationInfo[] = [];

      if (donationsData?.results) {
        donationsData?.results.filter((donation) => {
          if (donation.pot) {
            matched.push(donation as any);
          } else {
            direct.push(donation as any);
          }
        });
      }

      setDonations(donationsData?.results.sort(sortByDate) as any);
      setDirectDonations(direct.sort(sortByDate));
      setMatchedDonations(matched.sort(sortByDate));
    }
  }, [donationsData?.results, accountId]);

  // Get total donations & Unique donors count
  const [totalDonationAmountNear, uniqueDonors, totalMatchedNear] =
    useMemo(() => {
      if (donations) {
        let totalNear = Big(0);
        let totalMatched = Big(0);

        const uniqueDonors = [
          ...new Set(donations.map((donation) => donation.donor)),
        ];
        donations.forEach((donation) => {
          totalNear = totalNear.plus(Big(donation.total_amount || "0"));

          // Total Matched info
          if (donation.pot) {
            totalMatched = totalNear.plus(Big(donation.total_amount || "0"));
          }
        });

        const totalDonationAmountNear = SUPPORTED_FTS["NEAR"].fromIndivisible(
          totalNear.toString(),
        );

        const totalMatchedNear = SUPPORTED_FTS["NEAR"].fromIndivisible(
          totalMatched.toString(),
        );

        return [
          totalDonationAmountNear,
          uniqueDonors?.length,
          totalMatchedNear,
        ];
      }
      return ["0", 0, "0"];
    }, [donations]);

  const [usdInfo, setUsdInfo] = useState("");
  const [totalMatchedUsd, setTotalMatchedUsdInfo] = useState("");

  useEffect(() => {
    const allDonations_usdInfo = nearToUsdWithFallback(
      Number(totalDonationAmountNear),
    );
    setUsdInfo(allDonations_usdInfo);

    const totalMatched_usdInfo = nearToUsdWithFallback(
      Number(totalMatchedNear),
    );
    setTotalMatchedUsdInfo(totalMatched_usdInfo);
  }, [totalDonationAmountNear, totalMatchedNear]);

  return {
    donations,
    directDonations,
    matchedDonations,
    uniqueDonors,
    near: totalDonationAmountNear,
    usd: usdInfo,
    totalMatchedNear,
    totalMatchedUsd,
  };
};

export default useDonationsSent;
