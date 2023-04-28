import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useContext, useEffect } from "react";

import { Context } from "../../context/authContext";
import LoginModal from "./loginModal";
import { POST } from "../../lib/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode, Navigation, Thumbs } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const ProductViewModal = ({ product, visible, setVisible }) => {
  const { state } = useContext(Context);
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
        setVisible(false)
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
                  <div className="flex gap-6">
                    <div className="max-w-[360px]">
                      <Swiper
                        spaceBetween={0}
                        slidesPerView={1}
                        loop={true}
                        loopFillGroupWithBlank={true}
                        modules={[Pagination, FreeMode, Navigation, Thumbs]}
                        thumbs={{ swiper: thumbsSwiper }}
                        className="mySwiper"
                        pagination={{
                          clickable: true,
                        }}
                      >
                        {product?.photo?.map((item, idx) => {
                          return (
                            <SwiperSlide key={idx}>
                              <Image
                                className="rounded-xl"
                                // src={Array.isArray(product.photo) ? product?.photo[0]?.url : ""}
                                src={item?.url}
                                width={420}
                                height={400}
                                alt={"Product Image"}
                              />
                            </SwiperSlide>
                          );
                        })}
                      </Swiper>
                      <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={8}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper"
                      >
                        {product?.photo?.map((item, idx) => {
                          return (
                            <SwiperSlide key={idx}>
                              <Image
                                className="rounded-md"
                                src={item?.url}
                                width={50}
                                height={50}
                                alt={"Product Image"}
                              />
                            </SwiperSlide>
                          );
                        })}
                      </Swiper>
                      {!state.user ? (
                        <div>
                          <div className="text-xl font-medium">{product.name}</div>
                          <p className="text-sm text-gray-500">
                            <span className="font-bold">Quantity: </span> {product.quantity}
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div>
                      {state.user && (
                        <div className="mt-2 text-lg flex flex-col justify-between h-full">
                          <div className="text-sm text-gray-600">
                            <div className="text-2xl font-semibold pb-2">{product?.name}</div>
                            <p>
                              <span className="font-bold">Category: </span> {product?.category}
                            </p>
                            <p>
                              <span className="font-bold">Description: </span>
                              {product?.description}
                            </p>
                            <p>
                              <span className="font-bold">Quantity: </span> {product?.quantity}
                            </p>
                            <p>
                              <span className="font-bold">Unit Price: </span>{" "}
                              {`${product?.unitPrice} BDT`}
                            </p>
                            <p>
                              <span className="font-bold">Product No: </span>
                              {product.skuNumber ? product.skuNumber : "Not available"}
                            </p>
                            {/* <p className="text-sm">
                              Send this article to your buyer email, you can change price and set
                              email only.
                            </p>
                            <p>Enter Email</p>
                            <p>Enter Price</p> */}
                          </div>

                          {state?.user.type !== "admin" && (
                            <div>
                              <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 hover:scale-[105%] focus:outline-none  focus-visible:ring-offset-2 transition-all duration-150"
                                onClick={handleSubmit}
                              >
                                Add to Cart
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-center">
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

export default ProductViewModal;
