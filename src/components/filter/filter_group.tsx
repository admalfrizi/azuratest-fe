import { Card } from "../ui/card"
import { SearchRow } from "./search_row"

const FilterGroup = ({...props}) => {
    return (
        <Card className="w-full max-w-5xl bg-white rounded-xl p-6 flex flex-col gap-4">
            <SearchRow 
                selectedDay={props.selectedDay} 
                onSelectDay={props.onSelectDay} 
                selectedTime={null} 
                onSelectTime={props.onSelectTime} 
                searchQuery={props.searchQuery} 
                onSearchChange={props.onSearchChange} 
                onSubmitSearch={props.onSubmitSearch} 
            />
        </Card>
    )
}

export default FilterGroup