import { useEffect, useState } from "react";

import { getImage } from "@/common/api/images";
import { useAccountDonationsSent } from "@/common/api/potlock/hooks";
import {
  NEARSocialUserProfile,
  getSocialProfile,
} from "@/common/contracts/social";
import useRegistration from "@/modules/core/hooks/useRegistration";

const useProfileData = (
  accountId?: string,
  useCache: boolean = true,
  getDonationsSent = true,
) => {
  const [profile, setProfile] = useState<NEARSocialUserProfile>();
  const [profileImages, setProfileImages] = useState({
    image: "",
    backgroundImage: "",
  });
  const [profileReady, setProfileReady] = useState(false);

  // Donations
  const { data: donationsData } = useAccountDonationsSent({
    accountId: getDonationsSent ? accountId || "" : "",
    page_size: 9999,
  });

  // Registration
  const registration = useRegistration(accountId || "");

  const profileType = registration.registration.id ? "project" : "user";

  // Fetch profile data
  useEffect(() => {
    (async () => {
      if (accountId) {
        setProfileReady(false);
        setProfile(undefined);

        const projectProfileData = await getSocialProfile({
          accountId,
          useCache,
        });

        const images = await Promise.all([
          getImage({ image: projectProfileData?.image, type: "image" }),

          getImage({
            image: projectProfileData?.backgroundImage,
            type: "backgroundImage",
          }),
        ]);

        setProfileImages({
          image: images[0],
          backgroundImage: images[1],
        });

        setProfile(projectProfileData || undefined);
        setProfileReady(true);
      }
    })();
  }, [accountId, useCache]);

  return {
    profile,
    profileImages,
    profileReady,
    donationsSent: donationsData?.results,
    registration,
    profileType,
  };
};

export default useProfileData;
