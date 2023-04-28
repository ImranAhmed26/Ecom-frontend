import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState, useContext, useEffect } from "react";
import { Context } from "../../context/authContext";
import { PUT } from "../../lib/api";

const OrderViewModal = ({ order, visible, setVisible }) => {
  const { state } = useContext(Context);

  const handleSubmit = () => {
    PUT(`/orders/${order?._id}`).then(({ data, status }) => {
      if (status !== 200) {
        console.log(status);
        console.log(data);
      } else if (status === 200) {
        console.log(data);
      }
    });
  };

  function closeModal() {
    setVisible(false);
  }
  return (
    <>
      <Transition appear show={visible} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    {order?.productName}
                  </Dialog.Title>
                  <div className="mt-2 text-lg ">
                    <p className="text-base text-gray-500">
                      <span className="font-bold">Product Name: </span>
                      {order.product?.name}
                    </p>
                    {state.user?.type === "admin" && (
                      <div>
                        <p className="text-base text-green-500 pt-2 pb-1">
                          <span className="font-bold">User Details: </span>
                        </p>
                        <p className="text-sm text-gray-500">
                          <span className="font-bold"> Name: </span> {order.user?.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          <span className="font-bold"> Email: </span> {order.user?.email}
                        </p>
                        <p className="text-sm text-gray-500">
                          <span className="font-bold"> Phone: </span> {order.user?.phone}
                        </p>
                        <p className="text-sm text-gray-500">
                          <span className="font-bold"> Company name : </span>
                          {order.user?.companyName}
                        </p>
                      </div>
                    )}
                    {order.isDelivered ? (
                      <div>
                        <p className="text-base text-green-500 pt-2 pb-1">
                          <span className="font-bold">Delivered</span>
                        </p>
                      </div>
                    ) : (
                      <div>
                        {state.user?.type !== "admin" && (
                          <p className="text-base text-violet-700 pt-2 pb-1">
                            <span className="font-bold">Your order has been placed</span>
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex justify-center">
                    {state.user?.type === "admin" && (
                      <button
                        type="button"
                        className={`inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-gray-500 ${
                          !order.supplierInfo && "hover:bg-indigo-200 text-indigo-900"
                        } focus:outline-none  focus-visible:ring-offset-2`}
                        onClick={handleSubmit}
                      >
                        {`${
                          order.supplierInfo ? "Supplier Details Sent" : "Send Supplier details"
                        }`}
                      </button>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default OrderViewModal;
