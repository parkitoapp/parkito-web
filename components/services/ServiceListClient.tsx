"use client";

import { ServiceType } from "@/types";
import { useState } from "react";
import Filter from "@/components/Filter";
import ServiceCard from "@/components/services/ServiceCard";

export default function ServiceListClient({
  services,
}: {
  services: ServiceType[];
}) {
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  if (services.length === 0) return <div>Nessun servizio disponibile.</div>;

  const serviceTypes = Array.from(new Set(services.map((s) => s.type)));

  const filteredServices = services.filter((service) => {
    const matchesQuery =
      service.title.toLowerCase().includes(query.toLowerCase()) ||
      service.city.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = selectedType ? service.type === selectedType : true;
    return matchesQuery && matchesFilter;
  });

  return (
    <>
      <div className="col-span-full">
        <Filter
          filterOptions={serviceTypes}
          searchQuery={query}
          selectedFilter={selectedType}
          onSearchChange={setQuery}
          onFilterChange={setSelectedType}
          searchPlaceholder="Cerca un servizio"
          searchLabel="Cerca un servizio"
          allItemsLabel="Tutti i servizi"
        />
      </div>

      {filteredServices.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </>
  );
}
