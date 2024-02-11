// Shadcn / Tailwind
import { DrawerContent, DrawerTrigger, Drawer, DrawerTitle, DrawerDescription } from "@/shared/ui/drawer";

export default function Hints() {

    const hints = [
        "Right-click to edit Shelf or Item settings.",
        "Use gifs and svgs as icons!",
        "View shelf creation date in shelf details.",
        "Upcoming features: Built-in translator, reminders, AI integration!",
        "Browser-Home is designed for PC only, no responsive design.",
        "You can right click me to see all hints!",
        "In-Search mode allows you to search right inside the page",
        "Arrow in the left of the search is fast-access with some options you need fast!"
    ];

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <div className='text-sm w-1/4 text-center cursor-pointer'>
                    <span className='text-primary'>Hint:</span> {hints[Math.floor(Math.random() * hints.length)]}
                </div>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-xl mt-4">

                    <DrawerTitle>
                        All Hints
                    </DrawerTitle>
                    <DrawerDescription>
                        See all available hints here!
                    </DrawerDescription>

                    <ul className="ml-5 my-6 list-decimal text-sm">
                        {hints.map((item, key) => (
                            <li className="my-3" key={key}>
                                {item}
                            </li>
                        ))}
                    </ul>


                </div>
            </DrawerContent>
        </Drawer>

    )
}