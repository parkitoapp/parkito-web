import { CityType } from "@/types";
import CityListClient from "./CityListClient";

export default function CityList({ cities }: { cities: CityType[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-10 py-10 bg-background" id="icon-link">
            <CityListClient cities={cities} />
        </div>
    );
}