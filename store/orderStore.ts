import { create } from 'zustand';
import {
  getOrderHistory,
  OrderHistoryOrder,
  OrderHistoryCounts,
  GetOrderHistoryParams,
} from '@/services/order.service';

const PAGE_SIZE = 5;

// fetchOrders/fetchNextPage can overlap — rapidly switching filter tabs (or
// React Strict Mode double-invoking the mount effect) fires a second fetch
// before the first resolves. Whichever response lands last used to win
// regardless of which request it was; this discards any response that's no
// longer the most recent one in flight.
let latestRequestId = 0;

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
  // starts true — the orders page always calls fetchOrders() on mount, so
  // this avoids a one-frame flash of the empty state before that fetch
  // has even started
  isLoading: true,

  setActiveFilter: (status) => {
    set({ activeFilter: status });
    get().fetchOrders();
  },

  // replaces the list — used for the initial load and whenever the filter changes.
  // clears `orders` up front so a filter switch doesn't leave the previous
  // tab's cards on screen while the new page is in flight
  fetchOrders: async () => {
    const requestId = ++latestRequestId;
    set({ isLoading: true, orders: [] });
    const { activeFilter } = get();
    const response = await getOrderHistory({
      status: activeFilter,
      page: 1,
      limit: PAGE_SIZE,
    });
    if (requestId !== latestRequestId) return; // a newer fetch superseded this one
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
    const requestId = ++latestRequestId;
    set({ isLoading: true });
    const response = await getOrderHistory({
      status: activeFilter,
      page: page + 1,
      limit: PAGE_SIZE,
    });
    if (requestId !== latestRequestId) return;
    set((state) => ({
      orders: [...state.orders, ...response.orders],
      counts: response.counts,
      page: response.pagination.page,
      totalPages: response.pagination.totalPages,
      isLoading: false,
    }));
  },
}));
