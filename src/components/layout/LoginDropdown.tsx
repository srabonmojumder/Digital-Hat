"use client";

import { useState } from "react";
import { Eye, EyeOff, PackageSearch } from "lucide-react";
import { toast } from "sonner";

/**
 * Login panel shown from the header. Authentication is by MOBILE NUMBER
 * (Bangladesh standard). Storefront prototype — submitting shows the UX;
 * real auth lands in the backend milestone.
 */
export function LoginDropdown({ onClose }: { onClose?: () => void }) {
  const [showPw, setShowPw] = useState(false);
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [trackId, setTrackId] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!mobile.trim() || !password) {
      toast.error("আপনার মোবাইল নাম্বার ও পাসওয়ার্ড দিন।");
      return;
    }
    toast.success("Login successful! (demo)");
    onClose?.();
  }

  function handleTrack(e: React.FormEvent) {
    e.preventDefault();
    if (!trackId.trim()) {
      toast.error("Enter your Order ID or phone number.");
      return;
    }
    toast.success(`Order "${trackId.trim()}" found — status: Processing. 📦`);
  }

  return (
    <div className="login">
      <h2 className="loginTitle">Login to My Account</h2>
      <p className="loginSub">Sign in using your mobile number.</p>

      <form onSubmit={handleLogin} className="loginForm">
        <input
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Number or User name"
          aria-label="Mobile number or username"
          className="input"
        />
        <div className="loginPw">
          <input
            type={showPw ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            aria-label="Password"
            className="input"
          />
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            aria-label={showPw ? "Hide password" : "Show password"}
            className="loginEye"
          >
            {showPw ? <EyeOff /> : <Eye />}
          </button>
        </div>
        <button type="submit" className="btn btn--success btn--block btn--lg">
          Login
        </button>
      </form>

      <div className="loginLinks">
        <a href="#" className="loginLink">
          Forgot Password?
        </a>
        <a href="#" className="loginLink">
          New customer? <b>Create your account</b>
        </a>
        <a href="#" className="loginLink">
          Lost password? Reset account
        </a>
      </div>

      <div className="loginTrack">
        <h3 className="loginTrackTitle">
          <PackageSearch />
          Track Your Order
        </h3>
        <form onSubmit={handleTrack} className="loginTrackForm">
          <input
            value={trackId}
            onChange={(e) => setTrackId(e.target.value)}
            placeholder="Order ID or phone number"
            aria-label="Order ID or phone number"
            className="input"
          />
          <button type="submit" className="btn btn--success">
            Check
          </button>
        </form>
      </div>
    </div>
  );
}
