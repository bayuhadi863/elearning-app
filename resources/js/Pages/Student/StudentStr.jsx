import React, { useState, useContext, useEffect } from 'react';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import { Head, Link, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import QuizCard from '@/Components/QuizCard';
import StudentNavigation from '@/Components/StudentNavigation';
import { BreadCrumb } from 'primereact/breadcrumb';
import { DataContext } from '@/Contexts/DataContext';
import { GrScorecard } from 'react-icons/gr';
import { Chart } from 'primereact/chart';

const StudentStr = ({ auth, ctsItem, ctsAll, assignmentSubmits, quizzes }) => {
  const { url } = usePage();
  const { thisSeasonId } = useContext(DataContext);

  const quizScores = quizzes.map((item) => ({
    quiz_title: item.title,
    quiz_score: item.student_answer.reduce(
      (totalScore, answer) => totalScore + answer.score,
      0
    )
  }));

  console.log(quizScores);

  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  const [chartQuizData, setChartQuizData] = useState({});
  const [chartQuizOptions, setChartQuizOptions] = useState({});

  const [category, setCategory] = useState('assignment');

  const items = [
    {
      label: (
        <p
          className={` ${
            url === `/student/report/subject/${ctsItem.id}`
              ? 'font-semibold'
              : ''
          }`}
        >
          Kuis {ctsItem.subject.name}
        </p>
      ),
      url: `/student/report/subject/${ctsItem.id}`
    }
  ];
  const home = {
    label: <GrScorecard />,
    url: `/student/${thisSeasonId}/report`
  };

  useEffect(() => {
    const data = {
      labels: assignmentSubmits.map((item) =>
        item.assignment.title.length > 8
          ? item.assignment.title.slice(0, 15) + '...'
          : item.assignment.title
      ),
      datasets: [
        {
          label: 'Nilai',
          data: assignmentSubmits.map((item) => item.score),
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)'
          ],
          borderWidth: 1
        }
      ]
    };
    const options = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    const quizData = {
      labels: quizScores.map((item) => item.quiz_title),
      datasets: [
        {
          label: 'Nilai',
          data: quizScores.map((item) => item.quiz_score),
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)'
          ],
          borderWidth: 1
        }
      ]
    };
    const quizOptions = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    setChartData(data);
    setChartOptions(options);

    setChartQuizData(quizData);
    setChartQuizOptions(quizOptions);
  }, []);

  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Nilai'}>
      <Head title="Nilai" />

      <div className="px-4 mb-4">
        <BreadCrumb
          model={items}
          home={home}
          className="mb-4 px-2 bg-transparent text-sm"
        />
      </div>

      <div className="px-5 mb-4 mt-3 flex justify-between gap-2 flex-wrap">
        <p className="text-gray-700 text-xl font-semibold">
          Nilai {ctsItem.subject.name}
        </p>
        <div>
          <StudentNavigation ctsAll={ctsAll} page={'report'} />
        </div>
      </div>

      <div className="mx-4 mt-6">
        <nav className="flex gap-4 items-center mb-4">
          <button
            onClick={() => setCategory('assignment')}
            className={`${
              category === 'assignment'
                ? ' border-blue-600 text-blue-600'
                : 'text-gray-700 border-transparent'
            }  py-1 px-1 border-b font-medium transition-all`}
          >
            Tugas
          </button>
          <button
            onClick={() => setCategory('quiz')}
            className={`${
              category === 'quiz'
                ? ' border-blue-600 text-blue-600'
                : 'text-gray-700 border-transparent'
            }  py-1 px-1 border-b font-medium transition-all`}
          >
            Kuis
          </button>
        </nav>
        <div className="">
          {category === 'assignment' ? (
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="card">
                <Chart
                  type="bar"
                  className=""
                  data={chartData}
                  options={chartOptions}
                />
              </div>
            </div>
          ) : (
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="card w-full">
                <Chart
                  type="bar"
                  className="w-full"
                  data={chartQuizData}
                  options={chartQuizOptions}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default StudentStr;
