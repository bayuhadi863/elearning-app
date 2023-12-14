import React from 'react';
import moment from 'moment';
import logo_pdf from '/public/assets/logo_pdf.png';
import logo_doc from '/public/assets/logo_doc.png';
import logo_xls from '/public/assets/logo_xls.png';
import logo_csv from '/public/assets/logo_csv.png';
import logo_ppt from '/public/assets/logo_ppt.png';
import { IoMdDownload, IoMdEye } from 'react-icons/io';
import { FaTimes, FaRegCheckCircle } from 'react-icons/fa';
import { IoWarningOutline } from 'react-icons/io5';
import { Link, router } from '@inertiajs/react';
import Swal from 'sweetalert2';

const AssignmentCard = ({ item, kelas, user }) => {
  const extension = item.file ? item.file.slice(-4).toLowerCase() : '';
  const logoPath = getLogoPath(extension);
  const role = user.role;
  const userAssignmentSubmit =
    role === 'student'
      ? item.assignment_submit.find(
          (submission) => submission.student.user.id === user.id
        )
      : '';
  const updatedDate = userAssignmentSubmit
    ? new Date(userAssignmentSubmit.updated_at)
    : null;
  const deadlineDate = item ? new Date(item.deadline) : null;

  // console.log(updatedDate);

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
        router.visit(`/teacher/assignment/${item.id}`, {
          method: 'delete',
          onSuccess: () => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Tugas berhasil dihapus.',
              icon: 'success'
            });
          }
        });
      }
    });
  };

  return (
    <div className="bg-white p-4 pb-5 flex flex-col justify-between rounded-lg shadow-md">
      <div>
        <p className="text-gray-700 text-md font-semibold mb-2">{item.title}</p>
        <p className="text-gray-700 text-sm mb-2">
          {item.description && item.description.length > 50
            ? item.description.slice(0, 80) + '...'
            : item.description || '-'}
        </p>

        <p className="text-gray-700 text-sm font-semibold mb-3">
          Deadline: {moment(item.deadline).format('DD-MM-YYYY HH:mm [WIB]')}
        </p>
        {item.file && (
          <div className=" mt-2 border border-gray-300 rounded-md pe-3 flex items-center justify-between">
            <div className="flex items-center overflow-hidden whitespace-nowrap overflow-ellipsis">
              <img src={logoPath} alt="Document Logo" className="h-12 w-12" />
              <div className="overflow-hidden whitespace-nowrap overflow-ellipsis text-sm">
                {item.file && item.file.length > 10
                  ? item.file.slice(10)
                  : item.file}
              </div>
            </div>
            <div className="ms-2 flex gap-2">
              <a
                href={
                  role === 'teacher'
                    ? `/teacher/assignment/${item.id}/download`
                    : `/student/assignment/${item.id}/download`
                }
                className="text-gray-700 hover:text-gray-800 transition-all"
              >
                <IoMdDownload className="text-lg" />
              </a>
            </div>
          </div>
        )}
      </div>

      {role === 'teacher' ? (
        <div className="mt-3">
          <Link
            href={
              role === 'teacher'
                ? `/teacher/assignment/${item.id}`
                : `/student/materi/${item.id}`
            }
            className="text-xs text-gray-900 py-2 px-3 rounded-md bg-amber-400 hover:bg-amber-500 transition-all"
          >
            Detail
          </Link>
          <button
            onClick={handleDeleteClick}
            className="ms-1 text-xs text-white py-2 px-3 rounded-md bg-red-500 hover:bg-red-600 transition-all"
          >
            Hapus
          </button>
        </div>
      ) : role === 'student' ? (
        <div className="mt-3 flex justify-between items-center">
          <div>
            {userAssignmentSubmit.file || userAssignmentSubmit.link ? (
              updatedDate.getTime() <= deadlineDate.getTime() ? (
                <span className="bg-green-100 text-green-800 text-xs flex gap-1 items-center font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                  <FaRegCheckCircle />
                  <span>Mengumpulkan Tepat Waktu</span>
                </span>
              ) : (
                <span className="bg-yellow-100 flex gap-1 items-center text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                  <IoWarningOutline />
                  <span>Mengumpulkan Terlambat</span>
                </span>
              )
            ) : (
              <span className="bg-red-100 flex gap-1 items-center text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                <FaTimes />
                <span>Belum Mengumpulkan</span>
              </span>
            )}
          </div>

          <Link
            href={`/student/assignment/${item.id}`}
            className="ms-1 text-white py-2 px-3 rounded-md bg-blue-600 flex gap-1 items-center hover:bg-blue-700 transition-all"
          >
            <IoMdEye className="text-xs" />
            <p className="text-xs">Lihat</p>
          </Link>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default AssignmentCard;

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
