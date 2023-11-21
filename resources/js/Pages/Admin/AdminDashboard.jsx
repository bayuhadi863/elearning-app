import AccumulateCard from '@/Components/AccumulateCard';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import { Head } from '@inertiajs/react';

const AdminDashboard = ({ auth }) => {
  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Dashboard Admin'}>
      <Head title="Dashboard Admin" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
        <AccumulateCard
          title={'User'}
          total={132}
          detail={'50 Siswa, 20 Guru, 2 Admin'}
        />
        <AccumulateCard
          title={'Materi'}
          total={50}
          detail={'30 Dokumen, 20 Video'}
        />
        <AccumulateCard
          title={'Tugas'}
          total={40}
          detail={'30 Expired, 10 Active'}
        />
        <AccumulateCard
          title={'Kelas'}
          total={30}
          detail={'10 Kelas 10, 10 Kelas 11, 10 Kelas 12'}
        />
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default AdminDashboard;
