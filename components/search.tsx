import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { maxPriceList, minPriceList, bedroomList, maxAreaList, minAreaList } from "@/util/search"
import { FilterType, searchType } from "@/hooks/use-search"

const Search = ({ filter, dispatchFilter  } : { filter: FilterType, dispatchFilter : any}) => {
  const handleReset = () => {
    dispatchFilter({ type: searchType.RESET, payload: null});
  }

  const getTitle = (min: number, max: number, sign: string) => {
    if (!min && !max) {
      return sign == '$' ? 'Price' : 'Area';
    } else if (min && !max) {
      return `> ${min} ${sign}`;
    } else if (!min && max) {
      return `< ${max} ${sign}`;
    } else {
      return `${min} - ${max} ${sign}`;
    }
  }
    return (
        <div data-testid="search-component" className="flex flex-wrap justify-center items-center space-x-4 space-y-4 md:space-y-0 mb-10">
            <div className="hidden md:block">
                <label htmlFor="filterBy">Filter By: </label>
            </div>
            <DropdownMenu data-testid="offertype-search"  >
                <DropdownMenuTrigger data-testid="offertype-toggle" className="px-4 py-2 rounded-lg border p-2 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-400">{filter.offerType || 'Offer Type'}</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onSelect={() => dispatchFilter({ type: searchType.SET_OFFER_TYPE, payload: "SALE"})}>SALE</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => dispatchFilter({ type: searchType.SET_OFFER_TYPE, payload: "RENT"})}>RENT</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Popover data-testid="price-search">
                <PopoverTrigger asChild>
                    <Button data-testid="price-toggle" variant="outline">{getTitle(filter.minPrice, filter.maxPrice, '$')}</Button>
                </PopoverTrigger>
                <PopoverContent className="w-full" data-testid="search-price-popover">
                    <div className="flex flex-row gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="px-4 py-2 rounded-lg border p-2 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-400">{filter.minPrice ? `$${filter.minPrice}` : 'Min'}</DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {
                                    minPriceList.map(min => (
                                        <DropdownMenuItem key={min} onSelect={() => dispatchFilter({ type: searchType.SET_MIN_PRICE, payload: min}) }>${min}</DropdownMenuItem>
                                    ))
                                }
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="px-4 py-2 rounded-lg border p-2 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-400">{filter.maxPrice ? `$${filter.maxPrice}` : 'Max'}</DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {
                                    maxPriceList.map(max => (
                                        <DropdownMenuItem key={max} onSelect={() => dispatchFilter({ type: searchType.SET_MAX_PRICE, payload: max})}>${max}</DropdownMenuItem>
                                    ))
                                }
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </PopoverContent>
            </Popover>
            <DropdownMenu data-testid="bed-search">
                <DropdownMenuTrigger className="px-4 py-2 rounded-lg border p-2 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-400">{filter.bedroom || 'Bed'}</DropdownMenuTrigger>
                <DropdownMenuContent>
                    {
                        bedroomList.map(bedroom => (
                            <DropdownMenuItem key={bedroom} onSelect={() => dispatchFilter({ type: searchType.SET_BEDROOM, payload: bedroom})} >{bedroom}</DropdownMenuItem>
                        ))
                    }
                </DropdownMenuContent>
            </DropdownMenu>
            <Popover data-testid="area-search" >
                <PopoverTrigger asChild>
                    <Button variant="outline">{getTitle(filter.minArea, filter.maxArea, 'ft.')}</Button>
                </PopoverTrigger>
                <PopoverContent className="w-full">
                    <div className="flex flex-row gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="px-4 py-2 rounded-lg border p-2 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-400">{filter.minArea ? `${filter.minArea} ft.` : 'Min'}</DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {
                                    minAreaList.map(min => (
                                        <DropdownMenuItem key={min} onSelect={() => dispatchFilter({ type: searchType.SET_MIN_AREA, payload: min})} >{min} ft.</DropdownMenuItem>
                                    ))
                                }
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="px-4 py-2 rounded-lg border p-2 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-400">{filter.maxArea ? `${filter.maxArea} ft.` : 'Max'}</DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {
                                    maxAreaList.map(max => (
                                        <DropdownMenuItem key={max} onSelect={() => dispatchFilter({ type: searchType.SET_MAX_AREA, payload: max})} >{max} ft.</DropdownMenuItem>
                                    ))
                                }
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </PopoverContent>
            </Popover>
            <Button aria-label="search-reset-btn" variant="ghost" onClick={handleReset}>Reset</Button>
        </div>
    );
}

export default Search;