import React from 'react';

export interface SearchRowProps {
  categories: Categories[];
  selectedCategoryId: number | undefined;
  onSelectCategory: (id: number | undefined) => void;
  selectedTime: string | null;
  onSelectTime: (time: string | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSubmitSearch: () => void;
}

const TIME_OPTIONS = [
  'Pagi (08:00 - 12:00)', 
  'Siang (12:00 - 15:00)', 
  'Sore (15:00 - 18:00)', 
  'Malam (18:00 - 21:00)'
];

export const SearchRow: React.FC<SearchRowProps> = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
  selectedTime,
  onSelectTime,
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
          value={selectedTime || ''}
          onChange={(e) => onSelectTime(e.target.value === '' ? null : e.target.value)}
          className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2.5 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F2942] focus:border-transparent cursor-pointer text-sm font-medium transition-all"
        >
          <option value="">Tanggal Publikasi</option>
          {TIME_OPTIONS.map(time => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div className="flex w-full md:w-2/4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari Buku Disini"
          className="w-full bg-white border border-gray-200 border-r-0 text-gray-700 py-2.5 px-4 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#0F2942] focus:border-transparent text-sm placeholder-gray-400"
        />
        <button
          type="submit"
          className="bg-[#215992] hover:bg-[#1a3a5a] text-white px-5 py-2.5 rounded-r-lg transition-colors flex items-center justify-center"
          aria-label="Cari Buku"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>

    </form>
  );
};