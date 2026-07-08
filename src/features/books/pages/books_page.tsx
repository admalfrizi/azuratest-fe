import { useMemo, useState } from 'react';
import ListContent from '../components/list_content';
import { useBooks } from '../hooks/use-books';
import FilterGroup from '../../../components/filter/filter_group';
import type { PaginationState } from '@tanstack/react-table';
import type { GetPaginationParams } from '../../../types/params';

const BooksPage = () => {
   const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    });

    const pageParams: GetPaginationParams = {
        page: pagination.pageIndex + 1,
        perPage: pagination.pageSize
    }

    const [activeTab, setActiveTab] = useState<'jadwal' | 'semua'>('jadwal');
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<string | null>(null);


    const { data } = useBooks(pageParams);
    const books = useMemo(() => data?.data ?? [], [data]);
    
    return (
        <div className="container mx-auto py-8">
            <FilterGroup 
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                selectedDay={selectedDay}
                onSelectDay={setSelectedDay}
                selectedTime={selectedTime}
                onSelectTime={setSelectedTime}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
            />
            <ListContent books={books}/>
        </div>
    );
};

export default BooksPage;