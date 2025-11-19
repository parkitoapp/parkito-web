import { citiesType } from "@/types"


export const cities: citiesType[] = [
    { name: "Milano", link: "/citta/milano" },
    { name: "Torino", link: "/citta/torino" },
    {
        name: "Liguria",
        link: "",
        subLinks: [
            { name: "Genova", link: "/citta/genova", },
            { name: "La Spezia", link: "/citta/laspezia" }
        ],
    },
]