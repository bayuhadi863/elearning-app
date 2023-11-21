import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import defaultProfile from '@/Assets/defaultProfile.png';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import gambar from '/public/assets/logo_smanda.png';

export default function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = '',
  nip
}) {
  const user = usePage().props.auth.user;

  const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      nip: nip,
      profile_picture: user.profile_picture
    });

  console.log(nip);
  console.log(name);

  const submit = (e) => {
    e.preventDefault();
    patch(route('profile.update'));
  };

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">
          Profile Information
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Anda hanya bisa mengubah nomor handphone Anda.
        </p>
      </header>
      <form onSubmit={submit} className="mt-6 space-y-6">
        <div className="flex mb-10 items-center gap-8">
          <img
            src={
              data.profile_picture
                ? `/profile_picture/${data.profile_picture}`
                : defaultProfile
            }
            alt="profile"
            className="h-24 rounded-full"
          />
          <img src={gambar} alt="profile" className="h-24 rounded-full" />
          <div className="flex flex-col gap-4">
            <input
              type="file"
              id="upload-photo"
              name="profile_picture"
              onChange={(e) => setData('profile_picture', e.target.files[0])}
            />
            <p className="text-sm">Allowed JPG, GIF or PNG. Max size of 800K</p>
          </div>
        </div>
        <div>
          <InputLabel htmlFor="name" value="Nama" />
          <TextInput
            id="name"
            className="mt-1 block w-full"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            required
            autoComplete="name"
          />
          <InputError className="mt-2" message={errors.name} />
        </div>
        <div>
          <InputLabel htmlFor="nip" value="NIP" />
          <TextInput
            id="nip"
            className={`mt-1 block w-full`}
            value={data.nip ? data.nip : ''}
            onChange={(e) => setData('nip', e.target.value)}
            required
            autoComplete="nip"
          />
          <InputError className="mt-2" message={errors.nip} />
        </div>
        <div>
          <InputLabel htmlFor="email" value="Email" />
          <TextInput
            id="email"
            type="email"
            className="mt-1 block w-full"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            required
            autoComplete="username"
          />
          <InputError className="mt-2" message={errors.email} />
        </div>
        <div>
          <InputLabel htmlFor="phone" value="No. Handphone" />
          <TextInput
            id="phone"
            className="mt-1 block w-full"
            value={data.phone ? data.phone : ''}
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
            <p className="text-sm text-gray-600">Saved.</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
