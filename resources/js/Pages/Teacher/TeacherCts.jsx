import React from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import CtsCard from '@/Components/CtsCard';

const TeacherCts = ({ auth, kelas }) => {
  console.log(kelas);
  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Daftar Kelas Saya'}>
      <div className="px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kelas.length ? (
          kelas.map((item, index) => (
            <CtsCard
              key={item.id}
              kelasItem={item.class}
              subject={item.subject}
              studentCount={item.class.student_class.length}
              index={index}
            />
          ))
        ) : (
          <div className="text-grey-700 text-sm">Tidak ada kelas</div>
        )}
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default TeacherCts;
