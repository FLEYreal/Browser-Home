// Basics
import { ReactNode } from "react";

// Wrapper for keys in the keybinds menu
const Key = ({ children }: { children: ReactNode }) => (
    <div className={`border rounded-lg py-1 text-sm text-center px-3 flex flex-row items-center justify-between gap-2`}>
        {children}
    </div>
)

export default Key