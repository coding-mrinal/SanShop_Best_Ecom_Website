import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { 
  User, Bell, Shield, CreditCard, Globe, Palette, Lock, Mail, 
  MapPin, Package, Heart, Trash2, Edit3, Plus, Eye, EyeOff,
  Smartphone, Monitor, Check, X, ExternalLink, Download
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SettingsPage = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    orderUpdates: true,
    promotional: false,
    newsletter: true
  });

  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-01-01',
    gender: 'male',
    avatar: null
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [addresses] = useState([
    {
      id: 1,
      type: 'Home',
      name: 'John Doe',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'United States',
      isDefault: true
    },
    {
      id: 2,
      type: 'Work',
      name: 'John Doe',
      street: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      zip: '10002',
      country: 'United States',
      isDefault: false
    }
  ]);

  const [paymentMethods] = useState([
    {
      id: 1,
      type: 'visa',
      last4: '1234',
      expiryMonth: '12',
      expiryYear: '2025',
      name: 'John Doe',
      isDefault: true
    },
    {
      id: 2,
      type: 'mastercard',
      last4: '5678',
      expiryMonth: '08',
      expiryYear: '2026',
      name: 'John Doe',
      isDefault: false
    }
  ]);

  const [recentOrders] = useState([
    {
      id: 'ORD-2023-001',
      date: '2023-10-15',
      total: 129.99,
      status: 'delivered',
      items: 3
    },
    {
      id: 'ORD-2023-002',
      date: '2023-10-18',
      total: 89.99,
      status: 'shipped',
      items: 1
    }
  ]);

  const [wishlistItems] = useState([
    {
      id: 1,
      name: 'Wireless Earbuds Pro',
      price: 199.99,
      image: '/api/placeholder/100/100'
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      price: 299.99,
      image: '/api/placeholder/100/100'
    }
  ]);

  const Button = ({ variant = 'outline', color = 'gray', size = 'md', icon: Icon, children, className = '', ...props }) => {
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2.5',
      lg: 'px-6 py-3 text-lg'
    };

    const colorClasses = {
      gray: 'border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800',
      indigo: 'border-indigo-500 text-indigo-600 hover:bg-indigo-50 dark:text-indigo-300 dark:hover:bg-indigo-900/20',
      red: 'border-red-500 text-red-600 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-900/20',
      green: 'border-green-500 text-green-600 hover:bg-green-50 dark:text-green-300 dark:hover:bg-green-900/20',
      blue: 'border-blue-500 text-blue-600 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-900/20'
    };

    const filledClasses = {
      gray: 'bg-gray-600 text-white border-gray-600 hover:bg-gray-700',
      indigo: 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700',
      red: 'bg-red-600 text-white border-red-600 hover:bg-red-700',
      green: 'bg-green-600 text-white border-green-600 hover:bg-green-700',
      blue: 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
    };

    const baseClasses = `inline-flex items-center justify-center border rounded-xl font-medium transition-all duration-200 ${sizeClasses[size]}`;
    const variantClasses = variant === 'filled' ? filledClasses[color] : colorClasses[color];

    return (
      <button className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
        {Icon && <Icon className="h-4 w-4 mr-2" />}
        {children}
      </button>
    );
  };

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurityData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    console.log('Profile saved:', profileData);
  };

  const handleSecuritySave = (e) => {
    e.preventDefault();
    if (securityData.newPassword !== securityData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    console.log('Password changed');
    setSecurityData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const tabs = [
    { id: 'profile', name: 'Account Info', icon: User },
    { id: 'orders', name: 'Order History', icon: Package },
    { id: 'addresses', name: 'Addresses', icon: MapPin },
    { id: 'payment', name: 'Payment Methods', icon: CreditCard },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'wishlist', name: 'Wishlist', icon: Heart },
    { id: 'preferences', name: 'Preferences', icon: Palette }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50/80 via-gray-100/50 to-gray-200/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white dark:bg-gray-900 p-12 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 text-center">
          <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Account Settings</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Please log in to access your account settings</p>
          <Link to="/login">
            <Button variant="filled" color="indigo" size="lg" className="w-full">
              Log In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/80 via-gray-100/50 to-gray-200/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Account Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your account preferences and security settings</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 sticky top-24">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div className="ml-4">
                  <h2 className="font-bold text-lg text-gray-900 dark:text-gray-100">{user.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{user.email}</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 rounded-xl text-left font-medium transition-all duration-200 ${
                        activeTab === tab.id 
                          ? 'bg-indigo-50 text-indigo-700 border-2 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-700' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
          
          <div className="lg:w-3/4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              
              {activeTab === 'profile' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Profile Information</h2>
                    <Button color="red" icon={Trash2}>Delete Account</Button>
                  </div>
                  <form onSubmit={handleProfileSave}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { name: 'firstName', label: 'First Name', type: 'text' },
                        { name: 'lastName', label: 'Last Name', type: 'text' },
                        { name: 'email', label: 'Email', type: 'email' },
                        { name: 'phone', label: 'Phone', type: 'tel' },
                        { name: 'dateOfBirth', label: 'Date of Birth', type: 'date' }
                      ].map(field => (
                        <div key={field.name}>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {field.label}
                          </label>
                          <input
                            type={field.type}
                            name={field.name}
                            value={profileData[field.name]}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                          />
                        </div>
                      ))}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gender</label>
                        <select
                          name="gender"
                          value={profileData.gender}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                          <option value="prefer-not-to-say">Prefer not to say</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-8">
                      <Button variant="filled" color="indigo" type="submit" size="lg">
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Order History</h2>
                    <Link to="/orders">
                      <Button icon={ExternalLink}>View All Orders</Button>
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {recentOrders.map(order => (
                      <div key={order.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-bold text-gray-900 dark:text-gray-100">Order {order.id}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{new Date(order.date).toLocaleDateString()} • {order.items} items • ${order.total.toFixed(2)}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                              order.status === 'shipped' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                              'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                            }`}>
                              {order.status}
                            </span>
                            <Button size="sm" icon={Eye}>View Details</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'addresses' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Saved Addresses</h2>
                    <Button variant="filled" color="indigo" icon={Plus}>Add New Address</Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {addresses.map(address => (
                      <div key={address.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-bold text-gray-900 dark:text-gray-100">{address.type}</h3>
                              {address.isDefault && (
                                <span className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 px-2 py-1 rounded-full text-xs font-medium">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 font-medium">{address.name}</p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              {address.street}<br />
                              {address.city}, {address.state} {address.zip}<br />
                              {address.country}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" icon={Edit3}>Edit</Button>
                            <Button size="sm" color="red" icon={Trash2}>Delete</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'payment' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Payment Methods</h2>
                    <Button variant="filled" color="indigo" icon={Plus}>Add Payment Method</Button>
                  </div>
                  <div className="space-y-4">
                    {paymentMethods.map(method => (
                      <div key={method.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                              <CreditCard className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 dark:text-gray-100">
                                {method.type.toUpperCase()} •••• {method.last4}
                              </p>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Expires {method.expiryMonth}/{method.expiryYear}
                              </p>
                            </div>
                            {method.isDefault && (
                              <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium ml-4">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" icon={Edit3}>Edit</Button>
                            <Button size="sm" color="red" icon={Trash2}>Remove</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">My Wishlist</h2>
                    <Link to="/wishlist">
                      <Button icon={ExternalLink}>View Full Wishlist</Button>
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map(item => (
                      <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                        <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-lg mb-4" />
                        <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">{item.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">${item.price.toFixed(2)}</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="filled" color="indigo" className="flex-1">Add to Cart</Button>
                          <Button size="sm" color="red" icon={Trash2}>Remove</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Notification Preferences</h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Communication Channels</h3>
                      <div className="space-y-4">
                        {[
                          { key: 'email', label: 'Email Notifications', icon: Mail },
                          { key: 'sms', label: 'SMS Notifications', icon: Smartphone },
                          { key: 'push', label: 'Push Notifications', icon: Bell }
                        ].map(({ key, label, icon: Icon }) => (
                          <div key={key} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                            <div className="flex items-center">
                              <Icon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                              <span className="text-gray-900 dark:text-gray-100">{label}</span>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={notifications[key]}
                                onChange={() => handleNotificationChange(key)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Notification Types</h3>
                      <div className="space-y-4">
                        {[
                          { key: 'orderUpdates', label: 'Order Updates', desc: 'Get notified about your order status' },
                          { key: 'promotional', label: 'Promotional Offers', desc: 'Receive deals and discounts' },
                          { key: 'newsletter', label: 'Newsletter', desc: 'Weekly updates and product news' }
                        ].map(({ key, label, desc }) => (
                          <div key={key} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-gray-100">{label}</p>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">{desc}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={notifications[key]}
                                onChange={() => handleNotificationChange(key)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Security Settings</h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Change Password</h3>
                      <form onSubmit={handleSecuritySave}>
                        <div className="space-y-4">
                          {[
                            { name: 'currentPassword', label: 'Current Password' },
                            { name: 'newPassword', label: 'New Password' },
                            { name: 'confirmPassword', label: 'Confirm New Password' }
                          ].map(field => (
                            <div key={field.name}>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {field.label}
                              </label>
                              <div className="relative">
                                <input
                                  type={showPassword ? 'text' : 'password'}
                                  name={field.name}
                                  value={securityData[field.name]}
                                  onChange={handleSecurityChange}
                                  className="w-full px-4 py-2.5 pr-12 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                                  required
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                                >
                                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6">
                          <Button variant="filled" color="indigo" type="submit">
                            Update Password
                          </Button>
                        </div>
                      </form>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Two-Factor Authentication</h3>
                      <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">Two-factor authentication is disabled</p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">Add an extra layer of security to your account</p>
                          </div>
                          <Button variant="filled" color="indigo">Enable 2FA</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Active Sessions</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                          <div className="flex items-center">
                            <Monitor className="h-8 w-8 text-gray-500 dark:text-gray-400 mr-4" />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-gray-100">Current Session</p>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">Chrome on Windows • New York, US</p>
                              <p className="text-gray-500 dark:text-gray-400 text-xs">Active now</p>
                            </div>
                          </div>
                          <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs px-3 py-1 rounded-full font-medium">
                            Current
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                          <div className="flex items-center">
                            <Smartphone className="h-8 w-8 text-gray-500 dark:text-gray-400 mr-4" />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-gray-100">iPhone 12</p>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">Safari on iOS • Los Angeles, US</p>
                              <p className="text-gray-500 dark:text-gray-400 text-xs">2 hours ago</p>
                            </div>
                          </div>
                          <Button size="sm" color="red">Sign Out</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            
              {activeTab === 'preferences' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Preferences</h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Language & Region</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
                          <select className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500">
                            <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>German</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Currency</label>
                          <select className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500">
                            <option>USD - US Dollar</option>
                            <option>EUR - Euro</option>
                            <option>GBP - British Pound</option>
                            <option>JPY - Japanese Yen</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Theme Preferences</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { id: 'light', name: 'Light', bg: 'bg-white', border: 'border-gray-200' },
                          { id: 'system', name: 'System', bg: 'bg-gradient-to-br from-white to-gray-100', border: 'border-indigo-500 border-2', current: true },
                          { id: 'dark', name: 'Dark', bg: 'bg-gray-800', border: 'border-gray-600' }
                        ].map(theme => (
                          <div key={theme.id} className={`${theme.border} ${theme.current ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''} rounded-xl p-4 text-center cursor-pointer hover:border-indigo-500 transition-all`}>
                            <div className={`${theme.bg} w-16 h-16 mx-auto mb-3 rounded-xl border-2 border-gray-200 dark:border-gray-600`}></div>
                            <p className={`font-medium ${theme.current ? 'text-indigo-600 dark:text-indigo-300' : 'text-gray-900 dark:text-gray-100'}`}>{theme.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Privacy Settings</h3>
                      <div className="space-y-4">
                        {[
                          { label: 'Profile Visibility', desc: 'Make your profile visible to other users', checked: true },
                          { label: 'Data Collection', desc: 'Allow us to collect data for analytics', checked: false }
                        ].map((setting, idx) => (
                          <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-gray-100">{setting.label}</p>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">{setting.desc}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked={setting.checked} />
                              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
