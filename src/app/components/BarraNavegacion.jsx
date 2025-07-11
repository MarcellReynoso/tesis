import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import OptimizedImage from "./OptimizedImage";

// Determinar si estamos en producción para usar la carpeta base
// const isProduction = process.env.NODE_ENV === 'local';
// const basePath = isProduction ? '/marcell' : '';

const navigation = [
  // { name: "Dashboard general", href: `/datos` },
  { name: "Sensores", href: `/sensores` },
  { name: "Ambiental", href: `/ambiental` },
  { name: "Corporal", href: `/corporal`},
];

export default function BarraNavegacion() {
  return (
    <Disclosure as="nav" className="tarjeta text-white">
      <div className="lg:mx-auto lg:px-45 px-1">
        <div className="relative flex h-16 items-center justify-between w-full">
          {/* Botón menú mobile */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group inline-flex items-center justify-center rounded-md p-2 focus:ring-2 focus:ring-inset focus:ring-black">
              <Bars3Icon
                className="block size-6 group-data-open:hidden"
                aria-hidden="true"
              />
              <XMarkIcon
                className="hidden size-6 group-data-open:block"
                aria-hidden="true"
              />
            </DisclosureButton>
          </div>

          <div className="hidden md:flex flex-1 items-center justify-between">
            {/* Logo */}
            <div className="">
              <Link href={`/`}>
                <OptimizedImage 
                  alt="Logo" 
                  src="/img/logoUNJBGBlanco.png"
                  width={200}
                  height={80}
                  className="h-20 w-auto" 
                />
              </Link>
            </div>

            {/* Botones del navbar */}
            <div className="flex space-x-6 gap-7">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="roboto rounded-md px-3 py-2 text-lg font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Menú mobile */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-4 px-4 pt-4 pb-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex w-full items-center justify-start rounded-md text-base font-medium"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
