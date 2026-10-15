import LoginForm from "./components/LoginForm";
import Sidebar from "./components/Sidebar";
import DashboardHeader from "./components/DashboardHeader";
import OrderStats from "./components/OrderStats";
import OrdersTable from "./components/OrdersTable";

import { useAuth } from "./hooks/useAuth";
import { useOrders } from "./hooks/useOrders";

export default function App() {
  const { token, isAuthenticated, authError, authLoading, login, logout } =
    useAuth();

  const {
    visibleOrders,
    stats,
    loading,
    updatingOrderId,
    ordersError,
    search,
    setSearch,
    status,
    setStatus,
    loadOrders,
    updateOrderStatus,
  } = useOrders(isAuthenticated);

  const handleLogout = () => {
    logout();
  };

  if (!isAuthenticated) {
    return (
      <LoginForm onLogin={login} loading={authLoading} error={authError} />
    );
  }

  return (
    <div className="layout">
      <Sidebar orderCount={stats[0].value} onLogout={handleLogout} />

      <main className="main">
        <DashboardHeader loading={loading} onRefresh={loadOrders} />

        <OrderStats stats={stats} />

        {ordersError && (
          <div className="error-banner" role="alert">
            {ordersError}
          </div>
        )}

        <OrdersTable
          orders={visibleOrders}
          loading={loading}
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
          onUpdateStatus={updateOrderStatus}
          updatingOrderId={updatingOrderId}
        />

        <footer>
          Crave Kitchen · Admin Console
          <span>Secure order operations</span>
        </footer>
      </main>
    </div>
  );
}
