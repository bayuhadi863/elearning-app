import React, { useContext } from 'react';
import CreateQuizForm from './Partials/CreateQuizForm';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import { Head, usePage } from '@inertiajs/react';
import { BreadCrumb } from 'primereact/breadcrumb';
import { DataContext } from '@/Contexts/DataContext';
import { MdOutlineQuiz } from 'react-icons/md';

const TeacherQuizCreate = ({ auth, kelas }) => {
  const { url } = usePage();
  const { thisSeasonId } = useContext(DataContext);

  const items = [
    {
      label: (
        <p
          className={` ${
            url === `/teacher/quiz/class/${kelas.id}` ? 'font-semibold' : ''
          }`}
        >
          Kuis {kelas.class.grade} {kelas.class.name}
        </p>
      ),
      url: `/teacher/quiz/class/${kelas.id}`
    },
    {
      label: (
        <p
          className={` ${
            url === `/teacher/quiz/class/${kelas.id}/create`
              ? 'font-semibold'
              : ''
          }`}
        >
          Buat Kuis {kelas.class.grade} {kelas.class.name}
        </p>
      ),
      url: `/teacher/quiz/class/${kelas.id}/create`
    }
  ];
  const home = {
    label: <MdOutlineQuiz />,
    url: `/teacher/${thisSeasonId}/quiz`
  };

  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Upload Materi'}>
      <Head title="Buat Kuis Baru" />

      <div className="px-4 mb-4">
        <BreadCrumb
          model={items}
          home={home}
          className="mb-4 px-2 bg-transparent text-sm"
        />
      </div>

      <div className="p-4 sm:p-8 bg-white shadow rounded-xl mx-4">
        <CreateQuizForm className="max-w-xl" kelas={kelas} />
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default TeacherQuizCreate;
