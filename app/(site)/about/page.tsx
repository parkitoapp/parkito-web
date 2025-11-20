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
                        Parkito è la prima piattaforma di <span className="font-bold text-chart-2">Park Sharing</span> in Italia che rende il parcheggio facile, sicuro e sostenibile, riducendo traffico e stress urbano per una mobilità più intelligente.
                        Ci occupiamo di creare parcheggi in zone dove non esistono senza ridurre ulteriormente il suolo pubblico, sfruttando le migliaia di <span className="font-bold text-chart-2">box e posti auto inutilizzati</span> in tutte le città.
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
                        Diventare la piattaforma di riferimento per una gestione intelligente e sostenibile degli spazi urbani, connettendo persone, luoghi e mobilità per città più vivibili e accessibili
                    </section>
                </div>
            </div>
            <div className=" bg-linear-to-b from-chart-1 to-primary">
                <div className="grid md:grid-cols-3 grid-cols-2 w-[50%] gap-8 mx-auto py-24 px-12 rounded-lg mb-24">
                    {team.map((member, idx) => (
                        <div key={`team-member-${idx}`} className="flex flex-col items-center justify-center">
                            <Avatar className="w-36 h-36">
                                <AvatarImage src={member.image}></AvatarImage>
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