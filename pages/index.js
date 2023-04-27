import Head from "next/head";
import React, { useState, useEffect, useContext } from "react";

import {
  adminOptions,
  supplierOptions,
  buyerOptions,
  noOptions,
} from "../constants/sideNavOptions";
import { Context } from "../context/authContext";
import Banner from "../components/card/banner";
import ProductGrid from "../components/list/productGrid";
import SideCategories from "../components/common/sideCategories";
import SideNav from "../components/common/sideNav";

export default function Home() {
  const [sideOptions, setSideOptions] = useState();
  const { state, dispatch } = useContext(Context);

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
        <title>Rmg Stock</title>
        <meta
          name="rmgstock.com"
          content="rmgstock.com is a trademark website of NITB group and GG Fashion Sourcing and is a trading hub for RMG buyers and suppliers in Bangladesh"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full">
        <Banner>{<div>Welcome to a unique RMG Trading experience</div>}</Banner>
        <div className="mx-4 flex">
          <div className="hidden lg:block">
            {sideOptions ? <SideNav options={sideOptions} /> : ""}
            <SideCategories />
          </div>
          <ProductGrid />
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* <span>Footer</span> */}
        </a>
      </footer>
    </div>
  );
}
