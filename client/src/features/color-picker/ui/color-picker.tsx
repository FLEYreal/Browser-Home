// Shadcn / Tailwind
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/shared/ui/tabs";

// Insides
import Picker from '@/shared/ui/picker';
import Definer from '@/shared/ui/definer';

// Color picker & Color Definer Component
const ColorPicker = () => (
    <Tabs>

        {/* Tabs to choose what to display */}
        <TabsList className='w-[240px] h-[50px] gap-2 mb-2'>
            <TabsTrigger className='px-4 py-2' value='picker'>Color Picker</TabsTrigger>
            <TabsTrigger className='px-4 py-2' value='definer'>Color Definer</TabsTrigger>
        </TabsList>

        {/* Content of the modal relatively chosen tab */}
        <TabsContent value='picker'> <Picker /> </TabsContent>
        <TabsContent value='definer'> <Definer /> </TabsContent>

    </Tabs>
)

export default ColorPicker;