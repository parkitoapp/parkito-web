import Banner from "@/components/Banner";
import BC from "@/components/BC";
import ServiceList from "@/components/services/ServiceList";

export default function page() {
  return (
    <>
      <Banner title="Servizio Parcheggio + Navetta" subtitle="Scopri il servizio Parcheggio + Navetta di Parkito" src="/homePic.webp" social={true} dwbtn={true} src2={true} classname="max-w-xl" />
      <div className="bg-background">
        <div className="px-16 pt-8">
          <BC />
        </div>
        <ServiceList />
      </div>
    </>
  )
}