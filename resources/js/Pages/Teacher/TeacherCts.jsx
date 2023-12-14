import React, { useContext } from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import CtsCard from '@/Components/CtsCard';
import { DataContext } from '@/Contexts/DataContext';

const TeacherCts = ({ auth, kelas }) => {
  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Daftar Kelas Saya'}>
      <div className="px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kelas.length ? (
          kelas.map((item, index) => (
            <CtsCard
              key={item.id}
              ctsItem={item}
              index={index}
              user={auth.user}
            />
          ))
        ) : (
          <div className="px-1 text-grey-700 text-sm">Tidak ada kelas</div>
        )}
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default TeacherCts;
