'use client'

// Basics
import { HTMLAttributes } from "react";

// Features
import { CreatesShelfWidget } from "@/features/new-shelf";

// API
import { useGetItems } from "@/shared/api/item-api";

// Insides
import Shelf from './shelf';

// Interfaces
export interface ShelvesProps extends HTMLAttributes<HTMLDivElement> { }

export default function Shelves({ ...props }: ShelvesProps) {

    // TODO: Delete this on experiment's completion
    const { isError, data, isLoading, error } = useGetItems();

    console.log(data)

    if (isLoading) {
        return (
            <div className="text-xl">LOADING</div>
        )
    }

    else if (isError) {
        console.log((error as Error).message)
        return (
            <div className="text-xl">ERROR</div>
        )
    }

    return (
        <>
            <div {...props}>
                <Shelf data={{
                    title: 'Social Media',
                    description: 'This is a description of the shelf',
                    color: '#b1ff47',
                    created_at: '2021-01-01',
                    items: [
                        {
                            title: 'Discord',
                            link: 'https://discord.gg',
                            description: 'This is a description of the item',
                        },
                        {
                            title: 'YouTube',
                            link: 'https://youtube.com',
                            description: 'This is a description of the item',
                        },
                        {
                            title: 'Google',
                            link: 'https://google.com',
                            description: 'This is a description of the item',
                        }
                    ]
                }} />
            </div>
            <CreatesShelfWidget className="mt-20" />
        </>
    )
}