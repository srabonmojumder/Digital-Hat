"use client";

import { useState } from "react";
import Link from "next/link";
import { BadgeCheck, CreditCard, ShoppingCart, Truck } from "lucide-react";
import { toast } from "sonner";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { EmptyState } from "@/components/ui/EmptyState";
import { CartLine } from "@/components/cart/CartLine";
import { useCart } from "@/lib/cart-context";
import { DELIVERY_CHARGE, formatTaka } from "@/lib/format";
import type { DeliveryArea } from "@/lib/types";

interface PlacedOrder {
  id: string;
  total: number;
  method: string;
}

const AREAS: { value: DeliveryArea; label: string; charge: number }[] = [
  { value: "inside-dhaka", label: "Inside Dhaka", charge: DELIVERY_CHARGE["inside-dhaka"] },
  { value: "outside-dhaka", label: "Outside Dhaka", charge: DELIVERY_CHARGE["outside-dhaka"] },
];

export default function CheckoutPage() {
  const { items, subtotal, hydrated, clear } = useCart();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [area, setArea] = useState<DeliveryArea>("inside-dhaka");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [email, setEmail] = useState("");
  const [payment, setPayment] = useState<"cod" | "online">("cod");
  const [placed, setPlaced] = useState<PlacedOrder | null>(null);

  const delivery = DELIVERY_CHARGE[area];
  const total = subtotal + delivery;

  function confirmOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }
    if (!/^01\d{9}$/.test(mobile.trim())) {
      toast.error("সঠিক ১১ ডিজিটের মোবাইল নাম্বার দিন। (যেমন: 01XXXXXXXXX)");
      return;
    }
    if (!address.trim()) {
      toast.error("সম্পূর্ণ ঠিকানা লিখুন।");
      return;
    }

    const orderId = `DH-${Date.now().toString().slice(-6)}`;
    setPlaced({
      id: orderId,
      total,
      method: payment === "cod" ? "Cash On Delivery" : "Online Payment (SSLCommerz)",
    });
    clear();
    toast.success("অর্ডার সফলভাবে কনফার্ম হয়েছে!");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ----- Order placed ----- */
  if (placed) {
    return (
      <div className="coSuccess">
        <div className="coSuccessCard">
          <span className="coSuccessIcon">
            <BadgeCheck />
          </span>
          <h1 className="coSuccessTitle">ধন্যবাদ! আপনার অর্ডারটি কনফার্ম হয়েছে।</h1>
          <p className="coSuccessText">
            আমরা শীঘ্রই আপনার দেওয়া নাম্বারে কল করে অর্ডারটি নিশ্চিত করব।
          </p>

          <dl className="coSuccessMeta">
            <div className="coSuccessRow">
              <dt className="coSuccessRowLabel">Order ID</dt>
              <dd className="coSuccessRowValue">{placed.id}</dd>
            </div>
            <div className="coSuccessRow">
              <dt className="coSuccessRowLabel">Payment</dt>
              <dd className="coSuccessRowValue">{placed.method}</dd>
            </div>
            <div className="coSuccessRow">
              <dt className="coSuccessRowLabel">Total</dt>
              <dd className="coSuccessRowValue coSuccessRowValue--total">
                {formatTaka(placed.total)}
              </dd>
            </div>
          </dl>

          <Link href="/" className="btn btn--primary coSuccessBtn">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  /* ----- Loading / empty ----- */
  if (!hydrated) {
    return (
      <div className="page">
        <p className="cartLoading">Loading checkout…</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="page">
        <Breadcrumb items={[{ label: "Checkout" }]} />
        <div className="listingBody">
          <EmptyState
            icon={ShoppingCart}
            title="Your cart is empty"
            message="Add a product to your cart before checking out."
          />
        </div>
      </div>
    );
  }

  /* ----- Checkout form ----- */
  return (
    <div className="page">
      <Breadcrumb items={[{ label: "Checkout" }]} />

      <h1 className="coHeading">
        অর্ডার টি সম্পন্ন করতে আপনার নাম, মোবাইল নাম্বার ও ঠিকানা নিচে লিখুন
      </h1>

      <form onSubmit={confirmOrder} className="coGrid">
        {/* LEFT — Billing */}
        <section className="coPanel">
          <h2 className="coPanelTitle">বিলিং ডিটেইল</h2>
          <div className="coFields">
            <div>
              <label className="label">
                আপনার নাম লিখুন <span className="req">*</span>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                placeholder="যেমন: মোহাম্মদ রহিম"
              />
            </div>
            <div>
              <label className="label">
                আপনার মোবাইল নাম্বার লিখুন <span className="req">*</span>
              </label>
              <input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                inputMode="numeric"
                className="input"
                placeholder="01XXXXXXXXX"
              />
            </div>

            <div>
              <label className="label">
                এলাকা সিলেক্ট করুন <span className="req">*</span>
              </label>
              <div className="coAreas">
                {AREAS.map((a) => (
                  <label
                    key={a.value}
                    className={`coArea${area === a.value ? " coArea--active" : ""}`}
                  >
                    <span className="coAreaName">
                      <input
                        type="radio"
                        name="area"
                        value={a.value}
                        checked={area === a.value}
                        onChange={() => setArea(a.value)}
                      />
                      {a.label}
                    </span>
                    <span className="coAreaCharge">{formatTaka(a.charge)}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="label">
                সম্পূর্ণ ঠিকানা <span className="req">*</span>
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                className="textarea"
                placeholder="বাসা/হোল্ডিং, রোড, এলাকা, থানা, জেলা"
              />
            </div>
            <div>
              <label className="label">নোট (অপশনাল)</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
                className="textarea"
                placeholder="ডেলিভারি সম্পর্কে কোনো নির্দেশনা থাকলে লিখুন"
              />
            </div>
            <div>
              <label className="label">Email (অপশনাল)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="you@example.com"
              />
            </div>
          </div>
        </section>

        {/* RIGHT — Order summary + payment + confirm */}
        <section className="coRight">
          <div className="coPanel">
            <h2 className="coPanelTitle">প্রোডাক্ট ডিটেইল</h2>
            <div className="coLines">
              {items.map((item) => (
                <CartLine key={item.key} item={item} />
              ))}
            </div>

            <div className="coTotals">
              <div className="coTotalRow">
                <span className="coTotalLabel">সাব-টোটাল</span>
                <span className="coTotalValue">{formatTaka(subtotal)}</span>
              </div>
              <div className="coTotalRow">
                <span className="coTotalLabel">ডেলিভারি চার্জ</span>
                <span className="coTotalValue">{formatTaka(delivery)}</span>
              </div>
              <div className="coTotalRow coTotalRow--grand">
                <span className="coTotalLabel">টোটাল</span>
                <span className="coTotalValue">{formatTaka(total)}</span>
              </div>
            </div>
          </div>

          <div className="coPanel">
            <h2 className="cartSummaryTitle">Payment Method</h2>
            <div className="coPay">
              <label
                className={`coPayOption${payment === "cod" ? " coPayOption--active" : ""}`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={payment === "cod"}
                  onChange={() => setPayment("cod")}
                />
                <span>
                  <span className="coPayName">
                    <Truck />
                    Cash On Delivery
                  </span>
                  <span className="coPaySub coPaySub--bn">
                    প্রোডাক্ট হাতে পেয়ে মূল্য পরিশোধ করুন।
                  </span>
                </span>
              </label>

              <label
                className={`coPayOption${payment === "online" ? " coPayOption--active" : ""}`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={payment === "online"}
                  onChange={() => setPayment("online")}
                />
                <span>
                  <span className="coPayName">
                    <CreditCard />
                    Online Payment
                  </span>
                  <span className="coPaySub">
                    Card / Mobile Banking (bKash, Nagad, Rocket) via SSLCommerz.
                  </span>
                </span>
              </label>
            </div>
          </div>

          <button type="submit" className="coConfirm">
            <span className="coConfirmLabel">অর্ডার টি কনফার্ম করুন</span>
            <span>·</span>
            <span>{formatTaka(total)}</span>
          </button>
        </section>
      </form>
    </div>
  );
}
