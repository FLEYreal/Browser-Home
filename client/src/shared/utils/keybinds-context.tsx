'use client'

// Basics
import { Dispatch, SetStateAction, createContext, useContext } from "react";

// Interfaces & Types
export type focusKeybindsType = 'disabled' | 'none' | 'search';

export interface KeybindsContextProps {
    focusKeybinds: focusKeybindsType;
    setFocusKeybinds: Dispatch<SetStateAction<focusKeybindsType>>;
}

// Context Data
export const KeybindsContext = createContext<KeybindsContextProps>({
    focusKeybinds: 'none',
    setFocusKeybinds: () => { }
})

/**
 * Hook to receive keybinds's context
 *
 * @returns {focusKeybindsType} focusKeybinds - Current keybind's focus. It lets you use keybinds specifically for certain areas of the page. 
 * For example when your focus is "search", all keybinds are related to search bar.
 * @returns {Dispatch<SetStateAction<focusKeybindsType>>} setFocusKeybinds - set focus to other block of page
 */
export const useKeybindsContext = (): KeybindsContextProps => useContext(KeybindsContext);