import React, { useState } from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import CtsCard from '@/Components/CtsCard';
import { Head } from '@inertiajs/react';
import StudentNavigation from '@/Components/StudentNavigation';

const StudentCts = ({ auth, cts }) => {
  console.log(cts);

  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Mata Pelajaran'}>
      <Head title="Mata Pelajaran" />

      <div className="px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cts.length > 0 ? (
          cts.map((item, index) => (
            <CtsCard
              key={item.id}
              ctsItem={item}
              index={index}
              user={auth.user}
            />
          ))
        ) : (
          <p className="text-grey-700 text-sm">Tidak ada mata pelajaran</p>
        )}
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default StudentCts;
