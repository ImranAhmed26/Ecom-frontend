import { Fragment, useState, useContext, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { Context } from "../../context/authContext";
import { DELETE, PUTFORM } from "../../lib/api";

export default function ProductEditModal({ visible, setVisible, product }) {
  //Context  State

  const { state } = useContext(Context);
  // Router

  // Update form data
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState();

  useEffect(() => {
    setName(product.name || "");
    setDescription(product.description || "");
    setUnitPrice(product.unitPrice || "");
    setCategory(product.category || "");
    setQuantity(product.quantity || "");
  }, [product.name, product.description, product.category, product.unitPrice, product.quantity]);

  // Reset State
  function resetState() {
    setName("");
    setDescription("");
    setUnitPrice("");
    setCategory("");
    setQuantity("");
  }

  const handleSetPhoto = (event) => {
    setPhoto(event.target.files[0]);
  };

  // Edit API
  const handlePutRequest = (event) => {
    event.preventDefault();
    const form = new FormData();
    form.append("name", name);
    form.append("description", description);
    form.append("unitPrice", unitPrice);
    form.append("category", category);
    form.append("quantity", quantity);
    form.append("supplier", state.user?._id);
    if (photo) {
      form.append("photo", photo, photo.name);
    }

    PUTFORM(`/products/${product._id}`, form).then(({ data, status }) => {
      if (status !== 200) {
        console.log(data);
        console.log(status);
      } else if (status === 200) {
        console.log("Update successful");
        resetState();
        location.reload();
      }
    });
  };
  // Delete Api
  const handleDeleteRequest = () => {
    DELETE(`/products/${product._id}`).then(({ data, status }) => {
      if (status !== 200) {
        console.log(data);
        console.log(status);
      } else if (status === 200) {
        console.log("Delete successful");
        console.log(data);
        resetState();
        // setVisible(false);
        location.reload();
      }
    });
  };

  const closeModal = () => {
    setVisible(false);
  };

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl leading-6 text-gray-700 text-center pb-4 font-bold"
                    >
                      Update Product Details
                    </Dialog.Title>
                    <div
                      className="bg-rose-300 px-2 w-8 h-8 text-center rounded-md font-bold text-lg text-gray-600 hover:bg-rose-400 transition-all duration-150 cursor-pointer"
                      onClick={closeModal}
                    >
                      x
                    </div>
                  </div>

                  <div>
                    <div className="mt-2 flex items-center gap-1">
                      <div className="font-medium  w-[30%]">Name: </div>
                      <input
                        className="outline-none text-sm text-gray-800 border px-4 py-2 w-full rounded-md "
                        placeholder="Name"
                        category="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mt-2 flex items-center gap-1">
                      <div className="font-medium w-[27%]">Description: </div>
                      <input
                        className="outline-none text-sm text-gray-800 border px-4 py-2 w-full rounded-md"
                        placeholder="description"
                        category="description"
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mt-2 flex items-center gap-1">
                      <div className="font-medium  w-[30%]">Price: </div>
                      <input
                        className="outline-none text-sm text-gray-800 border px-4 py-2 w-full rounded-md "
                        placeholder="UnitPrice"
                        category="number"
                        value={unitPrice}
                        onChange={(e) => {
                          setUnitPrice(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mt-2 flex items-center gap-1 ">
                      <div className="font-medium  w-[30%]">Quantity: </div>
                      <input
                        className="outline-none text-sm text-gray-800 border px-4 py-2 w-full rounded-md "
                        placeholder="UnitPrice"
                        category="number"
                        value={quantity}
                        onChange={(e) => {
                          setQuantity(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mt-2 flex items-center gap-1">
                      <div className="font-medium  w-[30%]">Category: </div>
                      <input
                        className="outline-none text-sm text-gray-800 border px-4 py-2 w-full rounded-md "
                        placeholder="Category"
                        category="text"
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                          console.log(typeof photo);
                        }}
                      />
                    </div>
                    <div className="mt-2 flex items-center">
                      <h1 className="font-medium w-[31%]">Images: </h1>
                      <input
                        className="outline-none text-sm text-gray-800 border px-4 py-2 w-full rounded-md "
                        type="file"
                        multiple
                        onChange={(e) => {
                          handleSetPhoto(e);
                        }}
                      />
                    </div>

                    <div className="pt-4">
                      <button
                        category="button"
                        className={`cursor-pointer inline-flex justify-center rounded-md border  px-4 py-2 font-medium  ${
                          description && name && unitPrice && quantity && category
                            ? "bg-lime-400  text-gray-800"
                            : "bg-lime-300 text-white"
                        } w-full transition-all duration-150`}
                        disabled={!description && !name && !unitPrice && !photo}
                        onClick={(e) => {
                          handlePutRequest(e);
                        }}
                      >
                        Confirm Update
                      </button>
                      {state?.user?.type === "admin" ? (
                        <button
                          className={`inline-flex justify-center rounded-md border bg-rose-300 px-4 py-2 mt-2 font-medium text-gray-800 hover:bg-rose-400 hover:text-white transition-all duration-150 w-full `}
                          onClick={(e) => {
                            e.preventDefault();
                            handleDeleteRequest();
                          }}
                        >
                          Delete Product
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
