import React from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import CreateSubjectForm from './Partials/CreateSubjectForm';
import { Head } from '@inertiajs/react';

const AdminSubjectCreate = ({ auth }) => {
  return (
    <AuthenticatedLayoutNew
      auth={auth}
      headerTitle={'Tambah Data Mata Pelajaran'}
    >
      <Head title="Tambah Data Mata Pelajaran" />
      <div className="p-4 sm:p-8 bg-white shadow rounded-xl mx-4">
        <CreateSubjectForm className="max-w-xl" />
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default AdminSubjectCreate;
