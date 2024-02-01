
// Basics
import { HTMLAttributes } from "react";

// Insides
import Shelf from './shelf';

// Interfaces
export interface ShelvesProps extends HTMLAttributes<HTMLDivElement> { }

export default function Shelves({ ...props }: ShelvesProps) {

    return (
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
    )
}