import React, { useState } from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import { Head, Link, usePage } from '@inertiajs/react';
import MateriDocument from '@/Components/MateriDocument';
import MateriVideo from '@/Components/MateriVideo';
import StudentNavigation from '@/Components/StudentNavigation';

const StudentTeachingMaterial = ({ auth, materi, ctsAll }) => {
  const [category, setCategory] = useState('document');

  const materiVideo = materi.filter((item) => item.type === 'video');
  const materiDocument = materi.filter((item) => item.type === 'document');

  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Materi'}>
      <Head title="Tambah Materi Pembelajaran" />

      <div className="px-5 mb-4 mt-3 flex justify-between gap-2 flex-wrap">
        <p className="text-gray-700 text-xl font-semibold">
          Daftar Materi Kelas Anda
        </p>
        <div>
          <StudentNavigation
            ctsAll={ctsAll}
            page={'materi'}
          />
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
                <MateriDocument
                  key={item.id}
                  item={item}
                  user={auth.user}
                  kelas={item.cts}
                />
              ))
            ) : (
              <p className="px-1 text-sm text-gray-700">
                Belum ada dokumen yang diupload!
              </p>
            )
          ) : materiVideo.length > 0 ? (
            materiVideo.map((item) => (
              <MateriVideo
                key={item.id}
                item={item}
                user={auth.user}
                kelas={item.cts}
              />
            ))
          ) : (
            <p className="px-1 text-sm text-gray-700">
              Belum ada video yang diupload!
            </p>
          )}
        </div>
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default StudentTeachingMaterial;
