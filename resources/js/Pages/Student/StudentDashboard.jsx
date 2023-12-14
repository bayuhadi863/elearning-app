import AccumulateCard from '@/Components/AccumulateCard';
import AuthenticatedLayoutNew from '@/Layouts/AuthenticatedLayoutNew';
import InputLabel from '@/Components/InputLabel';
import Select from 'react-select';
import { router } from '@inertiajs/react';
import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '@/Contexts/DataContext';

const StudentDashboard = ({
  auth,
  thisSeason,
  seasons,
  cts,
  teachingMaterials,
  assignments,
  quizzes
}) => {
  const materiVideo = teachingMaterials
    ? teachingMaterials.filter((item) => item.type === 'video')
    : [];
  const materiDocument = teachingMaterials
    ? teachingMaterials.filter((item) => item.type === 'document')
    : [];

  const thisDate = new Date();
  const deadlineDate = (date) => {
    return new Date(date);
  };

  const activeAssignment = assignments.filter(
    (item) => thisDate <= deadlineDate(item.deadline)
  );
  const expiredAssignment = assignments.filter(
    (item) => thisDate > deadlineDate(item.deadline)
  );

  const startedQuizzes = quizzes.filter((item) => item.is_started === 1);
  const unstartedQuizzes = quizzes.filter((item) => item.is_started === 0);

  const { thisSeasonId, setThisSeasonId } = useContext(DataContext);

  const thisSeasonOptions = seasons.map((item) => ({
    value: item.id,
    label: `${item.start_year}/${item.end_year} (${item.semester
      .charAt(0)
      .toUpperCase()}${item.semester.slice(1)})`
  }));

  const [defaultOption, setDefaultValue] = useState(
    thisSeasonOptions.find((option) => option.value === thisSeason.id)
  );

  const handleThisSeasonChange = (selectedOption) => {
    router.get(`/student/dashboard/${selectedOption.value}`);
  };

  useEffect(() => {
    const storedSeasonId = localStorage.getItem('thisSeasonId');
    const storedSeasonIdInt = storedSeasonId
      ? parseInt(storedSeasonId, 10)
      : null;

    if (thisSeason.id !== storedSeasonIdInt) {
      localStorage.setItem('thisSeasonId', thisSeason.id);
      setThisSeasonId(thisSeason.id);
      setDefaultValue(
        thisSeasonOptions.find((option) => option.value === thisSeason.id)
      );
    }
  }, [setThisSeasonId, thisSeason.id, thisSeasonOptions]);

  return (
    <AuthenticatedLayoutNew auth={auth} headerTitle={'Dashboard'}>
      <div className="sm:flex sm:gap-2 px-5 sm:items-center mb-4">
        <InputLabel
          className="mb-1"
          htmlFor="thisSeason"
          value="Tahun Ajaran"
        />
        <Select
          id="thisSeason"
          className="basic-single w-44"
          classNamePrefix="select"
          defaultValue={defaultOption}
          isSearchable={true}
          options={thisSeasonOptions}
          onChange={handleThisSeasonChange}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              fontSize: '0.875rem'
            })
          }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
        <AccumulateCard
          title={'Mata Pelajaran'}
          total={cts.length}
          detail={`Umum, IPA, IPS, Bahasa`}
        />
        <AccumulateCard
          title={'Materi'}
          total={teachingMaterials.length}
          detail={`${materiDocument.length} Dokumen, ${materiVideo.length} Video`}
        />
        <AccumulateCard
          title={'Tugas'}
          total={assignments.length}
          detail={`${activeAssignment.length} Active, ${expiredAssignment.length} Expired`}
        />
        <AccumulateCard
          title={'Kuis'}
          total={quizzes.length}
          detail={`${startedQuizzes.length} Started, ${unstartedQuizzes.length} Unstarted`}
        />
      </div>
    </AuthenticatedLayoutNew>
  );
};

export default StudentDashboard;
