import React, { useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  getSortedRowModel
} from '@tanstack/react-table';
import defaultProfile from '/public/assets/defaultProfileSquare.png';
import DebouncedInput from '@/Components/DebouncedInput';
import { Link, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { AiOutlinePlusCircle } from 'react-icons/ai';

const CtsStudentDataTable = ({ data, user, kelas_id = 0 }) => {
  const role = user.role;
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('no', {
      cell: (info) => <span>{info.getValue()}</span>,
      header: 'No.'
    }),
    columnHelper.accessor('profile_picture', {
      cell: (info) =>
        info.getValue() !== null ? (
          <img
            src={`/profile_picture/${info.getValue()}`}
            alt="..."
            className="rounded-full w-8 h-8 object-cover"
          />
        ) : (
          <img
            src={defaultProfile}
            alt="Default Profile"
            className="rounded-full w-8 h-8 object-cover"
          />
        ),
      header: 'Photo'
    }),
    columnHelper.accessor('nis', {
      cell: (info) => <span>{info.getValue()}</span>,
      header: 'NIS'
    }),
    columnHelper.accessor('name', {
      cell: (info) => <span>{info.getValue()}</span>,
      header: 'Nama'
    })
  ];

  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting: sorting
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting
  });

  return (
    <div className="p-4 max-w-5xl mx-auto fill-gray-400 bg-white shadow-md rounded-xl">
      <div className="text-gray-700 text-md md:text-xl mb-2 font-bold">
        Daftar Siswa
      </div>
      <div className="flex justify-between mb-2 items-center">
        <div className="flex items-center gap-1">
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={(value) => setGlobalFilter(String(value))}
            className="p-2 bg-white rounded-lg border w-36 lg:w-60 duration-300"
            placeholder="Cari semua kolom..."
          />
        </div>
        {role === 'admin' && (
          <div className="flex justify-end">
            <Link href={`/admin/class/${kelas_id}/edit`}>
              <PrimaryButton className="flex gap-1 items-center">
                <AiOutlinePlusCircle /> <span>Tambah</span>
              </PrimaryButton>
            </Link>
          </div>
        )}
      </div>

      <div className="max-w-full overflow-x-auto pb-4">
        <table className=" w-full text-left text-gray-900 text-md text-sm">
          <thead className="bg-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className="bg-white" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="capitalize px-3.5 py-2"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {
                      { asc: '⬆️', desc: '⬇️' }[
                        header.column.getIsSorted() ?? null
                      ]
                    }
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  className={`
                ${i % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                text-gray-800`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-3.5 py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="text-center h-32">
                <td colSpan={12}>No Recoard Found!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* pagination */}
      <div className="flex items-center justify-end mt-2 gap-2 text-xs">
        <button
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
          className="p-1 border border-gray-500 px-2 disabled:opacity-50"
        >
          {'<'}
        </button>
        <button
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
          className="p-1 border border-gray-500 px-2 disabled:opacity-50"
        >
          {'>'}
        </button>

        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="hidden sm:flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-10 bg-white"
          />
        </span>
        <label htmlFor="">Show</label>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="py-1 px-2 w-16 bg-white rounded border-gray-500 cursor-pointer"
        >
          {[10, 20, 30, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CtsStudentDataTable;
