import React from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import CreateStudentForm from './Partials/CreateStudentForm';
import { Head } from '@inertiajs/react';

const AdminStudentCreate = ({ auth }) => {
  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Tambah Data Siswa'}>
      <Head title="Tambah Data Siswa" />
      <div className="p-4 sm:p-8 bg-white shadow rounded-xl mx-4">
        <CreateStudentForm className="max-w-xl" />
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default AdminStudentCreate;
