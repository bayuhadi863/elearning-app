import React, { useState } from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import { Head, Link, usePage } from '@inertiajs/react';
import StudentNavigation from '@/Components/StudentNavigation';

const StudentReport = ({
  auth,
  ctsAll,
  averageAssignmentScores,
  averageQuizScores,
  quizzesCount
}) => {
  const [category, setCategory] = useState('assignment');

  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Tugas'}>
      <Head title="Tugas" />

      <div className="px-5 mb-4 mt-3 flex justify-between gap-2 flex-wrap">
        <p className="text-gray-700 text-xl font-semibold">Nilai Anda</p>
        <div>
          <StudentNavigation ctsAll={ctsAll} page={'report'} />
        </div>
      </div>

      <div className="mx-4 mt-6">
        <nav className="flex gap-4 items-center mb-4">
          <button
            onClick={() => setCategory('assignment')}
            className={`${
              category === 'assignment'
                ? ' border-blue-600 text-blue-600'
                : 'text-gray-700 border-transparent'
            }  py-1 px-1 border-b font-medium transition-all`}
          >
            Tugas
          </button>
          <button
            onClick={() => setCategory('quiz')}
            className={`${
              category === 'quiz'
                ? ' border-blue-600 text-blue-600'
                : 'text-gray-700 border-transparent'
            }  py-1 px-1 border-b font-medium transition-all`}
          >
            Kuis
          </button>
        </nav>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {category === 'assignment' ? (
            averageAssignmentScores.length > 0 ? (
              averageAssignmentScores.map(
                (item) =>
                  item.average_score !== null && (
                    <div className="bg-white text-gray-700 rounded-lg py-5 px-6 shadow-md">
                      <div className="text-lg font-bold mb-2">
                        {item.subject_name}
                      </div>
                      <p>Rata-rata nilai:</p>
                      <div
                        className={`text-3xl mt-1 font-semibold ${
                          Math.round(item.average_score) < 75
                            ? 'text-red-600'
                            : 'text-green-600'
                        }`}
                      >
                        {Math.round(item.average_score)}
                      </div>
                    </div>
                  )
              )
            ) : (
              <p className="px-1 text-sm text-gray-700">Belum ada nilai!</p>
            )
          ) : averageQuizScores.length > 0 ? (
            averageQuizScores.map(
              (item) =>
                item.average_score !== null && (
                  <div className="bg-white text-gray-700 rounded-lg py-5 px-6 shadow-md">
                    <div className="text-lg font-bold mb-2">
                      {item.subject_name}
                    </div>
                    <p>Rata-rata nilai:</p>
                    <div
                      className={`text-3xl mt-1 font-semibold ${
                        Math.round(item.total_score / quizzesCount) < 75
                          ? 'text-red-600'
                          : 'text-green-600'
                      }`}
                    >
                      {Math.round(item.total_score / quizzesCount)}
                    </div>
                  </div>
                )
            )
          ) : (
            <p className="px-1 text-sm text-gray-700">Belum ada nilai!</p>
          )}
        </div>
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default StudentReport;
