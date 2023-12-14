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

const StartQuizForm = ({ className = '', kelas, quiz, answerSave }) => {
  const {
    data,
    setData,
    patch,
    processing,
    errors,
    reset,
    recentlySuccessful
  } = useForm({
    deadline: null
  });

  const [isUploading, setIsUploading] = useState(false);
  const [datetime24h, setDatetime24h] = useState(null);
  // console.log(data);

  const submit = (e) => {
    e.preventDefault();
    patch(`/teacher/quiz/${quiz.id}`, {
      preserveScroll: true,
      onProgress: () => {
        setIsUploading(true);
      },
      onSuccess: () => {
        reset('deadline');
        setIsUploading(false);
        Swal.fire({
          title: 'Good job!',
          text: 'Berhasil memulai kuis.',
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
        <h2 className="text-lg font-medium text-gray-900">Mulai Kuis</h2>
      </header>
      <form onSubmit={submit} className="mt-6 space-y-6">
        <div className="">
          <InputLabel htmlFor="calendar-24h" value="Deadline" />
          <Calendar
            id="calendar-24h"
            className="w-full"
            inputClassName=" border-gray-300  focus:border-blue-500 focus:ring-blue-500 shadow-sm mt-1 rounded-md"
            value={datetime24h}
            onChange={(e) => {
              setDatetime24h(e.value);
              const formattedDate = `${e.value.getFullYear()}-${
                e.value.getMonth() + 1
              }-${e.value.getDate()}T${e.value.getHours()}:${e.value.getMinutes()}:${e.value.getSeconds()}`;
              setData('deadline', formattedDate);
            }}
            showTime
            touchUI
            required
            hourFormat="24"
          />
          <InputError className="mt-2" message={errors.deadline} />
        </div>

        <div className="flex items-center gap-4">
          {answerSave === quiz.number_of_question ? (
            <>
              <PrimaryButton disabled={isUploading}>Mulai Quiz</PrimaryButton>
              <Transition
                show={isUploading}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
              >
                <p className="text-sm text-gray-700 flex items-center">
                  Starting...
                </p>
              </Transition>
            </>
          ) : (
            <PrimaryButton disabled>Mulai Quiz</PrimaryButton>
          )}
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

export default StartQuizForm;
