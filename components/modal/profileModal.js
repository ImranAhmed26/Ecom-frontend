import { useContext } from "react";
import { useRouter } from "next/router";
import { Context } from "../../context/authContext";
import { ArrowLeftOnRectangleIcon, ShoppingBagIcon, UserIcon } from "@heroicons/react/20/solid";

import { GET } from "../../lib/api";

const data = [
  { name: "profile", value: "profile", icon: <UserIcon className="w-5" /> },
  { name: " Cart", value: "shoppingCart", icon: <ShoppingBagIcon className="w-5" /> },
  { name: "logout", value: "logout", icon: <ArrowLeftOnRectangleIcon className="w-5" /> },
];

const ProfileModal = () => {
  const { state, dispatch } = useContext(Context);
  const router = useRouter();
  const handleClick = (value) => {
    value === "profile"
      ? router.push(`/${state.user?.type}/dashboard`)
      : value === "logout"
      ? handleLogout()
      : "";
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch({ type: "LOGOUT" });
    GET("/user/logout").then(({ data, status }) => {
      console.log(data);
    });
    router.push("/");
  };

  return (
    <div className="pt-1 rounded">
      <div
        name="data"
        className="bg-gradient-to-r from-indigo-200 to-violet-200 text-lg text-gray-500 font-semibold text-center rounded-md "
      >
        {data.map((item, index) => {
          return (
            <div
              className="p-2 text-lg font-semibold hover:text-gray-800 transition-all duration-75 cursor-pointer capitalize flex gap-1"
              value={item.value}
              key={index}
              onClick={() => handleClick(item.value)}
            >
              {item.icon}
              {item.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileModal;

