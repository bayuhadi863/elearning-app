import React from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import CreateTeacherForm from './Partials/CreateTeacherForm';
import { Head } from '@inertiajs/react';

const AdminTeacherCreate = ({ auth }) => {
  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Tambah Data Guru'}>
      <Head title="Tambah Data Guru" />
      <div className="p-4 sm:p-8 bg-white shadow rounded-xl mx-4">
        <CreateTeacherForm className="max-w-xl" />
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default AdminTeacherCreate;
