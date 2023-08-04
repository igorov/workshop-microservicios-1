"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

interface CustomerAddProps {
  addCustomer: Function;
  fetchCustomers: Function;
}

const AddCustomer: React.FC<CustomerAddProps> = ({addCustomer, fetchCustomers}) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  
  // Campos del formulario
  const [nombre, setNombre] = useState<string>("");
  const [saldo, setSaldo] = useState<number>(0);
  const [correo, setCorreo] = useState<string>("");

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addCustomer({
      nombre,
      saldo,
      correo
    });
    setNombre("");
    setSaldo(0);
    setCorreo("");

    setModalOpen(false);
    //router.push("/");
    await fetchCustomers();
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className='btn btn-primary w-full'
      >
        Agregar nuevo cliente <AiOutlinePlus className='ml-2' size={18} />
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className='font-bold text-lg'>Agregar nuevo cliente</h3>
          <div className='modal-action'>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              type='text'
              placeholder='Nombre del cliente'
              className='input input-bordered w-full'
            />
            <input
              value={saldo}
              onChange={(e) => setSaldo(parseFloat(e.target.value))}
              type='number'
              placeholder='Saldo del cliente'
              className='input input-bordered w-full'
            />
            <input
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              type='text'
              placeholder='Correo del cliente'
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

export default AddCustomer;
