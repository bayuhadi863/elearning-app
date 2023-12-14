import React from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import EditClassForm from './Partials/EditClassForm';
import CreateStudentClassForm from './Partials/CreateStudentClassForm';
import CreateCtsForm from './Partials/CreateCtsForm';
import { Head } from '@inertiajs/react';

const AdminClassEdit = ({
  auth,
  kelas,
  teachers,
  students,
  seasons,
  allTeachers,
  allSubjects
}) => {
  return (
    <AuthenticatedLayoutNew
      auth={auth}
      headerTitle={`Edit Data Kelas ${kelas.grade} ${kelas.name}`}
    >
      <Head title="Tambah Data Kelas" />
      <div className="p-4 sm:p-8 bg-white shadow rounded-xl mx-4">
        <EditClassForm
          className="max-w-xl"
          seasons={seasons}
          kelas={kelas}
          teachers={teachers}
        />
      </div>
      <div className="p-4 sm:p-8 mt-4 bg-white shadow rounded-xl mx-4">
        <CreateStudentClassForm
          className="max-w-xl"
          kelas={kelas}
          students={students}
        />
      </div>
      <div className="p-4 sm:p-8 mt-4 bg-white shadow rounded-xl mx-4">
        <CreateCtsForm
          className="max-w-xl"
          kelas={kelas}
          allSubjects={allSubjects}
          allTeachers={allTeachers}
        />
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default AdminClassEdit;
