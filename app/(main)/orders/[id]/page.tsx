"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getOrderDetails, OrderHistoryOrder } from "@/services/order.service";

export default function OrderDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [order, setOrder] = useState<OrderHistoryOrder | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    getOrderDetails(id)
      .then((response) => {
        console.log("Order details:", response.order);
        setOrder(response.order);
      })
      .catch((err) => {
        console.error("Failed to fetch order details:", err);
        setError("Failed to load order details.");
      });
  }, [id]);

  // same order code format used in OrderHistoryCard: `ZKT-87${order.id}`
  const orderCode = order ? `ZKT-87${order.id}` : null;

  return (
    <pre style={{ padding: 24, whiteSpace: "pre-wrap" }}>
      {error
        ? error
        : order
          ? `${orderCode}\n\n${JSON.stringify(order, null, 2)}`
          : "Loading order details..."}
    </pre>
  );
}
