'use client'

// Shadcn / Tailwind
import { Checkbox } from "@/shared/ui/checkbox";
import { Label } from "@/shared/ui/label";
//import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group"

// Shared
import { useInSearchContext } from "@/shared/utils/in-search-context";

export default function FastAccessContent() {

    const { inSearchStatus, setInSearchStatus } = useInSearchContext()

    return (
        <div>
            <div className="flex flex-row gap-2 items-center">
                <Checkbox
                    id="in-search"
                    onClick={() => setInSearchStatus(prev => !prev)}
                    checked={inSearchStatus}
                />
                <Label htmlFor="in-search" className="-mt-[2px] text-[16px] text-primary cursor-pointer">In-Search</Label>
            </div>
            <hr className="my-3" />
            <h3 className="text-xs">To Be Continue...</h3>
            {/* <RadioGroup className="flex flex-col items-start gap-0">

                <div className="flex flex-row gap-2 items-center py-1">

                    <RadioGroupItem id="search-option" value="search" />
                    <Label htmlFor="search-option" className="-mt-[2px] text-[16px] text-primary cursor-pointer" >Search</Label>

                </div>

                <div className="flex flex-row gap-2 items-center py-1">

                    <RadioGroupItem id="tranlsate-option" value="tranlsate" />
                    <Label htmlFor="tranlsate-option" className="-mt-[2px] text-[16px] text-primary cursor-pointer" >Translate</Label>

                </div>

                <div className="flex flex-row gap-2 items-center py-1">

                    <RadioGroupItem id="gpt-option" value="gpt" />
                    <Label htmlFor="gpt-option" className="-mt-[2px] text-[16px] text-primary cursor-pointer" >ChatGPT</Label>

                </div>

            </RadioGroup> */}
        </div>
    )
}
