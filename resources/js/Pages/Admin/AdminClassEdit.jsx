import React from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import EditClassForm from './Partials/EditClassForm';
import CreateStudentClassForm from './Partials/CreateStudentClassForm';
import { Head } from '@inertiajs/react';

const AdminClassEdit = ({ auth, kelas, teachers, students }) => {
  return (
    <AuthenticatedLayoutNew
      auth={auth}
      headerTitle={`Edit Data Kelas ${kelas.grade} ${kelas.name} (${kelas.student_entry_year})`}
    >
      <Head title="Tambah Data Kelas" />
      <div className="p-4 sm:p-8 bg-white shadow rounded-xl mx-4">
        <EditClassForm className="max-w-xl" kelas={kelas} teachers={teachers} />
      </div>
      <div className="p-4 sm:p-8 mt-4 bg-white shadow rounded-xl mx-4">
        <CreateStudentClassForm className="max-w-xl" kelas={kelas} students={students} />
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default AdminClassEdit;
