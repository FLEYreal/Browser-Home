'use client'

// Basics
import { HTMLAttributes } from "react";
import Link from "next/link";
import Image from "next/image";

// Shadcn / Tailwind
import { Hourglass } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/shared/ui/hover-card"

// Libs
import hexToRgba from 'hex-to-rgba'
import { useGetIcon } from "@/shared/api/item-api";

// Interfaces & Types
export interface ItemProps {
    item_id: number;
    title: string;
    link: string;
    description?: string;
    color?: string;
    itemAttrs?: HTMLAttributes<HTMLDivElement>;
    cardAttrs?: HTMLAttributes<HTMLDivElement>;
}

export default function Item({
    item_id,
    title = "Item Name",
    description,
    link,
    color,
    itemAttrs,
    cardAttrs
}: ItemProps) {

    const { data: icon } = useGetIcon({
        query: {
            item_id: item_id
        }
    })

    return (
        <HoverCard>

            <HoverCardTrigger asChild>
                <Link href={link}>
                    <div
                        {...itemAttrs}
                        className={`
                            w-[95px] cursor-pointer
                            flex flex-col items-center justify-center gap-2
                            ${itemAttrs?.className}
                        `}
                    >

                        <div
                            style={{
                                boxShadow: `0px 0px 0px 1px ${hexToRgba(color || '#A0A0A0', 0.3)}`,
                            }}
                            className="
                                w-[95px] h-[95px] overflow-hidden
                                rounded-lg text-sm
                                flex items-center justify-center
                            "
                        >
                            {
                                icon && typeof icon === 'string' && icon.length > 0 ?
                                    <Image width={45} height={45} src={icon} alt="Icon" /> :
                                    <Hourglass size="32" style={{ color: color }} />
                            }
                        </div>

                        <div style={{ color: color }} className="text-sm opacity-50">
                            {title}
                        </div>

                    </div>
                </Link>
            </HoverCardTrigger>

            <HoverCardContent className="mt-2 w-[300px]">
                <div
                    {...cardAttrs}
                    className={`flex flex-row items-center gap-3 ${cardAttrs?.className}`}
                >
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