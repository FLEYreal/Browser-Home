'use client'

// Basics
import Link from "next/link";
import Image from "next/image";

// Shadcn / Tailwind
import { Hourglass } from "lucide-react";

// Libs
import hexToRgba from 'hex-to-rgba'

// Insides
import { sizes } from "../sizes";
import { ItemWrapperProps, useItemContext } from "..";
import ItemHoverCard from "./hover-card";

export default function ItemWrapper({
    itemAttrs,
    cardAttrs
}: ItemWrapperProps) {

    // Get Context Data
    const { link, size, color, icon, title } = useItemContext();

    return (
        <ItemHoverCard cardAttrs={cardAttrs}>

            {/* To send user on item's website on click */}
            <Link href={link}>
                <div
                    style={{
                        width: sizes[size].size
                    }}
                    {...itemAttrs}
                    className={`
                            cursor-pointer
                            flex flex-col items-center justify-center gap-2
                            ${itemAttrs?.className}
                        `}
                >

                    <div
                        style={{
                            boxShadow: `0px 0px 0px 1px ${hexToRgba(color || '#A0A0A0', 0.3)}`,
                            width: sizes[size].size,
                            height: sizes[size].size
                        }}
                        className="
                                overflow-hidden rounded-lg text-sm
                                flex items-center justify-center
                            "
                    >
                        {
                            icon && typeof icon === 'string' && icon.length > 0 ?
                                <Image
                                    width={sizes[size].image}
                                    height={sizes[size].image}
                                    src={icon}
                                    alt="Icon"
                                /> :
                                <Hourglass size="32" style={{ color: color }} />
                        }
                    </div>

                    <div style={{ color: color, fontSize: sizes[size].font }} className="opacity-50 text-center leading-5">
                        {title}
                    </div>

                </div>
            </Link>
        </ItemHoverCard>
    )
}