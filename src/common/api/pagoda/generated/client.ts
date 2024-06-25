/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * NEAR Enhanced API powered by Pagoda
 * Try out our newly released Enhanced APIs - Balances (in Beta) and get what you need for all kinds of balances and token information at ease.
Call Enhanced APIs using the endpoint in the API URL box, varies by Network.

https://near-testnet.api.pagoda.co/eapi/v1

https://near-mainnet.api.pagoda.co/eapi/v1

Grab your API keys and give it a try! We will be adding more advanced Enhanced APIs in our offering, so stay tuned. Get the data you need without extra processing, NEAR Blockchain data query has never been easier!

We would love to hear from you on the data APIs you need, please leave feedback using the widget in the lower-right corner.
 * OpenAPI spec version: 0.1
 */
import axios from "axios";
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import useSwr from "swr";
import type { Key, SWRConfiguration } from "swr";
export type GetNep171MetadataContractAccountIdParams = {
  block_height?: string;
  block_timestamp_nanos?: string;
};

export type GetNep141MetadataContractAccountIdParams = {
  block_height?: string;
  block_timestamp_nanos?: string;
};

export type GetAccountsAccountIdBalancesNEARHistoryParams = {
  after_event_index?: string;
  /**
   * Maximum available limit 100
   */
  limit?: number;
};

export type GetAccountsAccountIdBalancesNEARParams = {
  block_height?: string;
  block_timestamp_nanos?: string;
};

export type GetAccountsAccountIdBalancesFTContractAccountIdHistoryParams = {
  after_event_index?: string;
  /**
   * Maximum available limit 100
   */
  limit?: number;
};

export type GetAccountsAccountIdBalancesFTContractAccountIdParams = {
  block_height?: string;
  block_timestamp_nanos?: string;
};

export type GetAccountsAccountIdBalancesFTParams = {
  block_height?: string;
  block_timestamp_nanos?: string;
  limit?: number;
};

export type GetAccountsAccountIdNFTContractAccountIdParams = {
  limit?: number;
};

export type GetAccountsAccountIdNFTParams = {
  limit?: number;
};

export type GetNFTContractAccountIdTokenIdHistoryParams = {
  limit?: number;
};

export type GetNFTContractAccountIdTokenIdParams = {
  block_height?: string;
  block_timestamp_nanos?: string;
};

/**
 * The type for Non Fungible Token Metadata. Inspired by
 https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata
 */
export type NftsResponseNftsItemMetadata = {
  copies?: number;
  description?: string;
  extra?: string;
  media?: string;
  media_hash?: string;
  reference?: string;
  reference_hash?: string;
  title?: string;
};

/**
 * The type for Non Fungible Token. Inspired by
 https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata
 */
export type NftsResponseNftsItem = {
  /** The type for Non Fungible Token Metadata. Inspired by
 https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata */
  metadata: NftsResponseNftsItemMetadata;
  owner_account_id: string;
  token_id: string;
};

/**
 * The type for Non Fungible Token Contract Metadata. Inspired by
 https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata
 */
export type NftsResponseContractMetadata = {
  base_uri?: string;
  icon?: string;
  name: string;
  reference?: string;
  reference_hash?: string;
  spec: string;
  symbol: string;
};

export interface NftsResponse {
  block_height: string;
  block_timestamp_nanos: string;
  /** The type for Non Fungible Token Contract Metadata. Inspired by
 https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata */
  contract_metadata: NftsResponseContractMetadata;
  nfts: NftsResponseNftsItem[];
}

/**
 * The type for Non Fungible Token Metadata. Inspired by
 https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata
 */
export type NftResponseNftMetadata = {
  copies?: number;
  description?: string;
  extra?: string;
  media?: string;
  media_hash?: string;
  reference?: string;
  reference_hash?: string;
  title?: string;
};

/**
 * The type for Non Fungible Token. Inspired by
 https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata
 */
export type NftResponseNft = {
  /** The type for Non Fungible Token Metadata. Inspired by
 https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata */
  metadata: NftResponseNftMetadata;
  owner_account_id: string;
  token_id: string;
};

/**
 * The type for Non Fungible Token Contract Metadata. Inspired by
 https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata
 */
export type NftResponseContractMetadata = {
  base_uri?: string;
  icon?: string;
  name: string;
  reference?: string;
  reference_hash?: string;
  spec: string;
  symbol: string;
};

export interface NftResponse {
  block_height: string;
  block_timestamp_nanos: string;
  /** The type for Non Fungible Token Contract Metadata. Inspired by
 https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata */
  contract_metadata: NftResponseContractMetadata;
  /** The type for Non Fungible Token. Inspired by
 https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata */
  nft: NftResponseNft;
}

