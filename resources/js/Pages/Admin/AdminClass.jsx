import React from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import ClassDataTable from './Partials/ClassDataTable';
import { Head } from '@inertiajs/react';

const AdminClass = ({ kelas, auth, students }) => {
  const datas = kelas.map((item) => ({
    id: item.id,
    name: item.name,
    grade: item.grade,
    student_entry_year: item.student_entry_year,
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
