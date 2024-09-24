import { useCallback, useMemo } from "react";

import { create, useModal } from "@ebay/nice-modal-react";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useRouter } from "next/router";

import SuccessRedIcon from "@/common/assets/svgs/success-red-icon";
import {
  Button,
  DataLoadingPlaceholder,
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/common/ui/components";
import { dispatch } from "@/store";

import { useListActionsState } from "../models";
import SuccessModalCreateList from "./ListConfirmationModals";
import { ListFormModalType } from "../types";
import DonationSuccess from "./Donation/DonationSuccess";

type ListActionsModal = {};

export const ListActionsModal = create((_: ListActionsModal) => {
  const self = useModal();
  const { push, query } = useRouter();

  const close = useCallback(() => {
    self.hide();
    self.remove();
    dispatch.listEditor.reset();
  }, [self]);

  const {
    type,
    finalOutcome: { data, error, accountId },
    modalTextState: { header, description },
    donation: { amount, breakdown, selectedProjects },
  } = useListActionsState();

  const transferType = type === ListFormModalType.TRANSFER_OWNER;

  const content = useMemo(() => {
    return type === ListFormModalType.LIST_DONATION ? (
      <DialogDescription className="p-8">
        <DonationSuccess
          totalAmount={amount}
          breakdown={breakdown}
          selectedProjects={selectedProjects}
          onClose={close}
        />
      </DialogDescription>
    ) : (
      <DialogDescription className="flex h-[300px] flex-col items-center justify-evenly">
        <SuccessRedIcon />
        <div className="items-center text-center">
          <h1 className="m-0 mb-2 text-xl font-bold">{header}</h1>
          {transferType ? (
            <p>
              List Ownership Successfully Transferred to <b>{accountId}</b>
            </p>
          ) : (
            <p>{description}</p>
          )}
        </div>
        <Button
          onClick={() => {
            close();
            if (transferType) push(`/list/${query.id}`);
          }}
          variant="brand-outline"
        >
          Close
        </Button>
      </DialogDescription>
    );
  }, [close, data, error]);

  return [
    ListFormModalType.CREATE_LIST,
    ListFormModalType.UPDATE_LIST,
  ].includes(type) ? (
    <SuccessModalCreateList
      isOpen={self.visible}
      onClose={close}
      listName={data?.name as string}
      isUpdate={type === ListFormModalType.UPDATE_LIST}
      onViewList={() => push(`/list/${data?.id}`)}
    />
  ) : (
    <Dialog open={self.visible}>
      <DialogContent
        contrastActions
        className="max-w-115 "
        onCloseClick={close}
      >
        {data === undefined ? (
          <DataLoadingPlaceholder
            text="Loading List Changes..."
            className="h-106"
          />
        ) : (
          content
        )}
      </DialogContent>
    </Dialog>
  );
});
