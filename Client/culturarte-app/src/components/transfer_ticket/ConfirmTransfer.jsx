import { ImCross } from "react-icons/im";

function ConfirmTransfer(props) {
  return (
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 z-50">
      <div class="bg-transparent p-8 flex">
        <div class="bg-white w-fit h-fit rounded-md flex flex-col items-center px-9 py-4 gap-y-2">
          <p class="font-semibold text-2xl text-center pt-5 pb-3 font-montserrat">
            Transferencia de ticket
          </p>
          <label class="mx-5">Ingresar el código de confirmación:</label>
          <input class="border-solid border-2 border-gray-400 m-4 p-1 rounded-md w-11/12" />
          <button class="bg-darkblue text-white p-2 m-4 mt-0 rounded-md w-11/12 hover:bg-blue-900 cursor-pointer">
            Verificar
          </button>
        </div>

        <ImCross
          class="ml-3 cursor-pointer"
          onClick={() => {
            props.onHideComponents(); // Llama a la función para ocultar los componentes en RedeemTicket
          }}
        />
      </div>
    </div>
  );
}

export default ConfirmTransfer;
