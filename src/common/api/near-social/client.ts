import { Social } from "@builddao/near-social-js";
import axios from "axios";

import { NETWORK, SYBIL_CONTRACT_ACCOUNT_ID } from "@/common/config";
import { ClientConfig } from "@/common/types";

export const client = axios.create({
  baseURL: "https://api.near.social",
});

export const CLIENT_CONFIG: ClientConfig = {
  swr: {},
};

export const nearSocialClient = new Social({
  contractId: SYBIL_CONTRACT_ACCOUNT_ID,
  network: NETWORK,
});
