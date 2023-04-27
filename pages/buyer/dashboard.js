import { useRouter } from "next/router";
import React, { useEffect, useContext } from "react";
import Banner from "../../components/card/banner";
import ProfileDetails from "../../components/common/profileDetails";
import SideNav from "../../components/common/sideNav";
import { buyerOptions, supplierOptions } from "../../constants/sideNavOptions";

import { Context } from "../../context/authContext";

const UserDashboardPage = () => {
  const { state } = useContext(Context);
  const router = useRouter();

  useEffect(() => {
    if (state.user?.type !== "buyer") router.push("/");
  }, []);

  return (
    <div>
      <Banner>{<div>{`Hello ${state.user?.name}. Welcome to your Dashboard`}</div>}</Banner>
      <div className="mx-4 flex">
        <div className="hidden lg:block">
          <SideNav options={buyerOptions} />
        </div>
        <ProfileDetails />
      </div>
    </div>
  );
};

export default UserDashboardPage;
