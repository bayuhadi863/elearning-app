import React from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import ProfileDetailItem from '@/Components/ProfileDetailItem';
import defaultProfile from '/public/assets/defaultProfileSquare.png';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import { Head, Link, router } from '@inertiajs/react';
import Swal from 'sweetalert2';

const AdminStudentShow = ({ auth, user }) => {
  const profile_picture = user.profile_picture;

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
        router.visit(`/admin/student/${id}`, { method: 'delete' });
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
      content: user.id
    },
    {
      title: 'Nama',
      content: user.name
    },
    {
      title: 'Email',
      content: user.email
    },
    {
      title: 'NISN',
      content: user.student.nisn
    },
    {
      title: 'NIS',
      content: user.student.nis
    },
    {
      title: 'Tahun Masuk',
      content: user.student.entry_year
    },
    {
      title: 'No. Handphone',
      content: user.phone
    }
  ];

  return (
    <AuthenticatedLayoutNew
      auth={auth}
      headerTitle={`Detail Siswa ${user.name}`}
    >
      <Head title="Detail Guru" />

      <div className="mx-4 mb-3 p-6 bg-white rounded-xl shadow-md">
        <div>
          <img
            src={
              profile_picture
                ? `/profile_picture/${profile_picture}`
                : defaultProfile
            }
            alt="profilImg"
            className="w-32 h-32 object-cover rounded-md shadow-md"
          />
        </div>
        <div className="py-4">
          <ProfileDetailItem rows={rowTables} />
        </div>
        <div>
          <Link href={`/admin/student/${user.id}/edit`}>
            <PrimaryButton>Edit</PrimaryButton>
          </Link>
          <DangerButton
            onClick={() => handleDeleteClick(user.id)}
            className="ml-2"
          >
            Hapus
          </DangerButton>
        </div>
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default AdminStudentShow;
