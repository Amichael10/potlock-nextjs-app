import { List } from "@/common/api/potlock";
import { RegistrationStatus } from "@/common/contracts/potlock";
import { AccountId } from "@/common/types";

export type ListRegistrationStatus = RegistrationStatus | "Human";

export type ListRegistrationStatusConfig = {
  icon: string;
  color: string;
  background: string;
};

export type ListRegistrationStatusMap = Record<
  ListRegistrationStatus,
  ListRegistrationStatusConfig
>;

export enum ListFormModalType {
  NONE = "NONE",
  BATCH_REGISTER = "BATCH_REGISTER",
  UNREGISTER = "UNREGISTER",
  UPDATE_ACCOUNT = "UPDATE_ACCOUNT",
  ADD_ADMINS = "ADD_ADMINS",
  REMOVE_ADMINS = "REMOVE_ADMINS",
  TRANSFER_OWNER = "TRANSFER_OWNER",
  CREATE_LIST = "CREATE_LIST",
  UPDATE_LIST = "UPDATE_LIST",
  UPVOTE = "UPVOTE",
  DOWNVOTE = "DOWNVOTE",
  DELETE_LIST = "DELETE_LIST",
  LIST_DONATION = "LIST_DONATION",
}

export type ListEditorState = {
  type: ListFormModalType;
  finalOutcome: {
    data?: List | null;
    accountId?: AccountId;
    error: null | Error;
  };
  modalTextState: {
    header: string;
    description: string;
  };
  donation: {
    amount: number;
    breakdown: any;
    selectedProjects: any;
  };
};
