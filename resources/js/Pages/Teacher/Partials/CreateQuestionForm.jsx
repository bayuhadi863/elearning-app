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
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primereact/resources/primereact.min.css';

const CreateQuestionForm = ({
  className = '',
  kelas,
  index,
  quiz,
  setAnswerSave,
  answerSave
}) => {
  const { data, setData, post, processing, errors, reset, recentlySuccessful } =
    useForm({
      question: null,
      correct_answer: null,
      answer2: null,
      answer3: null,
      answer4: null,
      score: null
    });

  const [isSaved, setIsSaved] = useState(false);
  // console.log(data);

  const submit = (e) => {
    e.preventDefault();
    post(`/teacher/quiz/${quiz.id}/question`, {
      preserveScroll: true,
      onSuccess: () => {
        setIsSaved(true);
        setAnswerSave(answerSave + 1);
      }
    });
  };
  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">
          Buat Pertanyaan {index + 1}
        </h2>
      </header>
      <form onSubmit={submit} className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div>
              <InputLabel htmlFor="question" value="Pertanyaan" />
              <InputTextarea
                required
                id="question"
                autoResize
                onChange={(e) => setData('question', e.target.value)}
                rows={5}
                className="w-full rounded-md border-gray-300  focus:border-blue-500 focus:ring-blue-500 shadow-sm mt-1"
              />
              <InputError className="mt-2" message={errors.question} />
            </div>
            <div>
              <InputLabel htmlFor="score" value="Score" />
              <TextInput
                id="score"
                type="number"
                className="mt-1 block w-full"
                required
                onChange={(e) => setData('score', e.target.value)}
                autoComplete="score"
              />
              <InputError className="mt-2" message={errors.score} />
            </div>
          </div>
          <div>
            <div>
              <InputLabel htmlFor="correct_answer" value="Jawaban Benar" />
              <InputTextarea
                required
                id="correct_answer"
                autoResize
                onChange={(e) => setData('correct_answer', e.target.value)}
                rows={1}
                className="w-full rounded-md border-gray-300  focus:border-blue-500 focus:ring-blue-500 shadow-sm mt-1"
              />
              <InputError className="mt-2" message={errors.correct_answer} />
            </div>

            <div>
              <InputLabel htmlFor="answer2" value="Pilihan Jawaban 2" />
              <InputTextarea
                required
                id="answer2"
                autoResize
                onChange={(e) => setData('answer2', e.target.value)}
                rows={1}
                className="w-full rounded-md border-gray-300  focus:border-blue-500 focus:ring-blue-500 shadow-sm mt-1"
              />
              <InputError className="mt-2" message={errors.answer2} />
            </div>

            <div>
              <InputLabel htmlFor="answer3" value="Pilihan Jawaban 3" />
              <InputTextarea
                required
                id="answer3"
                autoResize
                onChange={(e) => setData('answer3', e.target.value)}
                rows={1}
                className="w-full rounded-md border-gray-300  focus:border-blue-500 focus:ring-blue-500 shadow-sm mt-1"
              />
              <InputError className="mt-2" message={errors.answer3} />
            </div>

            <div>
              <InputLabel htmlFor="answer4" value="Pilihan Jawaban 4" />
              <InputTextarea
                required
                id="answer4"
                autoResize
                onChange={(e) => setData('answer4', e.target.value)}
                rows={1}
                className="w-full rounded-md border-gray-300  focus:border-blue-500 focus:ring-blue-500 shadow-sm mt-1"
              />
              <InputError className="mt-2" message={errors.answer4} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <PrimaryButton disabled={isSaved}>Save</PrimaryButton>
          <Transition
            show={processing}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-gray-700 flex items-center">Saving...</p>
          </Transition>
          {isSaved && <p className="text-sm text-gray-600">Saved</p>}
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

export default CreateQuestionForm;
