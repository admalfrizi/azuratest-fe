import React from 'react';
import { formatReadableDate } from '../../lib/utils';

export interface SearchRowProps {
  categories: Categories[];
  publication_dates: string[];
  selectedCategoryId: number | undefined;
  onSelectCategory: (id: number | undefined) => void;
  selectedDate: string | null;
  onSelectDate: (time: string | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSubmitSearch: () => void;
}

export const SearchRow: React.FC<SearchRowProps> = ({
  categories,
  publication_dates,
  selectedCategoryId,
  onSelectCategory,
  selectedDate,
  onSelectDate,
  searchQuery,
  onSearchChange,
  onSubmitSearch,
}) => {
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitSearch();
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row items-center gap-3 w-full"
    >
      <div className="relative w-full md:w-1/4">
        <select
          value={selectedCategoryId || ''}
          onChange={(e) => onSelectCategory(e.target.value === '' ? undefined : Number(e.target.value))}
          className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2.5 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F2942] focus:border-transparent cursor-pointer text-sm font-medium transition-all"
        >
          <option value="">Kategori Buku</option>
          {categories.map((data, idx) => (
            <option key={idx} value={data.id}>{data.name}</option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div className="relative w-full md:w-1/4">
        <select
          value={selectedDate || ''}
          onChange={(e) => onSelectDate(e.target.value === '' ? null : e.target.value)}
          className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2.5 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F2942] focus:border-transparent cursor-pointer text-sm font-medium transition-all"
        >
          <option value="">Tanggal Publikasi</option>
          {publication_dates.map((time, idx) => (
            <option key={idx} value={time}>{formatReadableDate(time)}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div className="flex w-full md:w-2/4">
        <button
          type="submit"
          className="bg-white text-black ps-4 border border-gray-200 border-r-0 rounded-s-lg transition-colors flex items-center justify-center"
          aria-label="Cari Buku"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari Buku Disini"
          className="w-full bg-white border border-gray-200 border-l-0 text-gray-700 py-2.5 px-4 rounded-r-lg focus:outline-none focus:ring-0 focus:ring-[#0F2942] focus:border-s-0 text-sm placeholder-gray-400"
        />
        
      </div>

    </form>
  );
};