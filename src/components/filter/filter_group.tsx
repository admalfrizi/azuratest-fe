import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { SearchRow } from "./search_row"

const FilterGroup = ({...props}) => {
    return (
        <Card className="w-full max-w-5xl bg-white rounded-xl p-6 flex flex-col gap-4">
            <div className="flex flex-row gap-x-6">
                <SearchRow 
                    selectedDay={props.selectedDay} 
                    onSelectDay={props.onSelectDay} 
                    selectedTime={null} 
                    onSelectTime={props.onSelectTime} 
                    searchQuery={props.searchQuery} 
                    onSearchChange={props.onSearchChange} 
                    onSubmitSearch={props.onSubmitSearch} 
                />
                <Button className="py-5">
                    Add New Data
                </Button>
            </div>
            
        </Card>
    )
}

export default FilterGroup