import React from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import ClassDataTable from './Partials/ClassDataTable';
import { Head } from '@inertiajs/react';

const AdminClass = ({ kelas, auth }) => {
  const datas = kelas.map((item) => ({
    id: item.id,
    name: item.name,
    grade: item.grade,
    season: `${item.season.start_year}/${item.season.end_year}`,
    semester: item.season.semester,
    class_teacher: item.teacher.user.name
  }));
  console.log();
  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Data Kelas'}>
      <Head title="Data Kelas" />
      <div className="px-4">
        <ClassDataTable data={datas} />
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default AdminClass;
