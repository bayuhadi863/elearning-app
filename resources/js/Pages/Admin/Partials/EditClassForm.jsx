import React from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import Swal from 'sweetalert2';
import Select from 'react-select';
import { router } from '@inertiajs/react';

const EditTeacherForm = ({ className = '', teachers, kelas}) => {
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

  const studentEntryYearOptions = [
    { value: 2025, label: '2025' },
    { value: 2024, label: '2024' },
    { value: 2023, label: '2023' },
    { value: 2022, label: '2022' },
    { value: 2021, label: '2021' },
    { value: 2020, label: '2020' },
    { value: 2019, label: '2019' }
  ];

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
  const handleStudentEntryYearChange = (selectedOption) => {
    setData('student_entry_year', selectedOption.value);
  };
  const handleClassTeacherChange = (selectedOption) => {
    setData('class_teacher_id', selectedOption.value);
  };

  const { data, setData, processing, errors, reset, recentlySuccessful } =
    useForm({
      name: null,
      grade: null,
      student_entry_year: null,
      class_teacher_id: null
    });

  const submit = (e) => {
    e.preventDefault();
    router.visit(`/admin/class/${kelas.id}`, {
      method: 'patch',
      data: {
        name: data.name,
        grade: data.grade,
        student_entry_year: data.student_entry_year,
        class_teacher_id: data.class_teacher_id
      },
      onSuccess: () => {
        reset('name');
        reset('grade');
        reset('student_entry_year');
        reset('class_teacher_id');
        Swal.fire({
          title: 'Good job!',
          text: 'Berhasil mengubah data.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          router.get(`/admin/class/${kelas.id}`);
        });
      }
    });
  };
  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">Edit Data Kelas</h2>
      </header>
      <form onSubmit={submit} className="mt-6 space-y-6">
        <div className="grid grid-cols-3 gap-2">
          <div>
            <InputLabel className="mb-1" htmlFor="name" value="Nama Kelas" />
            <Select
              id="name"
              className="basic-single"
              defaultInputValue={kelas.name}
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
              defaultInputValue={kelas.grade}
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
              htmlFor="student_entry_year"
              value="Tahun Masuk Siswa"
            />
            <Select
              id="student_entry_year"
              className="basic-single"
              defaultInputValue={kelas.student_entry_year}
              classNamePrefix="select"
              isSearchable={true}
              isClearable={true}
              options={studentEntryYearOptions}
              onChange={handleStudentEntryYearChange}
            />
            <InputError className="mt-2" message={errors.grade} />
          </div>
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
            defaultInputValue={kelas.teacher.user.name}
            isSearchable={true}
            isClearable={true}
            options={classTeacherOptions}
            onChange={handleClassTeacherChange}
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

export default EditTeacherForm;
