"use client";

import { useEffect } from "react";
import { useOrderStore } from "@/store/orderStore";
import OrderHistoryCard from "@/components/shared/orders/OrderHistoryCard";
import OrderStatusFilter from "@/components/shared/orders/OrderStatusFilter";

export default function Orders() {
  const orders = useOrderStore((state) => state.orders);
  const counts = useOrderStore((state) => state.counts);
  const activeFilter = useOrderStore((state) => state.activeFilter);
  const setActiveFilter = useOrderStore((state) => state.setActiveFilter);
  const fetchOrders = useOrderStore((state) => state.fetchOrders);
  const fetchNextPage = useOrderStore((state) => state.fetchNextPage);
  const page = useOrderStore((state) => state.page);
  const totalPages = useOrderStore((state) => state.totalPages);
  const isLoading = useOrderStore((state) => state.isLoading);

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    // same scroll pattern as the cart page: min-h-screen (page flows normally),
    // items-start (children aren't stretched to match each other), and just
    // max-h + overflow-y-auto on the scrollable column itself
    <main className="w-full min-h-screen bg-white px-4 sm:px-8 lg:px-14 py-10">
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="flex items-stretch gap-6 w-full lg:w-auto">
          <OrderStatusFilter active={activeFilter} onChange={setActiveFilter} counts={counts} />
          <div className="hidden lg:block w-px bg-[#e8e8e8] lg:h-[calc(100vh-70px)]" />
        </div>

        <div
          className="flex-1 w-full flex flex-col gap-5 overflow-y-auto max-h-[calc(100vh-90px)]"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {orders.length === 0 && !isLoading ? (
            <p className="text-[13px] text-[#8a8a8a]" style={{ fontFamily: "Cairo, sans-serif" }}>
              No orders found.
            </p>
          ) : (
            orders.map((order) => <OrderHistoryCard key={order.id} order={order} />)
          )}

          {page < totalPages && (
            <button
              onClick={() => fetchNextPage()}
              disabled={isLoading}
              className="self-center mt-2 px-8 py-3 border border-[#e8e8e8] text-[#1a1a1a] text-[11px] font-semibold tracking-[0.18em] uppercase rounded-md hover:border-[#1a1a1a] transition-all duration-300 disabled:opacity-50"
              style={{ fontFamily: "Cairo, sans-serif" }}
            >
              {isLoading ? "Loading…" : "Load More"}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