/**
 * The type for Non Fungible Token Metadata. Inspired by
 https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata
 */
export type NftHistoryResponseNftMetadata = {
  copies?: number;
  description?: string;
  extra?: string;
  media?: string;
  media_hash?: string;
  reference?: string;
  reference_hash?: string;
  title?: string;
};

/**
 * The type for Non Fungible Token. Inspired by
 https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata
 */
export type NftHistoryResponseNft = {
  /** The type for Non Fungible Token Metadata. Inspired by
 https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata */
  metadata: NftHistoryResponseNftMetadata;
  owner_account_id: string;
  token_id: string;
};

/**
 * This type describes the history of NFT movements.
 Note, it's not attached to any user, it's the whole history of NFT movements.
 `cause` is one of ["mint", "transfer", "burn"]
 */
export type NftHistoryResponseHistoryItem = {
  block_height: string;
  block_timestamp_nanos: string;
  cause: string;
  new_account_id?: string;
  old_account_id?: string;
  status: string;
};

export interface NftHistoryResponse {
  block_height: string;
  block_timestamp_nanos: string;
  history: NftHistoryResponseHistoryItem[];
  /** The type for Non Fungible Token. Inspired by
 https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata */
  nft: NftHistoryResponseNft;
}

/**
 * The type for Non Fungible Token Contract Metadata. Inspired by
 https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata
 */
export type NftCountsResponseNftCountsItemContractMetadata = {
  base_uri?: string;
  icon?: string;
  name: string;
  reference?: string;
  reference_hash?: string;
  spec: string;
  symbol: string;
};

export type NftCountsResponseNftCountsItem = {
  contract_account_id: string;
  /** The type for Non Fungible Token Contract Metadata. Inspired by
 https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata */
  contract_metadata: NftCountsResponseNftCountsItemContractMetadata;
  last_updated_at_timestamp_nanos: string;
  nft_count: number;
};

export interface NftCountsResponse {
  block_height: string;
  block_timestamp_nanos: string;
  nft_counts: NftCountsResponseNftCountsItem[];
}

/**
 * This type describes general Metadata info
 */
export type NearHistoryResponseHistoryItemMetadata = {
  decimals: number;
  icon?: string;
  name: string;
  symbol: string;
};

/**
 * This type describes the history of the operations (NEAR, FT) for the given user.
 */
export type NearHistoryResponseHistoryItem = {
  balance: string;
  block_height: string;
  block_timestamp_nanos: string;
  cause: string;
  delta_balance: string;
  event_index: string;
  involved_account_id?: string;
  /** This type describes general Metadata info */
  metadata: NearHistoryResponseHistoryItemMetadata;
  status: string;
};

export interface NearHistoryResponse {
  block_height: string;
  block_timestamp_nanos: string;
  history: NearHistoryResponseHistoryItem[];
}

/**
 * This type describes general Metadata info
 */
export type NearBalanceResponseBalanceMetadata = {
  decimals: number;
  icon?: string;
  name: string;
  symbol: string;
};

export type NearBalanceResponseBalance = {
  /** Sum of staked and nonstaked balances */
  amount: string;
  /** This type describes general Metadata info */
  metadata: NearBalanceResponseBalanceMetadata;
};

export interface NearBalanceResponse {
  balance: NearBalanceResponseBalance;
  block_height: string;
  block_timestamp_nanos: string;
}

/**
 * The type for Non Fungible Token Contract Metadata. Inspired by
 https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata
 */
export type MetadataResponseMetadata = {
  base_uri?: string;
  icon?: string;
  name: string;
  reference?: string;
  reference_hash?: string;
  spec: string;
  symbol: string;
};

export interface MetadataResponse {
  block_height: string;
  block_timestamp_nanos: string;
  /** The type for Non Fungible Token Contract Metadata. Inspired by
 https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata */
  metadata: MetadataResponseMetadata;
}

/**
 * This type describes general Metadata info, collecting the most important fields from different standards in the one format.
 */
export type FtHistoryResponseHistoryItemMetadata = {
  decimals: number;
  icon?: string;
  name: string;
  symbol: string;
};

/**
 * This type describes the history of the operations (NEAR, FT) for the given user.
 */
export type FtHistoryResponseHistoryItem = {
  balance: string;
  block_height: string;
  block_timestamp_nanos: string;
  cause: string;
  delta_balance: string;
  event_index: string;
  involved_account_id?: string;
  /** This type describes general Metadata info, collecting the most important fields from different standards in the one format. */
  metadata: FtHistoryResponseHistoryItemMetadata;
  status: string;
};

