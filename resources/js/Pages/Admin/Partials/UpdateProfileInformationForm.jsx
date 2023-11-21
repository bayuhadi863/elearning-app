import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function UpdateProfileInformation({ className = '', user }) {
  const { data, setData, processing, recentlySuccessful, errors } = useForm({
    phone: user.phone,
    email: user.email,
    name: user.name,
    profile_picture: null
  });

  const submit = (e) => {
    e.preventDefault();
    router.post('/admin/profile', {
      _method: 'patch',
      preserveState: true,
      profile_picture: data.profile_picture,
      phone: data.phone,
      name: data.name,
      email: data.email
    });
    Swal.fire({
      title: 'Good job!',
      text: 'Berhasil memperbarui profil.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      router.get(`/admin/profile`);
    });
  };

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">
          Profile Information
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Anda hanya bisa mengubah no. handphone dan foto Anda. Ubah foto dan
          no. handphone secara bersamaan
        </p>
      </header>
      <form onSubmit={submit} className="mt-6 space-y-6">
        <div>
          <InputLabel htmlFor="name" value="Nama" />
          <TextInput
            id="name"
            type="text"
            value={data.name ? data.name : ''}
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
            type="text"
            value={data.email ? data.email : ''}
            className="mt-1 block w-full"
            onChange={(e) => setData('email', e.target.value)}
            autoComplete="email"
          />
          <InputError className="mt-2" message={errors.email} />
        </div>
        <div>
          <InputLabel htmlFor="phone" value="No. Handphone" />
          <TextInput
            id="phone"
            type="text"
            value={data.phone ? data.phone : ''}
            className="mt-1 block w-full"
            onChange={(e) => setData('phone', e.target.value)}
            autoComplete="phone"
          />
          <InputError className="mt-2" message={errors.phone} />
        </div>
        <div>
          <InputLabel htmlFor="profilePicture" value="Ubah Foto Profil" />
          <TextInput
            id="profile_picture"
            type="file"
            className="mt-1 block w-full py-1"
            onChange={(e) => setData('profile_picture', e.target.files[0])}
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
            <p className="text-sm text-gray-600">Saved.</p>
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
}
