import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function UpdateProfileInformation({ className = ''}) {
  const user = usePage().props.auth.user;

  const { errors } = usePage().props;

  const { data, setData, processing, recentlySuccessful } = useForm({
    phone: null,
    profile_picture: null
  });

  const submit = (e) => {
    e.preventDefault();
    router.post('/teacher/profile', {
      _method: 'patch',
      preserveState: true,
      profile_picture: data.profile_picture,
      phone: data.phone
    });
    Swal.fire({
      title: 'Good job!',
      text: 'Berhasil memperbarui profil.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      router.get(`/teacher/profile`);
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
          <InputLabel htmlFor="phone" value="Masukkan No. Handphone Baru" />
          <TextInput
            id="phone"
            type="text"
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
      <div className='grid grid-cols-5'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
}
