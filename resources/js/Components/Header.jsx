// eslint-disable-next-line no-unused-vars
import { React, useState, useEffect } from 'react';
import { Dialog, Popover } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import LogoLandscape from '/public/assets/website-logo-landscape.png';
import { Link } from '@inertiajs/react';

export default function Header({ page }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 10) {
      // Tambahkan kelas "shadow" jika posisi gulir > 10 piksel
      setHasShadow(true);
    } else {
      // Hapus kelas "shadow" jika posisi gulir <= 10 piksel
      setHasShadow(false);
    }
  };

  useEffect(() => {
    // Pasang event listener untuk peristiwa scroll saat komponen dimuat
    window.addEventListener('scroll', handleScroll);
    return () => {
      // Hapus event listener saat komponen dibongkar
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between py-6 px-4 md:px-10 lg:px-24 ${
          hasShadow ? 'shadow-md bg-white' : 'bg-transparent' // Tambahkan kelas "shadow" jika hasShadow true
        }`}
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-10 w-auto" src={LogoLandscape} alt="" />
          </Link>
        </div>
        {page === 'landingPage' ? (
          <div className={`flex lg:hidden ${mobileMenuOpen ? 'hidden' : ''}`}>
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        ) : (
          ''
        )}

        {page === 'landingPage' ? (
          <Popover.Group className="hidden lg:flex lg:gap-x-12">
            <a
              href="#home"
              className="text-lg leading-6 text-gray-700 hover:underline transition-all duration-200"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-lg leading-6 text-gray-700 hover:underline transition-all duration-200"
            >
              About
            </a>
            <a
              href="#features"
              className="text-lg leading-6 text-gray-700 hover:underline transition-all duration-200"
            >
              Features
            </a>
            <a
              href="#contact"
              className="text-lg leading-6 text-gray-700 hover:underline transition-all duration-200"
            >
              Contact
            </a>
          </Popover.Group>
        ) : (
          ''
        )}

        <div
          className={`${
            page === 'landingPage' ? 'hidden' : ''
          } lg:flex lg:flex-1 lg:justify-end items-center`}
        >
          {page === 'landingPage' ? (
            <Link
              href={route('login')}
              className="text-lg leading-6 text-gray-700 me-4 hover:underline"
            >
              Log in <span aria-hidden="true"></span>
            </Link>
          ) : (
            ''
          )}
          {page === 'landingPage' || page === 'login' ? (
            <Link
              href={route('register')}
              className="text-lg leading-6 text-white py-2 px-3 rounded-md bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 transition ease-in duration-200"
            >
              Register <span aria-hidden="true"></span>
            </Link>
          ) : (
            <Link
              href={route('login')}
              className="text-lg leading-6 text-white py-2 px-3 rounded-md bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200"
            >
              Log in <span aria-hidden="true"></span>
            </Link>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 ">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700 "
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="#home"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 text-gray-900 hover:bg-blue-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </a>
                <a
                  href="#about"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 text-gray-900 hover:bg-blue-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </a>
                <a
                  href="#features"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 text-gray-900 hover:bg-blue-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a
                  href="#contact"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 text-gray-900 hover:bg-blue-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </a>
              </div>
              <div className="py-6">
                <a
                  href={route('login')}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base leading-7 text-gray-900 hover:bg-blue-50"
                >
                  Log in
                </a>
                <a
                  href={route('register')}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base leading-7 text-gray-900 hover:bg-blue-50"
                >
                  Register
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
