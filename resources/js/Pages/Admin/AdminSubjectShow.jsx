import React from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import ProfileDetailItem from '@/Components/ProfileDetailItem';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import { Head, Link, router } from '@inertiajs/react';
import Swal from 'sweetalert2';

const AdminSubjectShow = ({ auth, subject }) => {
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
        router.visit(`/admin/subject/${id}`, { method: 'delete' });
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
      content: subject.id
    },
    {
      title: 'Nama Mata Pelajaran',
      content: subject.name
    }
  ];

  return (
    <AuthenticatedLayoutNew
      auth={auth}
      headerTitle={`Detail Mata Pelajaran ${subject.name}`}
    >
      <Head title="Detail Kelas" />

      <div className="mx-4 mb-3 p-6 bg-white rounded-xl shadow-md">
        <div className="py-4">
          <ProfileDetailItem rows={rowTables} />
        </div>
        <div>
          <Link href={`/admin/subject/${subject.id}/edit`}>
            <PrimaryButton>Edit</PrimaryButton>
          </Link>
          <DangerButton
            onClick={() => handleDeleteClick(subject.id)}
            className="ml-2"
          >
            Hapus
          </DangerButton>
        </div>
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default AdminSubjectShow;
