/* eslint-disable @next/next/no-img-element */

import { useState } from "react";

import useProfileData from "@/modules/profile/hooks/useProfileData";

const NO_IMAGE =
  "https://ipfs.near.social/ipfs/bafkreiccpup6f2kihv7bhlkfi4omttbjpawnsns667gti7jbhqvdnj4vsm";

export const CustomAvatar = ({
  accountId,
  size = 12,
  className,
}: {
  accountId?: string;
  size?: number;
  className?: string;
}) => {
  const profileInfo = useProfileData(accountId);
  const [hasError, setHasError] = useState(false);

  if (!profileInfo.profileReady || !accountId) {
    return (
      <img
        alt="avatar"
        className={`h-[${size}px] w-[${size}px] rounded-[50%] bg-white ${className}`}
        src={NO_IMAGE}
      />
    );
  }

  return (
    <img
      alt="avatar"
      className={`h-[${size}px] w-[${size}px] rounded-[50%] bg-white ${className}`}
      src={hasError ? NO_IMAGE : profileInfo.profileImages.image}
      onError={() => setHasError(true)}
    />
  );
};
