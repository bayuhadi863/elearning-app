import AccumulateCard from '@/Components/AccumulateCard';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';

const TeacherDashboard = ({ auth }) => {
  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Dashboard'}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
        <AccumulateCard
          title={'Kelas'}
          total={30}
          detail={'10 Kelas 10, 10 Kelas 11, 10 Kelas 12'}
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
          title={'User'}
          total={132}
          detail={'50 Siswa, 20 Guru, 2 Admin'}
        />
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default TeacherDashboard;
