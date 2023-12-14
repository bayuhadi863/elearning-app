import React, { useState, useEffect } from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import { Head, Link, usePage, useForm, router } from '@inertiajs/react';
import moment from 'moment';
import logo_pdf from '/public/assets/logo_pdf.png';
import logo_doc from '/public/assets/logo_doc.png';
import logo_xls from '/public/assets/logo_xls.png';
import logo_csv from '/public/assets/logo_csv.png';
import logo_ppt from '/public/assets/logo_ppt.png';
import { IoMdDownload, IoMdEye, IoMdEyeOff } from 'react-icons/io';
import PrimaryButton from '@/Components/PrimaryButton';
import WarningButton from '@/Components/WarningButton';
import { Dialog } from 'primereact/dialog';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Swal from 'sweetalert2';
import { InputTextarea } from 'primereact/inputtextarea';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { Transition } from '@headlessui/react';

const TeacherAssignmentSubmitShow = ({ auth, assignmentSubmit }) => {
  const [showAssignmentSubmitPdf, setShowAssignmentSubmitPdf] = useState(false);

  const isSubmitted =
    assignmentSubmit.file || assignmentSubmit.link ? true : false;

  const assignmentSubmitExtension = assignmentSubmit.file
    ? assignmentSubmit.file.slice(-4).toLowerCase()
    : '';

  const assignmentSubmitLogoPath = getLogoPath(assignmentSubmitExtension);

  const updatedDate = new Date(assignmentSubmit.updated_at);
  const deadlineDate = new Date(assignmentSubmit.assignment.deadline);

  const [visible, setVisible] = useState(false);

  const { data, setData, processing, errors, reset, recentlySuccessful } =
    useForm({
      teacher_note: assignmentSubmit.teacher_note,
      score: assignmentSubmit.score
    });

  const submit = (e) => {
    e.preventDefault();
    router.post(`/teacher/assignmentSubmit/${assignmentSubmit.id}`, {
      _method: 'patch',
      teacher_note: data.teacher_note,
      score: data.score
    });

    setVisible(false);
    Swal.fire({
      title: 'Good job!',
      text: 'Berhasil submit tugas.',
      icon: 'success'
    });
  };

  // console.log(updatedDate);

  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Detail Tugas'}>
      <Head title="Detail Tugas" />

      {/* Baris Atas */}
      <div className="px-4 grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Card atas kiri */}
        <div className=" bg-white rounded-lg shadow-md p-4 md:p-6  ">
          <div className="">
            <div>
              <p className="text-xl mb-3 text-gray-700 font-bold">
                Tugas {assignmentSubmit.student.user.name}
              </p>
              <p className="text-gray-700 text-sm ">
                <b>Judul Tugas:</b> {assignmentSubmit.assignment.title}
              </p>
              {isSubmitted && (
                <>
                  {' '}
                  <p className="text-gray-700 mt-1 text-sm ">
                    <b>Catatan Siswa:</b>
                  </p>
                  <p className="text-gray-700 text-sm">
                    {assignmentSubmit.student_note
                      ? assignmentSubmit.student_note
                      : '-'}
                  </p>
                </>
              )}

              <p className="text-gray-700 text-sm mt-1">
                <b>Status:</b>{' '}
                {isSubmitted ? (
                  updatedDate <= deadlineDate ? (
                    <span class="bg-green-100 whitespace-nowrap text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                      Mengumpulkan Tepat Waktu
                    </span>
                  ) : (
                    <span class="bg-yellow-100 text-yellow-800 whitespace-nowrap text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                      Mengumpulkan Terlambat
                    </span>
                  )
                ) : (
                  <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                    <span>Belum Mengumpulkan</span>
                  </span>
                )}
              </p>

              {/* File */}
              {assignmentSubmit.file && (
                <>
                  <p className="text-sm mt-1 font-semibold text-gray-700">
                    Lampiran:
                  </p>
                  <div className=" mt-1 border border-gray-300 rounded-md pe-3 flex items-center justify-between">
                    <div className="flex items-center overflow-hidden whitespace-nowrap overflow-ellipsis">
                      <img
                        src={assignmentSubmitLogoPath}
                        alt="Document Logo"
                        className="h-12 w-12"
                      />
                      <div className="overflow-hidden whitespace-nowrap overflow-ellipsis text-sm">
                        {assignmentSubmit.file &&
                        assignmentSubmit.file.length > 10
                          ? assignmentSubmit.file.slice(10)
                          : assignmentSubmit.file}
                      </div>
                    </div>
                    <div className="ms-2 flex gap-2">
                      {assignmentSubmitExtension === '.pdf' &&
                        (showAssignmentSubmitPdf ? (
                          <button
                            onClick={() => setShowAssignmentSubmitPdf(false)}
                            className="text-gray-700 hover:text-gray-800 transition-all"
                          >
                            <IoMdEyeOff className="text-lg" />
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setShowAssignmentSubmitPdf(true);
                            }}
                            className="text-gray-700 hover:text-gray-800 transition-all"
                          >
                            <IoMdEye className="text-lg" />
                          </button>
                        ))}

                      <a
                        href={`/teacher/assignmentSubmit/${assignmentSubmit.id}/download`}
                        className="text-gray-700 hover:text-gray-800 transition-all"
                      >
                        <IoMdDownload className="text-lg" />
                      </a>
                    </div>
                  </div>
                </>
              )}

              {/* Link */}
              {assignmentSubmit.link && (
                <>
                  <p className="text-sm font-semibold mt-1 text-gray-700">
                    Link:
                  </p>
                  <a
                    href={assignmentSubmit.link}
                    target="_blank"
                    className="text-sm text-blue-600 hover:text-blue-500 transition-all"
                    style={{ wordWrap: 'break-word' }}
                  >
                    {assignmentSubmit.link}
                  </a>
                </>
              )}

              {isSubmitted && (
                <div>
                  <p className="text-gray-500 text-xs mt-2">
                    Waktu Pengumpulan:{' '}
                    {moment(assignmentSubmit.created_at).format(
                      'DD-MM-YYYY HH:mm [WIB]'
                    )}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    Terakhir diupdate:{' '}
                    {moment(assignmentSubmit.updated_at).format(
                      'DD-MM-YYYY HH:mm [WIB]'
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Nilai */}
        <div className=" bg-white flex flex-col justify-between rounded-lg shadow-md p-4 md:p-6  ">
          <div>
            <p className="text-gray-700 text-xl font-bold mb-3">
              Nilai Tugas Siswa
            </p>
            {assignmentSubmit.score !== null ? (
              <div className="text-sm text-gray-700">
                <p className="font-semibold">Nilai:</p>
                <p>{assignmentSubmit.score}</p>
                <p className="font-semibold mt-1">Catatan Guru:</p>
                <p>
                  {assignmentSubmit.teacher_note
                    ? assignmentSubmit.teacher_note
                    : '-'}
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-700">
                Anda belum memberikan nilai.
              </p>
            )}
          </div>
          <div className="mt-3">
            {assignmentSubmit.score === null ? (
              <PrimaryButton onClick={() => setVisible(true)}>
                Beri Nilai
              </PrimaryButton>
            ) : (
              <WarningButton onClick={() => setVisible(true)}>
                Edit Nilai
              </WarningButton>
            )}
          </div>
        </div>

        {/* Form Dialog */}
        <Dialog
          header="Berikan Nilai"
          visible={visible}
          className="w-11/12 lg:w-1/2 sm:w-3/4"
          onHide={() => setVisible(false)}
        >
          <div>
            <form onSubmit={submit} className="mt-6 space-y-2">
              <div>
                <InputLabel htmlFor="score" value={`Nilai`} />
                <TextInput
                  id="score"
                  type="number"
                  value={data.score ? data.score : ''}
                  className="mt-1 block w-full"
                  required
                  onChange={(e) => setData('score', e.target.value)}
                  autoComplete="score"
                />
                <InputError className="mt-2" message={errors.score} />
              </div>

              <div>
                <InputLabel htmlFor="teacher_note" value="Catatan" />
                <InputTextarea
                  id="teacher_note"
                  autoResize
                  value={data.teacher_note ? data.teacher_note : ''}
                  onChange={(e) => setData('teacher_note', e.target.value)}
                  rows={5}
                  className="w-full rounded-md border-gray-300  focus:border-blue-500 focus:ring-blue-500 shadow-sm mt-1"
                />
                <InputError className="mt-2" message={errors.teacher_note} />
              </div>

              <div className="flex items-center gap-4 mt-1">
                <PrimaryButton>Submit</PrimaryButton>
              </div>
            </form>
          </div>
        </Dialog>
      </div>

      {/* Show AssignmentSubmit PDF  */}
      {showAssignmentSubmitPdf && (
        <div className="bg-white mb-4 rounded-lg shadow-md mx-4 mt-4 p-4 md:p-6  ">
          <object
            data={`/document/${assignmentSubmit.file}`}
            type="application/pdf"
            width="800"
            height="600"
            className="w-full"
          >
            <p className="text-gray-700 text-sm">
              It appears you don't have a PDF viewer for this browser. No
              biggie... you can{' '}
              <a
                href={`/document/${assignmentSubmit.file}`}
                className="text-blue-600"
              >
                click here to download the PDF file.
              </a>
            </p>
          </object>
        </div>
      )}
    </AuthenticatedLayoutNew>
  );
};

export default TeacherAssignmentSubmitShow;

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
