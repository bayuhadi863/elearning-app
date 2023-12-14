import React from 'react';
import moment from 'moment';
import { Link, router } from '@inertiajs/react';
import { FaCirclePlay } from 'react-icons/fa6';
import logo_youtube from '/public/assets/logo_youtube.png';
import Swal from 'sweetalert2';

const MateriVideo = ({ kelas, item, user }) => {
  const role = user.role;

  const handleDeleteClick = () => {
    Swal.fire({
      title: 'Apa Anda yakin?',
      text: 'Anda tidak bisa mengembalikannya!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        router.visit(`/teacher/materi/${item.id}`, {
          method: 'delete',
          onSuccess: () => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Materi berhasil dihapus.',
              icon: 'success'
            });
          }
        });
      }
    });
  };

  return (
    <div key={item.id} className="bg-white p-4 pb-5 rounded-lg shadow-md">
      <p className="text-gray-700 text-md mb-2 font-bold">{item.title}</p>
      <p className="text-gray-500 text-xs">
        Uploaded at: {moment(item.created_at).format('DD-MM-YYYY HH:mm [WIB]')}
      </p>
      <p className="text-gray-500 text-xs">
        Latest updated at:{' '}
        {moment(item.updated_at).format('DD-MM-YYYY HH:mm [WIB]')}
      </p>
      <div className="mt-2 border border-gray-300 rounded-md pe-3 flex items-center justify-between">
        <div className="flex items-center">
          <img src={logo_youtube} alt="Document Logo" className="h-12 w-12" />
          <div className="text-sm">Video</div>
        </div>
        <div className="ms-2">
          <a
            href={
              role === 'teacher'
                ? `/teacher/materi/${item.id}`
                : `/student/materi/${item.id}`
            }
            className="text-gray-700 hover:text-gray-800 transition-all"
          >
            <FaCirclePlay className="text-xl" />
          </a>
        </div>
      </div>
      {role === 'teacher' && (
        <div className="mt-3">
          <Link
            href={`/teacher/materi/${item.id}/edit`}
            className="text-xs text-gray-900 py-2 px-3 rounded-md bg-amber-400 hover:bg-amber-500 transition-all"
          >
            Edit
          </Link>
          <button
            onClick={handleDeleteClick}
            className="ms-1 text-xs text-white py-2 px-3 rounded-md bg-red-500 hover:bg-red-600 transition-all"
          >
            Hapus
          </button>
        </div>
      )}
    </div>
  );
};

export default MateriVideo;
