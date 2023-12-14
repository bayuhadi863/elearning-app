import React, { useContext } from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import { Head, Link, usePage } from '@inertiajs/react';
import CtsStudentDataTable from './Partials/CtsStudentDataTable';
import MateriDocument from '@/Components/MateriDocument';
import MateriVideo from '@/Components/MateriVideo';
import AssignmentCard from '@/Components/AssignmentCard';
import { BreadCrumb } from 'primereact/breadcrumb';
import { DataContext } from '@/Contexts/DataContext';
import { SiGoogleclassroom } from 'react-icons/si';

const TeacherCtsShow = ({ kelas, teacherClass, auth, materi, assignments }) => {
  const studentClass = kelas.class.student_class;
  const { thisSeasonId } = useContext(DataContext);
  const { url } = usePage();

  const datas = studentClass.map((item, index) => ({
    no: index + 1,
    nis: item.student.nis,
    name: item.student.user.name,
    profile_picture: item.student.user.profile_picture
  }));

  const items = [
    {
      label: (
        <p
          className={` ${
            url === `/teacher/class/${kelas.id}` ? 'font-semibold' : ''
          }`}
        >
          Detail Kelas {kelas.class.grade} {kelas.class.name}
        </p>
      ),
      url: `/teacher/class/${kelas.id}`
    }
  ];
  const home = {
    label: <SiGoogleclassroom />,
    url: `/teacher/${thisSeasonId}/class`
  };

  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Detail Kelas'}>
      <Head title="Detail Kelas" />
      <div className="px-4 mb-4">
        <BreadCrumb
          model={items}
          home={home}
          className="mb-4 px-2 text-sm bg-transparent"
        />
      </div>
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
              <p className="text-lg font-semibold text-gray-700">
                Materi Terbaru
              </p>
              <Link
                href={`/teacher/materi/class/${kelas.id}`}
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
                      kelas={kelas}
                      user={auth.user}
                    />
                  ) : (
                    <MateriVideo
                      key={item.id}
                      item={item}
                      kelas={kelas}
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
                href={`/teacher/assignment/class/${kelas.id}`}
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
                    kelas={kelas}
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

export default TeacherCtsShow;
