import { create } from 'zustand';
import {
  getOrderHistory,
  OrderHistoryOrder,
  OrderHistoryCounts,
  GetOrderHistoryParams,
} from '@/services/order.service';

const PAGE_SIZE = 10;

type OrderFilterStatus = NonNullable<GetOrderHistoryParams['status']>;

interface OrderStore {
  orders: OrderHistoryOrder[];
  counts: OrderHistoryCounts;
  activeFilter: OrderFilterStatus;
  page: number;
  totalPages: number;
  isLoading: boolean;
  setActiveFilter: (status: OrderFilterStatus) => void;
  fetchOrders: () => Promise<void>;
  fetchNextPage: () => Promise<void>;
}

// global so any flow that changes order state (e.g. checkout completing)
// can call fetchOrders() to refresh what every consumer of `orders` sees
export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [],
  counts: { success: 0, pending: 0, cancelled: 0 },
  activeFilter: 'success',
  page: 1,
  totalPages: 1,
  isLoading: false,

  setActiveFilter: (status) => {
    set({ activeFilter: status });
    get().fetchOrders();
  },

  // replaces the list — used for the initial load and whenever the filter changes
  fetchOrders: async () => {
    set({ isLoading: true });
    const { activeFilter } = get();
    const response = await getOrderHistory({
      status: activeFilter,
      page: 1,
      limit: PAGE_SIZE,
    });
    set({
      orders: response.orders,
      counts: response.counts,
      page: response.pagination.page,
      totalPages: response.pagination.totalPages,
      isLoading: false,
    });
  },

  // appends the next page — used for "load more"
  fetchNextPage: async () => {
    const { activeFilter, page, totalPages, isLoading } = get();
    if (isLoading || page >= totalPages) return;
    set({ isLoading: true });
    const response = await getOrderHistory({
      status: activeFilter,
      page: page + 1,
      limit: PAGE_SIZE,
    });
    set((state) => ({
      orders: [...state.orders, ...response.orders],
      counts: response.counts,
      page: response.pagination.page,
      totalPages: response.pagination.totalPages,
      isLoading: false,
    }));
  },
}));
