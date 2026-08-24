import Image from "next/image";
import { OrderHistoryItem } from "@/services/order.service";
import { formatPrice } from "@/lib/currency";

interface OrderItemsListProps {
  items: OrderHistoryItem[];
  currency: string;
}

export default function OrderItemsList({ items, currency }: OrderItemsListProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-2xl border border-[#f0f0f0] overflow-hidden">
        {/* Desktop header row */}
        <div
          className="hidden sm:flex items-center justify-between pl-5 pr-10 sm:pr-14 py-3 bg-[#F8F8F8] text-[13px] text-[#8a8a8a] uppercase tracking-widest"
          style={{ fontFamily: "Cairo, sans-serif" }}
        >
          <span>Product</span>
          <div className="flex items-center gap-6">
            <span className="w-12 text-center">Size</span>
            <span className="w-16 text-center">Quantity</span>
            <span className="w-20 text-center">Price</span>
          </div>
        </div>

        {items.map((item) => (
          <div key={item.id} className="border-t border-[#f0f0f0] first:border-t-0">
            {/* Mobile — image with name/size/price/qty stacked below, like the cart page */}
            <div className="flex sm:hidden flex-row items-center gap-4 px-5 py-4">
              <div className="flex-shrink-0 w-[100px] h-[112px] rounded-lg overflow-hidden bg-[#F8F8F8] flex items-center justify-center">
                {item.product_id.image?.[0] && (
                  <Image
                    src={item.product_id.image[0]}
                    alt={item.product_id.name}
                    width={100}
                    height={112}
                    className="object-contain w-[90%] h-[90%]"
                  />
                )}
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <p
                  className="text-[13px] font-medium text-[#1a1a1a] uppercase tracking-wide truncate"
                  style={{ fontFamily: "Cairo, sans-serif" }}
                >
                  {item.product_id.name}
                </p>
                <p
                  className="text-[11px] text-[#8a8a8a] uppercase tracking-widest"
                  style={{ fontFamily: "Cairo, sans-serif" }}
                >
                  {item.size}
                </p>
                <p
                  className="text-[13px] font-medium text-[#1a1a1a] mt-1"
                  style={{ fontFamily: "Cairo, sans-serif" }}
                >
                  {formatPrice(item.price, currency)}
                </p>
                <p
                  className="text-[11px] text-[#8a8a8a] mt-1"
                  style={{ fontFamily: "Cairo, sans-serif" }}
                >
                  Qty: {item.quantity}
                </p>
              </div>
            </div>

            {/* Desktop — table-style row */}
            <div className="hidden sm:flex items-center justify-between gap-3 pl-5 pr-10 sm:pr-14 py-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="flex-shrink-0 w-[84px] h-[94px] rounded-lg overflow-hidden bg-[#F8F8F8] flex items-center justify-center">
                  {item.product_id.image?.[0] && (
                    <Image
                      src={item.product_id.image[0]}
                      alt={item.product_id.name}
                      width={84}
                      height={94}
                      className="object-contain w-[90%] h-[90%]"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <p
                    className="text-[15px] font-medium text-[#1a1a1a] truncate"
                    style={{ fontFamily: "Cairo, sans-serif" }}
                  >
                    {item.product_id.name}
                  </p>
                  <p
                    className="text-[13px] text-[#8a8a8a] uppercase"
                    style={{ fontFamily: "Cairo, sans-serif" }}
                  >
                    SKU: {item.product_id.slug}
                  </p>
                </div>
              </div>
              <div
                className="flex items-center gap-6 text-[14px] text-[#5a5a5a]"
                style={{ fontFamily: "Cairo, sans-serif" }}
              >
                <span className="uppercase w-12 text-center">{item.size}</span>
                <span className="w-16 text-center">Qty {item.quantity}</span>
                <span className="text-[15px] font-medium text-[#1a1a1a] w-20 text-center">
                  {formatPrice(item.price, currency)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
