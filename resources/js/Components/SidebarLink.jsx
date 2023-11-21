import React from 'react';
import { Link } from '@inertiajs/react';
import { FaHome } from 'react-icons/fa';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { PiStudent } from 'react-icons/pi';
import { AiOutlineBook } from 'react-icons/ai';
import { BsBook } from 'react-icons/bs';
import { MdOutlineAssignmentTurnedIn } from 'react-icons/md';
import { GrScorecard } from 'react-icons/gr';
import { SiGoogleclassroom } from 'react-icons/si';

const SidebarLink = ({ name, routeName }) => {
  return (
    <div className="px-3 mb-2">
      <Link
        href={route(routeName)}
        className={`flex items-center text-gray-700 hover:bg-blue-100 hover:text-blue-700 py-2 transition-all rounded-md px-4 text-sm`}
      >
        {name === 'Beranda' ? (
          <FaHome className="mr-3" />
        ) : name === 'Guru' ? (
          <FaChalkboardTeacher className="mr-3" />
        ) : name === 'Siswa' ? (
          <PiStudent className="mr-3" />
        ) : name === 'Mata Pelajaran' ? (
          <AiOutlineBook className="mr-3" />
        ) : name === 'Kelas' ? (
          <SiGoogleclassroom className="mr-3" />
        ) : name === 'Materi' ? (
          <BsBook className="mr-3" />
        ) : name === 'Tugas' ? (
          <MdOutlineAssignmentTurnedIn className="mr-3" />
        ) : name === 'Nilai' ? (
          <GrScorecard className="mr-3" />
        ) : (
          ''
        )}
        <span>{name}</span>
      </Link>
    </div>
  );
};

export default SidebarLink;
