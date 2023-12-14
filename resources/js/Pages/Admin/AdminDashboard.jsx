import AccumulateCard from '@/Components/AccumulateCard';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import { Head } from '@inertiajs/react';

const AdminDashboard = ({ auth, teachers, students, subjects, classes }) => {
  const activeTeachers = teachers.filter((item) => item.user.isActive === 1);
  const inactiveTeachers = teachers.filter((item) => item.user.isActive === 0);

  const activeStudents = students.filter((item) => item.user.isActive === 1);
  const inactiveStudents = students.filter((item) => item.user.isActive === 0);

  const gradeXClasses = classes.filter((item) => item.grade === 'X');
  const gradeXIClasses = classes.filter((item) => item.grade === 'XI');
  const gradeXIIClasses = classes.filter((item) => item.grade === 'XII');

  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Dashboard Admin'}>
      <Head title="Dashboard Admin" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
        <AccumulateCard
          title={'Guru'}
          total={teachers.length}
          detail={`${activeTeachers.length} Guru Aktif. ${inactiveTeachers.length} Guru Tidak Aktif.`}
        />
        <AccumulateCard
          title={'Siswa'}
          total={students.length}
          detail={`${activeStudents.length} Siswa Aktif. ${inactiveStudents.length} Siswa Tidak Aktif.`}
        />
        <AccumulateCard
          title={'Mata Pelajaran'}
          total={subjects.length}
          detail={'Umum, IPA, IPS, Bahasa'}
        />
        <AccumulateCard
          title={'Kelas'}
          total={classes.length}
          detail={`${gradeXClasses.length} Kelas X, ${gradeXIClasses.length} Kelas XI, ${gradeXIIClasses.length} Kelas XII`}
        />
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default AdminDashboard;
