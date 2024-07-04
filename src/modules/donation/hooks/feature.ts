import { useCallback, useEffect } from "react";

import { useModal } from "@ebay/nice-modal-react";
import { useSearchParams } from "next/navigation";

import { dispatch } from "@/app/_store";
import { useSearchParamsNavigation } from "@/common/lib";

import { DonationModal } from "../components/DonationModal";
import { DonationParameters } from "../models";

export const useDonation = (props: DonationParameters) => {
  const modal = useModal(DonationModal);

  const searchParams = useSearchParams();
  const { syncRouteParams } = useSearchParamsNavigation();
  const transactionHash = searchParams.getAll("transactionHashes").at(-1);
  const accountIdRouteParam = searchParams.get("accountId") ?? undefined;
  const potIdRouteParam = searchParams.get("potId") ?? undefined;

  const hasTransactionConfirmation =
    transactionHash && Boolean(accountIdRouteParam ?? potIdRouteParam);

  useEffect(() => {
    if (hasTransactionConfirmation && !modal.visible) {
      modal.show({ accountId: accountIdRouteParam, potId: potIdRouteParam });
    }
  }, [accountIdRouteParam, hasTransactionConfirmation, modal, potIdRouteParam]);

  const openDonationModal = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      dispatch.donation.reset();

      if ("accountId" in props) {
        syncRouteParams({ donateTo: props.accountId });
      } else if ("potId" in props) {
        syncRouteParams({ donateToPot: props.potId });
      }

      modal.show(props);
    },

    [modal, props, syncRouteParams],
  );

  return { openDonationModal };
};
