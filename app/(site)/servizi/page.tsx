import { Metadata } from "next";
import Banner from "@/components/Banner";
import BC from "@/components/BC";
import ServiceList from "@/components/services/ServiceList";

export const metadata: Metadata = {
  title: 'I nostri servizi',
  description: 'Scopri i servizi di Parkito: parcheggi privati verificati, navette shuttle e automazione degli accessi nelle principali città italiane.',
};

export default function page() {
  return (
    <>
      <Banner title="Servizio Parkito + Navetta" subtitle="Scopri il servizio Parcheggio + Navetta di Parkito: prenota il parcheggio, e noi ti portiamo al tuo evento preferito gratuitamente!" src="/navetta-hero.webp" social={true} dwbtn={false} src2={true} classname="max-w-xl" />
      <div className="bg-background">
        <div className="px-16 pt-8">
          <BC />
        </div>
        <ServiceList />
      </div>
    </>
  )
}