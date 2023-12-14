import React from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import ProfileDetailItem from '@/Components/ProfileDetailItem';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import { Head, Link, router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import CtsStudentDataTable from '../Teacher/Partials/CtsStudentDataTable';
import CtsSubjectDataTable from './Partials/CtsSubjectDataTable';

const AdminTeacherShow = ({ auth, kelas, students, cts }) => {
  const handleDeleteClick = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        router.visit(`/admin/class/${id}`, { method: 'delete' });
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success'
        });
      }
    });
  };

  const datas = students.map((item, index) => ({
    no: index + 1,
    nis: item.student.nis,
    name: item.student.user.name,
    profile_picture: item.student.user.profile_picture
  }));

  const subjectDatas = cts.map((item, index) => ({
    no: index + 1,
    name: item.subject.name,
    teacher_name: item.teacher.user.name
  }));

  const rowTables = [
    {
      title: 'ID',
      content: kelas.id
    },
    {
      title: 'Nama Kelas',
      content: kelas.name
    },
    {
      title: 'Tingkat',
      content: kelas.grade
    },
    {
      title: 'Tahun Ajaran',
      content: `${kelas.season.start_year}/${kelas.season.end_year}`
    },
    {
      title: 'Semster',
      content: kelas.season.semester
    },
    {
      title: 'Wali Kelas',
      content: kelas.teacher.user.name
    }
  ];

  return (
    <AuthenticatedLayoutNew
      auth={auth}
      headerTitle={`Detail Kelas ${kelas.grade} ${kelas.name}`}
    >
      <Head title="Detail Kelas" />
      <div className="grid grid-cols-1 md:grid-cols-2 px-4 gap-4">
        <div>
          <div className="mb-4 p-6 bg-white rounded-xl shadow-md">
            <div className="">
              <ProfileDetailItem rows={rowTables} />
            </div>
            <div>
              <Link href={`/admin/class/${kelas.id}/edit`}>
                <PrimaryButton>Edit</PrimaryButton>
              </Link>
              <DangerButton
                onClick={() => handleDeleteClick(kelas.id)}
                className="ml-2"
              >
                Hapus
              </DangerButton>
            </div>
          </div>
          <div>
            <CtsSubjectDataTable
              data={subjectDatas}
              user={auth.user}
              kelas_id={kelas.id}
            />
          </div>
        </div>

        <div>
          <CtsStudentDataTable
            data={datas}
            user={auth.user}
            kelas_id={kelas.id}
          />
        </div>
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default AdminTeacherShow;
