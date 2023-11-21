import React, { useState } from 'react';
import CreateTeachingMaterialForm from './Partials/CreateTeachingMaterialForm';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

const TeacherCtm = ({ auth, kelas, materi }) => {
  console.log(materi);
  const [category, setCategory] = useState('document');
  const materiVideo = materi.filter((item) => item.type === 'video');
  const materiDocument = materi.filter((item) => item.type === 'document');

  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Materi'}>
      <Head title="Tambah Materi Pembelajaran" />

      <div className="px-5 mb-4 mt-3 flex justify-between gap-2 flex-wrap">
        <p className="text-gray-700 text-xl font-semibold">
          Daftar Materi Kelas {kelas.class.grade} {kelas.class.name}
        </p>
        <div>
          <Link href={`/teacher/class/${kelas.id}/materi/create`}>
            <PrimaryButton>Upload Materi</PrimaryButton>
          </Link>
        </div>
      </div>
      <div className="mx-4 mt-6">
        <nav className="flex gap-4 items-center mb-4">
          <button
            onClick={() => setCategory('document')}
            className={`${
              category === 'document'
                ? ' border-blue-600 text-blue-600'
                : 'text-gray-700 border-transparent'
            }  py-1 px-1 border-b font-medium transition-all`}
          >
            Dokumen
          </button>
          <button
            onClick={() => setCategory('video')}
            className={`${
              category === 'video'
                ? ' border-blue-600 text-blue-600'
                : 'text-gray-700 border-transparent'
            }  py-1 px-1 border-b font-medium transition-all`}
          >
            Video
          </button>
        </nav>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {category === 'document' ? (
            materiDocument.length > 0 ? (
              materiDocument.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <p className="text-gray-700 text-sm">{item.title}</p>
                  <div className="text-sm overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {item.document_file && item.document_file.length > 10
                      ? item.document_file.slice(10)
                      : item.document_file}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-700">
                Belum ada dokumen yang diupload !
              </p>
            )
          ) : materiVideo.length > 0 ? (
            materiVideo.map((item) => (
              <div key={item.id}>
                <p>{item.title}</p>
                {/* Tambahkan elemen lain sesuai kebutuhan */}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-700">
              Belum ada video yang diupload !
            </p>
          )}
        </div>
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default TeacherCtm;
