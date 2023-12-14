import React, { useContext } from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import { Head, Link } from '@inertiajs/react';
import CtsStudentDataTable from '../Teacher/Partials/CtsStudentDataTable';
import MateriDocument from '@/Components/MateriDocument';
import MateriVideo from '@/Components/MateriVideo';
import AssignmentCard from '@/Components/AssignmentCard';

const StudentCtsShow = ({
  cts,
  auth,
  materi,
  assignments,
  unSubmittedAssignments
}) => {
  const studentClass = cts.class.student_class;

  const datas = studentClass.map((item, index) => ({
    no: index + 1,
    nis: item.student.nis,
    name: item.student.user.name,
    profile_picture: item.student.user.profile_picture
  }));
  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Detail Mapel'}>
      <Head title="Detail Mapel" />

      <div className="px-4 grid md:grid-cols-2 grid-cols-1 gap-4">
        <div className="">
          <div className="py-4 px-6 rounded-lg shadow-md bg-white">
            <div className="mb-2">
              <p className="text-2xl font-extrabold text-gray-700">
                {cts.subject.name}
              </p>
            </div>
            <table>
              <tr className="py-4">
                <td className="py-2 text-sm text-gray-700 font-semibold">
                  Guru
                </td>
                <td className="py-2 text-sm text-gray-700">
                  : {cts.teacher.user.name}
                </td>
              </tr>
              <tr className="py-4">
                <td className="py-2 text-sm text-gray-700 font-semibold">
                  Jumlah Materi
                </td>
                <td className="py-2 text-sm text-gray-700">
                  : {cts.teaching_material.length}
                </td>
              </tr>
              <tr>
                <td className="py-2 text-sm text-gray-700 font-semibold">
                  Jumlah Tugas
                </td>
                <td className="py-2 text-sm text-gray-700">
                  : {cts.assignment.length} ({unSubmittedAssignments.length}{' '}
                  belum dikerjakan)
                </td>
              </tr>
            </table>
          </div>
          <div className="mt-4">
            <div className="flex justify-between px-1 items-center">
              <p className="text-lg font-semibold text-gray-700">
                Materi Terbaru
              </p>
              <Link
                href={`/student/materi/subject/${cts.id}`}
                className="text-sm text-blue-500 hover:text-blue-600 transition-all"
              >
                {`View more >`}
              </Link>
            </div>
            <div className="flex flex-col gap-4 mt-2">
              {materi.length > 0 ? (
                materi.map((item) =>
                  item.type === 'document' ? (
                    <MateriDocument
                      key={item.id}
                      item={item}
                      kelas={cts}
                      user={auth.user}
                    />
                  ) : (
                    <MateriVideo
                      key={item.id}
                      item={item}
                      kelas={cts}
                      user={auth.user}
                    />
                  )
                )
              ) : (
                <p className="px-1 text-sm text-gray-700">
                  Belum ada materi yang diupload!
                </p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between px-1 items-center">
              <p className="text-lg font-semibold text-gray-700">
                Tugas Terbaru
              </p>
              <Link
                href={`/student/assignment/subject/${cts.id}`}
                className="text-sm text-blue-500 hover:text-blue-600 transition-all"
              >
                {`View more >`}
              </Link>
            </div>
            <div className="flex flex-col gap-4 mt-2">
              {assignments.length > 0 ? (
                assignments.map((item) => (
                  <AssignmentCard
                    key={item.id}
                    item={item}
                    kelas={cts}
                    user={auth.user}
                  />
                ))
              ) : (
                <p className="px-1 text-sm text-gray-700">
                  Belum ada tugas yang diupload!
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="">
          <CtsStudentDataTable data={datas} user={auth.user} />
        </div>
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default StudentCtsShow;
