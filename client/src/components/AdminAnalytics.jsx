import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import {
  Factory,
  Menu,
  X,
  Search,
  Filter,
  Download,
  FileText,
  Calendar,
  DollarSign,
  TrendingUp,
  BarChart3,
  PieChart,
  Users,
  Package,
  Truck,
  Clock,
  XCircle,
  CheckCircle,
  AlertTriangle,
  Printer,
  Share2,
  Building2,
  MapPin,
  ChevronDown,
  Eye,
  LogOut
} from 'lucide-react';

// Shared Status constants and styles (same as other pages)
const STATUS = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled'
};

const statusStyles = (status) => {
  switch (status) {
    case STATUS.DELIVERED:
      return 'bg-green-100 text-green-700 border-green-200';
    case STATUS.OUT_FOR_DELIVERY:
      return 'bg-orange-100 text-orange-700 border-orange-200';
    case STATUS.CONFIRMED:
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case STATUS.PENDING:
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case STATUS.CANCELLED:
      return 'bg-red-100 text-red-700 border-red-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const formatDate = (iso) => {
  try {
    const d = new Date(iso);
    return d.toLocaleString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return iso;
  }
};

const stepIndex = (status) => {
  switch (status) {
    case STATUS.PENDING:
      return 1;
    case STATUS.CONFIRMED:
      return 2;
    case STATUS.OUT_FOR_DELIVERY:
      return 3;
    case STATUS.DELIVERED:
      return 4;
    default:
      return 0;
  }
};

const StatusBadge = ({ status }) => {
  const Icon =
    status === STATUS.DELIVERED ? CheckCircle :
    status === STATUS.OUT_FOR_DELIVERY ? Truck :
    status === STATUS.CONFIRMED ? CheckCircle :
    status === STATUS.PENDING ? Clock :
    status === STATUS.CANCELLED ? XCircle : FileText;

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${statusStyles(status)}`}>
      <Icon className="h-4 w-4 mr-1.5" />
      {status}
    </span>
  );
};

const ProgressSteps = ({ status }) => {
  const idx = stepIndex(status);
  const steps = [
    { label: 'Placed' },
    { label: 'Confirmed' },
    { label: 'On the way' },
    { label: 'Delivered' }
  ];
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((s, i) => {
          const n = i + 1;
          const active = n <= idx;
          return (
            <div key={s.label} className="flex-1 flex items-center">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black border ${active ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-400 border-gray-200'}`}>
                {n}
              </div>
              {i < steps.length - 1 && (
                <div className={`h-1 flex-1 mx-2 rounded ${n < idx ? 'bg-blue-600' : 'bg-gray-200'}`} />
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-gray-500 font-semibold uppercase tracking-wide">
        {steps.map((s) => <div key={s.label}>{s.label}</div>)}
      </div>
    </div>
  );
};

const AdminAnalytics = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeframe, setTimeframe] = useState('30d'); // 7d | 30d | ytd | all
  const [query, setQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('all'); // all | Jeddah | Makkah
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Mock admin orders dataset
  const orders = useMemo(() => ([
    {
      id: 'ADM-2024-0001',
      date: '2024-06-22T08:30:00Z',
      customer: 'ABC Construction Group',
      city: 'Jeddah',
      status: STATUS.DELIVERED,
      onTime: true,
      items: [
        { name: 'Premium Portland Cement', qty: 60, unit: 'bags', unitPrice: 75 },
        { name: 'Coarse Sand', qty: 2, unit: 'tons', unitPrice: 35 }
      ]
    },
    {
      id: 'ADM-2024-0002',
      date: '2024-07-11T10:45:00Z',
      customer: 'Modern Builders Ltd',
      city: 'Makkah',
      status: STATUS.DELIVERED,
      onTime: false,
      items: [
        { name: 'Crushed Granite 20mm', qty: 12, unit: 'tons', unitPrice: 45 }
      ]
    },
    {
      id: 'ADM-2024-0003',
      date: '2024-08-05T14:10:00Z',
      customer: 'Namaa Projects',
      city: 'Jeddah',
      status: STATUS.CONFIRMED,
      onTime: null,
      items: [
        { name: 'Premium Portland Cement', qty: 30, unit: 'bags', unitPrice: 75 },
        { name: 'Coarse Sand', qty: 3, unit: 'tons', unitPrice: 35 }
      ]
    },
    {
      id: 'ADM-2024-0004',
      date: '2024-08-26T09:00:00Z',
      customer: 'Al Noor Developers',
      city: 'Makkah',
      status: STATUS.CANCELLED,
      onTime: null,
      items: [
        { name: 'Crushed Granite 20mm', qty: 8, unit: 'tons', unitPrice: 45 }
      ]
    },
    {
      id: 'ADM-2024-0005',
      date: '2024-09-02T11:20:00Z',
      customer: 'Rimal Holdings',
      city: 'Jeddah',
      status: STATUS.DELIVERED,
      onTime: true,
      items: [
        { name: 'Coarse Sand', qty: 6, unit: 'tons', unitPrice: 35 }
      ]
    },
    {
      id: 'ADM-2024-0006',
      date: '2024-09-14T16:55:00Z',
      customer: 'Haramain Builders',
      city: 'Makkah',
      status: STATUS.OUT_FOR_DELIVERY,
      onTime: null,
      items: [
        { name: 'Premium Portland Cement', qty: 50, unit: 'bags', unitPrice: 75 }
      ]
    },
    {
      id: 'ADM-2024-0007',
      date: '2024-09-28T07:45:00Z',
      customer: 'Al Falah Contracting',
      city: 'Jeddah',
      status: STATUS.CONFIRMED,
      onTime: null,
      items: [
        { name: 'Crushed Granite 20mm', qty: 10, unit: 'tons', unitPrice: 45 },
        { name: 'Coarse Sand', qty: 3, unit: 'tons', unitPrice: 35 }
      ]
    },
    {
      id: 'ADM-2024-0008',
      date: '2024-10-01T13:05:00Z',
      customer: 'ABC Construction Group',
      city: 'Jeddah',
      status: STATUS.DELIVERED,
      onTime: true,
      items: [
        { name: 'Premium Portland Cement', qty: 40, unit: 'bags', unitPrice: 75 }
      ]
    },
    {
      id: 'ADM-2024-0009',
      date: '2024-10-04T18:30:00Z',
      customer: 'Modern Builders Ltd',
      city: 'Makkah',
      status: STATUS.PENDING,
      onTime: null,
      items: [
        { name: 'Coarse Sand', qty: 2, unit: 'tons', unitPrice: 35 }
      ]
    },
    {
      id: 'ADM-2024-0010',
      date: '2024-10-08T12:40:00Z',
      customer: 'Namaa Projects',
      city: 'Jeddah',
      status: STATUS.OUT_FOR_DELIVERY,
      onTime: null,
      items: [
        { name: 'Crushed Granite 20mm', qty: 14, unit: 'tons', unitPrice: 45 }
      ]
    },
    {
      id: 'ADM-2024-0011',
      date: '2024-05-27T10:10:00Z',
      customer: 'Al Noor Developers',
      city: 'Makkah',
      status: STATUS.DELIVERED,
      onTime: true,
      items: [
        { name: 'Construction Sand', qty: 5, unit: 'tons', unitPrice: 32 }
      ]
    },
    {
      id: 'ADM-2024-0012',
      date: '2024-06-05T09:30:00Z',
      customer: 'Rimal Holdings',
      city: 'Jeddah',
      status: STATUS.DELIVERED,
      onTime: true,
      items: [
        { name: 'Premium Portland Cement', qty: 20, unit: 'bags', unitPrice: 75 }
      ]
    },
    {
      id: 'ADM-2024-0013',
      date: '2024-07-29T15:20:00Z',
      customer: 'Haramain Builders',
      city: 'Makkah',
      status: STATUS.DELIVERED,
      onTime: false,
      items: [
        { name: 'Crushed Granite 20mm', qty: 9, unit: 'tons', unitPrice: 45 },
        { name: 'Coarse Sand', qty: 2, unit: 'tons', unitPrice: 35 }
      ]
    },
    {
      id: 'ADM-2024-0014',
      date: '2024-09-19T08:15:00Z',
      customer: 'Al Falah Contracting',
      city: 'Jeddah',
      status: STATUS.CANCELLED,
      onTime: null,
      items: [
        { name: 'Construction Sand', qty: 4, unit: 'tons', unitPrice: 32 }
      ]
    },
    {
      id: 'ADM-2024-0015',
      date: '2024-10-12T07:55:00Z',
      customer: 'ABC Construction Group',
      city: 'Makkah',
      status: STATUS.DELIVERED,
      onTime: true,
      items: [
        { name: 'Coarse Sand', qty: 7, unit: 'tons', unitPrice: 35 }
      ]
    }
  ].map(o => ({
    ...o,
    total: o.items.reduce((sum, it) => sum + it.qty * it.unitPrice, 0),
    itemsCount: o.items.reduce((sum, it) => sum + it.qty, 0)
  }))), []);

  // Filtering by timeframe
  const filteredByTime = useMemo(() => {
    const now = new Date();
    const start = new Date(now);
    if (timeframe === '7d') start.setDate(now.getDate() - 7);
    if (timeframe === '30d') start.setDate(now.getDate() - 30);
    if (timeframe === 'ytd') start.setMonth(0, 1), start.setHours(0,0,0,0);
    if (timeframe === 'all') return [...orders].sort((a,b) => new Date(b.date) - new Date(a.date));

    return orders
      .filter(o => new Date(o.date) >= start)
      .sort((a,b) => new Date(b.date) - new Date(a.date));
  }, [orders, timeframe]);

  // City filter
  const filteredByCity = useMemo(() => {
    if (cityFilter === 'all') return filteredByTime;
    return filteredByTime.filter(o => o.city === cityFilter);
  }, [filteredByTime, cityFilter]);

  // Search filter
  const filteredOrders = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return filteredByCity;
    return filteredByCity.filter(o =>
      o.id.toLowerCase().includes(q) ||
      o.customer.toLowerCase().includes(q) ||
      o.items.some(it => it.name.toLowerCase().includes(q))
    );
  }, [filteredByCity, query]);

  // Metrics
  const metrics = useMemo(() => {
    const totalOrders = filteredOrders.length;
    const delivered = filteredOrders.filter(o => o.status === STATUS.DELIVERED);
    const revenue = delivered.reduce((s,o) => s + o.total, 0);
    const onTimeDelivered = delivered.filter(o => o.onTime === true).length;
    const onTimeRate = delivered.length ? onTimeDelivered / delivered.length : 0;

    const cancelled = filteredOrders.filter(o => o.status === STATUS.CANCELLED).length;
    const cancellationRate = totalOrders ? cancelled / totalOrders : 0;

    return {
      totalOrders,
      revenue,
      onTimeRate,
      cancellationRate
    };
  }, [filteredOrders]);

  // 6-month trend (delivered revenue)
  const trend = useMemo(() => {
    const now = new Date();
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({ key: d.toISOString().slice(0, 7), label: d.toLocaleString('en-GB', { month: 'short' }), revenue: 0, orders: 0 });
    }
    // Revenue: delivered only; Orders: all placed
    orders.forEach(o => {
      const key = new Date(o.date).toISOString().slice(0, 7);
      const m = months.find(x => x.key === key);
      if (m) {
        m.orders += 1;
        if (o.status === STATUS.DELIVERED) m.revenue += o.total;
      }
    });
    const maxRev = Math.max(1, ...months.map(m => m.revenue));
    const maxOrders = Math.max(1, ...months.map(m => m.orders));
    return { months, maxRev, maxOrders };
  }, [orders]);

  // Status breakdown
  const statusBreakdown = useMemo(() => {
    const map = {
      [STATUS.DELIVERED]: 0,
      [STATUS.OUT_FOR_DELIVERY]: 0,
      [STATUS.CONFIRMED]: 0,
      [STATUS.PENDING]: 0,
      [STATUS.CANCELLED]: 0
    };
    filteredOrders.forEach(o => { map[o.status] = (map[o.status] || 0) + 1; });
    const total = filteredOrders.length || 1;
    return { map, total };
  }, [filteredOrders]);

  // Top products
  const topProducts = useMemo(() => {
    const freq = new Map();
    filteredOrders.forEach(o => {
      o.items.forEach(it => {
        if (!freq.has(it.name)) {
          freq.set(it.name, { name: it.name, qty: 0, revenue: 0, unit: it.unit, count: 0, avgPrice: it.unitPrice });
        }
        const f = freq.get(it.name);
        f.qty += it.qty;
        f.revenue += it.qty * it.unitPrice;
        f.count += 1;
        f.avgPrice = it.unitPrice;
      });
    });
    return Array.from(freq.values()).sort((a,b) => b.revenue - a.revenue).slice(0, 5);
  }, [filteredOrders]);

  // Top customers
  const topCustomers = useMemo(() => {
    const agg = new Map();
    filteredOrders.forEach(o => {
      if (!agg.has(o.customer)) agg.set(o.customer, { customer: o.customer, orders: 0, revenue: 0 });
      const c = agg.get(o.customer);
      c.orders += 1;
      if (o.status === STATUS.DELIVERED) c.revenue += o.total;
    });
    return Array.from(agg.values()).sort((a,b) => b.revenue - a.revenue).slice(0, 5);
  }, [filteredOrders]);

  // Region insights
  const regionInsights = useMemo(() => {
    const agg = new Map();
    filteredOrders.forEach(o => {
      if (!agg.has(o.city)) agg.set(o.city, { city: o.city, orders: 0, delivered: 0, revenue: 0, onTime: 0 });
      const r = agg.get(o.city);
      r.orders += 1;
      if (o.status === STATUS.DELIVERED) {
        r.delivered += 1;
        r.revenue += o.total;
        if (o.onTime) r.onTime += 1;
      }
    });
    return Array.from(agg.values()).map(r => ({
      ...r,
      onTimeRate: r.delivered ? r.onTime / r.delivered : 0
    }));
  }, [filteredOrders]);

  // Alerts & exceptions (simple rules)
  const alerts = useMemo(() => {
    const list = [];
    const delayedDelivered = filteredOrders.filter(o => o.status === STATUS.DELIVERED && o.onTime === false).length;
    const outOld = filteredOrders.filter(o => o.status === STATUS.OUT_FOR_DELIVERY && (Date.now() - new Date(o.date).getTime()) > 6 * 60 * 60 * 1000).length; // >6h on the road
    const cancels = filteredOrders.filter(o => o.status === STATUS.CANCELLED);
  if (delayedDelivered > 0) list.push({ type: 'delay', text: `${delayedDelivered} delivered orders were delayed in this range.` });
  if (outOld > 0) list.push({ type: 'warning', text: `${outOld} orders are out for delivery for 6+ hours.` });
  if (cancels.length > 0) list.push({ type: 'cancel', text: `${cancels.length} orders were cancelled. Review reasons and supplier performance.` });
    // Inventory placeholder
    list.push({ type: 'inventory', text: 'Inventory low alert: Coarse Sand coverage < 2 days. Consider replenishment.' });
    return list.slice(0, 4);
  }, [filteredOrders]);

  // Export CSV
  const exportCSV = () => {
    const headers = ['Order ID','Date','Customer','City','Status','Items','Total (SAR)'];
    const rows = filteredOrders.map(o => ([
      o.id,
      new Date(o.date).toISOString(),
      o.customer,
      o.city,
      o.status,
      o.itemsCount,
      o.total.toFixed(2)
    ]));
    const csv = [headers, ...rows]
      .map(r => r.map(field => `"${String(field).replace(/"/g,'""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
  a.download = `admin-analytics-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const printPage = () => window.print();
  const shareReport = async () => {
    const title = 'CSMS Admin Analytics';
    const text = 'Analytics summary from CSMS Admin.';
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title, text, url }); } catch {}
    } else {
  navigator.clipboard.writeText(`${title}\n${text}\n${url}`);
      alert('Share link copied to clipboard');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const recent = useMemo(() => filteredOrders.slice(0, 8), [filteredOrders]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100" style={{ fontFamily: 'Inter, Segoe UI, system-ui, sans-serif' }}>
      {/* Pill Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 p-3 sm:p-4 md:p-6">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <nav className="bg-white/20 backdrop-blur-2xl border border-white/30 rounded-full shadow-2xl px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 transition-all duration-500 hover:bg-white/25 hover:shadow-3xl">
            <div className="flex justify-between items-center gap-2">
              {/* Logo */}
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="relative group cursor-pointer">
                  <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-2 sm:p-2.5 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <Factory className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-md animate-pulse"></div>
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-black text-gray-900 tracking-tight leading-none">CSMS</span>
                  <p className="text-[10px] sm:text-xs text-black-600 font-semibold tracking-wider uppercase hidden xs:block">Admin Panel</p>
                </div>
              </div>

              {/* Admin Nav */}
              <div className="hidden lg:flex items-center space-x-1">
                <Link to="/admin" className="px-4 py-2 text-black-800 hover:text-blue-600 font-medium transition-all duration-300 rounded-full hover:bg-white/40 text-sm">
                  Dashboard
                </Link>
                <Link to="/admin/orders" className="px-4 py-2 text-black-800 hover:text-blue-600 font-medium transition-all duration-300 rounded-full hover:bg-white/40 text-sm">
                  Orders
                </Link>
                <Link to="/admin/inventory" className="px-4 py-2 text-black-800 hover:text-blue-600 font-medium transition-all duration-300 rounded-full hover:bg-white/40 text-sm">
                  Inventory
                </Link>
                <Link to="/admin/analytics" className="px-4 py-2 text-blue-600 font-medium transition-all duration-300 rounded-full bg-white/40 text-sm">
                  Analytics
                </Link>
                <Link to="/admin/invoices" className="px-4 py-2 text-black-800 hover:text-blue-600 font-medium transition-all duration-300 rounded-full hover:bg-white/40 text-sm">
                  Invoices
                </Link>
              </div>

              {/* Actions */}
              <div className="hidden lg:flex items-center space-x-3">
                <button onClick={shareReport} className="text-black-800 hover:text-blue-600 font-medium px-4 py-2 rounded-full hover:bg-white/40 transition-all duration-300 text-sm inline-flex items-center">
                  <Share2 className="h-4 w-4 mr-2" /> Share
                </button>
                <button onClick={handleLogout} className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm inline-flex items-center">
                  <LogOut className="h-4 w-4 mr-2" /> Logout
                </button>
              </div>

              {/* Mobile */}
              <button
                className="lg:hidden p-2 rounded-full hover:bg-white/40 transition-colors duration-200"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5 text-gray-800" /> : <Menu className="h-5 w-5 text-gray-800" />}
              </button>
            </div>
          </nav>

          {/* Mobile Panel */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4">
              <div className="bg-white/25 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl p-6">
                <nav className="flex flex-col space-y-2">
                  <Link to="/admin" className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/40 rounded-2xl font-medium transition-all duration-300">Dashboard</Link>
                  <Link to="/admin/orders" className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/40 rounded-2xl font-medium transition-all duration-300">Orders</Link>
                  <Link to="/admin/inventory" className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/40 rounded-2xl font-medium transition-all duration-300">Inventory</Link>
                  <Link to="/admin/analytics" className="px-4 py-3 text-blue-600 bg-white/40 rounded-2xl font-medium transition-all duration-300">Analytics</Link>
                  <Link to="/admin/invoices" className="px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-white/40 rounded-2xl font-medium transition-all duration-300">Invoices</Link>
                  <div className="pt-4 space-y-3 border-top border-white/20">
                    <button onClick={shareReport} className="w-full text-gray-800 hover:text-blue-600 font-medium px-4 py-3 rounded-2xl hover:bg-white/40 transition-all duration-300 border border-white/30">Share</button>
                    <button onClick={handleLogout} className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-3 rounded-2xl font-semibold shadow-lg">Logout</button>
                  </div>
                </nav>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main */}
      <section className="pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header + filters */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900">
                Admin Analytics & Reports
              </h1>
              <p className="text-gray-600 mt-2">
                End-to-end visibility: orders, delivery performance, revenue, and customer/product insights.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <div className="relative">
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search order, customer or product..."
                  className="pl-10 p-3.5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300"
                />
              </div>
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="p-3.5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300"
              >
                <option value="all">All Cities</option>
                <option value="Jeddah">Jeddah</option>
                <option value="Makkah">Makkah</option>
              </select>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="p-3.5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="ytd">Year to date</option>
                <option value="all">All time</option>
              </select>
              <button
                onClick={() => { setTimeframe('30d'); setQuery(''); setCityFilter('all'); }}
                className="inline-flex items-center px-4 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-all duration-200"
              >
                <Filter className="h-4 w-4 mr-2" /> Reset
              </button>
              <button
                onClick={exportCSV}
                className="inline-flex items-center px-4 py-3 rounded-2xl bg-white border-2 border-gray-200 text-gray-800 font-bold hover:bg-gray-50 transition-all"
              >
                <Download className="h-4 w-4 mr-2" /> Export CSV
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-10">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl hover:shadow-2xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500 font-medium">Total Revenue</span>
                <DollarSign className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-gray-900">SAR {metrics.revenue.toFixed(2)}</div>
              <div className="text-sm text-gray-500 mt-1">Delivered revenue in selected range</div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl hover:shadow-2xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500 font-medium">Total Orders</span>
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-gray-900">{metrics.totalOrders}</div>
              <div className="text-sm text-gray-500 mt-1">In selected range</div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl hover:shadow-2xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500 font-medium">On-time Delivery</span>
                <TrendingUp className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-gray-900">{(metrics.onTimeRate * 100).toFixed(1)}%</div>
              <div className="text-sm text-gray-500 mt-1">Delivered orders in range</div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl hover:shadow-2xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500 font-medium">Cancellation Rate</span>
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-gray-900">{(metrics.cancellationRate * 100).toFixed(1)}%</div>
              <div className="text-sm text-gray-500 mt-1">All orders in range</div>
            </div>
          </div>

          {/* Trend + Performance + Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-10">
            {/* Revenue Trend */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-lg font-black text-gray-900">Revenue Trend</div>
                  <div className="text-sm text-gray-500">Delivered orders (last 6 months)</div>
                </div>
                <BarChart3 className="h-5 w-5 text-gray-400" />
              </div>
              <div className="h-40 flex items-end gap-3">
                {trend.months.map((m, idx) => {
                  const h = Math.round((m.revenue / trend.maxRev) * 100);
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center">
                      <div className="w-6 sm:w-8 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-xl" style={{ height: `${Math.max(6, h)}%` }}></div>
                      <div className="mt-2 text-xs text-gray-500 font-semibold">{m.label}</div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 text-sm text-gray-600">
                Total: <span className="font-bold text-gray-800">SAR {trend.months.reduce((s,m) => s + m.revenue, 0).toFixed(2)}</span>
              </div>
            </div>

            {/* Delivery Performance */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="text-lg font-black text-gray-900">Delivery Performance</div>
                <Truck className="h-5 w-5 text-gray-400" />
              </div>
              {(() => {
                const delivered = filteredOrders.filter(o => o.status === STATUS.DELIVERED);
                const onTime = delivered.filter(o => o.onTime === true).length;
                const delayed = delivered.filter(o => o.onTime === false).length;
                const cancelled = filteredOrders.filter(o => o.status === STATUS.CANCELLED).length;
                const total = delivered.length + cancelled || 1;
                const pOn = Math.round((onTime / total) * 100);
                const pDel = Math.round((delayed / total) * 100);
                const pCan = Math.max(0, 100 - pOn - pDel);
                return (
                  <>
                    <div className="text-sm text-gray-600 mb-4">On-time vs Delayed vs Cancelled</div>
                    <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden flex">
                      <div style={{ width: `${pOn}%` }} className="bg-emerald-500"></div>
                      <div style={{ width: `${pDel}%` }} className="bg-orange-500"></div>
                      <div style={{ width: `${pCan}%` }} className="bg-red-500"></div>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-3 text-xs font-semibold text-gray-600">
                      <div className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-2"></span>On-time ({pOn}%)</div>
                      <div className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-orange-500 mr-2"></span>Delayed ({pDel}%)</div>
                      <div className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-red-500 mr-2"></span>Cancelled ({pCan}%)</div>
                    </div>
                    <div className="mt-5 text-sm text-gray-600">
                      Delivered: <span className="font-bold text-gray-800">{delivered.length}</span> • Cancelled: <span className="font-bold text-gray-800">{cancelled}</span>
                    </div>
                  </>
                );
              })()}
            </div>

            {/* Quick Report Actions */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="text-lg font-black text-gray-900">Report Actions</div>
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={exportCSV} className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-4 font-bold flex items-center justify-center shadow hover:shadow-lg transition-all">
                  <Download className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                  Export CSV
                </button>
                <button onClick={printPage} className="group bg-white border-2 border-gray-200 rounded-2xl p-4 font-bold flex items-center justify-center text-gray-800 hover:bg-gray-50 transition-all">
                  <Printer className="h-5 w-5 mr-2 text-gray-700" />
                  Print Report
                </button>
                <button onClick={shareReport} className="group bg-white border-2 border-gray-200 rounded-2xl p-4 font-bold flex items-center justify-center text-gray-800 hover:bg-gray-50 transition-all">
                  <Share2 className="h-5 w-5 mr-2 text-gray-700" />
                  Share Link
                </button>
                <Link to="/admin/invoices" className="group bg-white border-2 border-gray-200 rounded-2xl p-4 font-bold flex items-center justify-center text-gray-800 hover:bg-gray-50 transition-all">
                  <FileText className="h-5 w-5 mr-2 text-gray-700" />
                  Invoice Summary
                </Link>
              </div>
              <div className="mt-6 text-sm text-gray-500">
                Need help? Email <span className="font-semibold text-gray-700">reports@csms.sa</span>
              </div>
            </div>
          </div>

          {/* Middle grid: Status, Top Products, Top Customers */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-10">
            
                        {/* Status Breakdown */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="text-lg font-black text-gray-900">Status Breakdown</div>
                <PieChart className="h-5 w-5 text-gray-400" />
              </div>

              {(() => {
                const totalRaw = statusBreakdown.total;
                if (!totalRaw) {
                  return <div className="text-gray-500">No orders in this range.</div>;
                }

                const delivered = statusBreakdown.map[STATUS.DELIVERED] || 0;
                const out = statusBreakdown.map[STATUS.OUT_FOR_DELIVERY] || 0;
                const confirmed = statusBreakdown.map[STATUS.CONFIRMED] || 0;
                const pending = statusBreakdown.map[STATUS.PENDING] || 0;
                const cancelled = statusBreakdown.map[STATUS.CANCELLED] || 0;
                const total = delivered + out + confirmed + pending + cancelled || 1;

                const pct = (v) => (v / total) * 100;
                const stops = [
                  { color: '#10b981', value: delivered, label: STATUS.DELIVERED },
                  { color: '#f97316', value: out, label: STATUS.OUT_FOR_DELIVERY },
                  { color: '#3b82f6', value: confirmed, label: STATUS.CONFIRMED },
                  { color: '#f59e0b', value: pending, label: STATUS.PENDING },
                  { color: '#ef4444', value: cancelled, label: STATUS.CANCELLED }
                ].map(s => ({ ...s, pct: pct(s.value) }));

                // Prevent floating rounding leaving gaps > 0.5%
                let acc = 0;
                const segments = stops.map((s, i) => {
                  const start = acc;
                  acc += s.pct;
                  // Clamp last segment to 100%
                  const end = i === stops.length - 1 ? 100 : acc;
                  return `${s.color} ${start}% ${end}%`;
                }).join(', ');

                return (
                  <div className="flex flex-col sm:flex-row items-center gap-8">
                    <div className="relative w-36 h-36 sm:w-40 sm:h-40" aria-label="Order status distribution">
                      <div
                        className="w-full h-full rounded-full shadow-inner"
                        style={{ background: `conic-gradient(${segments})` }}
                      />
                      <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center border border-gray-100">
                        <div className="text-center leading-tight">
                          <div className="text-[11px] uppercase tracking-wide text-gray-500 font-semibold">Total</div>
                          <div className="text-2xl font-black text-gray-900">{total}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                      {stops.map(s => (
                        <div key={s.label} className="flex items-center justify-between bg-white rounded-xl border border-gray-100 p-3 shadow-sm hover:shadow transition-shadow">
                          <div className="flex items-center">
                            <span className="w-3 h-3 rounded-full mr-2.5 ring-2 ring-white" style={{ backgroundColor: s.color }}></span>
                            <span className="text-sm font-semibold text-gray-700">{s.label}</span>
                          </div>
                          <div className="text-sm font-bold text-gray-900 tabular-nums">{s.value} • {Math.round(s.pct)}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="text-lg font-black text-gray-900">Top Products</div>
                <Package className="h-5 w-5 text-gray-400" />
              </div>

              {topProducts.length === 0 ? (
                <div className="text-gray-500">No product data in this range.</div>
              ) : (
                (() => {
                  const max = Math.max(1, ...topProducts.map(p => p.revenue));
                  return (
                    <div className="space-y-4">
                      {topProducts.map((p, idx) => {
                        const w = Math.round((p.revenue / max) * 100);
                        return (
                          <div key={idx} className="p-4 rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white">
                            <div className="flex items-center justify-between">
                              <div className="font-bold text-gray-900">{p.name}</div>
                              <div className="font-black text-gray-900">SAR {p.revenue.toFixed(2)}</div>
                            </div>
                            <div className="mt-1 text-xs text-gray-600">
                              Qty: <span className="font-semibold">{p.qty} {p.unit}</span> • Orders: <span className="font-semibold">{p.count}</span> • Avg: <span className="font-semibold">SAR {p.avgPrice}</span>
                            </div>
                            <div className="mt-3 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-600 rounded-full" style={{ width: `${Math.max(8, w)}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()
              )}
            </div>

            {/* Top Customers */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="text-lg font-black text-gray-900">Top Customers</div>
                <Users className="h-5 w-5 text-gray-400" />
              </div>

              {topCustomers.length === 0 ? (
                <div className="text-gray-500">No customer data in this range.</div>
              ) : (
                (() => {
                  const max = Math.max(1, ...topCustomers.map(c => c.revenue));
                  return (
                    <div className="space-y-4">
                      {topCustomers.map((c, idx) => {
                        const w = Math.round((c.revenue / max) * 100);
                        return (
                          <div key={idx} className="p-4 rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white">
                            <div className="flex items-center justify-between">
                              <div className="font-bold text-gray-900">{c.customer}</div>
                              <div className="font-black text-gray-900">SAR {c.revenue.toFixed(2)}</div>
                            </div>
                            <div className="mt-1 text-xs text-gray-600">Orders: <span className="font-semibold">{c.orders}</span></div>
                            <div className="mt-3 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${Math.max(8, w)}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()
              )}
            </div>
          </div>

          {/* Region Insights + Recent Orders + Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-10">
            {/* Region Insights */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="text-lg font-black text-gray-900">Region Insights</div>
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              {regionInsights.length === 0 ? (
                <div className="text-gray-500">No regional data in this range.</div>
              ) : (
                <div className="space-y-4">
                  {regionInsights.map((r, idx) => {
                    const onPct = Math.round((r.onTimeRate || 0) * 100);
                    return (
                      <div key={idx} className="p-4 rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-blue-600 mr-2" />
                            <div className="font-bold text-gray-900">{r.city}</div>
                          </div>
                          <div className="text-sm text-gray-600">
                            Delivered: <span className="font-semibold text-gray-800">{r.delivered}</span> / <span className="font-semibold text-gray-800">{r.orders}</span>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                          Revenue: <span className="font-bold text-gray-900">SAR {r.revenue.toFixed(2)}</span>
                        </div>
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                            <span>On-time rate</span>
                            <span className="font-semibold">{onPct}%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: `${onPct}%` }} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="text-lg font-black text-gray-900">Recent Orders</div>
                <Link to="/admin/orders" className="text-sm font-bold text-blue-600 hover:text-blue-700">View all</Link>
              </div>
              {recent.length === 0 ? (
                <div className="text-gray-500">No orders found for current filters.</div>
              ) : (
                <div className="space-y-4">
                  {recent.map(o => (
                    <div key={o.id} className="p-4 rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-black text-gray-900">{o.id}</div>
                          <div className="text-sm text-gray-500">{formatDate(o.date)}</div>
                          <div className="mt-1 text-sm text-gray-700 flex items-center">
                            <Building2 className="h-4 w-4 text-blue-600 mr-1" /> {o.customer}
                          </div>
                          <div className="text-xs text-gray-500 mt-1 flex items-center">
                            <MapPin className="h-3.5 w-3.5 text-blue-500 mr-1" /> {o.city}
                          </div>
                        </div>
                        <StatusBadge status={o.status} />
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="font-bold text-gray-900">SAR {o.total.toFixed(2)}</div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedOrder(o)}
                            className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-all text-sm inline-flex items-center"
                          >
                            <Eye className="h-4 w-4 mr-1" /> Details
                          </button>
                          <Link
                            to="/admin/orders"
                            className="px-3 py-2 rounded-xl bg-white border-2 border-gray-200 hover:bg-gray-50 text-gray-800 font-semibold transition-all text-sm inline-flex items-center"
                          >
                            <FileText className="h-4 w-4 mr-1" /> Orders
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Alerts & Exceptions */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="text-lg font-black text-gray-900">Alerts & Exceptions</div>
                <AlertTriangle className="h-5 w-5 text-gray-400" />
              </div>
              {alerts.length === 0 ? (
                <div className="text-gray-500">No alerts at this time.</div>
              ) : (
                <div className="space-y-4">
                  {alerts.map((a, idx) => {
                    const color =
                      a.type === 'delay' ? 'text-orange-600' :
                      a.type === 'cancel' ? 'text-red-600' :
                      a.type === 'warning' ? 'text-amber-600' :
                      'text-blue-600';
                    const bg =
                      a.type === 'delay' ? 'from-orange-50 to-white' :
                      a.type === 'cancel' ? 'from-red-50 to-white' :
                      a.type === 'warning' ? 'from-amber-50 to-white' :
                      'from-blue-50 to-white';
                    return (
                      <div key={idx} className={`p-4 rounded-2xl border border-gray-100 bg-gradient-to-br ${bg}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start">
                            <AlertTriangle className={`h-5 w-5 mr-2 ${color}`} />
                            <div className="text-gray-800 font-semibold">{a.text}</div>
                          </div>
                          <Link
                            to="/admin/orders"
                            className="text-sm font-bold text-blue-600 hover:text-blue-700"
                          >
                            Review
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              <div className="mt-6 text-sm text-gray-500">
                Configure thresholds in <Link to="/admin/settings" className="font-semibold text-gray-700 underline">Settings</Link>.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelectedOrder(null)} />
          <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-2xl w-full p-6 sm:p-8 z-[61]">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>

            <div className="mb-6">
              <div className="text-xs font-bold text-gray-500">Order</div>
              <div className="text-2xl font-black text-gray-900">{selectedOrder.id}</div>
              <div className="text-sm text-gray-500">{formatDate(selectedOrder.date)}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-3">
                <div className="text-sm font-bold text-gray-500">Status</div>
                <StatusBadge status={selectedOrder.status} />
                <div className="pt-2">
                  <ProgressSteps status={selectedOrder.status} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-sm font-bold text-gray-500">Customer</div>
                <div className="font-semibold text-gray-800 flex items-center">
                  <Building2 className="h-4 w-4 mr-1 text-blue-600" />
                  {selectedOrder.customer}
                </div>
                <div className="text-sm text-gray-600 flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-blue-600" /> {selectedOrder.city}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-black text-gray-900">Items</div>
                <div className="text-sm text-gray-500">{selectedOrder.itemsCount} items</div>
              </div>
              <div className="divide-y divide-gray-100">
                {selectedOrder.items.map((it, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-gray-900">{it.name}</div>
                      <div className="text-sm text-gray-500">Qty: {it.qty} {it.unit} × SAR {it.unitPrice}</div>
                    </div>
                    <div className="font-bold text-gray-900">SAR {(it.qty * it.unitPrice).toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm font-bold text-gray-500">Total</div>
                <div className="text-xl font-black text-gray-900">SAR {selectedOrder.total.toFixed(2)}</div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/admin/orders"
                className="px-5 py-3 rounded-2xl font-bold inline-flex items-center transition-all duration-200 bg-white border-2 border-gray-200 text-gray-800 hover:bg-gray-50"
              >
                <FileText className="h-5 w-5 mr-2" />
                Open in Orders
              </Link>
              <button
                onClick={() => window.print()}
                className="px-5 py-3 rounded-2xl font-bold inline-flex items-center transition-all duration-200 bg-blue-600 hover:bg-blue-700 text-white shadow"
              >
                <Printer className="h-5 w-5 mr-2" />
                Print
              </button>
              <button
                onClick={() => {
                  const headers = ['Order ID','Date','Customer','City','Status','Items','Total (SAR)'];
                  const row = [
                    selectedOrder.id,
                    new Date(selectedOrder.date).toISOString(),
                    selectedOrder.customer,
                    selectedOrder.city,
                    selectedOrder.status,
                    selectedOrder.itemsCount,
                    selectedOrder.total.toFixed(2)
                  ];
                  const csv = [headers, row]
                    .map(r => r.map(f => `"${String(f).replace(/"/g,'""')}"`).join(','))
                    .join('\n');
                  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${selectedOrder.id}.csv`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="px-5 py-3 rounded-2xl font-bold inline-flex items-center transition-all duration-200 bg-white border-2 border-gray-200 text-gray-800 hover:bg-gray-50"
              >
                <Download className="h-5 w-5 mr-2" />
                Export CSV
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAnalytics;