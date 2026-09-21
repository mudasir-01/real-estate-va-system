import React from "react";
import { useEffect, useMemo, useState } from "react";
import TrackPageView from "../components/TrackPageView";

const statuses = [
  "New Order", "Client Discussion", "Payment Pending", "Paid",
  "In Progress", "Delivered", "Completed", "Follow-Up", "Cancelled"
];

export default function Admin() {
  const [key, setKey] = useState(localStorage.getItem("adminKey") || "");
  const [tempKey, setTempKey] = useState(key);
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const api = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const headers = useMemo(() => ({ "x-admin-key": key }), [key]);

  const load = async () => {
    if (!key) return;
    setError("");
    try {
      const [s, o] = await Promise.all([
        fetch(`${api}/admin/stats`, { headers }),
        fetch(`${api}/admin/orders`, { headers })
      ]);
      if (!s.ok || !o.ok) throw new Error("Admin key is incorrect or server is unavailable.");
      setStats(await s.json());
      setOrders(await o.json());
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => { load(); }, [key]);

  const login = (e) => {
    e.preventDefault();
    localStorage.setItem("adminKey", tempKey);
    setKey(tempKey);
  };

  const changeStatus = async (id, status) => {
    const res = await fetch(`${api}/admin/orders/${id}/status`, {
      method: "PATCH",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    if (res.ok) load();
  };

  if (!key || error) {
    return (
      <main className="section container page-top">
        <TrackPageView page="/admin" />
        <div className="admin-login">
          <h1>Admin Dashboard</h1>
          <p>Enter the admin key configured in the server environment.</p>
          <form onSubmit={login}>
            <input type="password" value={tempKey} onChange={e => setTempKey(e.target.value)} placeholder="Admin key" required />
            <button className="btn">Open Dashboard</button>
          </form>
          {error && <div className="error">{error}</div>}
        </div>
      </main>
    );
  }

  return (
    <main className="section container page-top">
      <TrackPageView page="/admin" />
      <div className="admin-head">
        <div>
          <span className="eyebrow">Private dashboard</span>
          <h1>Business Overview</h1>
        </div>
        <button className="btn btn-secondary" onClick={load}>Refresh</button>
      </div>

      {stats && (
        <div className="stats-grid">
          <Stat title="Visitors Today" value={stats.visitorsToday} />
          <Stat title="Page Views Today" value={stats.pageViewsToday} />
          <Stat title="WhatsApp Clicks" value={stats.whatsappClicksToday} />
          <Stat title="New Orders" value={stats.newOrders} />
          <Stat title="Pending" value={stats.pendingOrders} />
          <Stat title="Completed" value={stats.completedOrders} />
          <Stat title="Total Orders" value={stats.totalOrders} />
          <Stat title="Est. Order Value" value={`$${stats.estimatedOrderValue}`} />
        </div>
      )}

      <div className="table-card">
        <div className="table-head"><h2>Orders</h2><span>{orders.length} records</span></div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Order</th><th>Client</th><th>Target</th><th>Service</th><th>Qty</th><th>Est.</th><th>Status</th><th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o._id}>
                  <td><strong>{o.orderNumber}</strong></td>
                  <td>{o.name}<br/><span className="small">{o.whatsapp}</span></td>
                  <td>{o.city}, {o.stateProvince}<br/><span className="small">{o.postalCode}, {o.country}</span></td>
                  <td>{o.service}<br/><span className="small">{o.propertyType}</span></td>
                  <td>{o.quantity}</td>
                  <td>${o.estimatedPrice}</td>
                  <td>
                    <select value={o.status} onChange={e => changeStatus(o._id, e.target.value)}>
                      {statuses.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {!orders.length && <tr><td colSpan="8">No orders yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

function Stat({ title, value }) {
  return <div className="stat"><span>{title}</span><strong>{value}</strong></div>;
}
