import React from 'react';
import { FaHome } from 'react-icons/fa';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { PiStudent } from 'react-icons/pi';
import { AiOutlineBook } from 'react-icons/ai';
import { BsBook } from 'react-icons/bs';
import { MdOutlineAssignmentTurnedIn } from 'react-icons/md';
import { GrScorecard } from 'react-icons/gr';
import { SiGoogleclassroom } from 'react-icons/si';
import { FaRegUser } from 'react-icons/fa';

const AccumulateCard = ({ title, total, detail }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <div className="grid grid-cols-3">
        <div className="col-span-2 font-semibold text-gray-900">{title}</div>
        <div className="col-span-1 flex justify-end">
          <div
            className={`${
              title === 'User'
                ? 'bg-blue-600'
                : title === 'Materi'
                ? 'bg-red-500'
                : title === 'Tugas'
                ? 'bg-amber-400'
                : title === 'Kelas'
                ? 'bg-green-600'
                : ''
            }  p-3 rounded-full`}
          >
            {title === 'User' ? (
              <FaRegUser className="text-xl text-white" />
            ) : title === 'Siswa' ? (
              <PiStudent className="text-xl text-white" />
            ) : title === 'Mata Pelajaran' ? (
              <AiOutlineBook className="text-xl text-white" />
            ) : title === 'Kelas' ? (
              <SiGoogleclassroom className="text-xl text-white" />
            ) : title === 'Materi' ? (
              <BsBook className="text-xl text-white" />
            ) : title === 'Tugas' ? (
              <MdOutlineAssignmentTurnedIn className="text-xl text-white" />
            ) : title === 'Nilai' ? (
              <GrScorecard className="text-xl text-white" />
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-2">{total}</div>
      <div className="text-xs text-gray-600">{detail}</div>
    </div>
  );
};

export default AccumulateCard;
