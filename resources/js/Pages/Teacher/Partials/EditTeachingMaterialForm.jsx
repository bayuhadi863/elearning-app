import React, { useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm, router } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import Swal from 'sweetalert2';

const EditTeachingMaterialForm = ({
  className = '',
  materi,
  fileLink,
  kelas
}) => {
  const { data, setData, post, processing, errors, reset, recentlySuccessful } =
    useForm({
      title: materi.title,
      type: materi.type,
      document_file: null,
      video_link: materi.video_link
    });

  const [isUploading, setIsUploading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    router.post(`/teacher/materi/${materi.id}`, {
      _method: 'patch',
      title: data.title,
      type: data.type,
      document_file: data.document_file,
      video_link: data.video_link
    });
    Swal.fire({
      title: 'Good job!',
      text: 'Berhasil mengedit materi.',
      icon: 'success'
    }).then(() => {
      router.get(`/teacher/materi/class/${kelas.id}`);
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
          <InputLabel htmlFor="title" value="Judul Materi" />
          <TextInput
            id="title"
            type="text"
            className="mt-1 block w-full"
            value={data.title}
            required
            onChange={(e) => setData('title', e.target.value)}
            autoComplete="title"
          />
          <InputError className="mt-2" message={errors.title} />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="type" value="Tipe File" />

          <div className="mt-1">
            <label className="inline-flex items-center">
              <input
                type="radio"
                id="typeDocument"
                name="type"
                value="document"
                disabled={data.type === 'video' ? true : false}
                checked={data.type === 'document'}
                onChange={() => setData('type', 'document')}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-2">Dokumen</span>
            </label>

            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                id="typeVideo"
                name="type"
                disabled={data.type === 'document' ? true : false}
                value="video"
                checked={data.type === 'video'}
                onChange={() => setData('type', 'video')}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-2">Video</span>
            </label>
          </div>
        </div>
        {data.type === 'document' ? (
          <div>
            <InputLabel htmlFor="document_file" value="File Materi" />
            <TextInput
              id="document_file"
              type="file"
              className="mt-1 block w-full py-1"
              onChange={(e) => setData('document_file', e.target.files[0])}
            />
            <InputError className="mt-2" message={errors.document_file} />
          </div>
        ) : (
          <div>
            <InputLabel
              htmlFor="video_link"
              value="Link YouTube Video Materi"
            />
            <TextInput
              id="video_link"
              type="text"
              className="mt-1 block w-full"
              onChange={(e) => setData('video_link', e.target.value)}
              autoComplete="video_link"
            />
            <InputError className="mt-2" message={errors.video_link} />
          </div>
        )}

        <div className="flex items-center gap-4">
          <PrimaryButton disabled={isUploading}>Update</PrimaryButton>
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

export default EditTeachingMaterialForm;
