"use client";

import { ICustomer } from "@/types/customers";
import Customer from "./Customer";

interface CustomerListProps {
  customers: ICustomer[];
  editCustomer: Function;
  deleteCustomer: Function;
  fetchCustomers: Function;
}

const CustomerList: React.FC<CustomerListProps> = ({ customers, editCustomer, deleteCustomer, fetchCustomers }) => {

  return (
    <div className='overflow-x-auto'>
      <table className='table w-full'>
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Saldo</th>
            <th>Correo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <Customer key={customer.id} customer={customer} editCustomer={editCustomer} deleteCustomer={deleteCustomer} fetchCustomers={fetchCustomers} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
