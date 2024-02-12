'use client'

// Basics
import { ReactNode, useState } from "react";

// Shadcn / Tailwind
import { SettingsIcon, Pencil, Trash, PlusCircle } from "lucide-react";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
    ContextMenuSeparator,
    ContextMenuRadioGroup,
    ContextMenuRadioItem
} from "@/shared/ui/context-menu"
import { Dialog, DialogTrigger, DialogContent } from "@/shared/ui/dialog";
import { AlertDialog, AlertDialogTrigger } from "@/shared/ui/alert-dialog";

// Insides
import Details from "./details";
import { useShelfContext } from "../provider";

// Features
import { CreateItemDialogContent } from "@/features/item";
import { DeleteShelfDialogContent } from "@/features/shelf";

// Types
export type dialogsTypes = 'create-item' | 'edit-shelf' | 'delete-shelf';

export default function ShelfSettings({ children }: { children: ReactNode }) {

    // Context Data
    const { size, setSize, data } = useShelfContext()
    const { shelf_id, created_at } = data;

    // States
    const [currentDialog, setCurrentDialog] = useState<dialogsTypes>('create-item');

    return (
        <AlertDialog>
            <Dialog>

                {/* Context menu wrapper */}
                <ContextMenu>

                    {/* Right click on shelf to open settings */}
                    <ContextMenuTrigger asChild>
                        {children}
                    </ContextMenuTrigger>

                    {/* Context menu (settings) itself */}
                    <ContextMenuContent className="w-[180px]">

                        {/* Setings's header */}
                        <h2 className="
                            text-white text-[15px] ml-2 my-4
                            flex flex-row items-center gap-3
                        ">
                            <SettingsIcon size={18} />
                            Shelf Settings
                        </h2>

                        <ContextMenuSeparator />

                        {/* Edit shelf option */}
                        <DialogTrigger
                            asChild
                            onClick={() => setCurrentDialog('edit-shelf')}
                        >

                            <ContextMenuItem className="flex flex-row gap-2 items-center">
                                <Pencil size={16} />
                                Edit Shelf
                            </ContextMenuItem>

                        </DialogTrigger>

                        {/* Create new item inside shelf option */}
                        <DialogTrigger
                            asChild
                            onClick={() => setCurrentDialog('create-item')}
                        >

                            <ContextMenuItem className="flex flex-row gap-2 items-center">
                                <PlusCircle size={16} />
                                Create Item
                            </ContextMenuItem>

                        </DialogTrigger>

                        {/* Option to see additional information about shelf */}
                        <Details details={{
                            shelf_id: shelf_id,
                            created_at: created_at
                        }} />

                        <ContextMenuSeparator />

                        {/* 
                            Define item's size inside shelf 

                            Medium: Fits 8 Items
                            Small: Fits 10 Items
                            Smaller: FIts 12 Items

                        */}
                        <ContextMenuRadioGroup value={size}>

                            <ContextMenuRadioItem value="medium" onClick={() => setSize('medium')}>Medium Size</ContextMenuRadioItem>
                            <ContextMenuRadioItem value="small" onClick={() => setSize('small')}>Small Size</ContextMenuRadioItem>
                            <ContextMenuRadioItem value="smaller" onClick={() => setSize('smaller')}>Smaller Size</ContextMenuRadioItem>

                        </ContextMenuRadioGroup>

                        <ContextMenuSeparator />

                        {/* Dangerous zone, shelf's deletion */}
                        <AlertDialogTrigger
                            asChild
                            onClick={() => setCurrentDialog('delete-shelf')}
                        >

                            <ContextMenuItem className="flex flex-row gap-2 items-center">
                                <Trash size={16} className="text-red-500" />
                                <span className="text-red-500">Delete Shelf</span>
                            </ContextMenuItem>

                        </AlertDialogTrigger>

                    </ContextMenuContent>

                </ContextMenu>

                {
                    // Define what dialog to open on click
                    currentDialog === 'create-item' ?
                        <CreateItemDialogContent defaultShelf={shelf_id} /> :

                        currentDialog === 'delete-shelf' ?
                            <DeleteShelfDialogContent id={shelf_id}/> :

                            currentDialog === 'edit-shelf' ?
                                <DialogContent className="text-xl">Edit-Shelf</DialogContent> : null
                }

            </Dialog>
        </AlertDialog>
    )

}