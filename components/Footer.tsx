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
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import FooterList from './FooterList';

export default function Footer() {


    return (
        <footer className="w-full bg-linear-to-b from-chart-1 to-primary" aria-label='footer'>
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
                                    <FaLinkedin size={28} className="text-white" />
                                </Link>
                            </li>
                            <li>
                                <Link href='https://www.instagram.com/parkito.app/' aria-label='link a instagram' >
                                    <FaInstagram size={28} className="text-white" />
                                </Link>
                            </li>
                            <li>
                                <Link href='https://wa.me/393520397705' aria-label='link a whatsapp'>
                                    <FaWhatsapp size={28} className="text-white" />
                                </Link>
                            </li>
                            <li>
                                <Link href='https://www.facebook.com/parkito.parking' aria-label='link a facebook'>
                                    <FaFacebook size={28} className="text-white" />
                                </Link>
                            </li>
                            <li>
                                <Link href='https://www.tiktok.com/@parkito.app?_t=ZN-90Ltjrdl2OJ&_r=1' aria-label='link a tiktok'>
                                    <FaTiktok size={28} className="text-white" />
                                </Link>
                            </li>
                        </ul>

                        <div className='flex flex-row gap-4 mt-4'>
                            <Link href="https://apps.apple.com/it/app/parkito-park-sharing/id6446240996" aria-label="apple download button">
                                <Image src="/applebtn.webp" alt="App Store button" width={150} height={50} />
                            </Link>
                            <Link href="https://play.google.com/store/apps/details?id=it.autoindabox.mobile&hl=it" aria-label="android download button">
                                <Image src="/googlebtn.webp" alt="Google Play button" width={150} height={50} />
                            </Link>
                        </div>
                    </div>

                    {/* Right block: columns (stack on mobile) */}
                    <div className='flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 md:mt-0'>
                        <div>
                            <h2 className='text-white font-bold text-lg md:text-2xl'>Guadagna con Parkito</h2>
                            <ul className='flex flex-col mt-4 text-white gap-2 text-sm'>
                                <li>
                                    <Link href={"/host"} title='diventa host' aria-label='diventa un host'>
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
                                    <Link href="/about" title="About Us">
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
                <p className='text-white text-center mt-2 font-bold'>© 2026 Parkito - All rights reserved</p>
                <ul className='flex flex-row gap-4 text-white justify-center mt-3 text-sm'>
                    <li>
                        <Link
                            href="/(site)/tos"
                            title="Terms and Conditions"
                        >
                            Terms and Conditions
                        </Link>
                    </li>
                    <li> - </li>
                    <li>
                        <Link
                            href="https://www.iubenda.com/privacy-policy/94483316"
                            className="iubenda-white iubenda-noiframe iubenda-embed"
                            title="Privacy Policy"
                        >
                            Privacy Policy
                        </Link>
                    </li>
                    <li>-</li>
                    <li>
                        <Link
                            href="https://www.iubenda.com/privacy-policy/94483316/cookie-policy"
                            className="iubenda-white iubenda-noiframe iubenda-embed"
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
                strategy="afterInteractive"
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