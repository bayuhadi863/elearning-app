import React from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import Swal from 'sweetalert2';
import Select from 'react-select';

const CreateCtsForm = ({ className = '', kelas, allSubjects, allTeachers }) => {
  const subjectOptions = allSubjects.map((item) => ({
    value: item.id,
    label: item.name
  }));

  const teacherOptions = allTeachers.map((item) => ({
    value: item.id,
    label: item.user.name
  }));

  const handleSubjectChange = (selectedOption) => {
    setData('subject_id', selectedOption.value);
  };

  const handleTeacherChange = (selectedOption) => {
    setData('teacher_id', selectedOption.value);
  };

  const { data, setData, post, processing, errors, reset, recentlySuccessful } =
    useForm({
      subject_id: null,
      teacher_id: null,
      class_id: kelas.id
    });

  console.log(data);

  const submit = (e) => {
    e.preventDefault();
    post(`/admin/classTeacherSubject`, {
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
          Masukkan Mata Pelajaran untuk Kelas ini
        </h2>
      </header>
      <form onSubmit={submit} className="mt-6 space-y-6">
        <div>
          <InputLabel
            className="mb-1"
            htmlFor="subject_id"
            value="Mata Pelajaran"
          />
          <Select
            id="subject_id"
            className="basic-single"
            classNamePrefix="select"
            isSearchable={true}
            isClearable={true}
            options={subjectOptions}
            onChange={handleSubjectChange}
          />
          <InputError className="mt-2" message={errors.subject_id} />
        </div>
        <div>
          <InputLabel className="mb-1" htmlFor="teacher_id" value="Guru" />
          <Select
            id="teacher_id"
            className="basic-single"
            classNamePrefix="select"
            isSearchable={true}
            isClearable={true}
            options={teacherOptions}
            onChange={handleTeacherChange}
          />
          <InputError className="mt-2" message={errors.teacher_id} />
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

export default CreateCtsForm;
