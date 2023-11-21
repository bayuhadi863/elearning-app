import React from 'react';
import CreateTeachingMaterialForm from './Partials/CreateTeachingMaterialForm';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import { Head } from '@inertiajs/react';

const TeacherTeachingMaterialCreate = ({ auth, kelas }) => {
  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Upload Materi'}>
      <Head title="Tambah Materi Pembelajaran" />
      <div className="p-4 sm:p-8 bg-white shadow rounded-xl mx-4">
        <CreateTeachingMaterialForm className="max-w-xl" kelas={kelas} />
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default TeacherTeachingMaterialCreate;
