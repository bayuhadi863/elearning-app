import React, { useContext } from 'react';
import Select from 'react-select';
import { router } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import { usePage } from '@inertiajs/react';
import { DataContext } from '@/Contexts/DataContext';

const TeacherNavigation = ({ ctsAll, page }) => {
  const { url } = usePage();
  const { thisSeasonId } = useContext(DataContext);

  const ctsOptionDatas = [
    {
      value: 0,
      label: 'Semua Kelas'
    },
    ...ctsAll.map((item) => ({
      value: item.id,
      label: `${item.class.grade} ${item.class.name}`
    }))
  ];

  // Mendapatkan nilai id dari URL
  const match = url.match(new RegExp(`/teacher/${page}/class/(\\d+)`));
  const defaultCtsId = match ? parseInt(match[1], 10) : null;

  const ctsOptions = ctsOptionDatas.map((item) => ({
    value: item.value,
    label: item.label
  }));

  let defaultOption = null;

  if (url.startsWith(`/teacher/${page}`)) {
    defaultOption = ctsOptions.find((option) => option.value === defaultCtsId);
  } else {
    defaultOption = ctsOptions[0];
  }

  // console.log(defaultOption);

  const handleCtsChange = (selectedOption) => {
    router.get(
      selectedOption.value === 0
        ? `/teacher/${thisSeasonId}/${page}`
        : `/teacher/${page}/class/${selectedOption.value}`
    );
  };

  return (
    <div className="flex items-center gap-2 ">
      <div className="flex items-center gap-2 ">
        <InputLabel className="mb-1" htmlFor="ctsClass" value="Pilih Kelas" />
        <Select
          id="ctsClass"
          className="basic-single w-36"
          classNamePrefix="select"
          defaultValue={defaultOption}
          isSearchable={true}
          options={ctsOptions}
          onChange={handleCtsChange}
        />
      </div>
    </div>
  );
};

export default TeacherNavigation;
