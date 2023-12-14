import React, { useContext } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { FaHome } from 'react-icons/fa';
import { FaChalkboardTeacher, FaRegCalendarAlt } from 'react-icons/fa';
import { PiStudent } from 'react-icons/pi';
import { AiOutlineBook } from 'react-icons/ai';
import { BsBook } from 'react-icons/bs';
import { MdOutlineAssignmentTurnedIn, MdOutlineQuiz } from 'react-icons/md';
import { GrScorecard } from 'react-icons/gr';
import { SiGoogleclassroom } from 'react-icons/si';
import { DataContext } from '@/Contexts/DataContext';

const SidebarLink = ({ name, routeName, user, page }) => {
  const { url } = usePage();
  const { thisSeasonId } = useContext(DataContext);

  return (
    <div className="px-3 mb-2">
      <Link
        href={routeName}
        className={`flex items-center ${
          url.startsWith(routeName) || url.startsWith(`/${user.role}/${page}`)
            ? 'bg-blue-100 text-blue-700'
            : 'text-gray-700'
        } hover:bg-blue-100 hover:text-blue-700 py-2 transition-all rounded-md px-4 text-sm`}
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
        ) : name === 'Tahun Ajaran' ? (
          <FaRegCalendarAlt className="mr-3" />
        ) : name === 'Kuis' ? (
          <MdOutlineQuiz className="mr-3" />
        ) : (
          ''
        )}
        <span>{name}</span>
      </Link>
    </div>
  );
};

export default SidebarLink;
