"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useOrderStore } from "@/store/orderStore";
import OrderHistoryCard from "@/components/shared/orders/OrderHistoryCard";
import OrderStatusFilter from "@/components/shared/orders/OrderStatusFilter";
import OrderHistoryCardSkeleton from "@/components/ui/OrderHistoryCardSkeleton";
import PageLoader from "@/components/ui/PageLoader";

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

  const isInitialLoad = isLoading && orders.length === 0;
  const isLoadingMore = isLoading && orders.length > 0;

  return (
    <div className="w-full bg-paper px-4 md:px-12 lg:px-34 xl:px-16 py-8 sm:py-10 pb-16 sm:pb-24">
      <div className="mb-2">
        <OrderStatusFilter active={activeFilter} onChange={setActiveFilter} counts={counts} />
      </div>

      <div className="flex flex-col">
        <AnimatePresence mode="wait">
          {isInitialLoad ? (
            <motion.div key="skeleton" exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              <OrderHistoryCardSkeleton />
              <OrderHistoryCardSkeleton />
              <OrderHistoryCardSkeleton />
            </motion.div>
          ) : orders.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center justify-center gap-4 py-20 text-center"
            >
              <p className="font-serif text-ink/80 font-normal text-[16px] sm:text-[22px]">No orders yet</p>
              <p className="font-sans text-muted text-[12px] sm:text-[14px] max-w-sm">
                Orders in this category will show up here once you place one.
              </p>
              <Link
                href="/products"
                className="font-sans font-normal uppercase tracking-[0.1em] text-[11px] sm:text-[13px] text-paper bg-ink h-12 px-8 inline-flex items-center justify-center transition-opacity duration-200 hover:opacity-90"
              >
                Shop All
              </Link>
            </motion.div>
          ) : (
            <motion.div key={activeFilter} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              {orders.map((order) => (
                <OrderHistoryCard key={order.id} order={order} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {page < totalPages && (
          <button
            onClick={() => fetchNextPage()}
            disabled={isLoading}
            className="self-center mt-6 h-11 px-8 border border-line font-sans text-ink/80 font-normal text-[11px] sm:text-[13px] tracking-[0.15em] uppercase transition-colors duration-200 hover:border-ink disabled:opacity-50"
          >
            {isLoadingMore ? <PageLoader size={32} label="Loading more orders" /> : "Load More"}
          </button>
        )}
      </div>
    </div>
  );
}
