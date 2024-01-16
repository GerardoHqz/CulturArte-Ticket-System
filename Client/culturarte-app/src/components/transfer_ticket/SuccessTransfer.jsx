import { ImCross } from "react-icons/im";

import successLogo from "../../assets/success-transfer.png";

function SuccessTransfer(params) {
  return (
    <div class="bg-transparent p-8 flex">
      <div class="bg-white w-fit h-fit rounded-md flex flex-col items-center px-9 py-4 gap-y-2">
        <p class="font-semibold text-2xl text-center pt-5 pb-3 font-montserrat">
          ¡Transferencia realizada con éxito!
        </p>
        <img class="h-60 w-60 m-8 mt-4" src={successLogo} alt="success logo" />
        <p>Transferido a: {params.email}</p>
        <p class="text-gray-500 font-montserrat">{params.datetime}</p>
      </div>
      <ImCross class="ml-3 cursor-pointer" />
    </div>
  );
}

export default SuccessTransfer;
