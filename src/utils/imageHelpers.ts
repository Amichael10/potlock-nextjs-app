import { naxiosInstance } from "@app/services/contracts";
import { Image, get_user_profile } from "@app/services/contracts/social";

type TokenResponse = {
  metadata: {
    reference: string;
    media: string;
  };
};

type TokenInput = {
  token_id: string;
};

type MetadateRes = {
  base_uri: string;
};

const rex =
  /^(?:https?:\/\/)(?:[^\/]+\/ipfs\/)?(Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,})(?:\.[^\/]+)?(\/.*)?$/g;

export const get_image = async (
  accountId?: string,
  image?: Image,
  type?: "backgroundImage" | "image",
  fallbackurl?: string,
) => {
  let socialImage = image;

  try {
    if (!socialImage && accountId) {
      const profile = await get_user_profile({ accountId });
      if (!profile) return console.log("error fetching social profile");

      socialImage = profile[type || "image"];
    }

    if (socialImage?.nft) {
      const { tokenId, contractId } = socialImage.nft;

      const contractApi = naxiosInstance.contractApi({
        contractId: contractId,
      });

      const tokenMetadata = (
        await contractApi.view<TokenInput, TokenResponse>("nft_token", {
          args: {
            token_id: tokenId,
          },
        })
      ).metadata;

      const nftMetadata = await contractApi.view<TokenInput, MetadateRes>(
        "nft_metadata",
        {
          args: {
            token_id: tokenId,
          },
        },
      );

      let tokenMedia = tokenMetadata.media || "";

      let imageUrl = null;

      if (nftMetadata && tokenMetadata) {
        imageUrl =
          tokenMedia.startsWith("https://") ||
          tokenMedia.startsWith("http://") ||
          tokenMedia.startsWith("data:image")
            ? tokenMedia
            : nftMetadata.base_uri
              ? `${nftMetadata.base_uri}/${tokenMedia}`
              : tokenMedia.startsWith("Qm") || tokenMedia.startsWith("ba")
                ? `https://ipfs.near.social/ipfs/${tokenMedia}`
                : tokenMedia;

        if (!tokenMedia && tokenMetadata.reference) {
          if (
            nftMetadata.base_uri === "https://arweave.net" &&
            !tokenMetadata.reference.startsWith("https://")
          ) {
            const data = await fetch(
              `${nftMetadata.base_uri}/${tokenMetadata.reference}`,
            );
            const res = await data.json();

            imageUrl = res.body?.media;
          } else if (
            tokenMetadata.reference.startsWith("https://") ||
            tokenMetadata.reference.startsWith("http://")
          ) {
            const data = await fetch(tokenMetadata.reference);
            const res = await data.json();

            imageUrl = JSON.parse(res.body).media;
          } else if (tokenMetadata.reference.startsWith("ar://")) {
            const data = await fetch(
              `${"https://arweave.net"}/${tokenMetadata.reference.split("//")[1]}`,
            );
            const res = await data.json();

            imageUrl = JSON.parse(res.body).media;
          }
        }
      }

      return imageUrl;
    } else if (socialImage?.ipfs_cid) {
      return `https://ipfs.near.social/ipfs/${socialImage.ipfs_cid}`;
    } else {
      return fallbackurl ?? type === "image"
        ? "/assets/images/profile-image.png"
        : "/assets/images/profile-banner.png";
    }
  } catch (err) {
    console.log("error fetching image ", err);
    return fallbackurl ?? type === "image"
      ? "/assets/images/profile-image.png"
      : "/assets/images/profile-banner.png";
  }
};
