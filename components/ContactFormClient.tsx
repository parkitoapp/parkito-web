/**
 * ContactFormClient component for user inquiries.
 * Allows users to select a topic and contact the appropriate team member.
 * 
 * @returns {JSX.Element} The ContactFormClient component.
 */

"use client";

import React, { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import type { TeamMember, SelectOption } from '@/types';
import ContactForm from './ContactForm';
import DownloadButtons from './DownloadButtons';

type Props = {
    teamMembers: Record<string, TeamMember>;
    selectOptions: SelectOption[];
};

export default function ContactFormClient({ teamMembers, selectOptions }: Props) {
    const [selectedOption, setSelectedOption] = useState("");

    const option = selectOptions.find(o => o.label === selectedOption);
    const member = option ? teamMembers[option.memberId] : null;

    return (
        <div>
            <Card className="p-8 shadow-soft border-0 bg-card">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-foreground mb-2">Come possiamo aiutarti?</h2>
                    <p className="text-muted-foreground">
                        Seleziona dal menù a tendina il problema che stai riscontrando e prenota una call con il membro del team più adatto a te.
                    </p>
                </div>

                <div className="space-y-8">
                    <div className="space-y-2">
                        <Select value={selectedOption} onValueChange={setSelectedOption}>
                            <SelectTrigger className="w-full h-12 text-base">
                                <SelectValue placeholder="Cliccami" />
                            </SelectTrigger>
                            <SelectContent className="bg-popover border border-border z-50">
                                {selectOptions.map((opt) => (
                                    <SelectItem key={opt.label} value={opt.label}>{opt.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-foreground">
                            {member ? (
                                <div className="flex items-center gap-2">
                                    <span>Il tuo member sarà:</span>
                                    <Avatar className="w-10 h-10">
                                        <AvatarImage src={member.image} alt={`Avatar di ${member.name}`} />
                                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span>{member.name}</span>
                                </div>
                            ) : ""}
                        </h3>

                        {member && member.id === "parkito" ? (
                            <div className="flex flex-row w-full mx-auto items-center justify-center gap-4 mt-6">
                                <DownloadButtons />
                            </div>
                        ) : member && (member.id === "benedetta" || member.id === "davide") ? (
                            <ContactForm member={member} selectedOption={selectedOption} />
                        ) : (
                            member?.url &&
                            <div className="rounded-lg overflow-hidden border border-border shadow-soft">
                                <iframe src={member?.url} className="w-full min-h-screen" title={`Prendi un appuntamento con ${member?.name}`} />
                            </div>
                        )}

                    </div>
                </div>
            </Card>

            <div className='h-50 w-full'>
                <h3 className="text-xl font-semibold text-foreground mt-16 mb-4">Non hai tempo per una call?</h3>

                <Link href="https://wa.me/393520397705" className="text-primarydark:text-white underline">
                    <MessageCircle className="inline mr-2" size={32} />
                    Contattaci direttamente via whatsapp
                </Link>

            </div>
        </div>
    );
}
