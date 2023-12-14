import React, { useState } from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import { Head, Link, usePage } from '@inertiajs/react';
import AssignmentCard from '@/Components/AssignmentCard';
import StudentNavigation from '@/Components/StudentNavigation';

const StudentAssignment = ({ auth, thisSeasonAssignments, ctsAll }) => {
  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Tugas'}>
      <Head title="Tugas" />

      <div className="px-5 mb-4 mt-3 flex justify-between gap-2 flex-wrap">
        <p className="text-gray-700 text-xl font-semibold">
          Daftar Tugas Anda
        </p>
        <div>
          <StudentNavigation ctsAll={ctsAll} page={'assignment'} />
        </div>
      </div>

      <div className="mx-4 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {thisSeasonAssignments.length > 0 ? (
            thisSeasonAssignments.map((item) => (
              <AssignmentCard
                key={item.id}
                item={item}
                user={auth.user}
                kelas={item.cts}
              />
            ))
          ) : (
            <p className="px-1 text-sm text-gray-700">
              Belum ada tugas yang diupload!
            </p>
          )}
        </div>
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default StudentAssignment;
