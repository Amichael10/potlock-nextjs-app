import { StorageCache } from "@wpdas/naxios";

import { SOCIAL_DB_CONTRACT_ID } from "@/common/constants";

import { naxiosInstance } from "..";
import {
  FeedsResult,
  IndexPostResultItem,
  PostContent,
} from "../potlock/interfaces/post.interfaces";

/**
 * NEAR Social DB Contract API
 */
const nearSocialDbContractApi = naxiosInstance.contractApi({
  contractId: SOCIAL_DB_CONTRACT_ID,
  cache: new StorageCache({ expirationTime: 5 * 60 }), // 5 minutes
});

interface NEARSocialUserProfileInput {
  keys: string[];
  options?: {
    return_type?: "BlockHeight" | "History" | "True";
    values_only?: boolean;
    return_deleted?: boolean;
  };
}

export interface ExternalFundingSource {
  investorName: string;
  description: string;
  amountReceived: string;
  denomination: string;
  date?: string;
}

export interface ProfileLinktree {
  twitter?: string;
  github?: string;
  telegram?: string;
  website?: string;
}

export interface Image {
  ipfs_cid?: string;
  nft?: {
    contractId: string;
    tokenId: string;
  };
}

export enum Category {
  "social-impact" = "Social Impact",
  "non-profit" = "NonProfit",
  climate = "Climate",
  "public-good" = "Public Good",
  "de-sci" = "DeSci",
  "open-source" = "Open Source",
  community = "Community",
  education = "Education",
}

export interface NEARSocialUserProfile {
  name?: string;
  linktree?: ProfileLinktree;
  image?: Image;
  backgroundImage?: Image;
  description?: string;
  tags?: Record<string, string>;
  horizon_tnc?: string;
  // Project
  // required fields
  plPublicGoodReason?: string;
  plCategories?: string;
  // optional fields
  plGithubRepos?: string[];
  plFundingSources?: ExternalFundingSource[];
  plSmartContracts?: [string, string][];
  category?:
    | keyof typeof Category
    | {
        text: string;
      };
}

//  Registration (Project) social profile
export interface RegistrationSocialProfile {
  // required fields
  name: string;
  description: string;
  plPublicGoodReason: string;
  plCategories: string[];
  linktree?: ProfileLinktree;
  image?: Image;
  backgroundImage?: Image;
  // optional fields
  plGithubRepos?: string[];
  plFundingSources?: ExternalFundingSource[];
  plSmartContracts?: [string, string][];
  category?: string[];
}

type NEARSocialGetResponse = {
  [key: string]: {
    profile?: NEARSocialUserProfile;
  };
};

/**
 * Get User Profile Info from NEAR Social DB
 * @returns
 */
export const getSocialProfile = async (input: { accountId: string }) => {
  const response = await nearSocialDbContractApi.view<
    NEARSocialUserProfileInput,
    NEARSocialGetResponse
  >(
    "get",
    {
      args: {
        keys: [`${input.accountId}/profile/**`],
      },
    },
    { useCache: true },
  );

  return response[input.accountId]?.profile;
};

type GetFollowingResponse = {
  [key: string]: {
    graph: {
      follow: {
        [key: string]: number;
      };
    };
  };
};

export const getFollowing = async ({ accountId }: { accountId: string }) => {
  try {
    const response = await nearSocialDbContractApi.view<
      any,
      GetFollowingResponse
    >("keys", {
      args: {
        keys: [`${accountId}/graph/follow/*`],
        options: {
          return_type: "BlockHeight",
          values_only: true,
        },
      },
    });

    const followingAccounts = Object.keys(response[accountId].graph.follow);

    return { accounts: followingAccounts, total: followingAccounts.length };
  } catch (e) {
    console.error("getFollowing:", e);
    return { accounts: [], total: 0 };
  }
};

