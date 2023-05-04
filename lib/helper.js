import { toast } from "react-toastify";

// Function for formatting Date
export const formatDate = (date, options = {}) => {
  const { day = true } = options;
  const str = new Date(date).toDateString().split(" ");
  return `${str[1]} ${str[2]}, ${str[3]}`;
};

// Handle Toast Messages

export const toastErrorMessage = (data, status) => {
  toast.error(data.message);
};

export const toastSuccessMessage = (data, status) => {
  toast.success(data.message);
};

export const toastDefaultMessage = (message) => {
  toast(` ${message}`, {
    position: "top-right",
    autoClose: 1200,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    progressStyle: { animation: "none" },
  });
  setTimeout(() => {
    toast.dismiss();
  }, 2000);
};

export const toastPromiseMessage = (req) => {
  toast.promise(req, {
    pending: "🐬 Please Wait",
  });
};
