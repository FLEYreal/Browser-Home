'use client'

// Basics
import { ReactNode, HTMLAttributes } from "react";
import Link from "next/link";

// Shadcn / Tailwind
import { Button } from "@/shared/ui/button";
import {
    HoverCard,
    HoverCardTrigger,
    HoverCardContent
} from "@/shared/ui/hover-card";
import {
    Avatar,
    AvatarImage,
    AvatarFallback
} from '@/shared/ui/avatar';

// Insides
import { useItemContext } from "..";

// Hover card wrapper for item to show card with item's info on hover
export default function ItemHoverCard({
    children,
    cardAttrs
}: {
    children: ReactNode,
    cardAttrs?: HTMLAttributes<HTMLDivElement>;
}) {

    // Get context data
    const { icon, title, description, link } = useItemContext();

    return (
        <HoverCard>

            <HoverCardTrigger asChild>
                {children}
            </HoverCardTrigger>

            <HoverCardContent className="mt-2 w-[300px]">
                <div
                    {...cardAttrs}
                    className={`flex flex-row items-center gap-3 ${cardAttrs?.className}`}
                >
                    <Avatar>
                        <AvatarImage src={icon as string} />
                        <AvatarFallback>{title.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="w-[200px]">

                        <h2 className="font-semibold text-lg whitespace-normal break-words">{title}</h2>
                        <p className="text-sm whitespace-normal break-words">
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