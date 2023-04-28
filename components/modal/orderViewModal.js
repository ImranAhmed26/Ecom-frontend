import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState, useContext, useEffect } from "react";
import { Context } from "../../context/authContext";
import { PUT } from "../../lib/api";

const OrderViewModal = ({ order, visible, setVisible }) => {
  const { state } = useContext(Context);

  let imgSize = 300;

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
                <Dialog.Panel
                  className={`w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all`}
                >
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    {order?.productName}
                  </Dialog.Title>
                  <div className="flex mt-2 text-lg ">
                    <div className="flex justify-center pr-3">
                      <Image
                        className="rounded-xl"
                        src={order.product?.photo[0]?.url}
                        width={imgSize}
                        height={imgSize}
                        alt={"img"}
                      />
                    </div>
                    <div>
                      <p className="text-base text-gray-500">
                        <span className="font-bold">Product Name: </span>
                        {order.product?.name}
                      </p>
                      <p className="text-base text-gray-500">
                        <span className="font-bold">Product Price: </span>
                        {order.product?.unitPrice}
                      </p>
                      <p className="text-base text-gray-500">
                        <span className="font-bold">Quantity: </span>
                        {order.quantity}
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
                        </div>
                      )}
                      {state.user?.type !== "admin" && (
                        <>
                          {order.isDelivered ? (
                            <div>
                              <p className="text-base text-green-500 pt-2 pb-1">
                                <span className="font-bold">Your order has been delivered</span>
                              </p>
                            </div>
                          ) : (
                            <div>
                              <p className="text-base text-violet-700 pt-2 pb-1">
                                <span className="font-bold">Your order has been placed</span>
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex justify-center">
                    {state.user?.type === "admin" && (
                      <button
                        type="button"
                        className={`inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-gray-500 ${
                          !order.isDelivered
                            ? "hover:bg-indigo-200 hover:scale-105 text-indigo-900 transition-all duration-150"
                            : "cursor-default "
                        } focus:outline-none  focus-visible:ring-offset-2`}
                        onClick={handleSubmit}
                      >
                        {`${order.isDelivered ? "Order Completed" : "mark order Delivered"}`}
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
