"use client"

import Banner from '@/components/Banner'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type TeamMember = {
    id: string;
    name: string;
    url: string;
    image: string;
};

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
};


type SelectOption = {
    label: string;
    memberId: string;
};

export const selectOptions: SelectOption[] = [
    { label: "Collaborazioni", memberId: "marco" },
    { label: "Bug", memberId: "benedetta" },
    { label: "Design Feedback", memberId: "benedetta" },
    { label: "Assistenza App", memberId: "benedetta" },
    { label: "Sei già un Host?", memberId: "davide" },
    { label: "Vuoi diventare Host?", memberId: "nicolo" },
];


export default function Contacts() {
    const [selectedOption, setSelectedOption] = useState("");

    const option = selectOptions.find(o => o.label === selectedOption);
    const member = option ? teamMembers[option.memberId] : null;


    useEffect(() => {
        document.title = "Contatti - Parkito";
    }, []);

    return (
        <div>
            <Banner src='/home_image.webp' src2='/homePill.webp' title='Dubbi, domande o perplessità?' subtitle='Seleziona il tuo problema con il menù qua sotto e prenota la tua call con un membro del team Parkito!' icon={true} social={true}
            />
            <div id='icon-link' className="bg-background mx-auto  md:px-24 md:py-16">
                <div className="w-full mx-auto">
                    <Card className="p-8 shadow-soft border-0 bg-card">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-foreground mb-2">
                                Come possiamo aiutarti?
                            </h2>
                            <p className="text-muted-foreground">
                                Seleziona dal menù a tendina il problema che stai riscontrando e prenota una call con il membro del team più adatto a te.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {/* Team Member Select */}
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-foreground">
                                    Di cosa hai bisogno?
                                </Label>
                                <Select value={selectedOption} onValueChange={setSelectedOption}>
                                    <SelectTrigger className="w-full h-12 text-base">
                                        <SelectValue placeholder="Select a team member" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-popover border border-border z-50">
                                        {selectOptions.map((opt) => (
                                            <SelectItem key={opt.label} value={opt.label}>
                                                {opt.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                            </div>

                            {/* Google Calendar Embed */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">
                                    {member ? (
                                        <div className="flex items-center gap-2">
                                            <span>Il tuo member sarà:</span>
                                            <Avatar className="w-10 h-10">
                                                <AvatarImage src={member.image} />
                                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span>{member.name}</span>
                                        </div>
                                    ) : (
                                        "Scegli il Problema"
                                    )}
                                </h3>

                                <div className="rounded-lg overflow-hidden border border-border shadow-soft bg-background">
                                    <iframe src={member?.url} className="w-full min-h-[30em]" title={`Prendi un appuntamento con ${member?.name}`} />

                                </div>


                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}