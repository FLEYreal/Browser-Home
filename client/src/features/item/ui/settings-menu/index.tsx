'use client'

// Basics
import { ReactNode, useState } from "react";

// Shadcn / Tailwind
import { SettingsIcon, Pencil, Trash } from "lucide-react";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuSeparator,
    ContextMenuItem,
    ContextMenuTrigger
} from "@/shared/ui/context-menu";
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/shared/ui/dialog";
import {
    AlertDialog,
    AlertDialogTrigger,
} from '@/shared/ui/alert-dialog';

// Insides
import { useItemContext } from "..";
import Details from "./details";
import DeleteItemDialogContent from "../delete-item-dialog/content";

// Types
export type dialogsTypes = 'edit-item' | 'delete-item';

export default function ItemSettings({ children }: { children: ReactNode }) {

    // Get Context Data
    const { shelf_fk, description, created_at, item_id } = useItemContext();

    // States
    const [currentDialog, setCurrentDialog] = useState<dialogsTypes>('edit-item');

    return (
        <AlertDialog>
            <Dialog>

                <ContextMenu>

                    <ContextMenuTrigger>
                        {children}
                    </ContextMenuTrigger>

                    <ContextMenuContent className="w-[180px]">

                        {/* Setings's header */}
                        <h2 className="
                            text-white text-[15px] ml-2 my-4
                            flex flex-row items-center gap-3
                        ">
                            <SettingsIcon size={18} />
                            Item Settings
                        </h2>

                        <ContextMenuSeparator />

                        {/* Edit item option */}
                        <DialogTrigger
                            asChild
                            onClick={() => setCurrentDialog('edit-item')}
                        >

                            <ContextMenuItem className="flex flex-row gap-2 items-center">
                                <Pencil size={16} />
                                Edit Item
                            </ContextMenuItem>

                        </DialogTrigger>

                        <Details details={{
                            shelf_fk: shelf_fk,
                            item_id: item_id,
                            description: description,
                            created_at: created_at
                        }} />

                        <ContextMenuSeparator />

                        {/* Dangerous zone, shelf's deletion */}
                        <AlertDialogTrigger
                            asChild
                            onClick={() => setCurrentDialog('delete-item')}
                        >

                            <ContextMenuItem className="flex flex-row gap-2 items-center">
                                <Trash size={16} className="text-red-500" />
                                <span className="text-red-500">Delete Item</span>
                            </ContextMenuItem>

                        </AlertDialogTrigger>

                    </ContextMenuContent>

                </ContextMenu>

                {
                    // Define what dialog to open on click
                    currentDialog === 'delete-item' ?
                        <DeleteItemDialogContent id={item_id} /> :

                        currentDialog === 'edit-item' ?
                            <DialogContent className="text-xl">Edit-Item</DialogContent> : null
                }

            </Dialog>
        </AlertDialog>
    )

}