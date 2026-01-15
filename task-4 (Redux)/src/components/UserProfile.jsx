import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, updateUserProfile, clearUser, toggleNotifications, updatePreferences } from '../store/userSlice';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user, preferences } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleCreateProfile = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      dispatch(setUser(formData));
      setFormData({ name: '', email: '' });
    }
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(formData));
    setIsEditing(false);
  };

  const handleClearProfile = () => {
    dispatch(clearUser());
    setIsEditing(false);
    setFormData({ name: '', email: '' });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({ name: user.name, email: user.email });
  };

  return (
    <div className="card">
      <h2 className="section-title">User Profile</h2>
      
      {!user ? (
        <form onSubmit={handleCreateProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-field w-full"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input-field w-full"
              placeholder="Enter your email"
              required
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            Create Profile
          </button>
        </form>
      ) : (
        <div>
          {isEditing ? (
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-field w-full"
                  required
                />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="btn-primary flex-1">
                  Save Changes
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsEditing(false)} 
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4 space-y-2">
                <p className="text-lg"><span className="text-purple-400 font-semibold">Name:</span> {user.name}</p>
                <p className="text-lg"><span className="text-purple-400 font-semibold">Email:</span> {user.email}</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-3 text-purple-300">Preferences</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Notifications</span>
                    <button
                      onClick={() => dispatch(toggleNotifications())}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        preferences.notifications 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-gray-600 hover:bg-gray-700'
                      }`}
                    >
                      {preferences.notifications ? 'On' : 'Off'}
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>Currency</span>
                    <select
                      value={preferences.currency}
                      onChange={(e) => dispatch(updatePreferences({ currency: e.target.value }))}
                      className="input-field"
                      style={{ colorScheme: 'dark' }}
                    >
                      <option value="INR" className="bg-gray-800 text-white">INR (₹)</option>
                      <option value="EUR" className="bg-gray-800 text-white">EUR (€)</option>
                      <option value="GBP" className="bg-gray-800 text-white">GBP (£)</option>
                      <option value="JPY" className="bg-gray-800 text-white">JPY (¥)</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button onClick={handleEdit} className="btn-primary flex-1">
                  Edit Profile
                </button>
                <button onClick={handleClearProfile} className="btn-danger flex-1">
                  Clear Profile
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
