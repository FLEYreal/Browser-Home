'use client'

// Basics
import Link from "next/link";
import Image from "next/image";

// Shadcn / Tailwind
import { Hourglass } from "lucide-react";

// Libs
import hexToRgba from 'hex-to-rgba'

// Insides
import { sizes } from "../../config/sizes";
import { ItemWrapperProps, useItemContext } from "..";
import ItemHoverCard from "./hover-card";
import ItemSettings from "../settings-menu";

export default function ItemWrapper({
    itemAttrs,
    cardAttrs
}: ItemWrapperProps) {

    // Get Context Data
    const { link, size, color, icon, title } = useItemContext();

    return (
        <ItemSettings>
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
                                        width={0}
                                        height={0}
                                        style={{ width: '45%', height: 'auto' }}
                                        src={icon}
                                        alt="Icon"
                                    /> :
                                    <Hourglass size="32" style={{ color: color }} />
                            }
                        </div>

                        <div
                            style={{
                                color: color,
                                fontSize: sizes[size].font,
                                width: sizes[size].size
                            }}
                            className="
                                opacity-50 text-center leading-5 
                                whitespace-normal break-words
                            "
                        >
                            {title}
                        </div>

                    </div>
                </Link>
            </ItemHoverCard>
        </ItemSettings>
    )
}