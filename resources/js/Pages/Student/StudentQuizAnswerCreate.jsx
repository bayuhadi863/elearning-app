import React, { useContext } from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import { Head, usePage } from '@inertiajs/react';
import { BreadCrumb } from 'primereact/breadcrumb';
import { DataContext } from '@/Contexts/DataContext';
import { MdOutlineQuiz } from 'react-icons/md';
import { Transition } from '@headlessui/react';
import { useForm, router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';

const StudentQuizAnswerCreate = ({ auth, quiz }) => {
  const { url } = usePage();
  const { thisSeasonId } = useContext(DataContext);

  const { data, setData, post, processing, errors, reset, recentlySuccessful } =
    useForm(
      quiz.question.map((item) => ({
        question_id: item.id,
        answer: null,
        score: null
      }))
    );

  const submit = (e) => {
    e.preventDefault();
    post(`/student/quiz/${quiz.id}/answer`, {
      preserveScroll: true,
      onSuccess: () => {
        Swal.fire({
          title: 'Good job!',
          text: 'Berhasil mengerjakan kuis.',
          icon: 'success'
        }).then(() => {
          router.get(`/student/quiz/subject/${quiz.cts.id}`);
        });
      }
    });
  };

  console.log(data);

  const items = [
    {
      label: (
        <p
          className={` ${
            url === `/student/quiz/subject/${quiz.cts.id}`
              ? 'font-semibold'
              : ''
          }`}
        >
          Kuis {quiz.cts.subject.name}
        </p>
      ),
      url: `/student/quiz/subject/${quiz.cts.id}`
    },
    {
      label: (
        <p
          className={` ${
            url === `/student/quiz/subject/${quiz.cts.id}`
              ? 'font-semibold'
              : ''
          }`}
        >
          Detail
        </p>
      ),
      url: `/student/quiz/subject/${quiz.cts.id}`
    },
    {
      label: (
        <p
          className={` ${
            url === `/student/quiz/${quiz.id}/answer/create`
              ? 'font-semibold'
              : ''
          }`}
        >
          Kerjakan Kuis
        </p>
      ),
      url: `/student/quiz/${quiz.id}/answer/create`
    }
  ];
  const home = {
    label: <MdOutlineQuiz />,
    url: `/student/${thisSeasonId}/quiz`
  };

  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Kerjakan Kuis'}>
      <Head title="Kerjakan Kuis" />

      <div className="px-4 mb-4">
        <BreadCrumb
          model={items}
          home={home}
          className="mb-4 px-2 bg-transparent text-sm"
        />
      </div>

      <div className="bg-white rounded-lg mx-5 p-8">
        <header>
          <h2 className="text-lg font-medium text-gray-900">
            Kuis: {quiz.title}
          </h2>
        </header>
        <form onSubmit={submit} className="mt-6">
          {quiz.question.map((item, index) => (
            <div
              className="mb-4 text-gray-700 text-sm lg:text-base"
              key={item.id}
            >
              <p className="mb-2">
                {index + 1}. {item.question}
              </p>

              <div className="flex flex-col">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    id={`answer${index}`}
                    name={`answer${index}`}
                    value={item.correct_answer}
                    checked={data[index].answer === item.correct_answer}
                    onChange={(e) => {
                      const newData = [...data];
                      newData[index] = {
                        ...newData[index],
                        answer: e.target.value,
                        score: item.score
                      };
                      setData(newData);
                    }}
                    required
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">{item.correct_answer}</span>
                </label>

                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    id={`answer${index}`}
                    name={`answer${index}`}
                    value={item.answer2}
                    checked={data[index].answer === item.answer2}
                    onChange={(e) => {
                      const newData = [...data];
                      newData[index] = {
                        ...newData[index],
                        answer: e.target.value,
                        score: 0
                      };
                      setData(newData);
                    }}
                    required
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">{item.answer2}</span>
                </label>

                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    id={`answer${index}`}
                    name={`answer${index}`}
                    value={item.answer3}
                    checked={data[index].answer === item.answer3}
                    onChange={(e) => {
                      const newData = [...data];
                      newData[index] = {
                        ...newData[index],
                        answer: e.target.value,
                        score: 0
                      };
                      setData(newData);
                    }}
                    required
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">{item.answer3}</span>
                </label>

                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    id={`answer${index}`}
                    name={`answer${index}`}
                    value={item.answer4}
                    checked={data[index].answer === item.answer4}
                    onChange={(e) => {
                      const newData = [...data];
                      newData[index] = {
                        ...newData[index],
                        answer: e.target.value,
                        score: 0
                      };
                      setData(newData);
                    }}
                    required
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">{item.answer4}</span>
                </label>
              </div>
            </div>
          ))}

          <div className="flex items-center mt-10 gap-4">
            <PrimaryButton disabled={processing}>Submit</PrimaryButton>
            <Transition
              show={processing}
              enter="transition ease-in-out"
              enterFrom="opacity-0"
              leave="transition ease-in-out"
              leaveTo="opacity-0"
            >
              <p className="text-sm text-gray-700 flex items-center">
                Submitting...
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
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default StudentQuizAnswerCreate;
