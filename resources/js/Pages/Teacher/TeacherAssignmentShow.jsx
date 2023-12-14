import React, { useState, useContext } from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import { Head, Link, usePage } from '@inertiajs/react';
import moment from 'moment';
import logo_pdf from '/public/assets/logo_pdf.png';
import logo_doc from '/public/assets/logo_doc.png';
import logo_xls from '/public/assets/logo_xls.png';
import logo_csv from '/public/assets/logo_csv.png';
import logo_ppt from '/public/assets/logo_ppt.png';
import { IoMdDownload, IoMdEye, IoMdEyeOff } from 'react-icons/io';
import AssignmentSubmitDataTable from './Partials/AssignmentSubmitDataTable';
import { BreadCrumb } from 'primereact/breadcrumb';
import { DataContext } from '@/Contexts/DataContext';
import { MdOutlineAssignmentTurnedIn } from 'react-icons/md';

const TeacherAssignmentShow = ({ auth, assignment, assignment_submits }) => {
  const [showAssignmentPdf, setShowAssignmentPdf] = useState(false);

  const { url } = usePage();
  const { thisSeasonId } = useContext(DataContext);

  const assignmentExtension =
    assignment && assignment.file
      ? assignment.file.slice(-4).toLowerCase()
      : '';

  const assignmentLogoPath = getLogoPath(assignmentExtension);

  const datas = assignment_submits.map((item, index) => ({
    no: index + 1,
    id: item.id,
    nis: item.student.nis,
    name: item.student.user.name,
    file: item.file,
    link: item.link,
    updated_at:
      item.file || item.link
        ? moment(item.updated_at).format('DD-MM-YYYY HH:mm [WIB]')
        : '-',
    status:
      item.file || item.link
        ? new Date(item.updated_at) <= new Date(assignment.deadline)
          ? 'Tepat Waktu'
          : 'Terlambat'
        : 'Belum Mengumpulkan'
  }));

  const items = [
    {
      label: (
        <p
          className={` ${
            url === `/teacher/assignment/class/${assignment.cts.id}`
              ? 'font-semibold'
              : ''
          }`}
        >
          Tugas {assignment.cts.class.grade} {assignment.cts.class.name}
        </p>
      ),
      url: `/teacher/assignment/class/${assignment.cts.id}`
    },
    {
      label: (
        <p
          className={` ${
            url === `/teacher/assignment/${assignment.id}`
              ? 'font-semibold'
              : ''
          }`}
        >
          Detail Tugas
        </p>
      ),
      url: `/teacher/assignment/${assignment.id}`
    }
  ];
  const home = {
    label: <MdOutlineAssignmentTurnedIn />,
    url: `/teacher/${thisSeasonId}/assignment`
  };

  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Detail Tugas'}>
      <Head title="Detail Tugas" />

      <div className="px-4 mb-4">
        <BreadCrumb
          model={items}
          home={home}
          className="mb-4 px-2 bg-transparent text-sm"
        />
      </div>

      <div className="px-4 grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className=" bg-white rounded-lg shadow-md p-4 md:p-6  ">
          <div className="">
            <div>
              <p className="text-2xl mb-1 text-gray-700 font-bold">
                {assignment.title}
              </p>
              <p className="text-gray-700 text-sm mb-1">
                <b>Deskripsi:</b> {assignment.description}
              </p>
              <p className="text-gray-700 text-sm">
                <b>Deadline:</b>{' '}
                {moment(assignment.deadline).format('DD-MM-YYYY HH:mm [WIB]')}
              </p>
              {assignment.file && (
                <>
                  <p className="text-sm font-semibold text-gray-700">
                    Lampiran:
                  </p>
                  <div className=" mt-2 border border-gray-300 rounded-md pe-3 flex items-center justify-between">
                    <div className="flex items-center overflow-hidden whitespace-nowrap overflow-ellipsis">
                      <img
                        src={assignmentLogoPath}
                        alt="Document Logo"
                        className="h-12 w-12"
                      />
                      <div className="overflow-hidden whitespace-nowrap overflow-ellipsis text-sm">
                        {assignment.file && assignment.file.length > 10
                          ? assignment.file.slice(10)
                          : assignment.file}
                      </div>
                    </div>
                    <div className="ms-2 flex gap-2">
                      {assignmentExtension === '.pdf' &&
                        (showAssignmentPdf ? (
                          <button
                            onClick={() => setShowAssignmentPdf(false)}
                            className="text-gray-700 hover:text-gray-800 transition-all"
                          >
                            <IoMdEyeOff className="text-lg" />
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setShowAssignmentPdf(true);
                            }}
                            className="text-gray-700 hover:text-gray-800 transition-all"
                          >
                            <IoMdEye className="text-lg" />
                          </button>
                        ))}

                      <a
                        href={`/teacher/assignment/${assignment.id}/download`}
                        className="text-gray-700 hover:text-gray-800 transition-all"
                      >
                        <IoMdDownload className="text-lg" />
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className=" bg-white rounded-lg shadow-md p-4 md:p-6  ">
          <div className="">
            <p className="text-gray-700 text-sm mb-1">
              <b>Mata Pelajaran:</b> {assignment.cts.subject.name}
            </p>
            <p className="text-gray-700 text-sm mb-1">
              <b>Kelas:</b> {assignment.cts.class.grade}{' '}
              {assignment.cts.class.name}
            </p>
            <p className="text-gray-700 text-sm mb-1">
              <b>Pengumpulan:</b> {assignment_submits.length}/
              {assignment.cts.class.student_class.length}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs mt-2">
              Diupload pada:{' '}
              {moment(assignment.created_at).format('DD-MM-YYYY HH:mm [WIB]')}
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Terakhir diupdate:{' '}
              {moment(assignment.updated_at).format('DD-MM-YYYY HH:mm [WIB]')}
            </p>
          </div>
        </div>
      </div>

      {/* Show Assignment PDF  */}
      {showAssignmentPdf && (
        <div className="bg-white mb-4 rounded-lg shadow-md mx-4 mt-4 p-4 md:p-6  ">
          <object
            data={`/document/${assignment.file}`}
            type="application/pdf"
            width="800"
            height="600"
            className="w-full"
          >
            <p className="text-gray-700 text-sm">
              It appears you don't have a PDF viewer for this browser. No
              biggie... you can{' '}
              <a
                href={`/document/${assignment.file}`}
                className="text-blue-600"
              >
                click here to download the PDF file.
              </a>
            </p>
          </object>
        </div>
      )}

      {/* Assignment Submit Data Table */}
      <div className="px-4">
        <AssignmentSubmitDataTable data={datas} />
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default TeacherAssignmentShow;

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
