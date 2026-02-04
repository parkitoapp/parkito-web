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
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

import DownloadButtons from "./DownloadButtons";

export default function Banner({ src, src2, title, subtitle, icon, social, dwbtn }: BannerProps) {
  void social;
  // Lazy initialization to avoid setState in useEffect
  const [scrollY, setScrollY] = useState(() => {
    if (typeof window !== 'undefined') return window.scrollY;
    return 0;
  });
  const [imageError, setImageError] = useState(false);
  const [windowHeight, setWindowHeight] = useState(() => {
    if (typeof window !== 'undefined') return window.innerHeight;
    return 800;
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Reset image error when src changes by using a key-based approach
  const imageKey = typeof src === 'string' ? src : 'default';

  // Check if image is from Supabase (external URL) - skip optimization to avoid timeouts
  const isSupabaseImage = typeof src === 'string' && src.includes('supabase.co');

  // Image starts bigger (1.15x) and shrinks to 1x as user scrolls down
  const imageScale = Math.max(1, 1.15 - scrollY / 800);

  return (
    <>
      {/* Desktop View (min-width: 1280px) */}
      <div className="hidden xl:flex relative text-white w-full min-h-svh items-center overflow-hidden pt-20">
        {src2 && (
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="relative w-full h-full">
              <Image
                src="/linea-desk.webp"
                alt=""
                fill
                className="hidden xl:block object-cover object-center opacity-30"
                aria-hidden
              />
            </div>
          </div>
        )}

        <div className="relative z-10 flex w-full flex-col md:flex-row items-center justify-between px-6 md:px-32 py-16">

          <div className="flex max-w-[60%] flex-col items-start justify-center text-left space-y-6 px-24">
            <div className="text-sm text-white rounded-full bg-green-800 font-bold p-2 px-4">La prima app per il Park Sharing in Italia!</div>
            <div className="relative w-full">
              {/* underline decoration */}
              <span
                aria-hidden
                className="absolute left-0 bottom-0 z-0 w-1/2 max-w-160 h-1 md:h-2 bg-lime-200 dark:bg-green-800 pointer-events-none"
              />
              <h2 className="relative z-10 font-extrabold  lg:text-6xl  leading-tight text-primary">{title}</h2>
            </div>
            <p className="text-xl md:text-2xl text-chart-3">{subtitle}</p>

            {dwbtn && (
              <div className="flex flex-row w-full mx-auto items-center justify-start gap-4 mt-6">
                <DownloadButtons />

              </div>
            )}

          </div>
          <div className="flex justify-center w-[50%]  mt-12 md:mt-0">
            <Image
              key={imageKey}
              src={imageError ? '/parkitoplaceholder.webp' : src}
              alt="App preview"
              width={800}
              height={960}
              priority
              unoptimized={isSupabaseImage}
              className="object-contain drop-shadow-2xl w-full rounded-lg z-9999"
              onError={() => {
                setImageError(true);
              }}
              onLoad={() => {
                setImageError(false);
              }}
            />
          </div>

        </div>

        {
          icon && (
            <Link href="#icon-link" className="absolute bottom-4 left-1/2 transform -translate-x-1/2" aria-label="scroll down icon link">
              <ArrowDown className="animate-bounce text-primary opacity-70" size={36} />
            </Link>
          )
        }
      </div >

      {/* Mobile/Tablet View (max-width: 1280px) */}
      <div className="flex xl:hidden relative w-full flex-col" >
        {/* Fixed image container - always behind ALL content with -z-10 */}
        <div
          className="fixed xl:hidden top-0 left-0 w-full overflow-hidden -z-10"
          style={{ height: `${windowHeight * 0.5}px` }}
        >
          <div
            className="relative w-full h-full origin-center transition-transform duration-150 ease-out"
            style={{ transform: `scale(${imageScale})` }}
          >
            <Image
              key={imageKey}
              src={imageError ? '/parkitoplaceholder.webp' : src}
              alt="App preview"
              fill
              priority
              unoptimized={isSupabaseImage}
              className="object-cover object-center"
              onError={() => {
                setImageError(true);
              }}
              onLoad={() => {
                setImageError(false);
              }}
            />
          </div>
        </div>

        {/* Content that slides over the image */}
        <div
          className="relative bg-background w-full flex flex-col items-center justify-center p-8 rounded-t-[3rem] min-h-[60vh]"
          style={{ marginTop: `${windowHeight * 0.45}px` }}
        >
          {src2 && (
            <div className="absolute inset-0 z-0 pointer-events-none rounded-t-[3rem] overflow-hidden">
              <div className="relative w-full h-full">
                <Image
                  src="/linea-mob.webp"
                  alt=""
                  fill
                  className="block xl:hidden object-cover object-center opacity-50"
                  aria-hidden
                />
              </div>
            </div>
          )}
          <div className="absolute -top-5 z-20 text-sm text-white rounded-full bg-green-800 p-2 px-4">La prima app per il Park Sharing in Italia!</div>
          <div className="relative z-10 w-full h-full">
            <h2 className="relative z-10 text-4xl md:text-6xl lg:text-7xl font-bold text-primary mb-4 md:px-16 text-center">
              {title}
            </h2>
          </div>
          <p className="relative z-10 font-semibold text-center text-chart-3 text-lg mb-2">{subtitle}</p>
          <div className="relative z-10 flex justify-center gap-4 mt-4">

            <DownloadButtons />
          </div>
        </div>

        {/* Social icons */}
        {/* {
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
                } */}

        {
          icon && (
            <Link href="#icon-link" className="absolute bottom-4 left-1/2 transform -translate-x-1/2" aria-label="scroll down icon link">
              <ArrowDown className="animate-bounce text-primary opacity-70" size={36} />
            </Link>
          )
        }
      </div >
    </>
  );
}


/**
 * <div className="w-full flex flex-col items-center justify-center p-4">
                        <Image src={src} alt="App preview" width={250} height={800} className="object-contain drop-shadow-2xl" />
                    </div>
 */