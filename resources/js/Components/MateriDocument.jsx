import React from 'react';
import moment from 'moment';
import logo_pdf from '/public/assets/logo_pdf.png';
import logo_doc from '/public/assets/logo_doc.png';
import logo_xls from '/public/assets/logo_xls.png';
import logo_csv from '/public/assets/logo_csv.png';
import logo_ppt from '/public/assets/logo_ppt.png';
import { IoMdDownload, IoMdEye } from 'react-icons/io';
import { Link, router } from '@inertiajs/react';
import Swal from 'sweetalert2';

const MateriDocument = ({ item, kelas, user }) => {
  const extension = item.document_file.slice(-4).toLowerCase();
  const logoPath = getLogoPath(extension);
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
    <div className="bg-white p-4 pb-5 rounded-lg shadow-md">
      <p className="text-gray-700 text-md mb-2 font-bold">{item.title}</p>
      <p className="text-gray-500 text-xs">
        Uploaded at: {moment(item.created_at).format('DD-MM-YYYY HH:mm [WIB]')}
      </p>
      <p className="text-gray-500 text-xs">
        Latest updated at:{' '}
        {moment(item.updated_at).format('DD-MM-YYYY HH:mm [WIB]')}
      </p>
      <div className="overflow-hidden whitespace-nowrap overflow-ellipsis mt-2 border border-gray-300 rounded-md pe-3 flex items-center justify-between">
        <div className="flex items-center overflow-hidden whitespace-nowrap overflow-ellipsis">
          <img src={logoPath} alt="Document Logo" className="h-12 w-12" />
          <div className="overflow-hidden whitespace-nowrap overflow-ellipsis text-sm">
            {item.document_file && item.document_file.length > 10
              ? item.document_file.slice(10)
              : item.document_file}
          </div>
        </div>
        <div className="ms-2 flex gap-2">
          {extension === '.pdf' && (
            <a
              href={
                role === 'teacher'
                  ? `/teacher/materi/${item.id}`
                  : `/student/materi/${item.id}`
              }
              className="text-gray-700 hover:text-gray-800 transition-all"
            >
              <IoMdEye className="text-lg" />
            </a>
          )}

          <a
            href={
              role === 'teacher'
                ? `/teacher/materi/${item.id}/download`
                : `/student/materi/${item.id}/download`
            }
            className="text-gray-700 hover:text-gray-800 transition-all"
          >
            <IoMdDownload className="text-lg" />
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

export default MateriDocument;

function getLogoPath(extension) {
  switch (extension) {
    case '.pdf':
      return logo_pdf;
    case '.doc':
      return logo_doc;
    case 'docx':
      return logo_doc;
    case '.xls':
      return logo_xls;
    case 'xlsx':
      return logo_xls;
    case '.csv':
      return logo_csv;
    case '.ppt':
      return logo_ppt;
    case 'pptx':
      return logo_ppt;
    default:
      return '';
  }
}
