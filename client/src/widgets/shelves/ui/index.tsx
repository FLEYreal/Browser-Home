'use client'

// Basics
import { HTMLAttributes } from "react";

// Features
import { CreateShelfWidget } from "@/features/new-shelf";

// Shared
import { useGetItems } from "@/shared/api/item-api";

// Insides
import Shelf from './shelf';
import { BtnFallback } from "@/shared/ui/error-fallback";
import { LoadingFallback } from "@/shared/ui/loading-fallback";

// Interfaces
export interface ShelvesProps extends HTMLAttributes<HTMLDivElement> { }

export default function Shelves({ ...props }: ShelvesProps) {

    const { isError, isLoading, refetch } = useGetItems();

    // When shelves are loading
    if (isLoading) return <LoadingFallback className="mt-8" />


    // When error occured
    else if (isError) return <BtnFallback className="mt-8" refetch={refetch} />

    // If everything succeed
    else return (
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
            <CreateShelfWidget className="mt-20" />
        </>
    )
}