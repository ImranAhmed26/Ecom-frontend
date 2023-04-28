import { useRouter } from "next/router";
import React, { useEffect, useContext } from "react";
import Banner from "../../components/card/banner";
import SideNav from "../../components/common/sideNav";
import OrderList from "../../components/list/orderList";
import { buyerOptions } from "../../constants/sideNavOptions";
import { Context } from "../../context/authContext";

const Orders = () => {
  const router = useRouter();
  const { state } = useContext(Context);
  useEffect(() => {
    if (state.user?.type !== "buyer") router.push("/");
  }, []);
  return (
    <div>
      <Banner>{`Hello ${state.user?.name}. Welcome to your Dashboard`}</Banner>
      <div className="mx-4 flex">
        <div className="hidden lg:block">
          <SideNav options={buyerOptions} />
        </div>
        <OrderList />
      </div>
    </div>
  );
};

export default Orders;
