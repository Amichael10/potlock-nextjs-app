import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { potlock } from "@/common/api/potlock";
import { Filter, Group, SearchBar, SortSelect } from "@/common/ui/components";
import { Profile } from "@/modules/profile/models";
import { categories, statuses } from "@/modules/project/constants";
import { useTypedSelector } from "@/store";

import { AccountCard } from "./AccountCard";

export const ListAccounts = () => {
  const router = useRouter();
  const { id } = router.query;

  const [filteredRegistrations, setFilteredRegistrations] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [accountsWithAccess, setAccountsWithAccess] = useState<string[]>([]);
  // const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [statusFilter, setsStatusFilter] = useState<string[]>(["all"]);
  const [currentListType, setCurrentListType] = useState(
    "Accounts in the list",
  );

  const SORT_LIST_PROJEECTS = [
    { label: "Most recent", value: "recent" },
    { label: "Least recent", value: "older" },
  ];

  const tagsList: Group[] = [
    // {
    //   label: "Category",
    //   options: categories,
    //   props: {
    //     value: categoryFilter,
    //     onValueChange: (value) => setCategoryFilter(value),
    //   },
    // },
    {
      label: "Status",
      options: statuses,
      props: {
        value: statusFilter,
        onValueChange: (value) => {
          if (value[value.length - 1] === "all") {
            setsStatusFilter(["all"]);
          } else if (value.includes("all")) {
            const filter = value.filter((item) => item !== "all");
            setsStatusFilter(filter);
          } else {
            setsStatusFilter(value);
          }
        },
      },
    },
  ];

  const handleSort = (sortType: string) => {
    const projects = [...filteredRegistrations];
    switch (sortType) {
      case "recent":
        projects.sort(
          (a, b) =>
            new Date(b.submitted_at).getTime() -
            new Date(a.submitted_at).getTime(),
        );
        setFilteredRegistrations(projects);
        break;
      case "older":
        projects.sort(
          (a, b) =>
            new Date(a.submitted_at).getTime() -
            new Date(b.submitted_at).getTime(),
        );
        setFilteredRegistrations(projects);
        break;
      default:
        break;
    }
  };
  // const registrationsProfile = useTypedSelector((state) => state.profiles);

  const handleFilter = (registration: any) => {
    const matchesSearch = search
      ? registration.registrant?.near_social_profile_data?.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        registration.registrant?.id?.toString().includes(search)
      : true; // If no search term, consider it a match

    const matchesStatus =
      statusFilter.includes("all") || statusFilter.length === 0
        ? true
        : statusFilter.includes(registration.status); // Implement your status filter logic here
    const matchesCategory = true; // Implement your category filter logic here

    return matchesSearch && matchesStatus && matchesCategory;
  };

  useEffect(() => {
    const filtered = registrations.filter(handleFilter);
    setFilteredRegistrations(filtered);
  }, [search, registrations, statusFilter]);

  const { data, isLoading } = potlock.useListRegistrations({
    listId: parseInt(id as string),
  });

  const { data: listData, isLoading: loadingListData } = potlock.useList({
    listId: parseInt(id as string),
  });

  useEffect(() => {
    if (!loadingListData && listData) {
      const accountsWithAccess = [
        ...(listData.admins?.map((item) => item.id) || []),
        listData.owner?.id,
      ].filter(Boolean);

      setAccountsWithAccess(accountsWithAccess);
    }
  }, [listData, loadingListData]);

  useEffect(() => {
    setRegistrations((data?.results as any) ?? []);
    setFilteredRegistrations((data?.results as any) ?? []);
    // setAccountsWithAccess(data?.results?.map((item) => item.registrant?.id));
  }, [data]);

  if (isLoading) {
    return (
      <div className="p-10">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="md:px-10 md:pb-0 md:pt-12 flex w-full flex-col px-2 pt-10">
      <div className="flex w-full flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium uppercase leading-6 tracking-[1.12px] text-[#292929]">
            {currentListType}
            <span
              style={{ color: "#DD3345", marginLeft: "8px", fontWeight: 600 }}
            >
              {filteredRegistrations?.length}
            </span>
          </div>
        </div>
        <div className="flex w-full items-center gap-4">
          <SearchBar
            placeholder="Search Accounts"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
          <Filter
            // toggleProps={{
            //   onValueChange: handleTag,
            // }}
            groups={tagsList}
          />
          <SortSelect
            options={SORT_LIST_PROJEECTS}
            onValueChange={handleSort}
          />
        </div>
      </div>
      <div className="md:grid-cols-2 lg:grid-cols-3 mt-8 grid w-full grid-cols-1 gap-8">
        {(filteredRegistrations ?? [])?.map((item, index) => (
          <AccountCard
            accountsWithAccess={accountsWithAccess}
            dataForList={item}
            key={index}
          />
        ))}
        {filteredRegistrations?.length === 0 && <p>No Registrations present</p>}
      </div>
    </div>
  );
};

export default ListAccounts;
