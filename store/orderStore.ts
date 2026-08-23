import { create } from 'zustand';
import { getOrderHistory, OrderHistoryOrder } from '@/services/order.service';

interface OrderStore {
  orders: OrderHistoryOrder[];
  fetchOrders: () => Promise<void>;
}

// global so any flow that changes order state (e.g. checkout completing)
// can call fetchOrders() to refresh what every consumer of `orders` sees,
// instead of each page having to re-fetch and duplicate this logic
export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  fetchOrders: async () => {
    const response = await getOrderHistory();
    set({ orders: response.orders });
  },
}));
