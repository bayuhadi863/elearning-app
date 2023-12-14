import React, { useContext } from 'react';
import CreateAssignmentForm from './Partials/CreateAssignmentForm';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import { Head, usePage } from '@inertiajs/react';
import { BreadCrumb } from 'primereact/breadcrumb';
import { DataContext } from '@/Contexts/DataContext';
import { MdOutlineAssignmentTurnedIn } from 'react-icons/md';

const TeacherAssignmentCreate = ({ auth, kelas }) => {
  const { url } = usePage();
  const { thisSeasonId } = useContext(DataContext);

  const items = [
    {
      label: (
        <p
          className={` ${
            url === `/teacher/assignment/class/${kelas.id}`
              ? 'font-semibold'
              : ''
          }`}
        >
          Tugas {kelas.class.grade} {kelas.class.name}
        </p>
      ),
      url: `/teacher/assignment/class/${kelas.id}`
    },
    {
      label: (
        <p
          className={` ${
            url === `/teacher/assignment/class/${kelas.id}/create`
              ? 'font-semibold'
              : ''
          }`}
        >
          Upload Tugas
        </p>
      ),
      url: `/teacher/assignment/class/${kelas.id}/create`
    }
  ];
  const home = {
    label: <MdOutlineAssignmentTurnedIn />,
    url: `/teacher/${thisSeasonId}/assignment`
  };

  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Upload Materi'}>
      <Head title="Tambah Materi Pembelajaran" />

      <div className="px-4 mb-4">
        <BreadCrumb
          model={items}
          home={home}
          className="mb-4 px-2 bg-transparent text-sm"
        />
      </div>

      <div className="p-4 sm:p-8 bg-white shadow rounded-xl mx-4">
        <CreateAssignmentForm className="max-w-xl" kelas={kelas} />
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default TeacherAssignmentCreate;
