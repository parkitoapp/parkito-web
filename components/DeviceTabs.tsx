import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function DeviceTabs() {
    return (
        <Tabs defaultValue="automated">
            <TabsList>
                <TabsTrigger value="automated">Accesso Automatizzato</TabsTrigger>
                <TabsTrigger value="device">Accesso con KeyBox</TabsTrigger>
                <TabsTrigger value="manual">Accesso Manuale</TabsTrigger>
            </TabsList>
            <TabsContent value="automated">

                <Card className="flex flex-col bg-primary p-4 rounded-xl h-full justify-between">
                    <CardHeader className="flex flex-col">
                        <Badge className="mb-4 bg-accent-foreground p-2 rounded-full w-fit">Consigliato!</Badge>
                        <Image src={"/rocket.webp"} alt="rocket" width={250} height={250} className="items-start justify-start" />

                    </CardHeader>
                    <CardContent className="flex flex-col justify-start items-baseline">
                        <h2 className="text-md text-lime-500 dark:text-accent-foreground uppercase text-left font-semibold min-h-12 flex items-center">Lascia autonomia al driver</h2>
                        <CardTitle className="text-3xl font-bold text-accent text-left ">
                            Dispositivo Parkito!
                        </CardTitle>
                    </CardContent>
                    <CardFooter className="flex flex-col justify-start items-baseline">
                        <CardDescription className="flex flex-col justify-start items-start">
                            <ul className="text-left text-background flex flex-col gap-2 my-4 px-6">
                                <li>Presenza fisica obbligatoria</li>
                                <li>Indicazioni fornite manualmente</li>
                                <li>Gestione dei problemi a carico dell&apos;host</li>
                            </ul>
                        </CardDescription>
                    </CardFooter>

                </Card>

            </TabsContent>
            <TabsContent value="device"><Card className="flex flex-col bg-card p-4 rounded-xl h-full justify-between">
                <CardHeader className="flex flex-col">
                    <div className="h-9 mb-4" />
                    <Image src={"/phone.webp"} alt="phone" width={250} height={250} className="items-start justify-start" />
                </CardHeader>
                <CardContent className="flex flex-col justify-start items-baseline">
                    <h2 className="text-md text-accent-foreground uppercase text-left font-semibold min-h-12 flex items-center">Lascia il telecomando o la chiave</h2>
                    <CardTitle className="text-3xl font-bold text-primary text-left ">
                        Accesso con KeyBox
                    </CardTitle>
                </CardContent>
                <CardFooter className="flex flex-col justify-start items-baseline">
                    <CardDescription className="flex flex-col justify-start items-start">
                        <ul className="text-left text-chart-3 flex flex-col gap-2 px-6">
                            <li>No presenza fisica</li>
                            <li>Indicazioni inviate tramite app</li>
                            <li>Sicurezza base</li>
                            <li>Gestione dei problemi a carico dell&apos;host</li>
                        </ul>
                    </CardDescription>
                </CardFooter>

            </Card>
            </TabsContent>
            <TabsContent value="manual">
                <Card className="flex flex-col bg-card p-4 rounded-xl h-full justify-between">
                    <CardHeader className="flex flex-col">
                        <div className="h-9 mb-4" />
                        <Image src={"/heart.webp"} alt="heart" width={250} height={250} className="items-start justify-start" />

                    </CardHeader>
                    <CardContent className="flex flex-col justify-start items-baseline">
                        <h2 className="text-md text-accent-foreground uppercase text-left font-semibold min-h-12 flex items-center">Accogli il driver di persona</h2>
                        <CardTitle className="text-3xl font-bold text-primary text-lefttext-left ">
                            Accoglienza manuale
                        </CardTitle>
                    </CardContent>
                    <CardFooter className="flex flex-col justify-start items-baseline">
                        <CardDescription className="flex flex-col justify-start items-start">
                            <ul className="text-left text-chart-3 flex flex-col gap-2 my-4 px-6">
                                <li>Presenza fisica obbligatoria</li>
                                <li>Indicazioni fornite manualmente</li>
                                <li>Gestione dei problemi a carico dell&apos;host</li>

                            </ul>
                        </CardDescription>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    )
}




