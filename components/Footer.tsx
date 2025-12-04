/**
 * Footer component for the Parkito website.
 * Includes company info, navigation links, social media icons, and legal links.
 * Utilizes Next.js Image and Link components for optimized performance.
 * Integrates Iubenda script for privacy and cookie policies.
 * 
 * @returns {JSX.Element} The Footer component.
 */
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { Linkedin, Instagram, Facebook } from 'lucide-react';
import FooterList from './FooterList';
import DownloadButtons from './DownloadButtons';

export default function Footer() {


    return (
        <footer className="w-full dark:bg-sidebar-primary bg-primary" aria-label='footer'>
            <div className="max-w-7xl mx-auto px-6 py-10 md:px-24 md:py-16">
                <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-0">
                    {/* Left block: logo, label, company info */}
                    <div className='flex-1 flex flex-col text-white font-semibold'>
                        <div className='flex items-center gap-4'>
                            <Image src="/parkito-pill.webp" width={140} height={34} className="object-contain" alt="parkito-logo" />
                            <p className='hidden md:block'>L&apos;app per il park sharing in Italia</p>
                        </div>

                        <div className='mt-6 md:mt-8'>
                            <ul className='list-none text-sm md:text-base'>
                                <li>All Indabox Srl</li>
                                <li>Milano - Firenze - Bologna</li>
                                <li>P.IVA: 04099131205</li>
                            </ul>
                        </div>

                        <ul className='flex items-center gap-4 my-4'>
                            <li>
                                <Link href='https://www.linkedin.com/company/parkito/' aria-label='link a linkedin' >
                                    <Linkedin size={28} className="text-white" />
                                </Link>
                            </li>
                            <li>
                                <Link href='https://www.instagram.com/parkito.app/' aria-label='link a instagram' >
                                    <Instagram size={28} className="text-white" />
                                </Link>
                            </li>
                            <li>
                                <Link href='https://wa.me/393520397705' aria-label='link a whatsapp'>
                                    <Image src="/whatsapp-svgrepo-com.svg" width={28} height={28} className="object-contain invert-100" alt="whatsapp" />
                                </Link>
                            </li>
                            <li>
                                <Link href='https://www.facebook.com/parkito.parking' aria-label='link a facebook'>
                                    <Facebook size={28} className="text-white" />
                                </Link>
                            </li>
                            <li>
                                <Link href='https://www.tiktok.com/@parkito.app?_t=ZN-90Ltjrdl2OJ&_r=1' aria-label='link a tiktok'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                    </svg>
                                </Link>
                            </li>
                        </ul>

                        <div className='flex flex-row gap-4 mt-4'>
                            <DownloadButtons />
                        </div>
                    </div>

                    {/* Right block: columns (stack on mobile) */}
                    <div className='flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 md:mt-0'>
                        <div>
                            <h2 className='text-white font-bold text-lg md:text-2xl'>Guadagna con Parkito</h2>
                            <ul className='flex flex-col mt-4 text-white gap-2 text-sm'>
                                <li>
                                    <Link href={"/diventare-host"} title='diventa host' aria-label='diventa un host'>
                                        Diventa Host
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/devices"} title='devices' aria-label='dispositivi di accesso'>
                                        Dispositivi
                                    </Link>
                                </li>
                                {/* <li>Per i condomini</li> */}
                            </ul>
                        </div>

                        <div>
                            <h2 className='text-white font-bold text-lg md:text-2xl'>Città</h2>
                            <FooterList />

                        </div>

                        <div>
                            <h2 className='text-white font-bold text-lg md:text-2xl'>Parkito</h2>
                            <ul className='flex flex-col mt-4 text-white gap-2 text-sm'>
                                <li>
                                    <Link href="/chi-siamo" title="About Us">
                                        Chi siamo
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/blog" title="Blog">
                                        Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contatti" title="Contact Us">
                                        Contatti
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='w-full bg-white h-[0.01em] my-6' />
                <p className='text-white text-center mt-2 font-bold'>© {new Date().getFullYear()} Parkito - All rights reserved</p>
                <ul className='flex flex-row gap-4 text-white justify-center mt-3 text-sm'>
                    <li>
                        <Link
                            href="/terminiecondizioni"
                            title="Terms and Conditions"
                            className='underline'
                        >
                            Termini e Condizioni
                        </Link>
                    </li>
                    <li> - </li>
                    <li>
                        <Link
                            href="https://www.iubenda.com/privacy-policy/94483316"
                            className="iubenda-white iubenda-noiframe iubenda-embed underline"
                            title="Privacy Policy"
                        >
                            Privacy Policy
                        </Link>
                    </li>
                    <li>-</li>
                    <li>
                        <Link
                            href="https://www.iubenda.com/privacy-policy/94483316/cookie-policy"
                            className="iubenda-white iubenda-noiframe iubenda-embed underline"
                            title="Cookie Policy"
                        >
                            Cookie Policy
                        </Link>
                    </li>
                </ul>
            </div>
            {/* Iubenda script for both links */}
            <Script
                id="iubenda-script"
                strategy="lazyOnload"
                dangerouslySetInnerHTML={{
                    __html: `(function (w,d) {
            var loader = function () {
              var s = d.createElement("script"),
                  tag = d.getElementsByTagName("script")[0];
              s.src="https://cdn.iubenda.com/iubenda.js";
              tag.parentNode.insertBefore(s,tag);
            };
            if(w.addEventListener){
              w.addEventListener("load", loader, false);
            } else if(w.attachEvent){
              w.attachEvent("onload", loader);
            } else {
              w.onload = loader;
            }
          })(window, document);`,
                }}
            />
        </footer >
    )
}