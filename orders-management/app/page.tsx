"use client";

import React, { useEffect, useState } from 'react';
import AddCustomer from "./components/AddCustomer";
import AddOrder from "./components/AddOrder";
import CustomerList from "./components/CustomerList";
import OrderList from "./components/OrderList";
import { ICustomer } from "@/types/customers";
import { IOrder } from "@/types/orders";

export default function Home() {
  const [loadingCustomers, setLoadingCustomers] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    fetchCustomers();
    fetchOrders();
  }, []);

  // Funciones para customers
  const fetchCustomers = async () => {
    try {
      setLoadingCustomers(true); // Set loading to false when the data is fetched
      const response = await fetch(`${process.env.NEXT_PUBLIC_CUSTOMERS_URL}/customers`);
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCustomers(false); // Set loading to false when the data is fetched
    }
  };

  const editCustomer = async (customer: ICustomer) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_CUSTOMERS_URL}/customers/${customer.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
      })
      const updatedTodo = await res.json();
      return updatedTodo;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCustomer = async (id: number) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_CUSTOMERS_URL}/customers/${id}`, {
        method: 'DELETE',
      })
    } catch (error) {
      console.log(error);
    }
  };

  const addCustomer = async (customer: ICustomer) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CUSTOMERS_URL}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    })
    const newTodo = await res.json();
    return newTodo;
  }

  // Funciones para orders
  const fetchOrders = async () => {
    try {
      setLoadingOrders(true); // Set loading to false when the data is fetched
      const response = await fetch(`${process.env.NEXT_PUBLIC_ORDERS_URL}/orders`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingOrders(false); // Set loading to false when the data is fetched
    }
  };

  const editOrder = async (order: IOrder) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_ORDERS_URL}/orders/${order.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
      })
      const updatedTodo = await res.json();
      return updatedTodo;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOrder = async (id: number) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_ORDERS_URL}/orders/${id}`, {
        method: 'DELETE',
      })
    } catch (error) {
      console.log(error);
    }
  };

  const addOrder = async (order: IOrder) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ORDERS_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    })
    const newTodo = await res.json();
    return newTodo;
  }

  return (
    <main className='max-w-4xl mx-auto mt-4'>
      <div className='text-center my-5 flex flex-col gap-4'>
        <button
          onClick={() => {
            fetchCustomers();
            fetchOrders();
          }}
          className='btn btn-success w-32'
        >
          Refresacar
        </button>
      </div>

      <div className='text-center my-5 flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>Lista de clientes</h1>
        <AddCustomer addCustomer={addCustomer} fetchCustomers={fetchCustomers} />
      </div>

      {loadingCustomers ? (
        <div>Cargando...</div>
      ) : (
        <CustomerList customers={customers} editCustomer={editCustomer} deleteCustomer={deleteCustomer} fetchCustomers={fetchCustomers} />
      )}

      <div className='text-center my-5 flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>Listado de órdenes</h1>
        <AddOrder addOrder={addOrder} fetchOrders={fetchOrders} />
      </div>
      {loadingOrders ? (
        <div>Cargando...</div>
      ) : (
        <OrderList orders={orders} />
      )}
    </main>
  );
}
