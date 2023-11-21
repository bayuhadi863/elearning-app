import React from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';

const AdminProfileEdit = ({ auth }) => {
  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Edit Profil'}>
      <Head title="Edit Profil Admin" />

      <div className="max-w-7xl px-4 space-y-6">
        <div className="p-4 sm:p-8 bg-white shadow rounded-xl">
          <UpdateProfileInformationForm className="max-w-xl" user={auth.user} />
        </div>

        <div className="p-4 sm:p-8 bg-white shadow rounded-xl">
          <UpdatePasswordForm className="max-w-xl" />
        </div>
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default AdminProfileEdit;
