import Image from "next/image";
import React, { useState, useEffect } from "react";

import UserEditModal from "../modal/userEditModal";
import Loader from "../common/loader";
import { GET } from "../../lib/api";

const UserList = () => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [user, setUser] = useState({});

  const handleOpenCard = () => {
    setVisible(true);
  };

  useEffect(() => {
    GET("/users").then(({ data, status }) => {
      if (status !== 200) {
        console.log(data);
        console.log(status);
        setLoading(false);
      } else if (status === 200) {
        console.log("Login success");
        console.log(data);
        setData(data);
        setLoading(false);
      }
    });
  }, []);

  return (
    <div className="lg:px-6 pb-4 mx-2  h-full w-full">
      <div className="flex justify-between w-full pr-2">
        <div className="text-2xl font-bold font-sans cursor-default py-1 mb-2">Users</div>
      </div>
      <div className="">
        <div className="w-full">{isLoading && <Loader />}</div>
        <table className="min-w-full divide-y divide-gray-200 rounded-md">
          <thead>
            <tr className="w-full bg-gray-700 rounded-md px-2 py-10 text-gray-100">
              <th className="py-2">Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>type</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="w-full px-6 py-2 text-center hover:bg-slate-200 transition-all duration-150 cursor-pointer"
                  onClick={() => {
                    handleOpenCard();
                    setUser(item);
                  }}
                >
                  <td className="py-2">{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.type}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <UserEditModal visible={visible} setVisible={setVisible} user={user} />
    </div>
  );
};

export default UserList;
