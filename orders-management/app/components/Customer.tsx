"use client";

import { ICustomer } from "@/types/customers";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";

interface CustomerProps {
  customer: ICustomer;
  editCustomer: Function;
  deleteCustomer: Function;
  fetchCustomers: Function;
}

const Customer: React.FC<CustomerProps> = ({ customer, editCustomer, deleteCustomer, fetchCustomers }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);

  // Campos del formulario
  const [nombre, setNombre] = useState<string>("");
  const [saldo, setSaldo] = useState<number>(0);
  const [correo, setCorreo] = useState<string>("");

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editCustomer({
      id: customer.id,
      nombre: nombre,
      saldo: saldo,
      correo: correo
    });
    setOpenModalEdit(false);
    //router.refresh();
    await fetchCustomers();
  };

  const handleDeleteTask = async (id: number) => {
    await deleteCustomer(id);
    setOpenModalDeleted(false);
    //router.refresh();
    await fetchCustomers();
  };

  return (
    <tr key={customer.id}>
      <td className='w-1/12'>{customer.id}</td>
      <td className='w-4/12'>{customer.nombre}</td>
      <td className='w-2/12'>{customer.saldo}</td>
      <td className='w-5/12'>{customer.correo}</td>
      <td className='flex gap-5'>
        <FiEdit
          onClick={() => {
            setNombre(customer.nombre);
            setSaldo(customer.saldo);
            setCorreo(customer.correo);
            setOpenModalEdit(true);
          }}
          cursor='pointer'
          className='text-blue-500'
          size={25}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className='font-bold text-lg'>Editar cliente</h3>
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
        <FiTrash2
          onClick={() => setOpenModalDeleted(true)}
          cursor='pointer'
          className='text-red-500'
          size={25}
        />
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <h3 className='text-lg'>
            ¿Seguro de eliminar el cliente?
          </h3>
          <div className='modal-action'>
            <button onClick={() => handleDeleteTask(customer.id ? customer.id : 0)} className='btn'>
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Customer;
