import React from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import Swal from 'sweetalert2';

const CreateTeacherForm = ({ className = '' }) => {
  const { data, setData, post, processing, errors, reset, recentlySuccessful } =
    useForm({
      name: null,
      email: null,
      password: null,
      nip: null,
      phone: null
    });

  const submit = (e) => {
    e.preventDefault();
    post('/admin/teacher', {
      preserveScroll: true,
      onSuccess: () => {
        reset('name');
        reset('email');
        reset('password');
        reset('nip');
        reset('phone');
        Swal.fire({
          title: 'Good job!',
          text: 'Berhasil menambahkan data.',
          icon: 'success'
        });
      }
    });
  };
  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">
          Masukkan Data Guru Baru
        </h2>
      </header>
      <form onSubmit={submit} className="mt-6 space-y-6">
        <div>
          <InputLabel htmlFor="name" value="Name" />
          <TextInput
            id="name"
            type="text"
            className="mt-1 block w-full"
            onChange={(e) => setData('name', e.target.value)}
            autoComplete="name"
          />
          <InputError className="mt-2" message={errors.name} />
        </div>
        <div>
          <InputLabel htmlFor="email" value="Email" />
          <TextInput
            id="email"
            type="email"
            className="mt-1 block w-full"
            onChange={(e) => setData('email', e.target.value)}
            autoComplete="email"
          />
          <InputError className="mt-2" message={errors.email} />
        </div>
        <div>
          <InputLabel htmlFor="password" value="Password" />
          <TextInput
            id="password"
            type="password"
            className="mt-1 block w-full"
            onChange={(e) => setData('password', e.target.value)}
            autoComplete="password"
          />
          <InputError className="mt-2" message={errors.password} />
        </div>
        <div>
          <InputLabel htmlFor="nip" value="NIP" />
          <TextInput
            id="nip"
            type="number"
            className="mt-1 block w-full"
            onChange={(e) => setData('nip', e.target.value)}
            autoComplete="nip"
          />
          <InputError className="mt-2" message={errors.nip} />
        </div>
        <div>
          <InputLabel htmlFor="phone" value="Phone" />
          <TextInput
            id="phone"
            type="text"
            className="mt-1 block w-full"
            onChange={(e) => setData('phone', e.target.value)}
            autoComplete="phone"
          />
          <InputError className="mt-2" message={errors.phone} />
        </div>
        <div className="flex items-center gap-4">
          <PrimaryButton disabled={processing}>Save</PrimaryButton>
          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-green-500 flex items-center">
              Berhasil <AiOutlineCheckCircle />
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

export default CreateTeacherForm;
