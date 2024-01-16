import { ImCross } from "react-icons/im";

import failLogo from "../../assets/error-transfer.png";

function ErrorTransfer() {
  return (
    <div class="bg-transparent p-8 flex">
      <div class="bg-white w-fit h-fit rounded-md flex flex-col items-center px-9 py-4 gap-y-2">
        <p class="font-semibold text-2xl text-center pt-5 font-montserrat">¡Error!</p>
        <p>Código inválido</p>
        <img class="h-60 w-60 m-8 mt-4" src={failLogo} alt="success logo" />
      </div>
      <ImCross class="ml-3 cursor-pointer" />
    </div>
  );
}

export default ErrorTransfer;
