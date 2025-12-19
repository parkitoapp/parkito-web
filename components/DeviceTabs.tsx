"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Check, X } from "lucide-react"

export default function DeviceTabs() {
    return (
        <Tabs defaultValue="automated" className="w-full max-w-md mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="automated">Automatizzato</TabsTrigger>
                <TabsTrigger value="device">KeyBox</TabsTrigger>
                <TabsTrigger value="manual">Manuale</TabsTrigger>
            </TabsList>

            <TabsContent value="automated">
                <Card className="flex flex-col bg-primary p-6 rounded-3xl shadow-xl">
                    <CardHeader className="flex flex-col items-center pb-4">
                        <Badge className="mb-4 bg-accent-foreground text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold">Consigliato!</Badge>
                        <Image src={"/rocket.webp"} alt="rocket" width={180} height={180} loading="lazy" className="mx-auto" />
                    </CardHeader>
                    <CardContent className="flex flex-col items-start">
                        <h2 className="text-sm text-accent-foreground uppercase font-semibold tracking-wide mb-1">Lascia autonomia al driver</h2>
                        <CardTitle className="text-2xl font-bold text-accent">
                            Dispositivo Parkito!
                        </CardTitle>
                    </CardContent>
                    <CardFooter className="pt-4">
                        <ul className="text-left text-primary-foreground/90 flex flex-col gap-3">
                            <li className="flex items-center gap-2"><Check className="w-5 h-5 text-accent-foreground" /> No presenza fisica</li>
                            <li className="flex items-center gap-2"><Check className="w-5 h-5 text-accent-foreground" /> Istruzioni automatiche via app</li>
                            <li className="flex items-center gap-2"><Check className="w-5 h-5 text-accent-foreground" /> Massima sicurezza</li>
                            <li className="flex items-center gap-2"><Check className="w-5 h-5 text-accent-foreground" /> Supporto Parkito incluso</li>
                        </ul>
                    </CardFooter>
                </Card>
            </TabsContent>

            <TabsContent value="device">
                <Card className="flex flex-col bg-card p-6 rounded-3xl shadow-xl">
                    <CardHeader className="flex flex-col items-center pb-4">
                        <div className="h-8 mb-4" />
                        <Image src={"/phone.webp"} alt="phone" width={180} height={180} loading="lazy" className="mx-auto" />
                    </CardHeader>
                    <CardContent className="flex flex-col items-start">
                        <h2 className="text-sm text-accent-foreground uppercase font-semibold tracking-wide mb-1">Lascia il telecomando o la chiave</h2>
                        <CardTitle className="text-2xl font-bold text-primary">
                            Accesso con KeyBox
                        </CardTitle>
                    </CardContent>
                    <CardFooter className="pt-4">
                        <ul className="text-left text-muted-foreground flex flex-col gap-3">
                            <li className="flex items-center gap-2"><Check className="w-5 h-5 text-accent-foreground" /> No presenza fisica</li>
                            <li className="flex items-center gap-2"><Check className="w-5 h-5 text-accent-foreground" /> Indicazioni inviate tramite app</li>
                            <li className="flex items-center gap-2"><X className="w-5 h-5 text-red-400" /> Sicurezza base</li>
                            <li className="flex items-center gap-2"><X className="w-5 h-5 text-red-400" /> Gestione problemi a carico host</li>
                        </ul>
                    </CardFooter>
                </Card>
            </TabsContent>

            <TabsContent value="manual">
                <Card className="flex flex-col bg-card p-6 rounded-3xl shadow-xl">
                    <CardHeader className="flex flex-col items-center pb-4">
                        <div className="h-8 mb-4" />
                        <Image src={"/heart.webp"} alt="heart" width={180} height={180} loading="lazy" className="mx-auto" />
                    </CardHeader>
                    <CardContent className="flex flex-col items-start">
                        <h2 className="text-sm text-accent-foreground uppercase font-semibold tracking-wide mb-1">Accogli il driver di persona</h2>
                        <CardTitle className="text-2xl font-bold text-primary">
                            Accoglienza manuale
                        </CardTitle>
                    </CardContent>
                    <CardFooter className="pt-4">
                        <ul className="text-left text-muted-foreground flex flex-col gap-3">
                            <li className="flex items-center gap-2"><X className="w-5 h-5 text-red-400" /> Presenza fisica obbligatoria</li>
                            <li className="flex items-center gap-2"><X className="w-5 h-5 text-red-400" /> Indicazioni fornite manualmente</li>
                            <li className="flex items-center gap-2"><X className="w-5 h-5 text-red-400" /> Gestione problemi a carico host</li>
                        </ul>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    )
}
