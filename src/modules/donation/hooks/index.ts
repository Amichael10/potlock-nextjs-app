import { useCallback, useEffect } from "react";

import { useModal } from "@ebay/nice-modal-react";
import { useSearchParams } from "next/navigation";

import { dispatch } from "@/app/_store";
import { useRouteQuerySync } from "@/common/lib";

import { DonationModal } from "../components/DonationModal";
import { DonationParameters } from "../models";

export * from "./fees";
export * from "./forms";

export const useDonation = (props: DonationParameters) => {
  const modal = useModal(DonationModal);

  const searchParams = useSearchParams();
  const { syncRouteQuery } = useRouteQuerySync();
  const transactionHash = searchParams.getAll("transactionHashes").at(-1);
  const accountIdRouteParam = searchParams.get("donateTo") ?? undefined;
  const potIdRouteParam = searchParams.get("donateToPot") ?? undefined;

  useEffect(() => {
    if (
      transactionHash &&
      Boolean(accountIdRouteParam ?? potIdRouteParam) &&
      !modal.visible
    ) {
      modal.show({
        accountId: accountIdRouteParam,
        potId: potIdRouteParam,
        transactionHash,
      });
    }
  }, [accountIdRouteParam, modal, potIdRouteParam, transactionHash]);

  const openDonationModal = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      dispatch.donation.reset();

      if ("accountId" in props) {
        syncRouteQuery({ donateTo: props.accountId });
      } else if ("potId" in props) {
        syncRouteQuery({ donateToPot: props.potId });
      }

      modal.show(props);
    },

    [modal, props, syncRouteQuery],
  );

  return { openDonationModal };
};
