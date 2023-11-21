import React from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import ProfileDetailItem from '@/Components/ProfileDetailItem';
import defaultProfile from '/public/assets/defaultProfileSquare.png';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link } from '@inertiajs/react';

const AdminProfile = ({ auth }) => {
  const profile_picture = auth.user.profile_picture;

  const rowTables = [
    {
      title: 'Nama',
      content: auth.user.name
    },
    {
      title: 'Role',
      content: auth.user.role
    },
    {
      title: 'Email',
      content: auth.user.email
    },
    {
      title: 'No. Handphone',
      content: auth.user.phone
    }
  ];

  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Profil Admin'}>
      <Head title="Profil Admin" />

      <div className="mx-4 mb-3 p-6 bg-white rounded-xl shadow-md">
        <div>
          <img
            src={
              profile_picture
                ? `/profile_picture/${profile_picture}`
                : defaultProfile
            }
            alt="profilImg"
            className="w-32 h-32 object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="py-4">
          <ProfileDetailItem rows={rowTables} />
        </div>
        <div>
          <Link href={route('adminProfile.edit')}>
            <PrimaryButton>Edit</PrimaryButton>
          </Link>
        </div>
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default AdminProfile;
