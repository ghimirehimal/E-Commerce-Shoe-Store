import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [adminToken, setAdminToken] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user and token from localStorage on mount
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    const storedAdmin = localStorage.getItem('admin');
    const storedAdminToken = localStorage.getItem('adminToken');
    const storedAllUsers = localStorage.getItem('allUsers');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    if (storedAdmin && storedAdminToken) {
      setAdmin(JSON.parse(storedAdmin));
      setAdminToken(storedAdminToken);
    }
    if (storedAllUsers) {
      setAllUsers(JSON.parse(storedAllUsers));
    } else {
      // Initialize with default users if none exist
      const defaultUsers = [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          role: "User",
          status: "Active",
          joinDate: "2023-01-15",
          lastLogin: "2024-01-10",
          ordersCount: 5,
          age: 19,
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          role: "User",
          status: "Active",
          joinDate: "2023-02-20",
          lastLogin: "2024-01-09",
          ordersCount: 3,
          age: 19,
        },
        {
          id: "mock-admin-001",
          name: "Himal Ghimire",
          email: "ghimirehimal72@gmail.com",
          role: "Admin",
          status: "Active",
          joinDate: "2022-12-01",
          lastLogin: new Date().toISOString().split('T')[0],
          ordersCount: 0,
          age: 19,
        },
        {
          id: 4,
          name: "Staff Member",
          email: "staff@example.com",
          role: "Staff",
          status: "Active",
          joinDate: "2023-03-10",
          lastLogin: "2024-01-08",
          ordersCount: 0,
          age: 19,
        },
      ];
      setAllUsers(defaultUsers);
      localStorage.setItem('allUsers', JSON.stringify(defaultUsers));
    }
    setLoading(false);
  }, []);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', authToken);
  };

  const signup = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', authToken);

    // Add new user to allUsers
    setAllUsers(prevUsers => {
      const newUser = {
        id: Date.now(),
        name: userData.name || userData.email.split('@')[0],
        email: userData.email,
        role: "User",
        status: "Active",
        joinDate: new Date().toISOString().split('T')[0],
        lastLogin: new Date().toISOString().split('T')[0],
        ordersCount: 0,
        age: 19,
        password: userData.password,
      };
      const updatedUsers = [...prevUsers, newUser];
      localStorage.setItem('allUsers', JSON.stringify(updatedUsers));
      return updatedUsers;
    });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const adminLogin = (adminData, authToken) => {
    setAdmin(adminData);
    setAdminToken(authToken);
    localStorage.setItem('admin', JSON.stringify(adminData));
    localStorage.setItem('adminToken', authToken);

    // Update or add admin to allUsers list
    setAllUsers(prevUsers => {
      const existingAdminIndex = prevUsers.findIndex(user => user.email === adminData.email);
      const updatedAdmin = {
        id: adminData.id,
        name: adminData.name,
        email: adminData.email,
        role: "Admin",
        status: "Active",
        joinDate: prevUsers.find(user => user.email === adminData.email)?.joinDate || new Date().toISOString().split('T')[0],
        lastLogin: new Date().toISOString().split('T')[0],
        ordersCount: 0,
        age: 19,
      };

      if (existingAdminIndex >= 0) {
        // Update existing admin
        const updatedUsers = [...prevUsers];
        updatedUsers[existingAdminIndex] = updatedAdmin;
        localStorage.setItem('allUsers', JSON.stringify(updatedUsers));
        return updatedUsers;
      } else {
        // Add new admin
        const updatedUsers = [...prevUsers, updatedAdmin];
        localStorage.setItem('allUsers', JSON.stringify(updatedUsers));
        return updatedUsers;
      }
    });
  };

  const adminLogout = () => {
    setAdmin(null);
    setAdminToken(null);
    localStorage.removeItem('admin');
    localStorage.removeItem('adminToken');
  };

  const isAuthenticated = () => {
    return !!token;
  };

  const isAdminAuthenticated = () => {
    return !!adminToken;
  };

  const value = {
    user,
    token,
    admin,
    adminToken,
    allUsers,
    setAllUsers,
    login,
    logout,
    signup,
    adminLogin,
    adminLogout,
    isAuthenticated,
    isAdminAuthenticated,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
