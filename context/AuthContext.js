import React, { createContext, useContext, useState } from 'react';

// Tạo context cho Authentication
const AuthContext = createContext();

// Provider cho AuthContext
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Hàm đăng nhập
  const login = (userData) => {
    setUser(userData); // Lưu thông tin người dùng vào state
  };

  // Hàm đăng xuất (nếu cần)
  const logout = () => {
    setUser(null); // Đặt user về null để đăng xuất
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook để sử dụng AuthContext
export const useAuth = () => useContext(AuthContext);