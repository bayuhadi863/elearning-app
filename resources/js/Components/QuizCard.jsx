import React from 'react';
import moment from 'moment';
import { Link, router } from '@inertiajs/react';
import Swal from 'sweetalert2';

const QuizCard = ({ item, kelas, user }) => {
  const role = user.role;
  const thisDate = new Date();
  const deadlineDate = new Date(item.deadline);

  console.log(item);

  const handleDeleteClick = () => {
    Swal.fire({
      title: 'Apa Anda yakin?',
      text: 'Anda tidak bisa mengembalikannya!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        router.visit(`/teacher/quiz/${item.id}`, {
          method: 'delete',
          onSuccess: () => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Kuis berhasil dihapus.',
              icon: 'success'
            });
          }
        });
      }
    });
  };

  return (
    <div className="bg-white p-4 pb-5 flex flex-col justify-between rounded-lg shadow-md">
      <div>
        <div className="flex justify-between">
          <p className="text-gray-700 text-md mb-2 font-bold">{item.title}</p>
          <div>
            {item.is_started && thisDate <= deadlineDate ? (
              <span className="bg-green-100 text-green-800 text-xs font-medium me-1 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                Started
              </span>
            ) : item.is_started && thisDate > deadlineDate ? (
              <span className="bg-red-100 text-red-800 text-xs font-medium me-1 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                Ended
              </span>
            ) : (
              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-1 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                Unstarted
              </span>
            )}

            {role === 'student' ? (
              item.student_answer.length > 0 ? (
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                  Submitted
                </span>
              ) : (
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                  Unsubmitted
                </span>
              )
            ) : (
              ''
            )}
          </div>
        </div>
        {role === 'teacher' ? (
          <p className="text-gray-700 text-sm">
            <span className="">Kelas:</span> {item.cts.class.grade}{' '}
            {item.cts.class.name}
          </p>
        ) : (
          <p className="text-gray-700 text-sm">
            <span className="">Mapel:</span> {item.cts.subject.name}
          </p>
        )}

        <p className="text-gray-700 text-sm">
          <span className="">Jumlah Soal:</span>{' '}
          {item.is_started ? item.question.length : '-'}
        </p>

        {item.deadline && (
          <p className="text-gray-700 mt-1 text-sm font-semibold">
            <span className="font-semibold">Deadline:</span>{' '}
            {moment(item.deadline).format('DD-MM-YYYY HH:mm [WIB]')}
          </p>
        )}
      </div>

      {role === 'teacher' ? (
        <div className="mt-3">
          {item.is_started === 0 && (
            <>
              <Link
                href={`/teacher/quiz/${item.id}/question/create`}
                className="text-xs mr-1 text-white py-2 px-3 rounded-md bg-blue-600 hover:bg-blue-700 transition-all"
              >
                Buat Pertanyaan
              </Link>
            </>
          )}
          {item.is_started ? (
            thisDate > deadlineDate ? (
              <button
                disabled
                className="mr-1 text-xs text-white py-2 px-3 rounded-md bg-red-400 opacity-50 cursor-not-allowed"
              >
                Hapus
              </button>
            ) : (
              <button
                disabled
                className="mr-1 text-xs text-white py-2 px-3 rounded-md bg-red-400 opacity-50 cursor-not-allowed"
              >
                Hapus
              </button>
            )
          ) : (
            <>
              <button
                onClick={handleDeleteClick}
                className="mr-1 text-xs text-white py-2 px-3 rounded-md bg-red-500 hover:bg-red-600 transition-all"
              >
                Hapus
              </button>
            </>
          )}
        </div>
      ) : role === 'student' ? (
        <div className="mt-3">
          {item.is_started ? (
            thisDate <= deadlineDate ? (
              item.student_answer.length > 0 ? (
                <button
                  disabled
                  className="text-xs mr-1 text-white py-2 px-3 rounded-md bg-blue-500 opacity-50 cursor-not-allowed"
                >
                  Kerjakan Kuis
                </button>
              ) : (
                <Link
                  href={`/student/quiz/${item.id}/answer/create`}
                  className="text-xs mr-1 text-white py-2 px-3 rounded-md bg-blue-600 hover:bg-blue-700 transition-all"
                >
                  Kerjakan Kuis
                </Link>
              )
            ) : (
              <button
                disabled
                className="text-xs mr-1 text-white py-2 px-3 rounded-md bg-blue-500 opacity-50 cursor-not-allowed"
              >
                Kerjakan Kuis
              </button>
            )
          ) : (
            <button
              disabled
              className="text-xs mr-1 text-white py-2 px-3 rounded-md bg-blue-500 opacity-50 cursor-not-allowed"
            >
              Kerjakan Kuis
            </button>
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default QuizCard;
