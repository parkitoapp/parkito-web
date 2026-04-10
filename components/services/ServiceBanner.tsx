"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  city: string;
  start_address: string;
  image: string;
  className?: string;
  service_name: string;
};


export default function ServiceBanner({ city, start_address, image, className, service_name }: Props) {
  /**
   * Banner component used as hero
   * param props - Banner properties including images, text, buttons, and options.
   * @returns JSX.Element
   * 
   */


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
  const imageKey = typeof image === 'string' ? image : 'default';

  // Check if image is from Supabase (external URL) - skip optimization to avoid timeouts
  const isSupabaseImage = typeof image === 'string' && image.includes('supabase.co');

  // Image starts bigger (1.15x) and shrinks to 1x as user scrolls down
  const imageScale = Math.max(1, 1.15 - scrollY / 800);

  return (
    <>
      {/* Desktop View (min-width: 1280px) */}
      <div className="hidden xl:flex bg-background relative text-white w-full min-h-svh items-center overflow-hidden pt-20">

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


        <div className="relative z-10 flex w-full flex-col md:flex-row items-center justify-between px-6 md:px-32 py-16">

          <div className="flex max-w-[60%] flex-col items-start justify-center text-left space-y-6 px-24">
            <div className="text-sm text-white rounded-full bg-green-800 font-bold p-2 px-4">Parcheggi in viaggio</div>

            <h2 className="relative z-10 font-extrabold  lg:text-5xl leading-tight text-primary dark:text-accent">Evento a <span className="text-lime-400 dark:text-lime-200">{city}</span>? Scegli <span className="text-lime-400 dark:text-lime-200">{service_name}</span> di Parkito!</h2>
            <p className="italic font-semibold text-2xl text-primary dark:text-accent">Parcheggia senza pensieri: al trasporto pensano i nostri Host.</p>
            <p className="text-xl md:text-2xl text-primary dark:text-accent flex flex-row items-center "><MapPin className="inline-block mr-2" />Partenza da: {start_address}</p>
            <Button variant={"secondary"} size={"lg"} asChild>
              <Link href="#events">Prenota ora</Link>
            </Button>
          </div>
          <div className="flex justify-center w-[50%]  mt-12 md:mt-0">
            <Image
              key={imageKey}
              src={imageError ? '/parkitoplaceholder.webp' : image}
              alt="App preview"
              width={800}
              height={960}
              priority
              unoptimized={isSupabaseImage}
              className={`${className} object-contain drop-shadow-2xl w-full rounded-lg z-9999`}
              onError={() => {
                setImageError(true);
              }}
              onLoad={() => {
                setImageError(false);
              }}
            />
          </div>

        </div>
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
              src={imageError ? '/parkitoplaceholder.webp' : image}
              alt="App preview"
              fill
              priority
              unoptimized={isSupabaseImage}
              className={`max-w-3xl w-full object-center object-contain mt-10`}
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
          <div className="absolute -top-5 z-20 text-sm text-white rounded-full bg-green-800 font-bold p-2 px-4">Parcheggi in viaggio</div>
          <div className="relative z-10 w-full flex flex-col items-center space-y-4 pt-4">
            <h2 className="font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight text-primary dark:text-accent text-center">
              Evento a <span className="text-lime-200">{city}</span>? Scegli <span className="text-lime-500 dark:text-lime-200">{service_name}</span> di Parkito!
            </h2>
            <p className="italic font-semibold text-primary dark:text-accent text-lg sm:text-xl text-center">
              Parcheggia senza pensieri: al trasporto pensano i nostri Host.
            </p>
            <p className="text-base text-primary dark:text-accent sm:text-lg flex flex-row items-center justify-center text-center">
              <MapPin className="inline-block mr-2 shrink-0" />
              Partenza da: {start_address}
            </p>
            <Button variant={"secondary"} size={"lg"} asChild>
              <Link href="#events">Prenota ora</Link>
            </Button>
          </div>
        </div>
      </div >
    </>
  );
}