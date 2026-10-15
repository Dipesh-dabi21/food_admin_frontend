import { ChefHat, LogOut, PackageCheck, UtensilsCrossed } from "lucide-react";

export default function Sidebar({ orderCount, onLogout }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-icon">
          <UtensilsCrossed />
        </span>
        crave<span className="orange">.</span>
      </div>

      <div className="side-label">WORKSPACE</div>

      <div className="side-link active">
        <PackageCheck size={18} />
        Orders
        <span className="side-count">{orderCount}</span>
      </div>

      <div className="side-label">SYSTEM</div>

      <div className="side-link">
        <ChefHat size={18} />
        Kitchen overview
      </div>

      <div className="sidebar-bottom">
        <div className="avatar">A</div>

        <div>
          <b>Administrator</b>
          <small>Order management</small>
        </div>

        <button
          className="logout"
          title="Sign out"
          aria-label="Sign out"
          onClick={onLogout}
        >
          <LogOut size={17} />
        </button>
      </div>
    </aside>
  );
}
