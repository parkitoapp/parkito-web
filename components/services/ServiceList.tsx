import { getServices } from "@/lib/services";
import ServiceListClient from "@/components/services/ServiceListClient";

export default async function ServiceList() {
  const services = await getServices();

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-10 py-10 bg-background"
      id="icon-link"
    >
      <ServiceListClient services={services} />
    </div>
  );
}
