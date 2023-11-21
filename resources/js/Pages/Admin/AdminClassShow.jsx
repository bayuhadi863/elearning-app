import React from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import ProfileDetailItem from '@/Components/ProfileDetailItem';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import { Head, Link, router } from '@inertiajs/react';
import Swal from 'sweetalert2';

const AdminTeacherShow = ({ auth, kelas, students }) => {
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
      title: 'Tahun Masuk Siswa',
      content: kelas.student_entry_year
    },
    {
      title: 'Dosen Wali',
      content: kelas.teacher.user.name
    }
  ];

  return (
    <AuthenticatedLayoutNew
      auth={auth}
      headerTitle={`Detail Kelas ${kelas.grade} ${kelas.name} (${kelas.student_entry_year})`}
    >
      <Head title="Detail Kelas" />
      <div className="grid grid-cols-2">
        <div className="mx-4 mb-3 p-6 bg-white rounded-xl shadow-md">
          <div className="py-4">
            <ProfileDetailItem rows={rowTables} />
            {/* <ProfileDetailItem title={'Nama Kelas'} content={kelas.name} />
            <ProfileDetailItem title={'Tingkat'} content={kelas.grade} />
            <ProfileDetailItem
              title={'Tahun Masuk Siswa'}
              content={kelas.student_entry_year}
            />
            <ProfileDetailItem
              title={'Dosen Wali'}
              content={kelas.teacher.user.name}
            /> */}
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
          {students.map((student) => (
            <div>
              {student.student.nis} - {student.student.user.name}
            </div>
          ))}
        </div>
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default AdminTeacherShow;
