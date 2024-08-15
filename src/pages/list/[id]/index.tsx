"use client";
import React from "react";

import ListAccounts from "@/modules/lists/components/ListAccounts";

import { ListDetails } from "../../../modules/lists/components/ListDetails";

export default function Page() {
  return (
    <>
      <ListDetails />
      <ListAccounts />
    </>
  );
}
