import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Linkedin } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

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
        role: "Head of Marketing",
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
        role: "Urban Developer",
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
            <div className="min-h-screen w-full flex flex-row items-center justify-between p-24">
                <div className="text-center w-[60%] mx-auto">
                    <h1 className="text-7xl font-bold mb-4 text-primary">La prima piattaforma
                        <br />di Park Sharing in Italia!</h1>
                    <section className="text-4xl">
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
                    />
                </div>

            </div>
            <div className="min-h-screen w-full flex flex-row items-center justify-between p-24">
                <div>
                    <Image
                        src="/parking-parkito.webp"
                        alt="About Us Illustration"
                        width={400}
                        height={400}
                    />
                </div>

                <div className="text-center w-[60%] mx-auto">
                    <h1 className="text-7xl font-bold mb-4 text-primary">Il nostro obiettivo? </h1>
                    <section className="text-4xl">
                        <p>Diventare la piattaforma di riferimento per una gestione intelligente e sostenibile degli spazi urbani, connettendo persone, luoghi e mobilità per città più vivibili e accessibili</p>
                    </section>
                </div>
            </div>
            <div className=" bg-linear-to-b from-chart-1 to-primary">
                {/*
                  Render team in rows. For md+ screens we want 3 columns; for smaller screens 2 columns.
                  To center rows that have 1 or 2 members we chunk the list into groups of 3 and render
                  each row as a responsive container: a 2-column grid on small screens and a centered
                  flex row on md+ screens with the same gap. This avoids empty placeholders while
                  keeping alignment and spacing consistent.
                */}
                <div className="mx-auto py-24 px-12 rounded-lg mb-24 max-w-6xl">
                    {(() => {
                        // filter out empty placeholders (members without a name)
                        const items = team.filter(m => m && m.name && m.name.trim().length > 0);
                        const chunkSize = 3;
                        const rows: typeof items[] = [];
                        for (let i = 0; i < items.length; i += chunkSize) {
                            rows.push(items.slice(i, i + chunkSize));
                        }

                        return rows.map((row, rowIdx) => (
                            <div key={`team-row-${rowIdx}`} className="grid grid-cols-2 gap-8 md:flex md:justify-center md:gap-8 mb-8">
                                {row.map((member, idx) => (
                                    <div key={`team-member-${rowIdx}-${idx}`} className="flex flex-col items-center justify-center">
                                        <Avatar className="w-36 h-36">
                                            <AvatarImage src={member.image} />
                                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <h2 className="text-2xl font-bold text-white">{member.name}</h2>
                                        <p className="text-xl mb-2 text-white">{member.role}</p>
                                        <Link href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                            <Linkedin className="w-6 h-6 hover:opacity-70 cursor-pointer text-white" />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ));
                    })()}
                </div>
            </div>

            <div className="">
                <h2 className="text-4xl font-bold text-center mb-12 text-primary italic">Powered By</h2>
                <Image
                    src="/b4i-logo.png"
                    alt="Politecnico di Milano Logo"
                    width={550}
                    height={550}
                    className="mx-auto mb-10"
                />

            </div>

        </>
    )
}