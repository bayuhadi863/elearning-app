import React, { useState, useEffect } from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import { Head, Link, usePage } from '@inertiajs/react';
import moment from 'moment';

const StudentStmDocumentShow = ({ auth, materi }) => {
  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Materi'}>
      <Head title="Tambah Materi Pembelajaran" />

      <div className=" bg-white rounded-lg shadow-md mx-4 p-4 md:p-6  ">
        <div className="">
          <div>
            <p className="text-xl mb-1 text-gray-700 font-semibold">
              {materi.title}
            </p>
            <p className="text-gray-700 text-sm">
              Mata Pelajaran: {materi.cts.subject.name}
            </p>
            <p className="text-gray-700 text-sm">
              Guru: {materi.cts.teacher.user.name}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs mt-2">
              Latest updated at:{' '}
              {moment(materi.updated_at).format('DD-MM-YYYY HH:mm [WIB]')}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <object
            data={`/document/${materi.document_file}`}
            type="application/pdf"
            width="800"
            height="600"
            className="w-full"
          >
            <p className="text-gray-700 text-sm">
              It appears you don't have a PDF viewer for this browser. No
              biggie... you can{' '}
              <a
                href={`/document/${materi.document_file}`}
                className="text-blue-600"
              >
                click here to download the PDF file.
              </a>
            </p>
          </object>
        </div>
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default StudentStmDocumentShow;
