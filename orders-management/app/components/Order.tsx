"use client";

import { IOrder } from "@/types/orders";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";

interface OrderProps {
  order: IOrder;
}

const Order: React.FC<OrderProps> = ({ order }) => {

  let orderClass = '';
  if (order.estado === 'p') {
    orderClass = 'text-blue-500';
  } else if (order.estado === 'a') {
    orderClass = 'text-green-500';
  } else if (order.estado === 'd') {
    orderClass = 'text-red-500';
  }

  return (
    <tr key={order.id} className={`h-10 ${orderClass}`}>
      <td className='w-1/12'>{order.id}</td>
      <td className='w-6/12'>{order.descripcion}</td>
      <td className='w-3/12'>{order.monto}</td>
      <td className='w-1/12'>{order.id_cliente}</td>
      <td className='w-1/12'>{order.estado}</td>
    </tr>
  );
};

export default Order;
