import React, { useState } from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import { Head, Link, usePage } from '@inertiajs/react';
import QuizCard from '@/Components/QuizCard';
import TeacherNavigation from '@/Components/TeacherNavigation';

const TeacherQuiz = ({ auth, ctsAll, thisSeasonQuizzes }) => {
  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Tugas'}>
      <Head title="Tugas" />

      <div className="px-5 mb-4 mt-3 flex items-center justify-between gap-2 flex-wrap">
        <p className="text-gray-700 text-xl font-semibold">Daftar Kuis Anda</p>
        <p className="text-xs text-blue-700">
          * Pilih kelas untuk membuat kuis.
        </p>
      </div>
      <div className="flex justify-end px-5">
        <TeacherNavigation ctsAll={ctsAll} page={'quiz'} />
      </div>

      <div className="mx-4 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {thisSeasonQuizzes.length > 0 ? (
            thisSeasonQuizzes.map((item) => (
              <QuizCard
                key={item.id}
                item={item}
                user={auth.user}
                kelas={item.cts}
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

export default TeacherQuiz;
