import { useState } from 'react';
import ListContent from '../components/list_content';
import { useBooks } from '../hooks/use-books';
import FilterGroup from '../../../components/filter/filter_group';

const BooksPage = () => {
    const [page, setPage] = useState<number>(
        1
    );

    const [perPage, setSize] = useState<number>(
        5
    );
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'jadwal' | 'semua'>('jadwal');
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const handleFiltersChanged = (activeFilters: string[]) => {
        console.log("Currently selected filters:", activeFilters);
        // Result: ['Essential', 'Pre-Marriage']
        // You would use this array to `.filter()` your psychologist data API response
    };

    const apiParams = {
        page,
        perPage
    };

    const { data: books, isLoading, isError, error } = useBooks(apiParams);

    console.log("data :", books)
    
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
            <ListContent books={books?.data}/>
        </div>
    );
};

export default BooksPage;