export const getFollowers = async ({ accountId }: { accountId: string }) => {
  try {
    const response = await nearSocialDbContractApi.view<any, any>("keys", {
      args: {
        keys: [`*/graph/follow/${accountId}`],
        options: {
          return_type: "BlockHeight",
          values_only: true,
        },
      },
    });

    // TODO
    // return response;
    return { accounts: [], total: 0 };
  } catch (e) {
    // TODO: Error getting followers because of gas limit (it makes sense because of the amount of data it's trying to get)
    console.error("getFollowers:", e);
    return { accounts: [], total: 0 };
  }

  // const followingAccounts = Object.keys(response[accountId].graph.follow);

  // return { accounts: followingAccounts, total: followingAccounts.length };
};

export const getSocialData = async <R>({ path }: { path: string }) => {
  try {
    const response = await nearSocialDbContractApi.view<any, R>("keys", {
      args: {
        keys: [path],
        options: {
          return_type: "BlockHeight",
          values_only: true,
        },
      },
    });

    return response;
  } catch (e) {
    console.error("getSocialData:", e);
  }
};

export const setSocialData = async ({
  data,
}: {
  data: Record<string, any>;
}) => {
  try {
    const response = await nearSocialDbContractApi.call("set", {
      args: {
        data,
      },
    });

    return response;
  } catch (e) {
    console.error("setSocialData", e);
  }
};

export const fetchGlobalFeeds = async ({
  client,
  accountIds,
  offset = 20,
}: any) => {
  // First, use index to get the list of posts
  const indexResult = (await client.index({
    action: "post",
    key: "main",
    limit: offset.toString(),
    accountId: accountIds,
    order: "desc",
  })) as unknown as IndexPostResultItem[];

  // Fetch each post individually with its specific block height
  return await Promise.all(
    indexResult.map(async (item) => {
      const getResult = (await client.get({
        keys: [`${item.accountId}/post/main`],
        blockHeight: item.blockHeight,
      })) as FeedsResult;

      const postContent = getResult[item.accountId]?.post?.main;
      let parsedContent: PostContent;
      try {
        parsedContent = JSON.parse(postContent);
      } catch (e) {
        console.error("Error parsing post content:", e);
        parsedContent = { text: "Error: Could not parse post content" };
      }

      return {
        accountId: item.accountId,
        blockHeight: item.blockHeight,
        content: parsedContent.text || "No content available",
      };
    }),
  );
};

export const fetchAccountFeedPosts = async ({
  client,
  accountId,
  offset = 20,
}: any) => {
  // First, use index to get the list of posts
  const indexResult = (await client.index({
    action: "post",
    key: "main",
    limit: offset.toString(),
    accountId,
    order: "desc",
  })) as unknown as IndexPostResultItem[];

  // Fetch each post individually with its specific block height
  return await Promise.all(
    indexResult.map(async (item) => {
      const getResult = (await client.get({
        keys: [`${accountId}/post/main`],
        blockHeight: item.blockHeight,
      })) as FeedsResult;

      const postContent = getResult[accountId]?.post?.main;
      let parsedContent: PostContent;
      try {
        parsedContent = JSON.parse(postContent);
      } catch (e) {
        console.error("Error parsing post content:", e);
        parsedContent = { text: "Error: Could not parse post content" };
      }

      return {
        accountId: accountId,
        blockHeight: item.blockHeight,
        content: parsedContent.text || "No content available",
      };
    }),
  );
};

export const fetchSinglePost = async ({
  client,
  accountId,
  blockHeight,
}: {
  client: any;
  accountId: string;
  blockHeight: number;
}): Promise<{ accountId: string; blockHeight: number; content: string }> => {
  try {
    // Fetch the post using the accountId and blockHeight
    const getResult = (await client.get({
      keys: [`${accountId}/post/main`],
      blockHeight: blockHeight,
    })) as FeedsResult;

    const postContent = getResult[accountId]?.post?.main;
    let parsedContent: PostContent;

    try {
      parsedContent = JSON.parse(postContent);
    } catch (e) {
      console.error("Error parsing post content:", e);
      parsedContent = { text: "Error: Could not parse post content" };
    }

    return {
      accountId: accountId,
      blockHeight: blockHeight,
      content: parsedContent.text || "No content available",
    };
  } catch (error) {
    console.error("Error fetching single post:", error);
    throw new Error("Could not fetch the post");
  }
};
