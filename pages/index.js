import Head from "next/head";
import React, { useState, useEffect, useContext } from "react";

import {
  adminOptions,
  supplierOptions,
  buyerOptions,
  noOptions,
} from "../constants/sideNavOptions";
import { authContext } from "../context/authContext";
import Banner from "../components/card/banner";
import ProductGrid from "../components/list/productGrid";
import SideCategories from "../components/common/sideCategories";
import SideNav from "../components/common/sideNav";

export default function Home() {
  const [sideOptions, setSideOptions] = useState();
  const { state, dispatch } = useContext(authContext);

  useEffect(() => {
    console.log("User is ", state.user?.type);
    if (state.user?.type === "admin") {
      setSideOptions(adminOptions);
    } else if (state.user?.type === "supplier") {
      setSideOptions(supplierOptions);
    } else if (state.user?.type === "buyer") setSideOptions(buyerOptions);
    else setSideOptions("");
  }, [state]);

  console.log("State", state.user);

  return (
    <div className="">
      <Head>
        <title>Nexa Mart</title>
        <meta
          name="description"
          content="Nexa Mart is a online marketplace for resolving easy grocessary shopping in bangladesh. "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full">
        <Banner>
          {
            <>
              <div className="">Welcome to NexaMart.</div>
            </>
          }
        </Banner>
        <div className="mx-4 flex">
          <div className="hidden lg:block">
            {sideOptions ? <SideNav options={sideOptions} /> : ""}
            <SideCategories />
          </div>
          <ProductGrid />
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
