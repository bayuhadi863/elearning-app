import React from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import CreateSeasonForm from './Partials/CreateSeasonForm';
import { Head } from '@inertiajs/react';

const AdminSeasonCreate = ({ auth }) => {
  return (
    <AuthenticatedLayoutNew
      auth={auth}
      headerTitle={'Tambah Data Tahun Ajaran'}
    >
      <Head title="Tambah Data Tahun Ajaran" />
      <div className="p-4 sm:p-8 bg-white shadow rounded-xl mx-4">
        <CreateSeasonForm className="max-w-xl" />
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default AdminSeasonCreate;
