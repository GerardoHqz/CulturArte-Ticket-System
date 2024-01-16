import { ImCross } from "react-icons/im";

import sucessLogo from "../../assets/sucessLogo.png";

function SucessBuy({ handleCloseSuccess }) {
  return (
    <div class="bg-transparent p-8 flex">
      <div class="bg-white w-fit h-fit rounded-md flex flex-col items-center px-9 py-4 gap-y-2">
        <p class=" font-montserrat font-semibold text-2xl text-center pt-5">Titulo Evento</p>
        <p class="font-montserrat">Su compra se ha realizado con exito.</p>
        <img class="h-60 w-60 m-8 mt-4" src={sucessLogo} alt="success logo" />
      </div>
      <ImCross class="ml-3 cursor-pointer" onClick={handleCloseSuccess}/>
    </div>
  );
}

export default SucessBuy;