import React, { useState, useEffect } from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import { Head, Link, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import WarningButton from '@/Components/WarningButton';
import moment from 'moment';
import { FaTimes, FaRegCheckCircle } from 'react-icons/fa';
import { IoWarningOutline } from 'react-icons/io5';
import { Dialog } from 'primereact/dialog';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useForm, router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import { InputTextarea } from 'primereact/inputtextarea';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { Transition } from '@headlessui/react';
import logo_pdf from '/public/assets/logo_pdf.png';
import logo_doc from '/public/assets/logo_doc.png';
import logo_xls from '/public/assets/logo_xls.png';
import logo_csv from '/public/assets/logo_csv.png';
import logo_ppt from '/public/assets/logo_ppt.png';
import { IoMdDownload, IoMdEye, IoMdEyeOff } from 'react-icons/io';

const StudentStmDocumentShow = ({ auth, assignment, assignment_submit }) => {
  const [visible, setVisible] = useState(false);

  const { data, setData, processing, errors, reset, recentlySuccessful } =
    useForm({
      student_note: assignment_submit.student_note,
      file: null,
      link: assignment_submit.link
    });

  const [isUploading, setIsUploading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    router.post(`/student/assignmentSubmit/${assignment_submit.id}`, {
      _method: 'patch',
      student_note: data.student_note,
      file: data.file,
      link: data.link
    });

    setVisible(false);
    Swal.fire({
      title: 'Good job!',
      text: 'Berhasil submit tugas.',
      icon: 'success'
    });
  };

  console.log(recentlySuccessful);

  const isSubmitted =
    assignment_submit.file || assignment_submit.link ? true : false;

  // console.log(data);

  const updatedDate = new Date(assignment_submit.updated_at);
  const deadlineDate = new Date(assignment.deadline);

  const extension = assignment_submit.file
    ? assignment_submit.file.slice(-4).toLowerCase()
    : '';

  const logoPath = getLogoPath(extension);

  const assignmentExtension = assignment.file
    ? assignment.file.slice(-4).toLowerCase()
    : '';

  const assignmentLogoPath = getLogoPath(assignmentExtension);

  const role = auth.user.role;

  const [showAssignmentPdf, setShowAssignmentPdf] = useState(false);
  const [showAssignmentSubmitPdf, setShowAssignmentSubmitPdf] = useState(false);

  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Detail Tugas'}>
      <Head title="Detail Tugas" />

      {/* Baris Atas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
        {/* Card Detail Assignment */}
        <div className=" bg-white rounded-lg shadow-md p-4 md:p-6  ">
          <div className="">
            <div>
              <p className="text-2xl mb-2 text-gray-700 font-semibold">
                {assignment.title}
              </p>
              <p className="text-gray-700 text-sm mb-1">
                <span className="font-semibold">Mata Pelajaran:</span>{' '}
                {assignment.cts.subject.name}
              </p>
              <p className="text-gray-700 text-sm mb-1">
                <span className="font-semibold">Guru:</span>{' '}
                {assignment.cts.teacher.user.name}
              </p>
              <p className="text-gray-700 text-sm font-semibold">Deskripsi:</p>
              <p className="text-gray-700 text-sm mb-1">
                {assignment.description}
              </p>
              <p className="text-gray-700 text-sm mb-1">
                <span className="font-semibold">Deadline:</span>{' '}
                {moment(assignment.deadline).format('DD-MM-YYYY HH:mm [WIB]')}
              </p>
            </div>
          </div>
          {assignment.file && (
            <>
              <p className="text-sm font-semibold text-gray-700">Lampiran:</p>
              <div className=" mt-2 border border-gray-300 rounded-md pe-3 flex items-center justify-between">
                <div className="flex items-center overflow-hidden whitespace-nowrap overflow-ellipsis">
                  <img
                    src={assignmentLogoPath}
                    alt="Document Logo"
                    className="h-12 w-12"
                  />
                  <div className="overflow-hidden whitespace-nowrap overflow-ellipsis text-sm text-gray-800">
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
                          setShowAssignmentSubmitPdf(false);
                        }}
                        className="text-gray-700 hover:text-gray-800 transition-all"
                      >
                        <IoMdEye className="text-lg" />
                      </button>
                    ))}

                  <a
                    href={`/student/assignment/${assignment.id}/download`}
                    className="text-gray-700 hover:text-gray-800 transition-all"
                  >
                    <IoMdDownload className="text-lg" />
                  </a>
                </div>
              </div>
            </>
          )}
          <div>
            <p className="text-gray-500 text-xs mt-2">
              <span className="font-semibold">Terakhir diupdate:</span>{' '}
              {moment(assignment.updated_at).format('DD-MM-YYYY HH:mm [WIB]')}
            </p>
          </div>
        </div>

        {/* Card Detail Assignment Submit */}
        <div className="bg-white flex flex-col justify-between rounded-lg shadow-md p-4 md:p-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xl text-gray-700 font-bold">Tugas Anda</p>
              <div>
                {isSubmitted ? (
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
            </div>
            {isSubmitted ? (
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  Catatan:
                </p>
                <p className="text-sm text-gray-700">
                  {assignment_submit.student_note
                    ? assignment_submit.student_note
                    : '-'}
                </p>
                {assignment_submit.file && (
                  <>
                    <p className="text-sm font-semibold text-gray-700 mt-2">
                      File:
                    </p>
                    <div className=" mt-2 border border-gray-300 rounded-md pe-3 flex items-center justify-between">
                      <div className="flex items-center overflow-hidden whitespace-nowrap overflow-ellipsis">
                        <img
                          src={logoPath}
                          alt="Document Logo"
                          className="h-12 w-12"
                        />
                        <div className="overflow-hidden whitespace-nowrap overflow-ellipsis text-sm">
                          {assignment_submit.file &&
                          assignment_submit.file.length > 10
                            ? assignment_submit.file.slice(10)
                            : assignment_submit.file}
                        </div>
                      </div>
                      <div className="ms-2 flex gap-2">
                        {extension === '.pdf' &&
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
                                setShowAssignmentPdf(false);
                              }}
                              className="text-gray-700 hover:text-gray-800 transition-all"
                            >
                              <IoMdEye className="text-lg" />
                            </button>
                          ))}
                        <a
                          href={`/student/assignmentSubmit/${assignment_submit.id}/download`}
                          className="text-gray-700 hover:text-gray-800 transition-all"
                        >
                          <IoMdDownload className="text-lg" />
                        </a>
                      </div>
                    </div>
                  </>
                )}

                {assignment_submit.link && (
                  <>
                    <p className="text-sm font-semibold text-gray-700 mt-2">
                      Link:
                    </p>
                    <a
                      href={assignment_submit.link}
                      target="_blank"
                      className="text-sm text-blue-600 hover:text-blue-500 transition-all"
                      style={{ wordWrap: 'break-word' }}
                    >
                      {assignment_submit.link}
                    </a>
                  </>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-700">
                Anda belum mengumpulkan tugas ini.
              </p>
            )}
            {assignment_submit.score !== null && (
              <div className="text-sm text-gray-700 mt-3">
                <p className="font-semibold">Nilai:</p>
                <p>{assignment_submit.score}</p>
                <p className="font-semibold mt-1">Catatan Guru:</p>
                <p>
                  {assignment_submit.teacher_note
                    ? assignment_submit.teacher_note
                    : '-'}
                </p>
              </div>
            )}
          </div>
          <div className="mt-3">
            {isSubmitted ? (
              <WarningButton
                disabled={assignment_submit.score !== null ? true : false}
                onClick={() => setVisible(true)}
              >
                Edit Tugas
              </WarningButton>
            ) : (
              <PrimaryButton
                disabled={assignment_submit.score !== null ? true : false}
                onClick={() => setVisible(true)}
              >
                Submit Tugas
              </PrimaryButton>
            )}
          </div>

          {/* Form Dialog */}
          <Dialog
            header="Submit Tugas"
            visible={visible}
            className="w-11/12 lg:w-1/2 sm:w-3/4"
            onHide={() => setVisible(false)}
          >
            <div>
              <p className="text-sm">
                Anda bisa mengirim file, link, atau keduanya.
              </p>
              <form onSubmit={submit} className="mt-6 space-y-2">
                <div>
                  <InputLabel htmlFor="student_note" value="Catatan" />
                  <InputTextarea
                    id="student_note"
                    autoResize
                    value={data.student_note ? data.student_note : ''}
                    onChange={(e) => setData('student_note', e.target.value)}
                    rows={5}
                    className="w-full rounded-md border-gray-300  focus:border-blue-500 focus:ring-blue-500 shadow-sm mt-1"
                  />
                  <InputError className="mt-2" message={errors.student_note} />
                </div>

                <div>
                  <InputLabel
                    htmlFor="file"
                    value={`File (${data.link ? 'Optional' : 'Wajib'})`}
                  />
                  <TextInput
                    id="file"
                    type="file"
                    className="mt-1 block w-full py-1"
                    onChange={(e) => setData('file', e.target.files[0])}
                    required={isSubmitted ? false : data.link ? false : true}
                  />
                  <InputError className="mt-2" message={errors.file} />
                </div>

                <div>
                  <InputLabel
                    htmlFor="link"
                    value={`Link (${data.file ? 'Optional' : 'Wajib'})`}
                  />
                  <TextInput
                    id="link"
                    type="text"
                    value={data.link ? data.link : ''}
                    className="mt-1 block w-full"
                    required={isSubmitted ? false : data.file ? false : true}
                    onChange={(e) => setData('link', e.target.value)}
                    autoComplete="link"
                  />
                  <InputError className="mt-2" message={errors.link} />
                </div>

                <div className="flex items-center gap-4 mt-1">
                  <PrimaryButton disabled={isUploading}>Submit</PrimaryButton>
                  <Transition
                    show={isUploading}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                  >
                    <p className="text-sm text-gray-700 flex items-center">
                      Uploading...
                    </p>
                  </Transition>
                </div>
              </form>
            </div>
          </Dialog>
        </div>
      </div>

      {/* Show Assignment PDF  */}
      {showAssignmentPdf && (
        <div className="bg-white rounded-lg shadow-md mx-4 mt-4 p-4 md:p-6  ">
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

      {/* Show Assignment Submit PDF */}
      {showAssignmentSubmitPdf && (
        <div className="bg-white rounded-lg shadow-md mx-4 mt-4 p-4 md:p-6  ">
          <object
            data={`/document/${assignment_submit.file}`}
            type="application/pdf"
            width="800"
            height="600"
            className="w-full"
          >
            <p className="text-gray-700 text-sm">
              It appears you don't have a PDF viewer for this browser. No
              biggie... you can{' '}
              <a
                href={`/document/${assignment_submit.file}`}
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

export default StudentStmDocumentShow;

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
