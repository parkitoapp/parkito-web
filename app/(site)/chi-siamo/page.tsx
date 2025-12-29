import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Linkedin } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BC from "@/components/BC";

const team = [
    {
        name: "Marco Lepore",
        role: "CEO & Founder",
        image: "/marco.webp",
        linkedin: "https://www.linkedin.com/in/mario-rossi"
    },
    {
        name: "Filippo Giovannoni",
        role: "CTO",
        image: "/filippo.webp",
        linkedin: "https://www.linkedin.com/in/filippo-giovannoni"
    },
    {
        name: "Davide Facchin",
        role: "Head of Growth",
        image: "/davide.webp",
        linkedin: "https://www.linkedin.com/in/giulia-verdi"
    },
    {
        name: "Benedetta Sclano",
        role: "Product Designer",
        image: "/benedetta.webp",
        linkedin: "https://www.linkedin.com/in/benedetta-sclano"
    },
    {
        name: "Nicolò Mignacca",
        role: "Sales Manager",
        image: "/nicolo.webp",
        linkedin: "https://www.linkedin.com/in/nicolo-mignacca"
    },
    {
        name: "Orlando Ferazzani",
        role: "Frontend Developer",
        image: "/orlando.webp",
        linkedin: "https://www.linkedin.com/in/orlando-v-m-ferazzani"
    },
    {
        name: "Edoardo Pietrobono",
        role: "Social Media Manager",
        image: "/edoardo.webp",
        linkedin: "https://www.linkedin.com/in/edoardo-pietrobono"
    }
]

export const metadata: Metadata = {
    title: "Chi Siamo",
    description: "Scopri di più su Parkito, la prima app per il Park Sharing in Italia.",
};

export default function page() {
    return (
        <>

            <div className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center p-4 gap-8 md:gap-12">
                <div className="text-center min-h-full w-full md:w-[60%] mx-auto flex flex-col my-auto items-center justify-center mt-20">
                    <div className="mb-4 md:mb-6">
                        <BC />
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-primary">La prima piattaforma
                        <br />di Park Sharing in Italia!</h1>
                    <section className="text-lg md:text-2xl lg:text-4xl md:mt-0 mt-8">
                        <p> Parkito è la prima piattaforma di <span className="font-bold text-chart-2">Park Sharing</span> in Italia che rende il parcheggio facile, sicuro e sostenibile, riducendo traffico e stress urbano per una mobilità più intelligente.
                            Ci occupiamo di creare parcheggi in zone dove non esistono senza ridurre ulteriormente il suolo pubblico, sfruttando le migliaia di <span className="font-bold text-chart-2">box e posti auto inutilizzati</span> in tutte le città.</p>
                    </section>
                </div>

                <div>
                    <Image
                        src="/about.webp"
                        alt="About Us Illustration"
                        width={400}
                        height={400}
                        className="w-full max-w-[300px] md:max-w-[400px]"
                    />
                </div>

            </div>
            <div className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center p-4 md:p-24 gap-8 md:gap-12">
                <div className="order-1 md:order-1">
                    <Image
                        src="/parking-parkito.webp"
                        alt="Parkito app illustration"
                        width={400}
                        height={400}
                        className="w-full max-w-[300px] md:max-w-[400px]"
                    />
                </div>

                <div className="text-center w-full md:w-[60%] mx-auto order-2 md:order-2">
                    <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 text-primary">Il nostro obiettivo? </h1>
                    <section className="text-lg md:text-2xl lg:text-4xl md:mt-0 mt-8">
                        <p>Diventare la piattaforma di riferimento per una gestione intelligente e sostenibile degli spazi urbani, connettendo persone, luoghi e mobilità per città più vivibili e accessibili</p>
                    </section>
                </div>
            </div>
            <div className="bg-chart-1">
                <div className="mx-auto py-12 md:py-24 px-4 md:px-12 rounded-lg mb-12 md:mb-24 max-w-6xl">
                    {(() => {
                        // filter out empty placeholders (members without a name)
                        const items = team.filter(m => m && m.name && m.name.trim().length > 0);
                        const chunkSize = 3;
                        const rows: typeof items[] = [];
                        for (let i = 0; i < items.length; i += chunkSize) {
                            rows.push(items.slice(i, i + chunkSize));
                        }

                        return rows.map((row, rowIdx) => (
                            <div key={`team-row-${rowIdx}`} className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 md:flex md:justify-center mb-6 md:mb-8">
                                {row.map((member, idx) => (
                                    <div key={`team-member-${rowIdx}-${idx}`} className="flex flex-col items-center justify-center">
                                        <Avatar className="w-24 h-24 md:w-36 md:h-36">
                                            <AvatarImage src={member.image} />
                                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <h2 className="text-lg md:text-2xl font-bold text-primary mt-2">{member.name}</h2>
                                        <p className="text-base md:text-xl mb-2 text-primary">{member.role}</p>
                                        <Link href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                            <Linkedin className="w-5 h-5 md:w-6 md:h-6 hover:opacity-70 cursor-pointer text-primary" />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ));
                    })()}
                </div>
            </div>

            <div className="px-4 md:px-0 dark:bg-chart-1 p-8">
                <h2 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-12 text-primary italic">Powered By</h2>
                <Image
                    src="/b4i-logo.webp"
                    alt="Bocconi for Innovation Logo"
                    width={550}
                    height={550}
                    className="mx-auto mb-10 w-full max-w-[300px] md:max-w-[550px] h-auto"
                />

            </div>

        </>
    )
}