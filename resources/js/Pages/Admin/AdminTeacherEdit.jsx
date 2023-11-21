import React from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import EditTeacherForm from './Partials/EditTeacherForm';
import { Head } from '@inertiajs/react';

const AdminTeacherEdit = ({ auth, user, nip }) => {
  return (
    <AuthenticatedLayoutNew
      auth={auth}
      headerTitle={`Edit Data Guru ${user.name}`}
    >
      <Head title={`Edit Data Guru`} />
      <div className="p-4 sm:p-8 bg-white shadow rounded-xl mx-4">
        <EditTeacherForm className="max-w-xl" user={user} nip={nip} />
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default AdminTeacherEdit;
