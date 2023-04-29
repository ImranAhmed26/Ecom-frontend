import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useContext, useEffect } from "react";

import { authContext } from "../../context/authContext";
import { CartContext } from "../../context/cartContext";
import LoginModal from "./loginModal";
import { POST } from "../../lib/api";
import { AiFillMinusSquare } from "react-icons/ai";
import { AiFillPlusSquare } from "react-icons/ai";
import { IoIosCloseCircle } from "react-icons/io";
import { TbCurrencyTaka } from "react-icons/tb";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const CartViewModal = ({ product, visible, setVisible }) => {
  const { state } = useContext(authContext);
  const [productIds, setProductIds] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const { cart, removeFromCart, incrementQuantity, decrementQuantity, clearCart, totalPrice } =
    useContext(CartContext);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const productIds = cart.map((item) => ({ id: item.id, quantity: item.quantity }));
    setProductIds(productIds);
  }, [cart]);

  console.log("productId", productIds);

  const handleSubmit = () => {
    POST("/orders", productIds).then(({ data, status }) => {
      if (status !== 200) {
        console.log(status);
        console.log(data);
      } else if (status === 200) {
        console.log(data);
        setVisible(false);
      }
    });
  };

  const handleIncrement = (e) => {
    incrementQuantity(e);
  };
  const handleDecrement = (e) => {
    decrementQuantity(e);
  };
  const handleDeleteItem = (e) => {
    removeFromCart(e);
  };
  const handleRemoveAllItems = (e) => {
    clearCart();
  };

  function closeModal() {
    setVisible(false);
    setThumbsSwiper(null);
  }
  const handlePlaceOrder = () => {
    if (!state.user) setShowModal(true);
    else {
      handleSubmit();
    }
  };
  return (
    <>
      <Transition appear show={visible} as={Fragment}>
        <Dialog as="div" className="relative z-10 " onClose={closeModal}>
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

          <div className="fixed inset-0 overflow-y-auto ">
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
                  className={`w-full  transform overflow-overflow-y-auto rounded-2xl bg-white p-6 lg:min-w-[673px] lg:min-h-[400px] text-left align-middle shadow-xl transition-all  ${
                    state?.user ? "max-w-2xl" : "max-w-sm"
                  }`}
                >
                  <div>
                    <div className="font-bold text-2xl pb-6">Shopping Cart</div>
                    {cart.length != 0 ? (
                      <>
                        <table className="w-full divide-gray-200 rounded-md ">
                          <thead className="h-12">
                            <tr className="rounded-md  text-gray-600 text-lg">
                              <th className="">Image</th>
                              <th>Name</th>
                              <th>quantity</th>
                              <th className="text-end">Price</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody className="">
                            {cart.map((item) => {
                              return (
                                <tr className="text-xl font-semibold">
                                  <td>
                                    <Image
                                      src={item.photo}
                                      width={36}
                                      height={36}
                                      alt={"img"}
                                      className="rounded-full"
                                    />
                                  </td>
                                  <td>{item.name}</td>
                                  <td className="flex pt-2">
                                    <AiFillMinusSquare
                                      className="text-rose-400 text-2xl hover:text-rose-500 cursor-pointer"
                                      onClick={(e) => handleDecrement(item.id)}
                                    />
                                    <div className="text-lg px-2">{item.quantity}</div>
                                    <AiFillPlusSquare
                                      value={item.id}
                                      className="text-green-400 text-2xl hover:text-green-500 cursor-pointer"
                                      onClick={(e) => handleIncrement(item.id)}
                                    />
                                  </td>
                                  <td className="text w-20">
                                    <div className="flex items-center justify-end">
                                      <TbCurrencyTaka />
                                      <div>{`${item.unitPrice * item.quantity} `}</div>
                                    </div>
                                  </td>
                                  <td className="pb-1 pl-4">
                                    <IoIosCloseCircle
                                      className=" text-rose-300 text-2xl hover:text-red-400 cursor-pointer"
                                      onClick={(e) => handleDeleteItem(item.id)}
                                    />
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </>
                    ) : (
                      <div>Your shopping cart is empty.</div>
                    )}
                    <div className="pt-10">
                      <hr></hr>
                      <div className="flex justify-between pt-6 pl-10 pr-16 text-xl font-semibold">
                        <button
                          className={`bg-rose-300 ${
                            cart.length == 0
                              ? "bg-rose-200 cursor-default"
                              : "hover:bg-rose-400 cursor-pointer"
                          }  text-lg text-white px-2 py-0.5 rounded-md transition-all duration-150 outline-none`}
                          type="button"
                          disabled={cart.length == 0}
                          onClick={handleRemoveAllItems}
                        >
                          Clear Cart
                        </button>
                        <div className="flex justify-end ">
                          <div>Total:</div>
                          <div className="pl-5 font-bold flex items-center justify-end">
                            <TbCurrencyTaka />
                            {totalPrice}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end pr-16">
                      <button
                        type="button"
                        className={`inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-lg font-semibold text-indigo-900
                        ${
                          cart.length == 0
                            ? "bg-indigo-100 cursor-default"
                            : "hover:text-indigo-600 cursor-pointer"
                        }
                         0 focus:outline-none  focus-visible:ring-offset-2`}
                        onClick={handlePlaceOrder}
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
            <LoginModal visible={showModal} setVisible={setShowModal} />
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CartViewModal;
