import Image from "next/image";
import React, { useState, useEffect, useContext } from "react";

import { Context } from "../../context/authContext";
import { formatDate } from "../../lib/helper";
import { GET } from "../../lib/api";
import RequestViewModal from "../modal/requestViewModal";

const RequestList = () => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [data, setData] = useState();
  const [request, setRequest] = useState({});
  const [requestUrl, setRequestUrl] = useState("");

  const { state } = useContext(Context);

  const handleOpenCard = () => {
    setVisible(true);
  };

  useEffect(() => {
    GET(`${state.user?.type === "admin" ? "/requests" : "/requests/myrequests"}`).then(
      ({ data, status }) => {
        if (status !== 200) {
          console.log(data);
          console.log(status);
        } else if (status === 200) {
          console.log("Login success");
          console.log(data);
          setData(data);
        }
      },
    );
  }, []);

  return (
    <div className="lg:px-6 pb-4 mx-2 min-h-[600px]  h-full w-full">
      <div className="flex justify-between w-full pr-2">
        <div className="text-2xl font-bold font-sans cursor-default py-1 mb-2">Requests</div>
      </div>
      <div className="">
        <table className="min-w-full divide-y divide-gray-200 rounded-md">
          <thead>
            <tr className="w-full bg-gray-700 rounded-md px-2 py-10 text-gray-100">
              <th className="py-2">Date</th>
              <th className="py-2">Query</th>
              <th>For Product</th>
              <th>Status</th>
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
                    setRequest(item);
                  }}
                >
                  <td className="py-2">{formatDate(item.createdAt)}</td>
                  <td className="py-2">{item.requestName}</td>
                  <td>{item.product?.name}</td>
                  {state.user?.type === "admin" ? (
                    <td>
                      {item.supplierInfo ? (
                        <span className="text-green-500 font-medium">Response Sent</span>
                      ) : (
                        <span className="text-rose-400 font-medium">Response Pending</span>
                      )}
                    </td>
                  ) : (
                    <td>
                      {item.supplierInfo ? (
                        <span className="text-green-500 font-medium">Click to view response</span>
                      ) : (
                        <span className="text-rose-400 font-medium">
                          Please wait for a response
                        </span>
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <RequestViewModal visible={visible} setVisible={setVisible} request={request} />
    </div>
  );
};

export default RequestList;