export interface FtHistoryResponse {
  block_height: string;
  block_timestamp_nanos: string;
  history: FtHistoryResponseHistoryItem[];
}

/**
 * The type for FT Contract Metadata. Inspired by
 https://nomicon.io/Standards/Tokens/FungibleToken/Metadata
 */
export type FtContractMetadataResponseMetadata = {
  decimals: number;
  icon?: string;
  name: string;
  reference?: string;
  reference_hash?: string;
  spec: string;
  symbol: string;
};

export interface FtContractMetadataResponse {
  block_height: string;
  block_timestamp_nanos: string;
  /** The type for FT Contract Metadata. Inspired by
 https://nomicon.io/Standards/Tokens/FungibleToken/Metadata */
  metadata: FtContractMetadataResponseMetadata;
}

/**
 * This type describes general Metadata info, collecting the most important fields from different standards in the one format.
 */
export type FtBalancesResponseBalancesItemMetadata = {
  decimals: number;
  icon?: string;
  name: string;
  symbol: string;
};

export type FtBalancesResponseBalancesItem = {
  amount: string;
  contract_account_id: string;
  /** This type describes general Metadata info, collecting the most important fields from different standards in the one format. */
  metadata: FtBalancesResponseBalancesItemMetadata;
};

export interface FtBalancesResponse {
  balances: FtBalancesResponseBalancesItem[];
  block_height: string;
  block_timestamp_nanos: string;
}

/**
 * This type describes general Metadata info, collecting the most important fields from different standards in the one format.
 */
export type FtBalanceByContractResponseBalanceMetadata = {
  decimals: number;
  icon?: string;
  name: string;
  symbol: string;
};

export type FtBalanceByContractResponseBalance = {
  amount: string;
  contract_account_id: string;
  /** This type describes general Metadata info, collecting the most important fields from different standards in the one format. */
  metadata: FtBalanceByContractResponseBalanceMetadata;
};

export interface FtBalanceByContractResponse {
  balance: FtBalanceByContractResponseBalance;
  block_height: string;
  block_timestamp_nanos: string;
}

/**
 * This endpoint returns detailed information on the NFT
 for the given `token_id`, NFT `contract_account_id`, `block_timestamp_nanos`/`block_height`.
 * @summary Get NFT
 */
