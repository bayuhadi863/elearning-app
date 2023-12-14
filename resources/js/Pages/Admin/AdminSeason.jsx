import React from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import SeasonDataTable from './Partials/SeasonDataTable';
import { Head } from '@inertiajs/react';

const AdminClass = ({ auth, seasons }) => {
  const datas = seasons.map((item) => ({
    id: item.id,
    start_year: item.start_year,
    end_year: item.end_year,
    semester: item.semester,
    is_active: item.is_active
  }));
  console.log();
  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Data Tahun Ajaran'}>
      <Head title="Data Tahun Ajaran" />
      <div className="px-4">
        <SeasonDataTable data={datas} />
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default AdminClass;
