import React, { useState, useContext } from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import { Head, Link, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import QuizCard from '@/Components/QuizCard';
import StudentNavigation from '@/Components/StudentNavigation';
import { BreadCrumb } from 'primereact/breadcrumb';
import { DataContext } from '@/Contexts/DataContext';
import { MdOutlineQuiz } from 'react-icons/md';

const StudentStq = ({ auth, ctsItem, ctsAll, thisCtsQuizzes }) => {
  const { url } = usePage();
  const { thisSeasonId } = useContext(DataContext);

  const items = [
    {
      label: (
        <p
          className={` ${
            url === `/student/quiz/subject/${ctsItem.id}` ? 'font-semibold' : ''
          }`}
        >
          Kuis {ctsItem.subject.name}
        </p>
      ),
      url: `/student/quiz/subject/${ctsItem.id}`
    }
  ];
  const home = {
    label: <MdOutlineQuiz />,
    url: `/student/${thisSeasonId}/quiz`
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
          Daftar Tugas {ctsItem.subject.name}
        </p>
        <div>
          <StudentNavigation ctsAll={ctsAll} page={'quiz'} />
        </div>
      </div>

      <div className="mx-4 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {thisCtsQuizzes.length > 0 ? (
            thisCtsQuizzes.map((item) => (
              <QuizCard
                key={item.id}
                item={item}
                kelas={ctsItem}
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

export default StudentStq;
