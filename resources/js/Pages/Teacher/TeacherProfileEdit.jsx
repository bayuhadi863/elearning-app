import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';

export default function TeacherProfileEdit({ nip, auth }) {
  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Edit Profil'}>
      <Head title="Edit Profil" />

      <div className="max-w-7xl px-3 space-y-6">
        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
          <UpdateProfileInformationForm nip={nip} className="max-w-xl" />
        </div>

        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
          <UpdatePasswordForm className="max-w-xl" />
        </div>
      </div>
    </AuthenticatedLayoutNew>
  );
}
