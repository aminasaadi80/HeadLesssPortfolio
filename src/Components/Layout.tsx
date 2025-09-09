import React from 'react';
import { useRTL } from '../hooks/useRTL';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useRTL(); // This hook will manage RTL/LTR classes
  
  return <>{children}</>;
};

export default Layout;