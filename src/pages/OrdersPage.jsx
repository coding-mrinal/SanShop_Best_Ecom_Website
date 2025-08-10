import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { 
  Package, Truck, CheckCircle, XCircle, Clock, AlertCircle, 
  Calendar, CreditCard, MapPin, User, Phone, Mail,
  Search, Eye, Download, RefreshCw, MessageCircle, X 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderHistoryPage = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  // Mock data initialization
  useEffect(() => {
    const mockOrders = [
      {
        id: 'ORD-2023-001', date: '2023-10-15', total: 129.99, status: 'delivered', items: 3,
        tracking: 'TRK123456789', estimatedDelivery: '2023-10-20', shippingAddress: '123 Main St, New York, NY 10001',
        paymentMethod: 'Visa ending in 1234', customer: { name: 'John Doe', email: 'john@example.com', phone: '+1 (555) 123-4567' },
        products: [
          { id: 1, name: 'Wireless Headphones', price: 79.99, quantity: 1, image: '/api/placeholder/100/100' },
          { id: 2, name: 'Bluetooth Speaker', price: 49.99, quantity: 2, image: '/api/placeholder/100/100' }
        ]
      },
      {
        id: 'ORD-2023-002', date: '2023-10-18', total: 89.99, status: 'shipped', items: 1,
        tracking: 'TRK987654321', estimatedDelivery: '2023-10-25', shippingAddress: '123 Main St, New York, NY 10001',
        paymentMethod: 'Mastercard ending in 5678', customer: { name: 'John Doe', email: 'john@example.com', phone: '+1 (555) 123-4567' },
        products: [{ id: 3, name: 'Smart Watch', price: 89.99, quantity: 1, image: '/api/placeholder/100/100' }]
      },
      {
        id: 'ORD-2023-003', date: '2023-10-20', total: 199.99, status: 'processing', items: 2,
        tracking: null, estimatedDelivery: '2023-10-30', shippingAddress: '123 Main St, New York, NY 10001',
        paymentMethod: 'PayPal', customer: { name: 'John Doe', email: 'john@example.com', phone: '+1 (555) 123-4567' },
        products: [
          { id: 4, name: 'Gaming Mouse', price: 49.99, quantity: 1, image: '/api/placeholder/100/100' },
          { id: 5, name: 'Mechanical Keyboard', price: 149.99, quantity: 1, image: '/api/placeholder/100/100' }
        ]
      },
      {
        id: 'ORD-2023-004', date: '2023-10-22', total: 59.99, status: 'cancelled', items: 1,
        tracking: null, estimatedDelivery: null, shippingAddress: '123 Main St, New York, NY 10001',
        paymentMethod: 'Visa ending in 1234', customer: { name: 'John Doe', email: 'john@example.com', phone: '+1 (555) 123-4567' },
        products: [{ id: 6, name: 'USB-C Hub', price: 59.99, quantity: 1, image: '/api/placeholder/100/100' }]
      }
    ];
    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
  }, []);

  // Filter orders
  useEffect(() => {
    let result = orders.filter(order => {
      const matchesSearch = !searchTerm || order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.products.some(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      const matchesDate = dateFilter === 'all' || (() => {
        const diffDays = Math.ceil(Math.abs(new Date() - new Date(order.date)) / (1000 * 60 * 60 * 24));
        return diffDays <= parseInt(dateFilter);
      })();
      return matchesSearch && matchesStatus && matchesDate;
    });
    setFilteredOrders(result);
  }, [searchTerm, statusFilter, dateFilter, orders]);

  const statusConfig = {
    delivered: { icon: CheckCircle, text: 'Delivered', color: 'green' },
    shipped: { icon: Truck, text: 'Shipped', color: 'blue' },
    processing: { icon: Clock, text: 'Processing', color: 'yellow' },
    cancelled: { icon: XCircle, text: 'Cancelled', color: 'red' }
  };

  const getStatusBadge = (status) => {
    const config = statusConfig[status] || { icon: AlertCircle, text: 'Unknown', color: 'gray' };
    const Icon = config.icon;
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium 
        bg-${config.color}-100 text-${config.color}-800 dark:bg-${config.color}-900/30 dark:text-${config.color}-300`}>
        <Icon className={`h-4 w-4 mr-1 text-${config.color}-500`} />
        {config.text}
      </span>
    );
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const Button = ({ variant = 'outline', color = 'gray', icon: Icon, children, className = '', ...props }) => {
    const colorClasses = {
      gray: 'border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800',
      green: 'border-green-500 text-green-600 hover:bg-green-50 dark:text-green-300 dark:hover:bg-green-900/20',
      red: 'border-red-500 text-red-600 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-900/20',
      indigo: 'border-indigo-500 text-indigo-600 hover:bg-indigo-50 dark:text-indigo-300 dark:hover:bg-indigo-900/20'
    };
    
    return (
      <button
        className={`inline-flex items-center px-4 py-2.5 border rounded-xl font-medium transition-all duration-200 ${colorClasses[color]} ${className}`}
        {...props}
      >
        {Icon && <Icon className="h-4 w-4 mr-2" />}
        {children}
      </button>
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50/80 via-gray-100/50 to-gray-200/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white dark:bg-gray-900 p-10 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6">
            <Package className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">My Orders</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Please log in to view your order history</p>
          <Link to="/login" className="inline-flex justify-center py-3.5 px-6 border-2 border-indigo-500 text-indigo-600 dark:text-indigo-300 bg-transparent hover:bg-indigo-50 rounded-xl font-semibold transition-all duration-300">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/80 via-gray-100/50 to-gray-200/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 sm:px-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">My Orders</h1>
            <p className="text-gray-600 dark:text-gray-400">Track and manage your purchases</p>
          </div>
          <div className="relative w-full lg:w-64 mt-6 lg:mt-0">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        {/* Filters */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: 'Status', value: statusFilter, onChange: setStatusFilter, options: [
                { value: 'all', label: 'All Statuses' },
                { value: 'processing', label: 'Processing' },
                { value: 'shipped', label: 'Shipped' },
                { value: 'delivered', label: 'Delivered' },
                { value: 'cancelled', label: 'Cancelled' }
              ]},
              { label: 'Date Range', value: dateFilter, onChange: setDateFilter, options: [
                { value: 'all', label: 'All Time' },
                { value: '7', label: 'Last 7 Days' },
                { value: '30', label: 'Last 30 Days' },
                { value: '90', label: 'Last 90 Days' }
              ]}
            ].map((filter, idx) => (
              <div key={idx}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{filter.label}</label>
                <select
                  value={filter.value}
                  onChange={(e) => filter.onChange(e.target.value)}
                  className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                >
                  {filter.options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-12 text-center border border-gray-200 dark:border-gray-700">
              <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No orders found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
              <Button color="indigo" className="px-6 py-3">
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-2">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Order {order.id}</h2>
                        {getStatusBadge(order.status)}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">{formatDate(order.date)} • {order.items} items • ${order.total.toFixed(2)}</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Button icon={Eye} onClick={() => setSelectedOrder(order)}>View Details</Button>
                      {order.status === 'delivered' && <Button icon={RefreshCw} color="green">Return/Exchange</Button>}
                      {(['processing', 'shipped'].includes(order.status)) && <Button icon={XCircle} color="red">Cancel Order</Button>}
                      <Button icon={MessageCircle}>Contact Support</Button>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex flex-wrap gap-6">
                    {order.products.slice(0, 3).map((product) => (
                      <div key={product.id} className="flex items-center">
                        <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
                        <div className="ml-4">
                          <h3 className="font-medium text-gray-900 dark:text-gray-100">{product.name}</h3>
                          <p className="text-gray-600 dark:text-gray-400">Qty: {product.quantity}</p>
                        </div>
                      </div>
                    ))}
                    {order.products.length > 3 && (
                      <div className="flex items-center">
                        <div className="w-16 h-16 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <span className="text-gray-500 dark:text-gray-400">+{order.products.length - 3}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Detail Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Order Details</h2>
                  <button onClick={() => setSelectedOrder(null)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    {/* Order Summary */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Order Summary</h3>
                      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-gray-100">Order {selectedOrder.id}</h4>
                            <p className="text-gray-600 dark:text-gray-400">{formatDate(selectedOrder.date)}</p>
                          </div>
                          {getStatusBadge(selectedOrder.status)}
                        </div>
                        
                        <div className="mt-6 space-y-4">
                          {selectedOrder.products.map((product) => (
                            <div key={product.id} className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
                              <div className="flex items-center">
                                <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
                                <div className="ml-4">
                                  <h4 className="font-medium text-gray-900 dark:text-gray-100">{product.name}</h4>
                                  <p className="text-gray-600 dark:text-gray-400">Quantity: {product.quantity}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-gray-900 dark:text-gray-100">${(product.price * product.quantity).toFixed(2)}</p>
                                <p className="text-gray-600 dark:text-gray-400">${product.price.toFixed(2)} each</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                          {[
                            { label: 'Subtotal', value: selectedOrder.total - 5.99 },
                            { label: 'Shipping', value: 5.99 }
                          ].map(item => (
                            <div key={item.label} className="flex justify-between mb-2">
                              <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                              <span className="text-gray-900 dark:text-gray-100">${item.value.toFixed(2)}</span>
                            </div>
                          ))}
                          <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <span className="text-gray-900 dark:text-gray-100">Total</span>
                            <span className="text-gray-900 dark:text-gray-100">${selectedOrder.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Shipping Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Shipping Information</h3>
                      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Delivery Address</h4>
                            <p className="text-gray-600 dark:text-gray-400 flex items-start">
                              <MapPin className="h-5 w-5 mr-2 flex-shrink-0" />
                              {selectedOrder.shippingAddress}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Tracking Information</h4>
                            {selectedOrder.tracking ? (
                              <div>
                                <p className="text-gray-600 dark:text-gray-400">Tracking: {selectedOrder.tracking}</p>
                                <p className="text-gray-600 dark:text-gray-400 mt-1">Est. Delivery: {formatDate(selectedOrder.estimatedDelivery)}</p>
                                <Button icon={Truck} color="indigo" className="mt-3">Track Package</Button>
                              </div>
                            ) : (
                              <p className="text-gray-600 dark:text-gray-400">Tracking information not available yet</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    {/* Customer & Payment Information */}
                    {[
                      {
                        title: 'Customer Information',
                        icon: User,
                        gradient: 'from-indigo-500 to-purple-600',
                        data: [
                          { icon: User, text: selectedOrder.customer.name },
                          { icon: Mail, text: selectedOrder.customer.email },
                          { icon: Phone, text: selectedOrder.customer.phone }
                        ]
                      },
                      {
                        title: 'Payment Information',
                        icon: CreditCard,
                        gradient: 'from-blue-500 to-indigo-600',
                        data: [
                          { icon: CreditCard, text: selectedOrder.paymentMethod },
                          { icon: Calendar, text: `Paid on ${formatDate(selectedOrder.date)}` }
                        ],
                        action: { icon: Download, text: 'Download Invoice' }
                      }
                    ].map((section, idx) => (
                      <div key={idx} className={idx === 0 ? 'mb-8' : ''}>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">{section.title}</h3>
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6">
                          <div className="flex items-center mb-4">
                            <div className={`bg-gradient-to-br ${section.gradient} w-12 h-12 rounded-full flex items-center justify-center`}>
                              <section.icon className="h-6 w-6 text-white" />
                            </div>
                            <div className="ml-4">
                              <h4 className="font-bold text-gray-900 dark:text-gray-100">{section.data[0].text}</h4>
                              <p className="text-gray-600 dark:text-gray-400">{section.title.split(' ')[0]}</p>
                            </div>
                          </div>
                          <div className="space-y-3">
                            {section.data.slice(1).map((item, itemIdx) => (
                              <p key={itemIdx} className="text-gray-600 dark:text-gray-400 flex items-center">
                                <item.icon className="h-5 w-5 mr-2" />
                                {item.text}
                              </p>
                            ))}
                          </div>
                          {section.action && (
                            <Button icon={section.action.icon} color="indigo" className="mt-4">
                              {section.action.text}
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8 flex flex-wrap gap-4">
                  {selectedOrder.status === 'delivered' && <Button icon={RefreshCw} color="green" className="px-6 py-3">Return/Exchange</Button>}
                  {(['processing', 'shipped'].includes(selectedOrder.status)) && <Button icon={XCircle} color="red" className="px-6 py-3">Cancel Order</Button>}
                  <Button icon={MessageCircle} className="px-6 py-3">Contact Support</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
