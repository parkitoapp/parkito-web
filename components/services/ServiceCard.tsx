"use client";

import { ServiceType } from "@/types";
import { useState } from "react";
import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ServiceCard({ service }: { service: ServiceType }) {
  const [hasError, setHasError] = useState(false);

  return (

    <Link href={service.url}>
      <Card className="shadow-md overflow-hidden bg-card hover:scale-[1.02] transition-transform duration-200 relative hover:shadow-lg rounded-3xl">
        <Image
          src={hasError ? service.fallbackImage : service.image}
          alt={`Immagine per ${service.title}`}
          width={400}
          height={200}
          loading="lazy"
          className="rounded-t-3xl w-full h-40 object-cover mb-3"
          onError={() => {
            if (!hasError) {
              setHasError(true);
            }
          }}
        />

        <CardFooter className="flex flex-col gap-2 items-start px-6 py-4 w-full">
          <CardTitle className="dark:text-chart-3 text-chart-4 text-xl text-left w-full">
            {service.title}
          </CardTitle>

          {service.subtitle && (
            <p className="text-sm text-muted-foreground text-left w-full">
              {service.subtitle}
            </p>
          )}

          <Button
            variant="default"
            className="p-2 mt-2 rounded-2xl items-center justify-center self-start hover:cursor-pointer"
          >
            Scopri <ArrowRightIcon />
          </Button>
        </CardFooter>
      </Card >
    </Link>
  );
}
