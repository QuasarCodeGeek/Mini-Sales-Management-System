import Swal from "sweetalert2"

export const showAlert = ({
  message,
  type,
}: {
  message: string
  type: "success" | "error" | "info" | "warning"
}) => {
  return Swal.fire({
    // titleText: title,
    text: message,
    icon: type,
    toast: true,
    position: "bottom-end",
    timer: 3000,
    showConfirmButton: false,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
    // customClass: {
    //   popup: "swal2-toast-custom",
    //   title: "swal2-title-custom",
    //   htmlContainer: "swal2-content-custom",
    //   icon: "swal2-icon-custom",
    // },
  })
}