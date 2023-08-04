"use client";

import { IOrder } from "@/types/orders";
import Order from "./Order";

interface OrderListProps {
  orders: IOrder[];
}

const CustomerList: React.FC<OrderListProps> = ({ orders }) => {

  return (
    <div className='overflow-x-auto'>
      <table className='table w-full'>
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Descripcion</th>
            <th>Monto</th>
            <th>Cliente</th>
            <th>Estado</th>
            
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <Order key={order.id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
