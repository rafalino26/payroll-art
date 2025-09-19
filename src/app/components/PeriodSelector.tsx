// file: app/components/PeriodSelector.tsx
"use client";

import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import Link from 'next/link';

type Period = {
  id: string;
  name: string;
};

type PeriodSelectorProps = {
  periods: Period[];
  currentPeriodId: string;
};

export default function PeriodSelector({ periods, currentPeriodId }: PeriodSelectorProps) {
  const currentPeriod = periods.find(p => p.id === currentPeriodId);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        {/* Tombol yang terlihat di UI */}
        <Menu.Button className="inline-flex w-full justify-center items-center gap-2 rounded-lg bg-[#e799ff] border border-gray-200 px-4 py-2 text-white font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
          {currentPeriod ? currentPeriod.name : 'Pilih Periode'}
          <FiChevronDown
            className="-mr-1 h-5 w-5 text-white"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      {/* Transisi untuk animasi dropdown */}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        {/* Panel item dropdown */}
        <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="px-1 py-1 ">
            {periods.map((period) => (
              <Menu.Item key={period.id}>
                {({ active }) => (
                  <Link
                    href={`/?periodId=${period.id}`}
                    className={`${
                      active || period.id === currentPeriodId ? 'bg-purple-100 text-purple-900' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {period.name}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}