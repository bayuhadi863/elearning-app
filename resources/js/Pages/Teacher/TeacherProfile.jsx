import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import ProfileDetailItem from '@/Components/ProfileDetailItem';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link } from '@inertiajs/react';
import defaultProfile from '/public/assets/defaultProfileSquare.png';

export default function TeacherProfile({ nip, auth }) {
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
      title: 'NIP',
      content: nip
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
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Profil Guru'}>
      <Head title="Profil Guru" />

      <div className="mx-3 mb-3 p-6 bg-white rounded-lg shadow-md">
        <div>
          <img
            src={
              auth.user.profile_picture
                ? `/profile_picture/${auth.user.profile_picture}`
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
          <Link href={route('teacherProfile.edit')}>
            <PrimaryButton>Edit</PrimaryButton>
          </Link>
        </div>
      </div>
    </AuthenticatedLayoutNew>
  );
}
