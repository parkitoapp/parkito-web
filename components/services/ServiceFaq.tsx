import type { FAQ } from "@/types";
import Faq from "../Faq";


export default function ServiceFaq({ faqs }: { faqs: FAQ[] }) {
  return (
    <div className="md:grid md:grid-cols-2 flex flex-col w-full bg-background">
      <div className="w-full p-10">
        <h2 className="text-6xl font-bold w-full text-center text-primary dark:text-accent">FAQ</h2>
        <p className="text-xl font-semibold w-full text-center text-primary dark:text-accent">Hai dubbi sui servizi? Queste sono le domande più comuni. Se non trovi quello che cerchi, non esitare a contattarci!</p>
      </div>
      <div className="w-full">
        <Faq items={faqs} title={false} />
      </div>
    </div>
  )
}