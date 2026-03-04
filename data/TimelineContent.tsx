import { TimelineEntry } from "@/types";
import TimelineCard from "@/components/TimelineCard";

export const timelineData: TimelineEntry[] = [
  { // !do not remove
    title: "Futuro",
    content: (
      <TimelineCard
        cardTitle="Coming soon"
        badgeTitle="stay tuned"
        badgeVariant="new"
        description="Installa l'app, metti il sito tra i preferiti e segui i nostri progressi, da qui andiamo solo avanti!"
      />
    ),
  },
  {
    title: "Feb 2026",
    content: (
      <TimelineCard
        cardTitle="ZTL e dashboard host"
        badgeTitle="NUOVE FUNZIONALITÀ"
        badgeVariant="web"
        description={
          <>
            Aggiunta la possibilità di visualizzare{" "}
            <span className="italic font-bold">gratuitamente</span> le ZTL di tutta Italia, pagando l&apos;ingresso in
            app e introdotta la dashboard host per gestire i tuoi parcheggi
          </>
        }
        bulletPoints={[
          <p key="bullet-point-1">Visualizza le ZTL di tutta Italia a costo Zero</p>,
          <p key="bullet-point-2">Nuova ricerca su Mappa</p>,
          <p key="bullet-point-3">Creazione dashboard host</p>,
        ]}
        version="v2.7.2"
        images={["/dashscreen.webp", "/ztl.webp"]}
      />
    ),
  },
  {
    title: "Gen 2026",
    content: (
      <TimelineCard
        cardTitle="Onboarding intuitivo e smart"
        badgeTitle="ESPERIENZA UTENTE"
        badgeVariant="ux"
        version="v2.7.1"
        description={<>Rivoluzionato il modo di entrare in app: <span className="italic">addio email e password</span>, ora puoi accedere con <span className="font-bold">Google</span> o <span className="font-bold">Apple</span>. Abbiamo anche stravolto il modo di creare un parcheggio: molto più semplice e veloce.</>}
        bulletPoints={[
          <p key="bullet-point-1">Social Login</p>,
          <p key="bullet-point-2">Creazione parcheggio semplificata</p>,
          <p key="bullet-point-3">Nuova Design (UI/UX)</p>,

        ]}
        images={["/gen261.webp", "/gen262.webp"]}
      />
    ),
  },
  {
    title: "Ott 2025",
    content: (
      <TimelineCard
        cardTitle="Consolidazione Brand"
        badgeTitle="Brand Awareness"
        badgeVariant="web"
        description={
          <>
            Consolidato il brand Parkito, con una nuova identità visiva. Parkito entra nel mondo dell&apos;accelerazione con il programma di Bocconi: B4i         </>
        }
        bulletPoints={[
          <p key="bullet-point-1">Ingresso nel programma B4i</p>,
          <p key="bullet-point-2">Nuovi format Social</p>,
        ]}
        version="v2.6.9"
        images={["/ott251.webp", "/ott252.webp"]}
      />
    ),
  },
  {
    title: "Ago 2025",
    content: (
      <TimelineCard
        cardTitle="Rafforzamento community"
        badgeTitle="COMMUNITY MANAGEMENT"
        badgeVariant="web"
        description={
          <>
            Parkito inizia a creare una community facendo webinar dedicati ai propri host. Raggiunge i primi 10.000 utenti in app.
          </>
        }
        bulletPoints={[
          <p key="bullet-point-1">Webinar per host</p>,
          <p key="bullet-point-2">Raggiungimento dei primi 10.000 utenti in app</p>,
        ]}
        version="v2.5.1"
        images={["/ago251.webp", "/ago252.webp"]}
      />
    ),
  },
  {
    title: "Feb 2025",
    content: (
      <TimelineCard
        cardTitle="User test e Miglioramenti MVP"
        badgeTitle="VALIDAZIONE NUOVI SERVIZI"
        badgeVariant="ux"
        description={
          <>
            Parkito inizia a testare il suo servizio con utenti reali. Vengono fatte delle modifiche per migliorare l&apos;esperienza utente.
          </>
        }
        bulletPoints={[
          <p key="bullet-point-1">Costruzione storytelling online</p>,
          <p key="bullet-point-2">Inizio ricerca utenti</p>,
          <p key="bullet-point-3">Lancio nuovi servizi in app</p>,
        ]}
        version="v2.4.0"
        images={["/feb251.webp", "/feb252.webp", "/feb253.webp"]}
      />
    ),
  },
  {
    title: "Nov 2024",
    content: (
      <TimelineCard
        cardTitle="MVP - Prima prenotazione su Torino"
        badgeTitle="APP"
        badgeVariant="new"
        description={
          <>
            Parkito inizia a testare il suo servizio con utenti reali. Vengono fatte delle modifiche per migliorare l&apos;esperienza utente.
          </>
        }
        bulletPoints={[
          <p key="bullet-point-1">Prima Prenotazione su Torino</p>,
          <p key="bullet-point-2">Validazione del servizio nella città</p>,
          <p key="bullet-point-3">Aggiornamento con parcheggi attivi</p>,
        ]}
        version="v1.3.0"
        images={["/nov241.webp", "/nov242.webp", "/nov243.webp"]}
      />
    ),
  },
  {
    title: "Mag 2024",
    content: (
      <TimelineCard
        cardTitle="Parkito va online per la prima volta"
        badgeTitle="LAUNCH"
        badgeVariant="ux"
        description={
          <>
            Parkito va online per la prima volta. Viene lanciata la prima versione dell&apos;app e il sito web.
          </>
        }
        bulletPoints={[
          <p key="bullet-point-1">Nasce il sito parkito.app con solamente la newsletter</p>,
          <p key="bullet-point-2">Il team inizia a cercare i primi host per il servizio</p>,
          <p key="bullet-point-3">MVP app</p>,
        ]}
        version="v1.0.0"
        images={["/mag241.webp", "/mag242.webp"]}
      />
    ),
  },

];

