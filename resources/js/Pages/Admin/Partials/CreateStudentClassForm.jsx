import React, { useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import Swal from 'sweetalert2';
import Select from 'react-select';

const CreateStudentClassForm = ({ className = '', kelas, students }) => {
  const studentOptions = students.map((student) => ({
    value: student.id,
    label: `${student.nis} - ${student.user.name}`
  }));

  const handleStudentChange = (selectedOption) => {
    setData('student_id', selectedOption.value);
  };

  const { data, setData, post, processing, errors, reset, recentlySuccessful } =
    useForm({
      student_id: null,
      class_id: kelas.id
    });

  console.log(data.class_id);

  const submit = (e) => {
    e.preventDefault();
    post(`/admin/studentClass/`, {
      preserveScroll: true,
      onSuccess: () => {
        reset('student_id');
        Swal.fire({
          title: 'Good job!',
          text: 'Berhasil menambahkan data.',
          icon: 'success'
        });
      }
    });
  };
  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">
          Masukkan Siswa untuk Kelas ini
        </h2>
      </header>
      <form onSubmit={submit} className="mt-6 space-y-6">
        <div>
          <InputLabel className="mb-1" htmlFor="student_id" value="Siswa" />
          <Select
            id="student_id"
            className="basic-single"
            classNamePrefix="select"
            isSearchable={true}
            isClearable={true}
            options={studentOptions}
            onChange={handleStudentChange}
          />
          <InputError className="mt-2" message={errors.grade} />
        </div>
        <div className="flex items-center gap-4">
          <PrimaryButton disabled={processing}>Save</PrimaryButton>
          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-green-500 flex items-center">
              Berhasil <AiOutlineCheckCircle />
            </p>
          </Transition>
        </div>
      </form>
      <div className="grid grid-cols-5">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
};

export default CreateStudentClassForm;
