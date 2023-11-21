import React from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import EditStudentForm from './Partials/EditStudentForm';
import { Head } from '@inertiajs/react';

const AdminStudentEdit = ({ auth, user, student }) => {
  return (
    <AuthenticatedLayoutNew
      auth={auth}
      headerTitle={`Edit Data Siswa ${user.name}`}
    >
      <Head title={`Edit Data Siswa`} />
      <div className="p-4 sm:p-8 bg-white shadow rounded-xl mx-4">
        <EditStudentForm className="max-w-xl" user={user} student={student} />
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default AdminStudentEdit;
