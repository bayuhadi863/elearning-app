import React from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import Swal from 'sweetalert2';
import Select from 'react-select';

const CreateClassForm = ({ className = '', teachers, seasons }) => {
  const date = new Date();
  const thisYear = date.getFullYear();

  const nameOptions = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'C', label: 'C' },
    { value: 'D', label: 'D' },
    { value: 'E', label: 'E' }
  ];

  const gradeOptions = [
    { value: 'X', label: 'X' },
    { value: 'XI', label: 'XI' },
    { value: 'XII', label: 'XII' }
  ];

  const seasonOptions = seasons.map((item) => ({
    value: item.id,
    label: `${item.start_year}/${item.end_year} (${item.semester})`
  }));

  const classTeacherOptions = teachers.map((teacher) => ({
    value: teacher.id,
    label: teacher.user.name
  }));

  const handleNameChange = (selectedOption) => {
    setData('name', selectedOption.value);
  };
  const handleGradeChange = (selectedOption) => {
    setData('grade', selectedOption.value);
  };
  const handleSeasonChange = (selectedOption) => {
    setData('season_id', selectedOption.value);
  };
  const handleClassTeacherChange = (selectedOption) => {
    setData('class_teacher_id', selectedOption.value);
  };

  const { data, setData, post, processing, errors, reset, recentlySuccessful } =
    useForm({
      name: null,
      grade: null,
      season_id: null,
      class_teacher_id: null
    });

  const submit = (e) => {
    e.preventDefault();
    post('/admin/class', {
      preserveScroll: true,
      onSuccess: () => {
        reset('name');
        reset('grade');
        reset('season_id');
        reset('class_teacher_id');
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
          Masukkan Data Kelas Baru
        </h2>
      </header>
      <form onSubmit={submit} className="mt-6 space-y-6">
        <div>
          <InputLabel className="mb-1" htmlFor="name" value="Nama Kelas" />
          <Select
            id="name"
            className="basic-single"
            classNamePrefix="select"
            isSearchable={true}
            isClearable={true}
            options={nameOptions}
            onChange={handleNameChange}
          />
          <InputError className="mt-2" message={errors.name} />
        </div>
        <div>
          <InputLabel className="mb-1" htmlFor="grade" value="Tingkat" />
          <Select
            id="grade"
            className="basic-single"
            classNamePrefix="select"
            isSearchable={true}
            isClearable={true}
            options={gradeOptions}
            onChange={handleGradeChange}
          />
          <InputError className="mt-2" message={errors.grade} />
        </div>
        <div>
          <InputLabel
            className="mb-1"
            htmlFor="season_id"
            value="Tahun Ajaran"
          />
          <Select
            id="season_id"
            className="basic-single"
            classNamePrefix="select"
            isSearchable={true}
            isClearable={true}
            options={seasonOptions}
            onChange={handleSeasonChange}
          />
          <InputError className="mt-2" message={errors.season_id} />
        </div>
        <div>
          <InputLabel
            className="mb-1"
            htmlFor="class_teacher_id"
            value="Wali Kelas"
          />
          <Select
            id="class_teacher_id"
            className="basic-single"
            classNamePrefix="select"
            isSearchable={true}
            isClearable={true}
            options={classTeacherOptions}
            onChange={handleClassTeacherChange}
          />
          <InputError className="mt-2" message={errors.class_teacher_id} />
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

export default CreateClassForm;
