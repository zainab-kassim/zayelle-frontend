import Image from "next/image";
import Link from "next/link";
import { OrderHistoryItem } from "@/services/order.service";
import { formatPrice } from "@/lib/currency";

function BagPlaceholder() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-line" aria-hidden="true">
      <path d="M6 8h12l-1 12H7L6 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ItemRow({ item, currency }: { item: OrderHistoryItem; currency: string }) {
  const image = item.product_id?.image?.[0];
  const slug = item.product_id?.slug;

  return (
    <Link
      href={slug ? `/products/${slug}` : "#"}
      className={`group flex items-center gap-4 py-4 -mx-2 px-2 rounded-lg border-b border-line last:border-0 transition-colors duration-200 ${
        slug ? "hover:bg-surface/60" : "pointer-events-none"
      }`}
    >
      <div className="flex-shrink-0 w-[76px] h-[86px] sm:w-[86px] sm:h-[96px] bg-surface rounded-lg flex items-center justify-center overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={item.product_id.name}
            width={86}
            height={96}
            className="object-contain w-[85%] h-[85%] transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <BagPlaceholder />
        )}
      </div>
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <p className="font-serif text-ink/80 text-[14px] sm:text-[15px] leading-snug truncate group-hover:text-ink transition-colors duration-200">
          {item.product_id?.name ?? "Item"}
        </p>
        <p className="font-sans text-muted text-[12px] sm:text-[13px]">
          Size {item.size} &middot; Qty {item.quantity}
        </p>
      </div>
      <p className="font-sans text-ink/65 font-normal text-[13px] sm:text-[14px] flex-shrink-0">
        {formatPrice(item.price * item.quantity, currency)}
      </p>
    </Link>
  );
}

interface OrderItemsListProps {
  items: OrderHistoryItem[];
  currency: string;
}

export default function OrderItemsList({ items, currency }: OrderItemsListProps) {
  return (
    <div>
      <p className="font-sans text-muted font-normal uppercase tracking-[0.12em] text-[11px] mb-1">
        Items in This Order
      </p>
      {items.length === 0 ? (
        <p className="font-sans text-muted text-[13px] py-4">
          Items will appear here once your payment is confirmed.
        </p>
      ) : (
        items.map((item) => <ItemRow key={item.id} item={item} currency={currency} />)
      )}
    </div>
  );
}
