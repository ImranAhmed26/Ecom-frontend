import { useRouter } from "next/router";
import React, { useEffect, useContext } from "react";
import Banner from "../../components/card/banner";
import ProfileDetails from "../../components/common/profileDetails";
import SideNav from "../../components/common/sideNav";
import { supplierOptions } from "../../constants/sideNavOptions";
import { Context } from "../../context/authContext";

const SupplierDashboardPage = () => {
  const router = useRouter();
  const { state } = useContext(Context);
  // console.log(state);
  useEffect(() => {
    if (state.user?.type !== "supplier") router.push("/");
  }, []);

  return (
    <div>
      <Banner>{`Hello ${state.user?.name}. Welcome to your Dashboard`}</Banner>
      <div className="mx-4 flex">
        <div className="hidden lg:block">
          <SideNav options={supplierOptions} />
        </div>
        <ProfileDetails />
      </div>
    </div>
  );
};

export default SupplierDashboardPage;
 