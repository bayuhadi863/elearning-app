import React from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import Swal from 'sweetalert2';
import Select from 'react-select';

const CreateSeasonForm = ({ className = '' }) => {
  const date = new Date();
  const thisYear = date.getFullYear();

  const yearOptions = [
    { value: thisYear - 1, label: `${thisYear - 1}` },
    { value: thisYear, label: `${thisYear}` },
    { value: thisYear + 1, label: `${thisYear + 1}` },
    { value: thisYear + 2, label: `${thisYear + 2}` },
    { value: thisYear + 3, label: `${thisYear + 3}` },
    { value: thisYear + 4, label: `${thisYear + 4}` }
  ];

  const semesterOptions = [
    { value: 'ganjil', label: 'Ganjil' },
    { value: 'genap', label: 'Genap' }
  ];

  const handleStartYearChange = (selectedOption) => {
    setData('start_year', selectedOption.value);
  };
  const handleEndYearChange = (selectedOption) => {
    setData('end_year', selectedOption.value);
  };
  const handleSemesterChange = (selectedOption) => {
    setData('semester', selectedOption.value);
  };

  const { data, setData, post, processing, errors, reset, recentlySuccessful } =
    useForm({ start_year: null, end_year: null, semester: null });

  console.log(data);

  const submit = (e) => {
    e.preventDefault();
    post('/admin/season', {
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
          <InputLabel
            className="mb-1"
            htmlFor="start_year"
            value="Tahun Mulai"
          />
          <Select
            id="start_year"
            className="basic-single"
            classNamePrefix="select"
            isSearchable={true}
            isClearable={true}
            options={yearOptions}
            onChange={handleStartYearChange}
          />
          <InputError className="mt-2" message={errors.start_year} />
        </div>
        <div>
          <InputLabel
            className="mb-1"
            htmlFor="end_year"
            value="Tahun Berakhir"
          />
          <Select
            id="end_year"
            className="basic-single"
            classNamePrefix="select"
            isSearchable={true}
            isClearable={true}
            options={yearOptions}
            onChange={handleEndYearChange}
          />
          <InputError className="mt-2" message={errors.end_year} />
        </div>
        <div>
          <InputLabel className="mb-1" htmlFor="semester" value="Semester" />
          <Select
            id="semester"
            className="basic-single"
            classNamePrefix="select"
            isSearchable={true}
            isClearable={true}
            options={semesterOptions}
            onChange={handleSemesterChange}
          />
          <InputError className="mt-2" message={errors.semester} />
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

export default CreateSeasonForm;
