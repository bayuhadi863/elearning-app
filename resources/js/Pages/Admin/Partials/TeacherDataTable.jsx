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
import { BsEye, BsTrash3 } from 'react-icons/bs';
import { LiaEdit } from 'react-icons/lia';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Link, router } from '@inertiajs/react';
import Swal from 'sweetalert2';

const TeacherDataTable = ({ data }) => {
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('id', {
      cell: (info) => <span>{info.getValue()}</span>,
      header: 'ID'
    }),
    columnHelper.accessor('profile_picture', {
      cell: (info) =>
        info.getValue() !== null ? (
          <img
            src={`/profile_picture/${info.getValue()}`}
            alt="..."
            className="rounded-full w-10 h-10 object-cover"
          />
        ) : (
          <img
            src={defaultProfile}
            alt="Default Profile"
            className="rounded-full w-10 h-10 object-cover"
          />
        ),
      header: 'Profile'
    }),
    columnHelper.accessor('name', {
      cell: (info) => <span>{info.getValue()}</span>,
      header: 'Name'
    }),
    columnHelper.accessor('email', {
      cell: (info) => <span>{info.getValue()}</span>,
      header: 'Email'
    }),
    columnHelper.accessor('phone', {
      cell: (info) => <span>{info.getValue()}</span>,
      header: 'Phone'
    }),
    columnHelper.accessor('nip', {
      cell: (info) => <span>{info.getValue()}</span>,
      header: 'NIP'
    }),
    {
      cell: (info) => (
        <div className="flex gap-1">
          <Link
            href={`/admin/teacher/${info.row.original.id}`}
            className="bg-amber-400 p-2 rounded hover:bg-amber-500 transition"
          >
            <BsEye />
          </Link>
          <Link
            href={`/admin/teacher/${info.row.original.id}/edit`}
            className="bg-blue-500 p-2 rounded text-white hover:bg-blue-600 transition"
          >
            <LiaEdit />
          </Link>
          <button
            onClick={() => handleDeleteClick(info.row.original.id)}
            className="bg-red-500 p-2 rounded text-white hover:bg-red-600 transition"
          >
            <BsTrash3 />
          </button>
        </div>
      ),
      header: 'Action'
    }
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

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        router.visit(`/admin/teacher/${id}`, { method: 'delete' });
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success'
        });
      }
    });
  };

  return (
    <div className="p-4 max-w-5xl mx-auto fill-gray-400 bg-white shadow-md rounded-xl">
      <div className="flex justify-between mb-2">
        <div className="w-full flex items-center gap-1">
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={(value) => setGlobalFilter(String(value))}
            className="p-2 bg-white rounded-lg border w-3/5 lg:w-1/5 focus:w-4/5 lg:focus:w-1/3 duration-300"
            placeholder="Cari semua kolom..."
          />
        </div>
        <div>
          <Link
            href={route('adminTeacher.create')}
            className="flex bg-blue-600 items-center py-2 px-3 hover:bg-blue-700 transition rounded-md text-white"
          >
            <AiOutlinePlusCircle /> <span>Tambah</span>
          </Link>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto pb-4">
        <table className=" w-full text-left text-gray-900 text-sm">
          <thead className="bg-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
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
      <div className="hidden sm:flex items-center justify-end mt-2 gap-2 text-xs">
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
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16 bg-white"
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

export default TeacherDataTable;
