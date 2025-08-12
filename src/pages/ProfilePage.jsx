import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { User, MapPin, CreditCard, ShoppingBag, Heart, Bell, Shield, HelpCircle, Edit, Trash2, Plus, Eye, EyeOff, Lock, Phone, Mail, Key } from 'lucide-react';

const ProfilePage = () => {
  const { user, logout } = useUser();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogout = () => logout();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50/80 via-gray-100/50 to-gray-200/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 flex items-center justify-center">
        <div className="max-w-md w-full bg-white dark:bg-gray-900 backdrop-blur-sm p-10 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg mb-6">
            <User className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Welcome Back</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Please log in to access your profile</p>
          <a href="/login" className="group relative w-full flex justify-center py-3.5 px-4 border-2 border-blue-500 text-sm font-semibold rounded-xl text-blue-600 dark:text-blue-300 bg-transparent hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500/30 dark:focus:ring-offset-gray-900 shadow-sm hover:shadow-blue-500/10 transition-all duration-300 hover:border-blue-600 dark:border-blue-400 dark:hover:border-blue-300 hover:scale-[1.01] sm:w-auto">
            Log In
          </a>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', icon: User, label: 'Personal Information' },
    { id: 'orders', icon: ShoppingBag, label: 'Order History' },
    { id: 'address', icon: MapPin, label: 'Address Book' },
    { id: 'payment', icon: CreditCard, label: 'Payment Methods' },
    { id: 'wishlist', icon: Heart, label: 'Wishlist' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'security', icon: Shield, label: 'Security' },
    { id: 'support', icon: HelpCircle, label: 'Help & Support' }
  ];

  const renderInput = (label, value, type = "text") => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</label>
      <input
        type={type}
        defaultValue={value}
        className="w-full pl-4 pr-4 py-3.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300"
      />
    </div>
  );

  const renderPasswordInput = (label) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          className="w-full pl-4 pr-12 py-3.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300"
        />
        <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <EyeOff className="h-5 w-5 text-gray-500 dark:text-gray-400" /> : <Eye className="h-5 w-5 text-gray-500 dark:text-gray-400" />}
        </button>
      </div>
    </div>
  );

  const renderActionButton = (label, Icon, color = "blue") => (
    <button className={`group relative flex justify-center items-center py-3 px-4 border-2 border-${color}-500 text-sm font-semibold rounded-xl text-${color}-600 dark:text-${color}-300 bg-transparent hover:bg-${color}-50 dark:hover:bg-${color}-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500/30 dark:focus:ring-offset-gray-900 shadow-sm transition-all duration-300 hover:scale-[1.01]`}>
      {Icon && <Icon className="h-4 w-4 mr-2" />} {label}
    </button>
  );

  const renderCard = (children, className = "") => (
    <div className={`border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-gray-50 dark:bg-gray-800/50 hover:shadow transition-all duration-200 ${className}`}>
      {children}
    </div>
  );

  const renderToggle = (id, label, description) => (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input id={id} name={id} type="checkbox" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded" defaultChecked />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={id} className="font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <p className="text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );

  const renderSectionHeader = (title, actionLabel = "", actionIcon = null) => (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
      {actionLabel && renderActionButton(actionLabel, actionIcon)}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/80 via-gray-100/50 to-gray-200/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 sm:px-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">My Account</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center mb-6 p-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow">
                <div className="bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-xl w-16 h-16 flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div className="ml-4">
                  <h2 className="font-bold text-lg text-white">{user.name}</h2>
                  <p className="text-blue-100 text-sm">{user.email}</p>
                </div>
              </div>
              <nav className="space-y-2">
                {tabs.map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      activeTab === id
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-700 shadow-sm'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" /> {label}
                  </button>
                ))}
                <button onClick={handleLogout} className="w-full flex items-center px-4 py-3 rounded-xl text-left hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all duration-200 mt-4">
                  <span className="ml-8">Logout</span>
                </button>
              </nav>
            </div>
          </div>

          <div className="lg:w-3/4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderInput('Full Name', user.name)}
                    {renderInput('Email Address', user.email, 'email')}
                    {renderInput('Phone Number', '+1 (555) 123-4567', 'tel')}
                  </div>
                  <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center"><Lock className="h-5 w-5 mr-2" />Password Management</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderPasswordInput('Current Password')}
                      {renderPasswordInput('New Password')}
                      {renderPasswordInput('Confirm New Password')}
                    </div>
                  </div>
                  <div className="mt-6">{renderActionButton('Save Changes', null, 'blue')}</div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Order History</h2>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-800/50">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-100 dark:bg-gray-800">
                          <tr>{['Order ID', 'Date', 'Total', 'Status', 'Actions'].map((h) => <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">{h}</th>)}</tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800/50 divide-y divide-gray-200 dark:divide-gray-700">
                          {[{ id: '#ORD-12345', date: 'May 12, 2023', total: '$129.99', status: 'Delivered', color: 'green' },
                            { id: '#ORD-12344', date: 'May 5, 2023', total: '$89.99', status: 'Shipped', color: 'blue' }].map((order, i) => (
                            <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150">
                              <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100 font-medium">{order.id}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-400">{order.date}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100 font-medium">{order.total}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-${order.color}-100 text-${order.color}-800 dark:bg-${order.color}-900/30 dark:text-${order.color}-300`}>
                                  {order.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <button className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200 font-medium hover:underline">View Details</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'address' && (
                <div>
                  {renderSectionHeader('Address Book', 'Add New Address', Plus)}
                  <div className="space-y-4">
                    {[{ title: 'Home Address', isDefault: true, address: '123 Main Street, Apt 4B, New York, NY 10001, United States' },
                      { title: 'Work Address', isDefault: false, address: '456 Business Ave, Suite 100, San Francisco, CA 94105, United States' }].map((addr, i) => (
                      <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-gray-50 dark:bg-gray-800/50 hover:shadow transition-all duration-200">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center mb-2">
                              <h3 className="font-semibold text-gray-900 dark:text-gray-100">{addr.title}</h3>
                              {addr.isDefault && <span className="ml-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full">Default</span>}
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">{addr.address}</p>
                          </div>
                          <div className="flex space-x-2">
                            {renderActionButton('Edit', Edit, 'blue')}
                            {renderActionButton('Delete', Trash2, 'red')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'payment' && (
                <div>
                  {renderSectionHeader('Payment Methods', 'Add Payment Method', Plus)}
                  <div className="space-y-4">
                    {[{ type: 'Visa', last4: '1234', expiry: '12/25' },
                      { type: 'Mastercard', last4: '5678', expiry: '06/24' }].map((card, i) => (
                      <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-gray-50 dark:bg-gray-800/50 hover:shadow transition-all duration-200">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex items-center">
                            <div className="bg-gradient-to-br from-blue-400/20 to-blue-600/20 border border-gray-300 dark:border-gray-600 rounded-xl w-16 h-10 flex items-center justify-center">
                              <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="ml-4">
                              <h3 className="font-semibold text-gray-900 dark:text-gray-100">{card.type} ending in {card.last4}</h3>
                              <p className="text-gray-600 dark:text-gray-400">Expires {card.expiry}</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            {renderActionButton('Edit', Edit, 'blue')}
                            {renderActionButton('Delete', Trash2, 'red')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Subscription Details</h3>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">Premium Membership</h4>
                        <p className="text-gray-600 dark:text-gray-400">Renews on June 15, 2024</p>
                      </div>
                      <button className="mt-2 sm:mt-0 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                        Manage Subscription
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">My Wishlist</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="border border-gray-200 dark:border-gray-700 rounded-2xl p-4 bg-gray-50 dark:bg-gray-800/50 hover:shadow-md transition-all duration-200">
                        <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Product {item}</h3>
                        <p className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">$99.99</p>
                        <p className="text-sm mb-4 text-green-600 dark:text-green-400">In Stock</p>
                        <div className="flex justify-between items-center">
                          <button className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                            Add to Cart
                          </button>
                          <button className="p-2 rounded-xl border-2 border-red-500 text-red-600 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Notification Preferences</h2>
                  <div className="space-y-6">
                    {renderCard(
                      <>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Email Preferences</h3>
                        <div className="space-y-3">
                          {renderToggle('newsletter', 'Newsletter', 'Receive our weekly newsletter with updates')}
                          {renderToggle('promotions', 'Promotional Offers', 'Get notified about special deals and discounts')}
                        </div>
                      </>
                    )}
                    {renderCard(
                      <>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">SMS Notifications</h3>
                        <div className="space-y-3">
                          {renderToggle('order-updates', 'Order Updates', 'Receive SMS updates about your orders')}
                          {renderToggle('delivery-alerts', 'Delivery Alerts', 'Get notified when your order is out for delivery')}
                        </div>
                        <div className="mt-4">{renderInput('Phone Number', '+1 (555) 123-4567', 'tel')}</div>
                      </>
                    )}
                  </div>
                  <div className="mt-6">{renderActionButton('Save Preferences', null, 'blue')}</div>
                </div>
              )}

              {activeTab === 'security' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Security Settings</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderCard(
                      <>
                        <div className="flex items-center mb-4">
                          <Key className="h-6 w-6 text-blue-500 mr-3" />
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Two-Factor Authentication</h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">Add an extra layer of security to your account</p>
                        {renderActionButton('Enable 2FA', null, 'green')}
                      </>
                    )}
                    {renderCard(
                      <>
                        <div className="flex items-center mb-4">
                          <Phone className="h-6 w-6 text-blue-500 mr-3" />
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Login Activity</h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">See your recent login activity</p>
                        {renderActionButton('View Activity', null, 'blue')}
                      </>
                    )}
                  </div>
                  <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start">
                      <div className="flex-shrink-0"><Shield className="h-6 w-6 text-red-500" /></div>
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Account Deactivation</h3>
                        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                          <p>Permanently delete your account and all associated data.</p>
                        </div>
                        <div className="mt-4">
                          <button type="button" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            Delete Account
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'support' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Help & Support</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[{ icon: HelpCircle, title: 'FAQ', desc: 'Find answers to common questions', action: 'Visit FAQ Center' },
                      { icon: Mail, title: 'Contact Support', desc: 'Get in touch with our support team', action: 'Contact Us' },
                      { icon: Shield, title: 'Privacy Policy', desc: 'Read about how we protect your data', action: 'View Policy' },
                      { icon: Key, title: 'Terms of Service', desc: 'Understand our terms and conditions', action: 'Read Terms' }].map(({ icon: Icon, title, desc, action }, i) => (
                      <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-gray-50 dark:bg-gray-800/50 hover:shadow transition-all duration-200">
                        <div className="flex items-center">
                          <Icon className="h-8 w-8 text-blue-500" />
                          <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-gray-100">{title}</h3>
                        </div>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">{desc}</p>
                        <button className="mt-4 text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200 font-medium">{action}</button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Emergency Support</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Need immediate assistance? Our support team is available 24/7.</p>
                    {renderActionButton('Call Support', Phone, 'green')}
                    {renderActionButton('Live Chat', null, 'blue')}
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

export default ProfilePage;