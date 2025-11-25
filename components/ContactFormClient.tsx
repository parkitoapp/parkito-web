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
import { Textarea } from '@/components/ui/textarea';
import { Card } from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import type { TeamMember, SelectOption } from '@/types';

type Props = {
    teamMembers: Record<string, TeamMember>;
    selectOptions: SelectOption[];
};

export default function ContactFormClient({ teamMembers, selectOptions }: Props) {
    const [selectedOption, setSelectedOption] = useState("");

    const option = selectOptions.find(o => o.label === selectedOption);
    const member = option ? teamMembers[option.memberId] : null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            toast.loading("Invio in corso...");
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(Object.fromEntries(formData)),
            });

            toast.dismiss();

            if (!res.ok) throw new Error('Failed to send email');

            toast.success("Email inviata correttamente!");
            form.reset();
            setSelectedOption("");
        } catch (err) {
            toast.dismiss();
            console.error(err);
            toast.error("Errore durante l'invio dell'email.");
        }
    };

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
                        <Label className="text-sm font-medium text-foreground">Di cosa hai bisogno?</Label>
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
                                        <AvatarImage src={member.image} />
                                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span>{member.name}</span>
                                </div>
                            ) : "Scegli il Problema"}
                        </h3>

                        {member && member.id === "parkito" ? (
                            <div className="flex flex-row w-full mx-auto items-center justify-center gap-4 mt-6">
                                <Link href="https://apps.apple.com/it/app/parkito-park-sharing/id6446240996" aria-label="apple download button">
                                    <Image src="/applebtn.webp" alt="App Store" width={150} height={50} />
                                </Link>
                                <Link href="https://play.google.com/store/apps/details?id=it.autoindabox.mobile&hl=it" aria-label="android download button">
                                    <Image src="/googlebtn.webp" alt="Google Play" width={150} height={50} />
                                </Link>
                            </div>
                        ) : member && (member.id === "benedetta" || member.id === "davide") ? (
                            <div className="p-4 bg-background rounded-lg border border-border shadow-soft">
                                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                                    <div className='flex flex-col md:grid md:grid-cols-2 gap-4'>
                                        <div className='flex flex-col w-[60%] gap-4'>
                                            <Label htmlFor='mail' className="text-foreground font-medium">La tua Email:</Label>
                                            <Input id='mail' type='email' name="from" placeholder="Inserisci la tua email..." required />
                                            <Label htmlFor='phone' className="text-foreground font-medium">Telefono:</Label>
                                            <Input id='phone' type='tel' name="phone" placeholder="Inserisci il tuo numero di telefono..." />
                                        </div>
                                        <div className='flex flex-col w-[60%] gap-4'>
                                            <Label htmlFor='name' className="text-foreground font-medium">Il tuo Nome:</Label>
                                            <Input id='name' type='text' name="name" placeholder="Inserisci il tuo nome..." required />
                                            <Label htmlFor='surname' className="text-foreground font-medium">Il tuo Cognome:</Label>
                                            <Input id='surname' type='text' name="surname" placeholder="Inserisci il tuo cognome..." required />
                                        </div>
                                    </div>

                                    <Textarea
                                        name="body"
                                        rows={6}
                                        placeholder={`Scrivi qui il tuo messaggio a ${member.name}...`}
                                        required
                                    />
                                    <Input type="hidden" name="subject" value={selectedOption} />

                                    <Button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">Invia Email</Button>
                                </form>
                            </div>
                        ) : (
                            <div className="rounded-lg overflow-hidden border border-border shadow-soft bg-background">
                                <iframe src={member?.url} className="w-full min-h-[30em]" title={`Prendi un appuntamento con ${member?.name}`} />
                            </div>
                        )}

                    </div>
                </div>
            </Card>

            <div className='h-50 w-full'>
                <h3 className="text-xl font-semibold text-foreground mt-16 mb-4">Non hai tempo per una call?</h3>
                <p className="text-muted-foreground mb-4">
                    Contattaci direttamente via whatsapp a
                    <Link href="mailto:" className="text-primary underline">
                        <FaWhatsapp className="inline ml-2 mr-1" /> numero wa
                    </Link>
                </p>
            </div>
        </div>
    );
}
