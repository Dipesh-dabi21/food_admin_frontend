import { RefreshCw } from "lucide-react";

export default function DashboardHeader({ loading, onRefresh }) {
  return (
    <header className="header">
      <div>
        <div className="eyebrow">GOOD FOOD, RUNNING SMOOTHLY</div>
        <h1>Order management</h1>
        <p>See what's cooking and keep every order on track.</p>
      </div>

      <button className="refresh" onClick={onRefresh} disabled={loading}>
        <RefreshCw size={16} className={loading ? "spin" : ""} />
        Refresh orders
      </button>
    </header>
  );
}
