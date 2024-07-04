import { useCallback, useMemo } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type RouteParams = Record<string, string | null>;

/**
 * Provides a method to update URL query parameters for the current route.
 *
 * @example
 * const { syncRouteQuery } = useRouteQuerySync();
 *
 * // Sets `accountId` query parameter to "root.near"
 * syncRouteQuery({ accountId: "root.near" });
 *
 * // Deletes `transactionHashes` query parameter
 * syncRouteQuery({ transactionHashes: null });
 */
export const useRouteQuerySync = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentQueryString = useSearchParams().toString();

  const searchParamsDecoded = useMemo(
    () => new URLSearchParams(currentQueryString),
    [currentQueryString],
  );

  const syncRouteQuery = useCallback(
    (newParams: RouteParams) => {
      Object.entries(newParams).forEach(([key, value]) =>
        value
          ? searchParamsDecoded.set(key, value)
          : searchParamsDecoded.delete(key),
      );

      router.replace(`${pathname}?${searchParamsDecoded.toString()}`);
    },

    [pathname, router, searchParamsDecoded],
  );

  return { syncRouteQuery };
};
