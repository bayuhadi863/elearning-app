import React, { useContext } from 'react';
import Select from 'react-select';
import { router } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import { usePage } from '@inertiajs/react';
import { DataContext } from '@/Contexts/DataContext';

const StudentNavigation = ({ ctsAll, page }) => {
  const { url } = usePage();
  const { thisSeasonId } = useContext(DataContext);

  const ctsOptionDatas = [
    {
      value: 0,
      label: 'Semua Mapel'
    },
    ...ctsAll.map((item) => ({
      value: item.id,
      label: item.subject.name
    }))
  ];

  // Mendapatkan nilai id dari URL
  const match = url.match(new RegExp(`/student/${page}/subject/(\\d+)`));
  const defaultCtsId = match ? parseInt(match[1], 10) : null;

  const ctsOptions = ctsOptionDatas.map((item) => ({
    value: item.value,
    label: item.label
  }));

  let defaultOption = null;

  if (url.startsWith(`/student/${page}`)) {
    defaultOption = ctsOptions.find((option) => option.value === defaultCtsId);
  } else {
    defaultOption = ctsOptions[0];
  }

  // console.log(defaultOption);

  const handleCtsChange = (selectedOption) => {
    router.get(
      selectedOption.value === 0
        ? `/student/${thisSeasonId}/${page}`
        : `/student/${page}/subject/${selectedOption.value}`
    );
  };

  return (
    <div className="flex items-center gap-2 ">
      <div className="flex items-center gap-2 ">
        <InputLabel className="mb-1" htmlFor="ctsSubject" value="Pilih Mapel" />
        <Select
          id="ctsSubject"
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

export default StudentNavigation;
