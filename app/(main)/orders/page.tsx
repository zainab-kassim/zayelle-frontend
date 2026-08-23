"use client";

import { useEffect } from "react";
import { useOrderStore } from "@/store/orderStore";

export default function Orders() {
  const orders = useOrderStore((state) => state.orders);
  const fetchOrders = useOrderStore((state) => state.fetchOrders);

  useEffect(() => {
    fetchOrders();
  }, [orders.length]);

  return (
    <div>orders</div>
  )
}
