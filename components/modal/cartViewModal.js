import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useContext, useEffect } from "react";

import { authContext } from "../../context/authContext";
import { cartContext } from "../../context/cartContext";
import LoginModal from "./loginModal";
import { POST } from "../../lib/api";
import { Pagination, FreeMode, Navigation, Thumbs } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const CartViewModal = ({ product, visible, setVisible }) => {
  const { state } = useContext(authContext);
  // const { cart: cartState } = useContext(cartContext);
  const [productId, setProductId] = useState("");
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const body = { product: productId };

  useEffect(() => {
    setProductId(product?._id);
  }, [product]);

  const handleSubmit = () => {
    POST("/orders", body).then(({ data, status }) => {
      if (status !== 200) {
        console.log(status);
        console.log(data);
      } else if (status === 200) {
        console.log(data);
        setVisible(false);
      }
    });
  };

  function closeModal() {
    setVisible(false);
    setThumbsSwiper(null);
  }
  const handleShowModal = () => {
    setShowModal(true);
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
                  className={`w-full  transform overflow-overflow-y-auto rounded-2xl bg-white p-3 text-left align-middle shadow-xl transition-all  ${
                    state?.user ? "max-w-2xl" : "max-w-sm"
                  }`}
                >
                  <div>
                    <div className="font-bold text-xl">Shopping Cart</div>
                    <div className="flex gap-6">
                      <div>IMG</div>
                      <div>Product Name</div>
                      <div>2</div>
                      <div>260 BDT</div>
                    </div>
                  </div>
                  {/* <div className="mt-4 flex justify-center">
                    {!state.user && (
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:text-indigo-600 focus:outline-none  focus-visible:ring-offset-2"
                        onClick={() => {
                          handleShowModal();
                        }}
                      >
                        Add item to Cart
                      </button>
                    )}
                  </div> */}
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
