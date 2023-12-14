import React from 'react';
import Sidebar from '@/Components/Sidebar';
import DashboardHeader from '@/Components/DashboardHeader';
import { useState } from 'react';

const AuthenticatedLayoutNew = ({
  children,
  auth,
  headerTitle,
  userCtsAll
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} auth={auth} userCtsAll={userCtsAll} />
      <DashboardHeader
        auth={auth}
        setSidebarOpen={setSidebarOpen}
        headerTitle={headerTitle}
      />

      <div
        className={`bg-black opacity-50 fixed lg:hidden top-0 left-0 bottom-0 right-0 z-15 ${
          sidebarOpen === false ? 'hidden' : ''
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <main
        className={`min-h-screen pb-3 w-full lg:w-5/6 ml-auto transition-all duration-200`}
      >
        {children}
      </main>
    </div>
  );
};

export default AuthenticatedLayoutNew;
