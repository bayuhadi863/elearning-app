import React from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import { Head, Link } from '@inertiajs/react';
import CtsStudentDataTable from './Partials/CtsStudentDataTable';

const TeacherCtsShow = ({ kelas, teacherClass, auth }) => {
  console.log(kelas);
  console.log(teacherClass);
  const students = kelas.class.student_class;

  const datas = students.map((student, index) => ({
    no: index + 1,
    nis: student.student.nis,
    name: student.student.user.name,
    profile_picture: student.student.user.profile_picture
  }));
  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Detail Kelas'}>
      <Head title="Detail Kelas" />

      <div className="px-4 grid md:grid-cols-2 grid-cols-1 gap-4">
        <div className="">
          <div className="py-4 px-6 rounded-lg shadow-md bg-white">
            <div className="mb-2">
              <p className="text-2xl font-extrabold text-gray-700">
                Kelas {kelas.class.grade} {kelas.class.name}
              </p>
            </div>
            <table>
              <tr className="py-4">
                <td className="py-2 text-sm text-gray-700 font-semibold">
                  Mata Pelajaran
                </td>
                <td className="py-2 text-sm text-gray-700">
                  : {kelas.subject.name}
                </td>
              </tr>
              <tr className="py-4">
                <td className="py-2 text-sm text-gray-700 font-semibold">
                  Wali Kelas
                </td>
                <td className="py-2 text-sm text-gray-700">
                  : {teacherClass.teacher.user.name}
                </td>
              </tr>
              <tr>
                <td className="py-2 text-sm text-gray-700 font-semibold">
                  Jumlah Siswa
                </td>
                <td className="py-2 text-sm text-gray-700">
                  : {kelas.class.student_class.length}
                </td>
              </tr>
            </table>
          </div>
          <div className="mt-4">
            <div className="flex justify-between px-1 items-center">
              <p className="text-lg font-semibold text-gray-700">Materi</p>
              <Link
                href={`/teacher/class/${kelas.id}/materi`}
                className="text-sm text-blue-500 hover:text-blue-600 transition-all"
              >
                {`View more >`}
              </Link>
            </div>
          </div>
        </div>
        <div className="">
          <CtsStudentDataTable data={datas} />
        </div>
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default TeacherCtsShow;
