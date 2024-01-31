// Shadcn / Tailwind
import { Button } from '@/shared/ui/button';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/shared/ui/tabs";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/shared/ui/popover";

// Insides
import Picker from './picker';
import Definer from './definer';

export default function ColorPicker() {

    return (
        <>

            {/* Modal of the widget */}
            <Popover>

                {/* Button to open Modal */}
                <PopoverTrigger asChild>
                    <Button variant="secondary">Color Picker</Button>
                </PopoverTrigger>

                {/* Content of the Modal */}
                <PopoverContent className='w-[280px] flex flex-col items-center'>

                    <Tabs>
                        <TabsList className='w-[240px] h-[50px] gap-2 mb-2'>
                            <TabsTrigger className='px-4 py-2' value='picker'>Color Picker</TabsTrigger>
                            <TabsTrigger className='px-4 py-2' value='definer'>Color Definer</TabsTrigger>
                        </TabsList>

                        {/* Content of the modal relatively chosen tab */}
                        <TabsContent value='picker'> <Picker /> </TabsContent>
                        <TabsContent value='definer'> <Definer /> </TabsContent>
                    </Tabs>

                </PopoverContent>
            </Popover>
        </>
    );
}