export const getNFTContractAccountIdTokenId = (
  contractAccountId: string,
  tokenId: string,
  params?: GetNFTContractAccountIdTokenIdParams,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<NftResponse>> => {
  return axios.get(`/NFT/${contractAccountId}/${tokenId}`, {
    ...options,
    params: { ...params, ...options?.params },
  });
};

export const getGetNFTContractAccountIdTokenIdKey = (
  contractAccountId: string,
  tokenId: string,
  params?: GetNFTContractAccountIdTokenIdParams,
) =>
  [
    `/NFT/${contractAccountId}/${tokenId}`,
    ...(params ? [params] : []),
  ] as const;

export type GetNFTContractAccountIdTokenIdQueryResult = NonNullable<
  Awaited<ReturnType<typeof getNFTContractAccountIdTokenId>>
>;
export type GetNFTContractAccountIdTokenIdQueryError = AxiosError<void>;

/**
 * @summary Get NFT
 */
export const useGetNFTContractAccountIdTokenId = <TError = AxiosError<void>>(
  contractAccountId: string,
  tokenId: string,
  params?: GetNFTContractAccountIdTokenIdParams,
  options?: {
    swr?: SWRConfiguration<
      Awaited<ReturnType<typeof getNFTContractAccountIdTokenId>>,
      TError
    > & { swrKey?: Key; enabled?: boolean };
    axios?: AxiosRequestConfig;
  },
) => {
  const { swr: swrOptions, axios: axiosOptions } = options ?? {};

  const isEnabled =
    swrOptions?.enabled !== false && !!(contractAccountId && tokenId);
  const swrKey =
    swrOptions?.swrKey ??
    (() =>
      isEnabled
        ? getGetNFTContractAccountIdTokenIdKey(
            contractAccountId,
            tokenId,
            params,
          )
        : null);
  const swrFn = () =>
    getNFTContractAccountIdTokenId(
      contractAccountId,
      tokenId,
      params,
      axiosOptions,
    );

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(
    swrKey,
    swrFn,
    swrOptions,
  );

  return {
    swrKey,
    ...query,
  };
};

/**
 * This endpoint returns the transaction history for the given NFT.
 **Note:** The result is centered around the history of the specific NFT and will return list of its passing owners.

 **Limitations**
 * For now, we only support NFT contracts that implement the Events NEP standard.
 * We currently provide the most recent 100 items.
   Full-featured pagination will be provided soon.
 * @summary Get NFT history
 */
export const getNFTContractAccountIdTokenIdHistory = (
  contractAccountId: string,
  tokenId: string,
  params?: GetNFTContractAccountIdTokenIdHistoryParams,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<NftHistoryResponse>> => {
  return axios.get(`/NFT/${contractAccountId}/${tokenId}/history`, {
    ...options,
    params: { ...params, ...options?.params },
  });
};

export const getGetNFTContractAccountIdTokenIdHistoryKey = (
  contractAccountId: string,
  tokenId: string,
  params?: GetNFTContractAccountIdTokenIdHistoryParams,
) =>
  [
    `/NFT/${contractAccountId}/${tokenId}/history`,
    ...(params ? [params] : []),
  ] as const;

export type GetNFTContractAccountIdTokenIdHistoryQueryResult = NonNullable<
  Awaited<ReturnType<typeof getNFTContractAccountIdTokenIdHistory>>
>;
export type GetNFTContractAccountIdTokenIdHistoryQueryError = AxiosError<void>;

/**
 * @summary Get NFT history
 */
export const useGetNFTContractAccountIdTokenIdHistory = <
  TError = AxiosError<void>,
>(
  contractAccountId: string,
  tokenId: string,
  params?: GetNFTContractAccountIdTokenIdHistoryParams,
  options?: {
    swr?: SWRConfiguration<
      Awaited<ReturnType<typeof getNFTContractAccountIdTokenIdHistory>>,
      TError
    > & { swrKey?: Key; enabled?: boolean };
    axios?: AxiosRequestConfig;
  },
) => {
  const { swr: swrOptions, axios: axiosOptions } = options ?? {};

  const isEnabled =
    swrOptions?.enabled !== false && !!(contractAccountId && tokenId);
  const swrKey =
    swrOptions?.swrKey ??
    (() =>
      isEnabled
        ? getGetNFTContractAccountIdTokenIdHistoryKey(
            contractAccountId,
            tokenId,
            params,
          )
        : null);
  const swrFn = () =>
    getNFTContractAccountIdTokenIdHistory(
      contractAccountId,
      tokenId,
      params,
      axiosOptions,
    );

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(
    swrKey,
    swrFn,
    swrOptions,
  );

  return {
    swrKey,
    ...query,
  };
};

/**
 * For the given `account_id`, this endpoint returns
 the number of NFTs grouped by `contract_account_id`, together with the corresponding NFT contract metadata.
 The NFT contract will be present in the response if the `account_id` has at least one NFT there.

 **Limitations**
 * We currently provide the most recent 100 items.
   Full-featured pagination will be provided soon.
 * @summary Get user's NFT collection overview
 */
export const getAccountsAccountIdNFT = (
  accountId: string,
  params?: GetAccountsAccountIdNFTParams,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<NftCountsResponse>> => {
  return axios.get(`/accounts/${accountId}/NFT`, {
    ...options,
    params: { ...params, ...options?.params },
  });
};

export const getGetAccountsAccountIdNFTKey = (
  accountId: string,
  params?: GetAccountsAccountIdNFTParams,
) => [`/accounts/${accountId}/NFT`, ...(params ? [params] : [])] as const;

export type GetAccountsAccountIdNFTQueryResult = NonNullable<
  Awaited<ReturnType<typeof getAccountsAccountIdNFT>>
>;
export type GetAccountsAccountIdNFTQueryError = AxiosError<void>;

/**
 * @summary Get user's NFT collection overview
 */
export const useGetAccountsAccountIdNFT = <TError = AxiosError<void>>(
  accountId: string,
  params?: GetAccountsAccountIdNFTParams,
  options?: {
    swr?: SWRConfiguration<
      Awaited<ReturnType<typeof getAccountsAccountIdNFT>>,
      TError
    > & { swrKey?: Key; enabled?: boolean };
    axios?: AxiosRequestConfig;
  },
) => {
  const { swr: swrOptions, axios: axiosOptions } = options ?? {};

  const isEnabled = swrOptions?.enabled !== false && !!accountId;
  const swrKey =
    swrOptions?.swrKey ??
    (() =>
      isEnabled ? getGetAccountsAccountIdNFTKey(accountId, params) : null);
  const swrFn = () => getAccountsAccountIdNFT(accountId, params, axiosOptions);

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(
    swrKey,
    swrFn,
    swrOptions,
  );

  return {
    swrKey,
    ...query,
  };
};

/**
 * This endpoint returns the list of NFTs with full details for the given `account_id`, NFT `contract_account_id`.
 You can use the `token_id` from this response and then request the NFT history for that token.

 **Limitations**
 * We currently provide the most recent 100 items.
   Full-featured pagination will be provided soon.
 * @summary Get user's NFT collection by contract
 */
export const getAccountsAccountIdNFTContractAccountId = (
  accountId: string,
  contractAccountId: string,
  params?: GetAccountsAccountIdNFTContractAccountIdParams,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<NftsResponse>> => {
  return axios.get(`/accounts/${accountId}/NFT/${contractAccountId}`, {
    ...options,
    params: { ...params, ...options?.params },
  });
};

export const getGetAccountsAccountIdNFTContractAccountIdKey = (
  accountId: string,
  contractAccountId: string,
  params?: GetAccountsAccountIdNFTContractAccountIdParams,
) =>
  [
    `/accounts/${accountId}/NFT/${contractAccountId}`,
    ...(params ? [params] : []),
  ] as const;

export type GetAccountsAccountIdNFTContractAccountIdQueryResult = NonNullable<
  Awaited<ReturnType<typeof getAccountsAccountIdNFTContractAccountId>>
>;
export type GetAccountsAccountIdNFTContractAccountIdQueryError =
  AxiosError<void>;

/**
 * @summary Get user's NFT collection by contract
 */
export const useGetAccountsAccountIdNFTContractAccountId = <
  TError = AxiosError<void>,
>(
  accountId: string,
  contractAccountId: string,
  params?: GetAccountsAccountIdNFTContractAccountIdParams,
  options?: {
    swr?: SWRConfiguration<
      Awaited<ReturnType<typeof getAccountsAccountIdNFTContractAccountId>>,
      TError
    > & { swrKey?: Key; enabled?: boolean };
    axios?: AxiosRequestConfig;
  },
) => {
  const { swr: swrOptions, axios: axiosOptions } = options ?? {};

  const isEnabled =
    swrOptions?.enabled !== false && !!(accountId && contractAccountId);
  const swrKey =
    swrOptions?.swrKey ??
    (() =>
      isEnabled
        ? getGetAccountsAccountIdNFTContractAccountIdKey(
            accountId,
            contractAccountId,
            params,
          )
        : null);
  const swrFn = () =>
    getAccountsAccountIdNFTContractAccountId(
      accountId,
      contractAccountId,
      params,
      axiosOptions,
    );

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(
    swrKey,
    swrFn,
    swrOptions,
  );

  return {
    swrKey,
    ...query,
  };
};

/**
 * This endpoint returns all non-zero FT balances of the given `account_id`,
 at the given `block_timestamp_nanos`/`block_height`.

 **Limitations**
 This endpoint scans all the FT contracts.
 We currently provide up to 100 results, which covers almost all the potential situations.
 Anyway, full-featured pagination will be provided soon.
 * @summary Get user's FT balances
 */
export const getAccountsAccountIdBalancesFT = (
  accountId: string,
  params?: GetAccountsAccountIdBalancesFTParams,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<FtBalancesResponse>> => {
  return axios.get(`/accounts/${accountId}/balances/FT`, {
    ...options,
    params: { ...params, ...options?.params },
  });
};

export const getGetAccountsAccountIdBalancesFTKey = (
  accountId: string,
  params?: GetAccountsAccountIdBalancesFTParams,
) =>
  [`/accounts/${accountId}/balances/FT`, ...(params ? [params] : [])] as const;

export type GetAccountsAccountIdBalancesFTQueryResult = NonNullable<
  Awaited<ReturnType<typeof getAccountsAccountIdBalancesFT>>
>;
export type GetAccountsAccountIdBalancesFTQueryError = AxiosError<void>;

/**
 * @summary Get user's FT balances
 */
export const useGetAccountsAccountIdBalancesFT = <TError = AxiosError<void>>(
  accountId: string,
  params?: GetAccountsAccountIdBalancesFTParams,
  options?: {
    swr?: SWRConfiguration<
      Awaited<ReturnType<typeof getAccountsAccountIdBalancesFT>>,
      TError
    > & { swrKey?: Key; enabled?: boolean };
    axios?: AxiosRequestConfig;
  },
) => {
  const { swr: swrOptions, axios: axiosOptions } = options ?? {};

  const isEnabled = swrOptions?.enabled !== false && !!accountId;
  const swrKey =
    swrOptions?.swrKey ??
    (() =>
      isEnabled
        ? getGetAccountsAccountIdBalancesFTKey(accountId, params)
        : null);
  const swrFn = () =>
    getAccountsAccountIdBalancesFT(accountId, params, axiosOptions);

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(
    swrKey,
    swrFn,
    swrOptions,
  );

  return {
    swrKey,
    ...query,
  };
};

/**
 * This endpoint returns FT balance of the given `account_id`,
 for the given `contract_account_id` and `block_timestamp_nanos`/`block_height`.
 * @summary Get user's FT balance by contract
 */
export const getAccountsAccountIdBalancesFTContractAccountId = (
  accountId: string,
  contractAccountId: string,
  params?: GetAccountsAccountIdBalancesFTContractAccountIdParams,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<FtBalanceByContractResponse>> => {
  return axios.get(`/accounts/${accountId}/balances/FT/${contractAccountId}`, {
    ...options,
    params: { ...params, ...options?.params },
  });
};

export const getGetAccountsAccountIdBalancesFTContractAccountIdKey = (
  accountId: string,
  contractAccountId: string,
  params?: GetAccountsAccountIdBalancesFTContractAccountIdParams,
) =>
  [
    `/accounts/${accountId}/balances/FT/${contractAccountId}`,
    ...(params ? [params] : []),
  ] as const;

export type GetAccountsAccountIdBalancesFTContractAccountIdQueryResult =
  NonNullable<
    Awaited<ReturnType<typeof getAccountsAccountIdBalancesFTContractAccountId>>
  >;
export type GetAccountsAccountIdBalancesFTContractAccountIdQueryError =
  AxiosError<void>;

/**
 * @summary Get user's FT balance by contract
 */
export const useGetAccountsAccountIdBalancesFTContractAccountId = <
  TError = AxiosError<void>,
>(
  accountId: string,
  contractAccountId: string,
  params?: GetAccountsAccountIdBalancesFTContractAccountIdParams,
  options?: {
    swr?: SWRConfiguration<
      Awaited<
        ReturnType<typeof getAccountsAccountIdBalancesFTContractAccountId>
      >,
      TError
    > & { swrKey?: Key; enabled?: boolean };
    axios?: AxiosRequestConfig;
  },
) => {
  const { swr: swrOptions, axios: axiosOptions } = options ?? {};

  const isEnabled =
    swrOptions?.enabled !== false && !!(accountId && contractAccountId);
  const swrKey =
    swrOptions?.swrKey ??
    (() =>
      isEnabled
        ? getGetAccountsAccountIdBalancesFTContractAccountIdKey(
            accountId,
            contractAccountId,
            params,
          )
        : null);
  const swrFn = () =>
    getAccountsAccountIdBalancesFTContractAccountId(
      accountId,
      contractAccountId,
      params,
      axiosOptions,
    );

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(
    swrKey,
    swrFn,
    swrOptions,
  );

  return {
    swrKey,
    ...query,
  };
};

/**
 * This endpoint returns the history of FT operations
 for the given `account_id`, `contract_account_id`.
 For the next page, use `event_index` of the last item in your previous response.
 * @summary Get user's FT history by contract
 */
export const getAccountsAccountIdBalancesFTContractAccountIdHistory = (
  accountId: string,
  contractAccountId: string,
  params?: GetAccountsAccountIdBalancesFTContractAccountIdHistoryParams,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<FtHistoryResponse>> => {
  return axios.get(
    `/accounts/${accountId}/balances/FT/${contractAccountId}/history`,
    {
      ...options,
      params: { ...params, ...options?.params },
    },
  );
};

export const getGetAccountsAccountIdBalancesFTContractAccountIdHistoryKey = (
  accountId: string,
  contractAccountId: string,
  params?: GetAccountsAccountIdBalancesFTContractAccountIdHistoryParams,
) =>
  [
    `/accounts/${accountId}/balances/FT/${contractAccountId}/history`,
    ...(params ? [params] : []),
  ] as const;

export type GetAccountsAccountIdBalancesFTContractAccountIdHistoryQueryResult =
  NonNullable<
    Awaited<
      ReturnType<typeof getAccountsAccountIdBalancesFTContractAccountIdHistory>
    >
  >;
export type GetAccountsAccountIdBalancesFTContractAccountIdHistoryQueryError =
  AxiosError<void>;

/**
 * @summary Get user's FT history by contract
 */
export const useGetAccountsAccountIdBalancesFTContractAccountIdHistory = <
  TError = AxiosError<void>,
>(
  accountId: string,
  contractAccountId: string,
  params?: GetAccountsAccountIdBalancesFTContractAccountIdHistoryParams,
  options?: {
    swr?: SWRConfiguration<
      Awaited<
        ReturnType<
          typeof getAccountsAccountIdBalancesFTContractAccountIdHistory
        >
      >,
      TError
    > & { swrKey?: Key; enabled?: boolean };
    axios?: AxiosRequestConfig;
  },
) => {
  const { swr: swrOptions, axios: axiosOptions } = options ?? {};

  const isEnabled =
    swrOptions?.enabled !== false && !!(accountId && contractAccountId);
  const swrKey =
    swrOptions?.swrKey ??
    (() =>
      isEnabled
        ? getGetAccountsAccountIdBalancesFTContractAccountIdHistoryKey(
            accountId,
            contractAccountId,
            params,
          )
        : null);
  const swrFn = () =>
    getAccountsAccountIdBalancesFTContractAccountIdHistory(
      accountId,
      contractAccountId,
      params,
      axiosOptions,
    );

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(
    swrKey,
    swrFn,
    swrOptions,
  );

  return {
    swrKey,
    ...query,
  };
};

/**
 * This endpoint returns the NEAR balance of the given `account_id`
 at the given `block_timestamp_nanos`/`block_height`.
 * @summary Get user's NEAR balance
 */
export const getAccountsAccountIdBalancesNEAR = (
  accountId: string,
  params?: GetAccountsAccountIdBalancesNEARParams,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<NearBalanceResponse>> => {
  return axios.get(`/accounts/${accountId}/balances/NEAR`, {
    ...options,
    params: { ...params, ...options?.params },
  });
};

export const getGetAccountsAccountIdBalancesNEARKey = (
  accountId: string,
  params?: GetAccountsAccountIdBalancesNEARParams,
) =>
  [
    `/accounts/${accountId}/balances/NEAR`,
    ...(params ? [params] : []),
  ] as const;

export type GetAccountsAccountIdBalancesNEARQueryResult = NonNullable<
  Awaited<ReturnType<typeof getAccountsAccountIdBalancesNEAR>>
>;
export type GetAccountsAccountIdBalancesNEARQueryError = AxiosError<void>;

/**
 * @summary Get user's NEAR balance
 */
export const useGetAccountsAccountIdBalancesNEAR = <TError = AxiosError<void>>(
  accountId: string,
  params?: GetAccountsAccountIdBalancesNEARParams,
  options?: {
    swr?: SWRConfiguration<
      Awaited<ReturnType<typeof getAccountsAccountIdBalancesNEAR>>,
      TError
    > & { swrKey?: Key; enabled?: boolean };
    axios?: AxiosRequestConfig;
  },
) => {
  const { swr: swrOptions, axios: axiosOptions } = options ?? {};

  const isEnabled = swrOptions?.enabled !== false && !!accountId;
  const swrKey =
    swrOptions?.swrKey ??
    (() =>
      isEnabled
        ? getGetAccountsAccountIdBalancesNEARKey(accountId, params)
        : null);
  const swrFn = () =>
    getAccountsAccountIdBalancesNEAR(accountId, params, axiosOptions);

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(
    swrKey,
    swrFn,
    swrOptions,
  );

  return {
    swrKey,
    ...query,
  };
};

/**
 * This endpoint returns the history of NEAR operations
 for the given `account_id`, `block_timestamp_nanos`/`block_height`.
 For the next page, use `event_index` of the last item in your previous response.
 * @summary Get user's NEAR history
 */
export const getAccountsAccountIdBalancesNEARHistory = (
  accountId: string,
  params?: GetAccountsAccountIdBalancesNEARHistoryParams,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<NearHistoryResponse>> => {
  return axios.get(`/accounts/${accountId}/balances/NEAR/history`, {
    ...options,
    params: { ...params, ...options?.params },
  });
};

export const getGetAccountsAccountIdBalancesNEARHistoryKey = (
  accountId: string,
  params?: GetAccountsAccountIdBalancesNEARHistoryParams,
) =>
  [
    `/accounts/${accountId}/balances/NEAR/history`,
    ...(params ? [params] : []),
  ] as const;

export type GetAccountsAccountIdBalancesNEARHistoryQueryResult = NonNullable<
  Awaited<ReturnType<typeof getAccountsAccountIdBalancesNEARHistory>>
>;
export type GetAccountsAccountIdBalancesNEARHistoryQueryError =
  AxiosError<void>;

/**
 * @summary Get user's NEAR history
 */
export const useGetAccountsAccountIdBalancesNEARHistory = <
  TError = AxiosError<void>,
>(
  accountId: string,
  params?: GetAccountsAccountIdBalancesNEARHistoryParams,
  options?: {
    swr?: SWRConfiguration<
      Awaited<ReturnType<typeof getAccountsAccountIdBalancesNEARHistory>>,
      TError
    > & { swrKey?: Key; enabled?: boolean };
    axios?: AxiosRequestConfig;
  },
) => {
  const { swr: swrOptions, axios: axiosOptions } = options ?? {};

  const isEnabled = swrOptions?.enabled !== false && !!accountId;
  const swrKey =
    swrOptions?.swrKey ??
    (() =>
      isEnabled
        ? getGetAccountsAccountIdBalancesNEARHistoryKey(accountId, params)
        : null);
  const swrFn = () =>
    getAccountsAccountIdBalancesNEARHistory(accountId, params, axiosOptions);

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(
    swrKey,
    swrFn,
    swrOptions,
  );

  return {
    swrKey,
    ...query,
  };
};

/**
 * This endpoint returns the metadata for the given `contract_account_id`, `block_timestamp_nanos`/`block_height`.
 * @summary Get FT metadata
 */
export const getNep141MetadataContractAccountId = (
  contractAccountId: string,
  params?: GetNep141MetadataContractAccountIdParams,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<FtContractMetadataResponse>> => {
  return axios.get(`/nep141/metadata/${contractAccountId}`, {
    ...options,
    params: { ...params, ...options?.params },
  });
};

export const getGetNep141MetadataContractAccountIdKey = (
  contractAccountId: string,
  params?: GetNep141MetadataContractAccountIdParams,
) =>
  [
    `/nep141/metadata/${contractAccountId}`,
    ...(params ? [params] : []),
  ] as const;

export type GetNep141MetadataContractAccountIdQueryResult = NonNullable<
  Awaited<ReturnType<typeof getNep141MetadataContractAccountId>>
>;
export type GetNep141MetadataContractAccountIdQueryError = AxiosError<void>;

/**
 * @summary Get FT metadata
 */
export const useGetNep141MetadataContractAccountId = <
  TError = AxiosError<void>,
>(
  contractAccountId: string,
  params?: GetNep141MetadataContractAccountIdParams,
  options?: {
    swr?: SWRConfiguration<
      Awaited<ReturnType<typeof getNep141MetadataContractAccountId>>,
      TError
    > & { swrKey?: Key; enabled?: boolean };
    axios?: AxiosRequestConfig;
  },
) => {
  const { swr: swrOptions, axios: axiosOptions } = options ?? {};

  const isEnabled = swrOptions?.enabled !== false && !!contractAccountId;
  const swrKey =
    swrOptions?.swrKey ??
    (() =>
      isEnabled
        ? getGetNep141MetadataContractAccountIdKey(contractAccountId, params)
        : null);
  const swrFn = () =>
    getNep141MetadataContractAccountId(contractAccountId, params, axiosOptions);

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(
    swrKey,
    swrFn,
    swrOptions,
  );

  return {
    swrKey,
    ...query,
  };
};

/**
 * This endpoint returns the metadata for a given NFT contract and `block_timestamp_nanos`/`block_height`.
 **Note:** This is contract-wide metadata. Each NFT also has its own metadata.
 * @summary Get NFT contract metadata
 */
export const getNep171MetadataContractAccountId = (
  contractAccountId: string,
  params?: GetNep171MetadataContractAccountIdParams,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<MetadataResponse>> => {
  return axios.get(`/nep171/metadata/${contractAccountId}`, {
    ...options,
    params: { ...params, ...options?.params },
  });
};

export const getGetNep171MetadataContractAccountIdKey = (
  contractAccountId: string,
  params?: GetNep171MetadataContractAccountIdParams,
) =>
  [
    `/nep171/metadata/${contractAccountId}`,
    ...(params ? [params] : []),
  ] as const;

export type GetNep171MetadataContractAccountIdQueryResult = NonNullable<
  Awaited<ReturnType<typeof getNep171MetadataContractAccountId>>
>;
export type GetNep171MetadataContractAccountIdQueryError = AxiosError<void>;

/**
 * @summary Get NFT contract metadata
 */
export const useGetNep171MetadataContractAccountId = <
  TError = AxiosError<void>,
>(
  contractAccountId: string,
  params?: GetNep171MetadataContractAccountIdParams,
  options?: {
    swr?: SWRConfiguration<
      Awaited<ReturnType<typeof getNep171MetadataContractAccountId>>,
      TError
    > & { swrKey?: Key; enabled?: boolean };
    axios?: AxiosRequestConfig;
  },
) => {
  const { swr: swrOptions, axios: axiosOptions } = options ?? {};

  const isEnabled = swrOptions?.enabled !== false && !!contractAccountId;
  const swrKey =
    swrOptions?.swrKey ??
    (() =>
      isEnabled
        ? getGetNep171MetadataContractAccountIdKey(contractAccountId, params)
        : null);
  const swrFn = () =>
    getNep171MetadataContractAccountId(contractAccountId, params, axiosOptions);

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(
    swrKey,
    swrFn,
    swrOptions,
  );

  return {
    swrKey,
    ...query,
  };
};
