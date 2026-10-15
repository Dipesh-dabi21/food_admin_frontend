import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import { api, getApiData } from "../services/api";

export const ORDER_STATUSES = [
    "Order Received",
    "Preparing",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
];

export function useOrders(isAuthenticated) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updatingOrderId, setUpdatingOrderId] = useState(null);
    const [ordersError, setOrdersError] = useState("");
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");

    const loadOrders = useCallback(async () => {
        if (!isAuthenticated) return;

        setLoading(true);
        setOrdersError("");

        try {
            const response = await api.get("/orders");
            const data = getApiData(response);

            setOrders(Array.isArray(data) ? data : []);
        } catch (error) {
            setOrdersError(
                error.response?.data?.message ||
                "Unable to load orders. Please sign in again if your session has expired."
            );
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (isAuthenticated) {
            loadOrders();
        } else {
            setOrders([]);
            setOrdersError("");
        }
    }, [isAuthenticated, loadOrders]);

    const updateOrderStatus = useCallback(
        async (orderId, nextStatus) => {
            setUpdatingOrderId(orderId);
            setOrdersError("");

            try {
                await api.patch(`/orders/${orderId}/status`, {
                    status: nextStatus,
                });

                // Update the existing order locally to avoid
                // an unnecessary full-table reload.
                setOrders((currentOrders) =>
                    currentOrders.map((order) =>
                        order._id === orderId
                            ? { ...order, status: nextStatus }
                            : order
                    )
                );

                return true;
            } catch (error) {
                setOrdersError(
                    error.response?.data?.message ||
                    "Could not update order status."
                );

                return false;
            } finally {
                setUpdatingOrderId(null);
            }
        },
        []
    );

    const visibleOrders = useMemo(() => {
        const query = search.trim().toLowerCase();

        return orders.filter((order) => {
            const matchesStatus =
                status === "All" || order.status === status;

            const searchableText = [
                order._id,
                order.customer?.name,
                order.customer?.phone,
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            return matchesStatus && searchableText.includes(query);
        });
    }, [orders, search, status]);

    const stats = useMemo(
        () => [
            {
                label: "Total orders",
                value: orders.length,
                type: "total",
            },
            {
                label: "Preparing",
                value: orders.filter(
                    (order) => order.status === "Preparing"
                ).length,
                type: "preparing",
            },
            {
                label: "On the way",
                value: orders.filter(
                    (order) => order.status === "Out for Delivery"
                ).length,
                type: "delivery",
            },
            {
                label: "Delivered",
                value: orders.filter(
                    (order) => order.status === "Delivered"
                ).length,
                type: "delivered",
            },
        ],
        [orders]
    );

    return {
        orders,
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
    };
}
