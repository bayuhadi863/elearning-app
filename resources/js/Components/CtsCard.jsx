import React from 'react';
import { Link } from '@inertiajs/react';

const CtsCard = ({ index, user, ctsItem }) => {
  const kelas = ctsItem.class;
  const subject = ctsItem.subject;
  const teacher = ctsItem.teacher;
  const studentCount = ctsItem.class.student_class.length;
  const borderColor =
    index === 0
      ? 'border-blue-500'
      : index === 1
      ? 'border-green-500'
      : index === 2
      ? 'border-red-500'
      : index === 3
      ? 'border-amber-500'
      : index === 4
      ? 'border-orange-500'
      : index === 5
      ? 'border-purple-500'
      : index === 6
      ? 'border-teal-500'
      : index === 7
      ? 'border-indigo-500'
      : index === 8
      ? 'border-yellow-500'
      : index === 9
      ? 'border-emerald-500'
      : index === 10
      ? 'border-cyan-500'
      : index === 11
      ? 'border-violet-500'
      : index === 12
      ? 'border-fuchsia-500'
      : index > 12 && index % 2 === 0
      ? 'border-blue-500'
      : index > 12 && index % 2 !== 0
      ? 'border-green-500'
      : '';
  return (
    <>
      {user.role === 'teacher' ? (
        <Link href={`/teacher/class/${ctsItem.id}`}>
          <div
            className={`bg-white shadow-md rounded-xl p-4 hover:scale-105 transition-all duration-200 border-t-4 ${borderColor}`}
          >
            <div className="text-gray-700">
              <p className="font-bold text-xl">
                {kelas.grade} {kelas.name}
              </p>
            </div>
            <div className="text-gray-700">{subject.name}</div>
            <div className="text-xs mt-4 text-gray-500">
              Jumlah Siswa = {studentCount}
            </div>
          </div>
        </Link>
      ) : (
        <Link href={`/student/subject/${ctsItem.id}`}>
          <div
            className={`bg-white shadow-md rounded-xl p-4 hover:scale-105 transition-all duration-200 border-t-4 ${borderColor}`}
          >
            <div className="text-gray-700 mb-1">
              <p className="font-bold text-xl">{subject.name}</p>
            </div>
            <div className="text-gray-700 text-sm">{teacher.user.name}</div>
            <div className="text-xs mt-4 text-gray-500">
              Jumlah Siswa = {studentCount}
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default CtsCard;
