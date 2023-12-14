import React, { useContext, useState } from 'react';
import CreateQuestionForm from './Partials/CreateQuestionForm';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import { Head, usePage } from '@inertiajs/react';
import { BreadCrumb } from 'primereact/breadcrumb';
import { DataContext } from '@/Contexts/DataContext';
import { MdOutlineQuiz } from 'react-icons/md';
import StartQuizForm from './Partials/StartQuizForm';

const TeacherQuestionCreate = ({ auth, kelas, quiz }) => {
  const { url } = usePage();
  const { thisSeasonId } = useContext(DataContext);
  const [answerSave, setAnswerSave] = useState(0);

  console.log(answerSave);

  const items = [
    {
      label: (
        <p
          className={` ${
            url === `/teacher/quiz/class/${kelas.id}` ? 'font-semibold' : ''
          }`}
        >
          Kuis {kelas.class.grade} {kelas.class.name}
        </p>
      ),
      url: `/teacher/quiz/class/${kelas.id}`
    },
    {
      label: (
        <p
          className={` ${
            url === `/teacher/quiz/class/${kelas.id}` ? 'font-semibold' : ''
          }`}
        >
          Detail
        </p>
      ),
      url: `/teacher/quiz/class/${kelas.id}`
    },
    {
      label: (
        <p
          className={` ${
            url === `/teacher/quiz/${quiz.id}/question/create`
              ? 'font-semibold'
              : ''
          }`}
        >
          Buat Pertanyaan
        </p>
      ),
      url: `/teacher/quiz/${quiz.id}/question/create`
    }
  ];
  const home = {
    label: <MdOutlineQuiz />,
    url: `/teacher/${thisSeasonId}/quiz`
  };

  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Upload Materi'}>
      <Head title="Buat Kuis Baru" />

      <div className="px-4 mb-4">
        <BreadCrumb
          model={items}
          home={home}
          className="mb-4 px-2 bg-transparent text-sm"
        />
      </div>

      {[...Array(quiz.number_of_question)].map((_, index) => (
        <div
          key={index}
          className="p-4 sm:p-8 bg-white shadow mb-4 rounded-xl mx-4"
        >
          <CreateQuestionForm
            kelas={kelas}
            index={index}
            quiz={quiz}
            answerSave={answerSave}
            setAnswerSave={setAnswerSave}
          />
        </div>
      ))}

      <div className="p-4 sm:p-8 bg-white shadow mb-4 rounded-xl mx-4">
        <StartQuizForm
          className="max-w-xl"
          answerSave={answerSave}
          quiz={quiz}
          kelas={kelas}
        />
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default TeacherQuestionCreate;
