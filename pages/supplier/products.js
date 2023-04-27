import { useRouter } from "next/router";
import React, { useEffect, useContext } from "react";
import { supplierOptions } from "../../constants/sideNavOptions";

import Banner from "../../components/card/banner";
import { Context } from "../../context/authContext";
import SideNav from "../../components/common/sideNav";
import ProductList from "../../components/list/productList";

const Users = () => {
  const router = useRouter();
  const { state } = useContext(Context);

  useEffect(() => {
    if (state.user?.type !== "supplier") router.push("/");
  }, []);

  return (
    <div className="h-screen ">
      <Banner>{<div>{`Hello ${state.user?.name}. Welcome to your Dashboard`}</div>}</Banner>
      <div className="mx-4 flex">
        <div className="hidden lg:block">
          <SideNav options={supplierOptions} />
        </div>
        <div className="w-full">
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default Users;
