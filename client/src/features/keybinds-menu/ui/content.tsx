'use client'

// Basics
import { ReactNode } from "react";

// Insides
import Key from "./key";

// Keybind list
export const defaultKeys = [
    { title: "Focus Search", keys: <Key>W</Key> },
    { title: "Focus Shelves", keys: <Key>F</Key> },
    { title: "Focus Integrations", keys: <Key>E</Key> },
    { title: "New Shelf", keys: <><Key>SHIFT</Key> + <Key>S</Key></> },
    { title: "New Item", keys: <><Key>SHIFT</Key> + <Key>I</Key></> },
    { title: "Switch Theme", keys: <><Key>ARROW LEFT</Key> or <Key>ARROW RIGHT</Key></> },
    { title: "Toggle Same Tab", keys: <><Key>SHIFT</Key> + <Key>A</Key></> },
    { title: "Toggle Search Engines", keys: <><Key>SHIFT</Key> + <Key>1 ... 5</Key></> }
];

export const searchKeys = [
    { title: "Search", keys: <Key>ENTER</Key> },
    { title: "Leave Search Focus", keys: <Key>ESC</Key> }
];

export const integrationKeys = [
    { title: "Leave Integration Focus", keys: <Key>ESC</Key> },
    { title: "Choose Integrations", keys: <><Key>ALT</Key> + <Key>1 ... 3</Key></> },
];

export const shelvesKeys = [
    { title: "Leave Shelves / Item Focus", keys: <Key>ESC</Key> },
    { title: "Leave Shelves / Item Focus", keys: <Key>ARROWS</Key> },
    { title: "Visit Focused Item (Website)", keys: <Key>ENTER</Key> },
];

// Keybind item
export const KeybindItem = ({ title, keys }: { title: string, keys: ReactNode }) => (
    <div className="border-t py-3 flex flex-row items-center justify-between">
        <h3 className="text-sm">{title}</h3>
        <div className="flex flex-row items-center gap-2 text-sm">
            {keys}
        </div>
    </div>
)

// Content for available keybinds menu
const KeybindsMenuContent = () => (
    /* Drawer's Wrapper */
    <div className="my-3 h-[75vh] overflow-scroll px-4">

        {/* Header with title / subtitle */}
        <h2 className="mb-1 text-lg">Available Keybinds</h2>
        <h2 className="text-sm">See the list of all keybinds available in the Browser-Home</h2>

        <hr className="my-6" />

        {/* Section With Default Keys */}
        <h2 className="text-lg mb-4">Default Keys</h2>
        {defaultKeys.map((item, index) => (
            <KeybindItem key={index} title={item.title} keys={item.keys} />
        ))}

        <hr className="my-6" />

        {/* Section with Search Keys */}
        <h2 className="text-lg mb-4">Search Keys</h2>
        {searchKeys.map((item, index) => (
            <KeybindItem key={index} title={item.title} keys={item.keys} />
        ))}

        <hr className="my-6" />

        {/* Section with Integration keys */}
        <h2 className="text-lg mb-4">Integrations Keys</h2>
        {integrationKeys.map((item, index) => (
            <KeybindItem key={index} title={item.title} keys={item.keys} />
        ))}

        <hr className="my-6" />

        {/* Section with Shelves & Items keys */}
        <h2 className="text-lg mb-4">Shelves Keys</h2>
        {shelvesKeys.map((item, index) => (
            <KeybindItem key={index} title={item.title} keys={item.keys} />
        ))}
    </div>
);

export default KeybindsMenuContent;