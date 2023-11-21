import React from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import TeacherDataTable from './Partials/TeacherDataTable';
import { Head } from '@inertiajs/react';

const AdminTeacher = ({ teachers, auth }) => {
  const datas = teachers.map((teacher) => ({
    id: teacher.id,
    name: teacher.name,
    email: teacher.email,
    nip: teacher.teacher.nip,
    phone: teacher.phone,
    profile_picture: teacher.profile_picture
  }));
  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Data Guru'}>
      <Head title="Data Guru" />
      <div className='px-4'>
        <TeacherDataTable data={datas} />
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default AdminTeacher;
