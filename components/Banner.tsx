/**
 * Banner component used as hero
 * param props - Banner properties including images, text, buttons, and options.
 * @returns JSX.Element
 * 
 */

"use client";

import Image from "next/image";
import { BannerProps } from "@/types";
import Link from "next/link";
import { ArrowDown, Instagram, Linkedin } from "lucide-react";

export default function Banner({ src, src2, title, subtitle, icon, social, dwbtn }: BannerProps) {
    return (
        <>
            {/* Desktop View (min-width: 1241px) */}
            <div className="hidden min-[1241px]:flex relative text-white w-full md:h-screen h-svh items-center">
                <div className="flex w-full flex-col md:flex-row items-center justify-between px-6 md:px-32 py-16">

                    <div className="flex max-w-[60%] flex-col items-start justify-center text-left space-y-6 px-24">
                        <div className="text-sm text-white rounded-full bg-green-800 font-bold p-2 px-4">La prima app per il Park Sharing in Italia!</div>
                        <div className="relative w-full">
                            {/* desktop highlight behind the heading */}
                            <span
                                aria-hidden
                                className="absolute left-0 bottom-3 z-0 w-1/2 max-w-160 h-4 md:h-6 bg-lime-200 dark:bg-green-800 pointer-events-none"
                            />
                            <h1 className="relative z-10 font-extrabold  lg:text-6xl  leading-tight text-primary">{title}</h1>
                        </div>
                        <p className="text-xl md:text-2xl text-chart-3">{subtitle}</p>

                        {dwbtn && (
                            <div className="flex flex-row w-full mx-auto items-center justify-start gap-4 mt-6">
                                <Link href="https://apps.apple.com/it/app/parkito-park-sharing/id6446240996" aria-label="apple download button">
                                    <Image src="/applebtn.webp" alt="App Store" width={150} height={50} />
                                </Link>
                                <Link href="https://play.google.com/store/apps/details?id=it.autoindabox.mobile&hl=it" aria-label="android download button">
                                    <Image src="/googlebtn.webp" alt="Google Play" width={150} height={50} />
                                </Link>
                            </div>
                        )}

                    </div>
                    <div className="relative flex justify-center w-[50%]  mt-12 md:mt-0">
                        <Image src={src} alt="App preview" width={1500} height={1800} className="object-contain drop-shadow-2xl w-full rounded-lg " />

                        {src2 &&
                            <Image src={src2} alt="App preview" width={500} height={800} className="object-contain drop-shadow-2xl absolute z-10 w-[15em] h-10 min-w-[50%] -right-10 md:-bottom-3 -bottom-2" />}

                    </div>

                </div>

                {
                    social && (
                        <ul className="absolute bottom-4 right-6 flex gap-4">
                            <li>
                                <Link href="https://www.instagram.com/parkito.app/" aria-label="instagram link">
                                    <Instagram className="text-primary hover:opacity-80 cursor-pointer" />
                                </Link>
                            </li>
                            <li>
                                <Link href="https://www.linkedin.com/company/parkito/" aria-label="linkedin link">
                                    <Linkedin className="text-primary hover:opacity-80 cursor-pointer" />
                                </Link>
                            </li>
                        </ul>
                    )
                }

                {
                    icon && (
                        <Link href="#icon-link" className="absolute bottom-4 left-1/2 transform -translate-x-1/2" aria-label="scroll down icon link">
                            <ArrowDown className="animate-bounce text-primary opacity-70" />
                        </Link>
                    )
                }
            </div>

            {/* Mobile/Tablet View (max-width: 1240px) */}
            <div className="flex min-[1241px]:hidden relative w-full flex-col overflow-visible">
                <div
                    className="fixed top-0 left-0 w-full h-[50vh] -z-10 bg-cover bg-center"
                    style={{ backgroundImage: `url('${src}')` }}
                />

                <div className="relative mt-[40vh] bg-background w-full flex flex-col items-center justify-start p-8 rounded-t-[3rem] min-h-[60vh]">
                    <div className="absolute -top-5 text-sm text-white rounded-full bg-accent-foreground p-2 px-4">La prima app per il Park Sharing in Italia!</div>
                    <div className="w-full h-full relative">
                        {/* <span
                            aria-hidden
                            className="absolute left-70 bottom-5 z-0 w-1/2 max-w-[30em] h-5 bg-lime-200 pointer-events-none"
                        /> */}

                        <h1 className="relative z-10 text-4xl md:text-6xl lg:text-7xl font-bold text-primary mb-4 md:px-16 text-center">
                            {title}
                        </h1>
                    </div>
                    <p className="font-semibold text-center text-chart-3 text-lg mb-2">{subtitle}</p>
                    <div className="flex justify-center gap-4 mt-4">
                        <Link href="https://apps.apple.com/it/app/parkito-park-sharing/id6446240996">
                            <Image src="/applebtn.webp" alt="App Store" width={150} height={50} />
                        </Link>
                        <Link href="https://play.google.com/store/apps/details?id=it.autoindabox.mobile&hl=it">
                            <Image src="/googlebtn.webp" alt="Google Play" width={150} height={50} />
                        </Link>
                    </div>

                </div>

                {/* Social icons */}
                {social && (
                    <ul className="absolute bottom-4 right-6 flex gap-4">
                        <li>
                            <Link href="https://instagram.com">
                                <Instagram className="text-primary hover:opacity-80 cursor-pointer" />
                            </Link>
                        </li>
                        <li>
                            <Link href="https://linkedin.com">
                                <Linkedin className="text-primary hover:opacity-80 cursor-pointer" />
                            </Link>
                        </li>
                    </ul>
                )}

                {/* Scroll-down icon */}
                {icon && (
                    <Link
                        href="#icon-link"
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                    >
                        <ArrowDown className="animate-bounce text-primary opacity-70" />
                    </Link>
                )}
            </div>
        </>
    );
}


/**
 * <div className="w-full flex flex-col items-center justify-center p-4">
                        <Image src={src} alt="App preview" width={250} height={800} className="object-contain drop-shadow-2xl" />
                    </div>
 */