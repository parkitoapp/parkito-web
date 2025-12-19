import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner';
import type { TeamMember } from '@/types';

export default function ContactForm({ member, selectedOption }: { member: TeamMember, selectedOption: string }) {
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
            // setSelectedOption("");
        } catch (err) {
            toast.dismiss();
            // console.error(err);
            toast.error(`Errore durante l'invio dell'email: ${err}`);
        }
    };
    return (
        <div className="p-4 bg-accent/20 dark:bg-accent/90 rounded-lg border border-border shadow-soft min-h-[30em]">
            <form className="flex flex-col gap-4 h-[30em]" onSubmit={handleSubmit}>
                <div className='flex flex-col md:grid md:grid-cols-2 gap-4 h-full'>
                    <div className='flex flex-col w-[90%] gap-4 h-full'>
                        <Label htmlFor='name' className="text-foreground font-medium">Il tuo Nome:</Label>
                        <Input id='name' type='text' name="name" placeholder="Inserisci il tuo nome..." required />
                        <Label htmlFor='surname' className="text-foreground font-medium">Il tuo Cognome:</Label>
                        <Input id='surname' type='text' name="surname" placeholder="Inserisci il tuo cognome..." required />
                    </div>
                    <div className='flex flex-col w-[90%] gap-4 h-full'>
                        <Label htmlFor='mail' className="text-foreground font-medium">La tua Email:</Label>
                        <Input id='mail' type='email' name="from" placeholder="Inserisci la tua email..." required />
                        <Label htmlFor='phone' className="text-foreground font-medium">Telefono:</Label>
                        <Input id='phone' type='tel' name="phone" placeholder="Inserisci il tuo numero di telefono..." />
                    </div>
                </div>

                <Textarea
                    name="body"
                    placeholder={`Scrivi qui il tuo messaggio a ${member.name}...`}
                    required
                    className='h-full'
                />
                <Input type="hidden" name="subject" value={selectedOption} />

                <Button type="submit" className="px-4 py-2 bg-sidebar-primary text-white rounded-md hover:bg-primary/90">Invia Email</Button>
            </form>
        </div>
    )
}