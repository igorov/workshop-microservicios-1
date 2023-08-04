"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

interface OrderAddProps {
  addOrder: Function;
  fetchOrders: Function;
}

const AddOrder: React.FC<OrderAddProps> = ({addOrder, fetchOrders}) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  
  // Campos del formulario
  const [descripcion, setDescripcion] = useState<string>("");
  const [monto, setMonto] = useState<number>(0);
  const [id_cliente, setId_cliente] = useState<number>(1);

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addOrder({
      descripcion,
      monto,
      cliente: id_cliente
    });
    setDescripcion("");
    setMonto(0);
    setId_cliente(0);

    setModalOpen(false);
    //router.push("/");
    await fetchOrders();
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className='btn btn-primary w-full'
      >
        Agregar nueva orden <AiOutlinePlus className='ml-2' size={18} />
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className='font-bold text-lg'>Agregar nueva orden</h3>
          <div className='modal-action'>
            <input
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              type='text'
              placeholder='Descripcion'
              className='input input-bordered w-full'
            />
            <input
              value={monto}
              onChange={(e) => setMonto(parseFloat(e.target.value))}
              type='number'
              placeholder='Monto'
              className='input input-bordered w-full'
            />
            <input
              value={id_cliente}
              onChange={(e) => setId_cliente(parseFloat(e.target.value))}
              type='number'
              placeholder='Cliente'
              className='input input-bordered w-full'
            />
            <button type='submit' className='btn'>
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddOrder;
