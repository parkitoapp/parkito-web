/**
 * Contacts page with a banner and contact form.
 * Includes team member information and selectable options for contact reasons.
 * @returns JSX.Element
 */

import Banner from '@/components/Banner'
import ContactFormClient from '@/components/ContactFormClient'
import { TeamMember, SelectOption } from '@/types';
import BC from '@/components/BC';

export const metadata = {
    title: 'Contatti',
    keywords: ['contatti', 'contact', 'supporto', 'assistenza', 'help', 'faq'],
}

export const teamMembers: Record<string, TeamMember> = {
    benedetta: {
        id: "benedetta",
        name: "Benedetta Sclano",
        url: "URL_BENEDETTA",
        image: "/benedetta.webp",
    },
    marco: {
        id: "marco",
        name: "Marco Lepore",
        url: "https://calendar.google.com/appointments/schedules/AcZssZ0O8OAVj6qSoJ8xNS6FC0KE9nRNDzj7Eg-VdeF5KdRkHgsXoXd0c6Tf_KH4xnJe1XjYDI1NnuJz",
        image: "/marco.webp",
    },
    davide: {
        id: "davide",
        name: "Davide Facchin",
        url: "URL_DAVIDE",
        image: "/davide.webp",
    },
    nicolo: {
        id: "nicolo",
        name: "Nicolò Mignacca",
        url: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0q6crGA80PhHAfGJth6R0ZS67BPzJbCT7Q_q9L-aKrlvczUDU_bQ9kfvlOZmMX81ygv6FGtVaz",
        image: "/nicolo.webp",
    },
    parkito:
    {
        id: "parkito",
        name: "Team Parkito",
        url: "",
        image: "/logo-cropped.webp",
    }
}

export const selectOptions: SelectOption[] = [
    { label: "Collaborazioni", memberId: "marco" },
    { label: "Bug", memberId: "benedetta" },
    { label: "Design Feedback", memberId: "benedetta" },
    { label: "Assistenza App", memberId: "benedetta" },
    { label: "Sei già un Host?", memberId: "davide" },
    { label: "Vuoi diventare Host?", memberId: "nicolo" },
    { label: "Vorrei prenotare parcheggio", memberId: "parkito" },
];

export default function Contacts() {
    return (
        <div>
            <Banner
                src='/contact.webp'
                title='Dubbi, domande o perplessità?'
                subtitle='Seleziona il tuo problema con il menù qua sotto e prenota la tua call con un membro del team Parkito!'
                icon={true}
                social={true}
            />
            <div className="px-16 pt-8">
                <BC />
            </div>
            <div id='icon-link' className="bg-background mx-auto md:px-24 md:py-16">
                <div className="w-full mx-auto">
                    <ContactFormClient teamMembers={teamMembers} selectOptions={selectOptions} />
                </div>
            </div>
        </div>
    )
}
