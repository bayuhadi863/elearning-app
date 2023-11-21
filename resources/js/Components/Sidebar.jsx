import React from 'react';
import SidebarLink from './SidebarLink';
import { Link } from '@inertiajs/react';
import logoLandscape from '/public/assets/website-logo-landscape.png';

const Sidebar = ({ sidebarOpen, auth }) => {
  const role = auth.user.role;
  return (
    <aside
      className={`fixed w-1/6 min-w-max  bg-white h-screen z-20 lg:transform-none shadow-md pt-5 ease-in-out duration-200 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="w-full">
        <div className="ml-6 mb-8">
          <Link href="/" className="">
            <img src={logoLandscape} alt="logo" className="h-12" />
          </Link>
        </div>
        <SidebarLink
          name={'Beranda'}
          routeName={
            role === 'admin'
              ? 'admin.dashboard'
              : role === 'teacher'
              ? 'teacher.dashboard'
              : 'student.dashboard'
          }
        />
        <SidebarLink name={'Guru'} routeName={'adminTeacher.index'} />
        <SidebarLink name={'Siswa'} routeName={'adminStudent.index'} />
        <SidebarLink
          name={'Kelas'}
          routeName={
            role === 'admin'
              ? 'adminClass.index'
              : role === 'teacher'
              ? 'teacherCts.index'
              : '/'
          }
        />
        <SidebarLink name={'Mata Pelajaran'} routeName={'subject.index'} />
        <SidebarLink name={'Materi'} routeName={'teacher.dashboard'} />
        <SidebarLink name={'Tugas'} routeName={'teacher.dashboard'} />
      </div>
    </aside>
  );
};

export default Sidebar;
