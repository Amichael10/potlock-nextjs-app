import React from "react";

import AllLists from "../_components/AllLists";
import { ListHero } from "../_components/ListHero";
export default function Page() {
  return (
    <div className="container">
      <ListHero />
      <AllLists />
    </div>
  );
}
