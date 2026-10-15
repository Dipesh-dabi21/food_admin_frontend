import { PackageCheck, RefreshCw, Search } from "lucide-react";
import { ORDER_STATUSES } from "../hooks/useOrders";
import { formatCurrency } from "../utils/formatCurrency";

export default function OrdersTable({
  orders,
  loading,
  search,
  onSearchChange,
  status,
  onStatusChange,
  onUpdateStatus,
  updatingOrderId,
}) {
  return (
    <section className="orders-panel">
      <div className="panel-heading">
        <div>
          <h2>Recent orders</h2>
          <p>Review details and update fulfilment status.</p>
        </div>

        <span className="count-pill">{orders.length} orders</span>
      </div>

      <div className="toolbar">
        <div className="search">
          <Search size={17} />

          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search order, customer, phone…"
            aria-label="Search orders"
          />
        </div>

        <select
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
          aria-label="Filter orders by status"
        >
          <option value="All">All</option>

          {ORDER_STATUSES.map((itemStatus) => (
            <option key={itemStatus} value={itemStatus}>
              {itemStatus}
            </option>
          ))}
        </select>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ORDER</th>
              <th>CUSTOMER</th>
              <th>ITEMS</th>
              <th>TOTAL</th>
              <th>STATUS</th>
              <th>UPDATE STATUS</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <b>#{String(order._id).slice(-6).toUpperCase()}</b>
                  <small>
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleString()
                      : "Date unavailable"}
                  </small>
                </td>

                <td>
                  <b>{order.customer?.name || "Unknown"}</b>
                  <small>{order.customer?.phone || "—"}</small>
                  <small>{order.customer?.address || "—"}</small>
                </td>

                <td>
                  {(order.items || []).map((item, index) => (
                    <div
                      className="item-line"
                      key={`${item.menuItem || item.name}-${index}`}
                    >
                      {item.quantity} × {item.name}
                    </div>
                  ))}
                </td>

                <td className="amount">{formatCurrency(order.total)}</td>

                <td>
                  <span
                    className={
                      "status status-" +
                      String(order.status || "unknown")
                        .toLowerCase()
                        .replaceAll(" ", "-")
                    }
                  >
                    {order.status}
                  </span>
                </td>

                <td>
                  <select
                    className="status-select"
                    value={order.status}
                    disabled={updatingOrderId === order._id}
                    onChange={(event) =>
                      onUpdateStatus(order._id, event.target.value)
                    }
                    aria-label={`Update status for order ${order._id}`}
                  >
                    {ORDER_STATUSES.map((itemStatus) => (
                      <option key={itemStatus} value={itemStatus}>
                        {itemStatus}
                      </option>
                    ))}
                  </select>

                  {updatingOrderId === order._id && <small>Updating...</small>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!orders.length && (
          <div className="no-orders">
            {loading ? (
              <>
                <RefreshCw className="spin" />
                Loading orders…
              </>
            ) : (
              <>
                <PackageCheck size={30} />
                <b>No orders found</b>
                <span>Try changing your search or status filter.</span>
              </>
            )}
          </div>
        )}
      </div>

      <div className="panel-foot">
        <span>
          <span className="live-dot" /> Connected to order service
        </span>
        <span>Refresh to fetch the latest orders</span>
      </div>
    </section>
  );
}
