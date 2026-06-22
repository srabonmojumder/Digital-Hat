"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { EmptyState } from "@/components/ui/EmptyState";
import { CartLine } from "@/components/cart/CartLine";
import { useCart } from "@/lib/cart-context";
import { formatTaka } from "@/lib/format";

export default function CartPage() {
  const { items, subtotal, hydrated } = useCart();

  return (
    <div className="page">
      <Breadcrumb items={[{ label: "Shopping Cart" }]} />
      <h1 className="cartTitle">Shopping Cart</h1>

      {!hydrated ? (
        <p className="cartLoading">Loading your cart…</p>
      ) : items.length === 0 ? (
        <div className="listingBody">
          <EmptyState
            icon={ShoppingCart}
            title="Your cart is empty"
            message="Looks like you haven't added anything yet. Explore our collections and find something you love."
          />
        </div>
      ) : (
        <div className="cartLayout">
          <div className="cartMain">
            <div className="cartList">
              {items.map((item) => (
                <CartLine key={item.key} item={item} />
              ))}
            </div>
            <Link href="/" className="cartContinue">
              ← Continue Shopping
            </Link>
          </div>

          <aside>
            <div className="cartSummary">
              <h2 className="cartSummaryTitle">Order Summary</h2>
              <div className="cartRow">
                <span className="cartRowLabel">Subtotal</span>
                <span className="cartRowValue">{formatTaka(subtotal)}</span>
              </div>
              <p className="cartNote">
                Delivery charge is calculated at checkout based on your area.
              </p>
              <Link
                href="/checkout"
                className="btn btn--primary btn--block btn--lg cartCheckout"
              >
                Proceed to Checkout
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
