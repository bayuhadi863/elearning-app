import React from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import CreateClassForm from './Partials/CreateClassForm';
import { Head } from '@inertiajs/react';

const AdminClassCreate = ({ auth, teachers, students }) => {
  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Tambah Data Kelas'}>
      <Head title="Tambah Data Kelas" />
      <div className="p-4 sm:p-8 bg-white shadow rounded-xl mx-4">
        <CreateClassForm className="max-w-xl" teachers={teachers} />
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default AdminClassCreate;
