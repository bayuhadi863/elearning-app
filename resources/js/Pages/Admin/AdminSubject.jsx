import React from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import SubjectDataTable from './Partials/SubjectDataTable';
import { Head } from '@inertiajs/react';

const AdminSubject = ({ subjects, auth }) => {
  const datas = subjects.map((item) => ({
    id: item.id,
    name: item.name
  }));
  console.log();
  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Data Mata Pelajaran'}>
      <Head title="Data Mata Pelajaran" />
      <div className="px-4">
        <SubjectDataTable data={datas} />
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default AdminSubject;
