import React, { useState, useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import WebsiteLogo from '/public/assets/website_logo_real.png';

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: '' // Default role is 'student'
  });

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  const [role, setRole] = useState('student');

  const submit = (e) => {
    e.preventDefault();

    // Set data role to the selected value
    setData('role', role);

    post(route('register'));

    console.log('success');
  };

  return (
    <GuestLayout page={'register'}>
      <Head title="Register" />
      <div className="w-full sm:max-w-md px-10 pt-4 pb-8 mt-24 mb-16 mx-4 bg-white shadow border rounded-lg">
        <div className="flex items-center justify-center mt-6">
          <img src={WebsiteLogo} alt="logo" height="65" width="65" />
        </div>
        <div className="mt-4 mb-6 text-center text-2xl font-light text-gray-700">
          Create New Account
        </div>
        <form onSubmit={submit}>
          <div>
            <InputLabel htmlFor="name" value="Name" />

            <TextInput
              id="name"
              name="name"
              value={data.name}
              className="mt-1 block w-full"
              autoComplete="name"
              isFocused={true}
              onChange={(e) => setData('name', e.target.value)}
              required
            />

            <InputError message={errors.name} className="mt-2" />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="email" value="Email" />

            <TextInput
              id="email"
              type="email"
              name="email"
              value={data.email}
              className="mt-1 block w-full"
              autoComplete="username"
              onChange={(e) => setData('email', e.target.value)}
              required
            />

            <InputError message={errors.email} className="mt-2" />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="password" value="Password" />

            <TextInput
              id="password"
              type="password"
              name="password"
              value={data.password}
              className="mt-1 block w-full"
              autoComplete="new-password"
              onChange={(e) => setData('password', e.target.value)}
              required
            />

            <InputError message={errors.password} className="mt-2" />
          </div>

          <div className="mt-4">
            <InputLabel
              htmlFor="password_confirmation"
              value="Confirm Password"
            />

            <TextInput
              id="password_confirmation"
              type="password"
              name="password_confirmation"
              value={data.password_confirmation}
              className="mt-1 block w-full"
              autoComplete="new-password"
              onChange={(e) => setData('password_confirmation', e.target.value)}
              required
            />

            <InputError
              message={errors.password_confirmation}
              className="mt-2"
            />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="role" value="Role" />

            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  id="roleStudent"
                  name="role"
                  value="student"
                  checked={role === 'student'}
                  onChange={() => setRole('student')}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Siswa</span>
              </label>

              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  id="roleTeacher"
                  name="role"
                  value="teacher"
                  checked={role === 'teacher'}
                  onChange={() => setRole('teacher')}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Guru</span>
              </label>

              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  id="roleAdmin"
                  name="role"
                  value="admin"
                  checked={role === 'admin'}
                  onChange={() => setRole('admin')}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Admin</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end mt-4">
            <Link
              href={route('login')}
              className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Already registered?
            </Link>

            <PrimaryButton className="ml-4" disabled={processing}>
              Register
            </PrimaryButton>
          </div>
        </form>
      </div>
    </GuestLayout>
  );
}
