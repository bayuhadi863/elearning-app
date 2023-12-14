import React from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import StudentDataTable from './Partials/StudentDataTable';
import { Head } from '@inertiajs/react';

const AdminStudent = ({ students, auth }) => {
  const datas = students.map((student) => ({
    id: student.id,
    name: student.name,
    email: student.email,
    nisn: student.student.nisn,
    nis: student.student.nis,
    phone: student.phone,
    profile_picture: student.profile_picture
  }));
  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Data Siswa'}>
      <Head title="Data Siswa" />
      <div className="px-4">
        <StudentDataTable data={datas} />
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default AdminStudent;
