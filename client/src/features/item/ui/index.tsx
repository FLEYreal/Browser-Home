'use client'

// Basics
import Link from "next/link";

// Shadcn / Tailwind
import { Hourglass } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/shared/ui/hover-card"

// Interfaces & Types
export interface ItemProps {
    title: string;
    link: string;
    description?: string;
    icon?: string; // TODO: Define proper type for icon
}

export default function Item({ title = "Item Name", description, icon, link }: ItemProps) {

    return (
        <HoverCard>

            <HoverCardTrigger asChild>
                <div className="
                    w-[95px] cursor-pointer
                    flex flex-col items-center justify-center gap-2
                ">

                    <div className="
                        w-[95px] h-[95px] overflow-hidden
                        border bg-card rounded-lg text-sm
                        flex items-center justify-center
                    ">
                        {icon ? <>{icon}</> : <Hourglass size="32" />}
                    </div>

                    <div className="text-sm">
                        {title}
                    </div>

                </div>
            </HoverCardTrigger>

            <HoverCardContent className="mt-2 w-[300px]">
                <div className="flex flex-row items-center gap-3">
                    <Avatar>
                        <AvatarImage src={icon} />
                        <AvatarFallback>{title.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="font-semibold text-lg">{title}</h2>
                        <p className="text-sm">
                            {description || <span className="italic">{'<No Description Provided>'}</span>}
                        </p>
                    </div>
                </div>
                <hr className="bg-foreground mt-3 my-1" />
                <Button variant="link" className="text-xs p-0 m-0 h-auto">
                    <Link href={link} target="_blank">
                        {link}
                    </Link>
                </Button>
            </HoverCardContent>

        </HoverCard>
    )

}