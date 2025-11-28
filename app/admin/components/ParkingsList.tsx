import { Parking } from "@/types";
import AnimatedList from '@/components/AnimatedList';


export default function ParkingsList(items: { items: Parking[] }) {

    const listItems: string[] = items.items.map((parking, index) =>
        `#${index + 1} - ${parking.city} - ${parking.address}`
    );

    return (
        <div className="min-h-screen flex flex-col">
            <h1 className="text-2xl font-bold mb-4 p-4">Parkings List</h1>

            <div className="flex-1 overflow-auto min-h-full">
                <AnimatedList
                    items={listItems}
                    onItemSelect={(item, index) => console.log(item, index)}
                    showGradients={true}
                    enableArrowNavigation={true}
                    displayScrollbar={true}
                    className="w-full h-full"
                />
            </div>
        </div>
    )
}