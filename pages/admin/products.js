import { useRouter } from "next/router";
import React, { useEffect, useContext } from "react";
import { adminOptions } from "../../constants/sideNavOptions";

import Banner from "../../components/card/banner";
import { authContext } from "../../context/authContext";
import SideNav from "../../components/common/sideNav";
import ProductList from "../../components/list/productList";

const Users = () => {
  const router = useRouter();
  const { state } = useContext(authContext);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user"))?.type !== "admin") router.push("/");
  }, []);

  return (
    <div className="h-screen ">
      <Banner>{<div>{`Hello ${state.user?.name}. Welcome to your Dashboard`}</div>}</Banner>
      <div className="mx-4 flex">
        <div className="hidden lg:block">
          <SideNav options={adminOptions} />
        </div>
        {state.user?.type === "admin" && (
          <div className="w-full">
            <ProductList />
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
