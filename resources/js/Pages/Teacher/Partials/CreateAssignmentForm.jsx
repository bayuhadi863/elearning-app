import React, { useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm, router } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primereact/resources/primereact.min.css';

const CreateAssignmentForm = ({ className = '', kelas }) => {
  const { data, setData, post, processing, errors, reset, recentlySuccessful } =
    useForm({
      title: null,
      description: null,
      file: null,
      deadline: null
    });

  const [isUploading, setIsUploading] = useState(false);
  const [datetime24h, setDatetime24h] = useState(null);
  console.log(data);

  const submit = (e) => {
    e.preventDefault();
    post(`/teacher/assignment/class/${kelas.id}`, {
      preserveScroll: true,
      onProgress: () => {
        setIsUploading(true);
      },
      onSuccess: () => {
        reset('title');
        reset('description');
        reset('file');
        reset('deadline');
        setIsUploading(false);
        Swal.fire({
          title: 'Good job!',
          text: 'Berhasil menambahkan data.',
          icon: 'success'
        }).then(() => {
          router.get(`/teacher/assignment/class/${kelas.id}`);
        });
      }
    });
  };
  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">
          Upload Materi Untuk Kelas {kelas.class.grade} {kelas.class.name}
        </h2>
      </header>
      <form onSubmit={submit} className="mt-6 space-y-6">
        <div>
          <InputLabel htmlFor="title" value="Judul Tugas" />
          <TextInput
            id="title"
            type="text"
            className="mt-1 block w-full"
            required
            onChange={(e) => setData('title', e.target.value)}
            autoComplete="title"
          />
          <InputError className="mt-2" message={errors.title} />
        </div>

        <div>
          <InputLabel htmlFor="description" value="Deskripsi (Optional)" />
          <InputTextarea
            id="description"
            autoResize
            onChange={(e) => setData('description', e.target.value)}
            rows={5}
            className="w-full rounded-md border-gray-300  focus:border-blue-500 focus:ring-blue-500 shadow-sm mt-1"
          />
          <InputError className="mt-2" message={errors.description} />
        </div>

        <div>
          <InputLabel htmlFor="file" value="File Tugas (Optional)" />
          <TextInput
            id="file"
            type="file"
            className="mt-1 block w-full py-1"
            onChange={(e) => setData('file', e.target.files[0])}
          />
          <InputError className="mt-2" message={errors.file} />
        </div>

        <div className="">
          <InputLabel htmlFor="file" value="Deadline" />
          <Calendar
            id="calendar-24h"
            className="w-full"
            inputClassName=" border-gray-300  focus:border-blue-500 focus:ring-blue-500 shadow-sm mt-1 rounded-md"
            value={datetime24h}
            onChange={(e) => {
              setDatetime24h(e.value);
              // const formattedDate = e.value.toISOString().split('.')[0]; // konversi ke format yyyy-mm-dd hh-mm-ss
              const formattedDate = `${e.value.getFullYear()}-${
                e.value.getMonth() + 1
              }-${e.value.getDate()}T${e.value.getHours()}:${e.value.getMinutes()}:${e.value.getSeconds()}`;
              setData('deadline', formattedDate);
            }}
            showTime
            touchUI
            hourFormat="24"
          />
          <InputError className="mt-2" message={errors.deadline} />
        </div>

        <div className="flex items-center gap-4">
          <PrimaryButton disabled={isUploading}>Upload</PrimaryButton>
          <Transition
            show={isUploading}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-gray-700 flex items-center">
              Uploading...
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

export default CreateAssignmentForm;
