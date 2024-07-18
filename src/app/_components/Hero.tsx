import Link from "next/link";

import { Button } from "@/common/ui/components";
import useWallet from "@/modules/auth/hooks/useWallet";
import useRegistration from "@/modules/core/hooks/useRegistration";
import routesPath from "@/modules/core/routes";
import { DonationRandomButton } from "@/modules/donation";
import { useAuth } from "@/modules/auth/hooks/useAuth";

const Hero = () => {
  const wallet = useWallet();
  const accountId = wallet?.wallet?.accountId || "";
  const { isAuthenticated } = useAuth();

  const { registration, loading } = useRegistration(accountId);
  const isRegisteredProject = !!registration.id;

  return (
    <div className="relative flex w-full flex-col justify-center overflow-hidden rounded-xl border border-solid border-[#f8d3b0] bg-hero bg-cover bg-no-repeat">
      <div className="relative z-[1] flex flex-col justify-center px-5  py-12 md:px-10 md:py-16">
        <h3 className="mb-3 mt-0 text-base font-semibold text-[#dd3345]">
          Transforming Funding for Public Goods
        </h3>
        <h1 className="lett m-0 font-lora text-4xl font-medium leading-none tracking-tight md:text-[40px]">
          Discover impact projects, donate directly, &
          <br className="hidden md:block" /> participate in funding rounds.
        </h1>
        <div className="mt-6 flex items-center gap-4 text-sm max-md:flex-col md:mt-10 md:gap-8">
          <DonationRandomButton />

          {isAuthenticated && !loading && (
            <Button
              className="w-full md:w-[180px]"
              variant={"brand-tonal"}
              asChild
            >
              <Link
                href={
                  isRegisteredProject
                    ? `/user/${accountId}`
                    : routesPath.CREATE_PROJECT
                }
                prefetch={true}
              >
                {isRegisteredProject
                  ? "View Your Project"
                  : "Register Your Project"}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
