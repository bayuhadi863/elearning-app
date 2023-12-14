import React, { useContext } from 'react';
import SidebarLink from './SidebarLink';
import { Link } from '@inertiajs/react';
import logoLandscape from '/public/assets/website-logo-landscape.png';
import { DataContext } from '@/Contexts/DataContext';

const Sidebar = ({ sidebarOpen, auth }) => {
  const role = auth.user.role;

  const { thisSeasonId } = useContext(DataContext);

  return (
    <aside
      className={`fixed w-1/2 sm:w-1/3 lg:w-1/6 bg-white h-screen z-20 lg:transform-none shadow-md pt-5 ease-in-out duration-200 ${
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
          user={auth.user}
          name={'Beranda'}
          page={'dashboard'}
          routeName={
            role === 'admin'
              ? '/admin/dashboard'
              : role === 'teacher'
              ? `/teacher/dashboard/${thisSeasonId}`
              : `/student/dashboard/${thisSeasonId}`
          }
        />
        {role === 'admin' && (
          <SidebarLink
            user={auth.user}
            name={'Guru'}
            page={'teacher'}
            routeName={'/admin/teacher'}
          />
        )}
        {role === 'admin' && (
          <SidebarLink
            user={auth.user}
            page={'student'}
            name={'Siswa'}
            routeName={'/admin/student'}
          />
        )}
        {role === 'admin' && (
          <SidebarLink
            user={auth.user}
            page={'season'}
            name={'Tahun Ajaran'}
            routeName={'/admin/season'}
          />
        )}
        {role === 'admin' ? (
          <SidebarLink
            user={auth.user}
            page={'class'}
            name={'Kelas'}
            routeName={'/admin/class'}
          />
        ) : role === 'teacher' ? (
          <SidebarLink
            user={auth.user}
            page={'class'}
            name={'Kelas'}
            routeName={`/teacher/${thisSeasonId}/class`}
          />
        ) : (
          ''
        )}
        {role === 'admin' ? (
          <SidebarLink
            user={auth.user}
            page={'subject'}
            name={'Mata Pelajaran'}
            routeName={'/admin/subject'}
          />
        ) : role === 'teacher' ? (
          ''
        ) : (
          <SidebarLink
            user={auth.user}
            page={'subject'}
            name={'Mata Pelajaran'}
            routeName={`/student/${thisSeasonId}/subject`}
          />
        )}
        {role === 'admin' ? (
          ''
        ) : role === 'teacher' ? (
          <SidebarLink
            user={auth.user}
            page={'materi'}
            name={'Materi'}
            routeName={`/teacher/${thisSeasonId}/materi`}
          />
        ) : (
          <SidebarLink
            user={auth.user}
            page={'materi'}
            name={'Materi'}
            routeName={`/student/${thisSeasonId}/materi`}
          />
        )}

        {role === 'admin' ? (
          ''
        ) : role === 'teacher' ? (
          <SidebarLink
            user={auth.user}
            page={'assignment'}
            name={'Tugas'}
            routeName={`/teacher/${thisSeasonId}/assignment`}
          />
        ) : (
          <SidebarLink
            user={auth.user}
            page={'assignment'}
            name={'Tugas'}
            routeName={`/student/${thisSeasonId}/assignment`}
          />
        )}

        {role === 'admin' ? (
          ''
        ) : role === 'teacher' ? (
          <SidebarLink
            user={auth.user}
            page={'quiz'}
            name={'Kuis'}
            routeName={`/teacher/${thisSeasonId}/quiz`}
          />
        ) : (
          <SidebarLink
            user={auth.user}
            page={'quiz'}
            name={'Kuis'}
            routeName={`/student/${thisSeasonId}/quiz`}
          />
        )}

        {role === 'student' ? (
          <SidebarLink
            user={auth.user}
            page={'report'}
            name={'Nilai'}
            routeName={`/student/${thisSeasonId}/report`}
          />
        ) : (
          ''
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
