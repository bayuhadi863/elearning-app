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

const CreateQuizForm = ({ className = '', kelas }) => {
  const { data, setData, post, processing, errors, reset, recentlySuccessful } =
    useForm({
      title: null,
      number_of_question: null
    });

  const [isUploading, setIsUploading] = useState(false);
  const [datetime24h, setDatetime24h] = useState(null);
  console.log(data);

  const submit = (e) => {
    e.preventDefault();
    post(`/teacher/quiz/class/${kelas.id}`, {
      preserveScroll: true,
      onProgress: () => {
        setIsUploading(true);
      },
      onSuccess: () => {
        reset('title');
        reset('number_of_question');
        setIsUploading(false);
        Swal.fire({
          title: 'Good job!',
          text: 'Berhasil membuat kuis.',
          icon: 'success'
        }).then(() => {
          router.get(`/teacher/quiz/class/${kelas.id}`);
        });
      }
    });
  };
  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">
          Buat Kuis Untuk Kelas {kelas.class.grade} {kelas.class.name}
        </h2>
      </header>
      <form onSubmit={submit} className="mt-6 space-y-6">
        <div>
          <InputLabel htmlFor="title" value="Judul Kuis" />
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
          <InputLabel htmlFor="number_of_question" value="Jumlah Pertanyaan" />
          <TextInput
            id="number_of_question"
            type="number"
            className="mt-1 block w-full"
            required
            onChange={(e) => setData('number_of_question', e.target.value)}
            autoComplete="number_of_question"
          />
          <InputError className="mt-2" message={errors.number_of_question} />
        </div>

        <div className="flex items-center gap-4">
          <PrimaryButton disabled={isUploading}>Buat</PrimaryButton>
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

export default CreateQuizForm;
