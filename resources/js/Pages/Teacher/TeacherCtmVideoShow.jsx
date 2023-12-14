import React, { useState, useEffect } from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import { Head, Link, usePage } from '@inertiajs/react';
import moment from 'moment';
import ReactPlayer from 'react-player/youtube';

const TeacherCtmVideoShow = ({ auth, materi }) => {
  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Materi'}>
      <Head title="Lihat Video Pembelajaran" />

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
        <div className="aspect-video mt-4">
          <ReactPlayer
            url={materi.video_link}
            width="100%"
            height="100%"
            controls={true}
            playIcon
            previewTabIndex={1}
          />
        </div>
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default TeacherCtmVideoShow;
