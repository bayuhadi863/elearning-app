import React, { useState, useContext } from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import { Head, Link, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import AssignmentCard from '@/Components/AssignmentCard';
import TeacherNavigation from '@/Components/TeacherNavigation';
import { BreadCrumb } from 'primereact/breadcrumb';
import { DataContext } from '@/Contexts/DataContext';
import { MdOutlineAssignmentTurnedIn } from 'react-icons/md';

const TeacherCtm = ({ auth, kelas, assignments, ctsAll }) => {
  const { url } = usePage();
  const { thisSeasonId } = useContext(DataContext);

  const items = [
    {
      label: (
        <p
          className={` ${
            url === `/teacher/assignment/class/${kelas.id}`
              ? 'font-semibold'
              : ''
          }`}
        >
          Tugas {kelas.class.grade} {kelas.class.name}
        </p>
      ),
      url: `/teacher/assignment/class/${kelas.id}`
    }
  ];
  const home = {
    label: <MdOutlineAssignmentTurnedIn />,
    url: `/teacher/${thisSeasonId}/assignment`
  };

  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Materi'}>
      <Head title="Tambah Materi Pembelajaran" />

      <div className="px-4 mb-4">
        <BreadCrumb
          model={items}
          home={home}
          className="mb-4 px-2 bg-transparent text-sm"
        />
      </div>

      <div className="px-5 mb-4 mt-3 flex justify-between gap-2 flex-wrap">
        <p className="text-gray-700 text-xl font-semibold">
          Daftar Tugas Kelas {kelas.class.grade} {kelas.class.name}
        </p>
        <div>
          <Link href={`/teacher/assignment/class/${kelas.id}/create`}>
            <PrimaryButton>Upload Tugas</PrimaryButton>
          </Link>
        </div>
      </div>
      <div className="flex justify-end mx-5">
        <TeacherNavigation ctsAll={ctsAll} page={'assignment'} />
      </div>
      <div className="mx-4 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {assignments.length > 0 ? (
            assignments.map((item) => (
              <AssignmentCard
                key={item.id}
                item={item}
                kelas={kelas}
                user={auth.user}
              />
            ))
          ) : (
            <p className="px-1 text-sm text-gray-700">
              Belum ada tugas yang diupload!
            </p>
          )}
        </div>
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default TeacherCtm;
