import React, { useState, useContext } from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import { Head, Link, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import QuizCard from '@/Components/QuizCard';
import TeacherNavigation from '@/Components/TeacherNavigation';
import { BreadCrumb } from 'primereact/breadcrumb';
import { DataContext } from '@/Contexts/DataContext';
import { MdOutlineQuiz } from 'react-icons/md';

const TeacherCtq = ({ auth, kelas, ctsAll, quizzes }) => {
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
    }
  ];
  const home = {
    label: <MdOutlineQuiz />,
    url: `/teacher/${thisSeasonId}/quiz`
  };

  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Materi'}>
      <Head title="Tambah Materi Pembelajaran" />

      <div className="px-4 mb-4">
        <BreadCrumb
          model={items}
          home={home}
          className="mb-4 px-2 bg-transparent text-sm"
        />
      </div>

      <div className="px-5 mb-4 mt-3 flex justify-between gap-2 flex-wrap">
        <p className="text-gray-700 text-xl font-semibold">
          Daftar Kuis Kelas {kelas.class.grade} {kelas.class.name}
        </p>
        <div>
          <Link href={`/teacher/quiz/class/${kelas.id}/create`}>
            <PrimaryButton>Buat Kuis</PrimaryButton>
          </Link>
        </div>
      </div>
      <div className="flex justify-end mx-5">
        <TeacherNavigation ctsAll={ctsAll} page={'quiz'} />
      </div>
      <div className="mx-4 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quizzes.length > 0 ? (
            quizzes.map((item) => (
              <QuizCard
                key={item.id}
                item={item}
                kelas={kelas}
                user={auth.user}
              />
            ))
          ) : (
            <p className="px-1 text-sm text-gray-700">
              Belum ada kuis yang diupload!
            </p>
          )}
        </div>
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default TeacherCtq;
