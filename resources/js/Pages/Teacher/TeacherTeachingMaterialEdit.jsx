import React, { useContext } from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import { Head, usePage } from '@inertiajs/react';
import EditTeachingMaterialForm from './Partials/EditTeachingMaterialForm';
import { BreadCrumb } from 'primereact/breadcrumb';
import { DataContext } from '@/Contexts/DataContext';
import { BsBook } from 'react-icons/bs';

const TeacherTeachingMaterialEdit = ({ auth, materi, kelas }) => {
  const { url } = usePage();
  const { thisSeasonId } = useContext(DataContext);

  const items = [
    {
      label: (
        <p
          className={` ${
            url === `/teacher/materi/class/${kelas.id}` ? 'font-semibold' : ''
          }`}
        >
          Materi {kelas.class.grade} {kelas.class.name}
        </p>
      ),
      url: `/teacher/materi/class/${kelas.id}`
    },
    {
      label: (
        <p
          className={` ${
            url === `/teacher/materi/${materi.id}/edit` ? 'font-semibold' : ''
          }`}
        >
          Edit Materi
        </p>
      ),
      url: `/teacher/materi/${materi.id}/edit`
    }
  ];
  const home = {
    label: <BsBook />,
    url: `/teacher/${thisSeasonId}/materi`
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
        <EditTeachingMaterialForm
          className="max-w-xl"
          materi={materi}
          kelas={kelas}
        />
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default TeacherTeachingMaterialEdit;
