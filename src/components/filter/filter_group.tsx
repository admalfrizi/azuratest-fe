import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { SearchRow } from "./search_row"

const FilterGroup = ({...props}) => {
    return (
        <Card className="w-full max-w-5xl bg-white rounded-xl p-6 flex flex-col gap-4">
            <div className="flex flex-row gap-x-6">
                <SearchRow 
                    publication_dates={props.publication_dates}
                    categories={props.categories}
                    selectedCategoryId={props.selectedCategoryId} 
                    onSelectCategory={props.onSelectCategory} 
                    selectedDate={props.selectedDate} 
                    onSelectDate={props.onSelectDate} 
                    searchQuery={props.searchQuery} 
                    onSearchChange={props.onSearchChange} 
                    onSubmitSearch={props.onSubmitSearch} 
                />
                <Button className="py-5" onClick={props.openCreateForm}>
                    Tambah Data
                </Button>
            </div>
            
        </Card>
    )
}

export default FilterGroup