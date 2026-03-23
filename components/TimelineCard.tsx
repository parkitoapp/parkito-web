import { TimelineCardType } from '@/types'
import { Badge } from "@/components/ui/badge"
import { Milestone, CheckCircle2 } from "lucide-react"
// import Image from "next/image"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import SpotlightCard from './SpotlightCard'
import MagicBento from './MagicBento'


const variantConfig = {
  ux: "bg-purple-100 text-purple-600 border-purple-500 dark:bg-purple-500/20 dark:text-purple-400 dark:border-purple-500/20",
  new: "bg-emerald-100 text-emerald-600 border-emerald-500 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/20",
  web: "bg-blue-100 text-blue-600 border-blue-500 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/20"
}

export default function TimelineCard({ cardTitle, badgeTitle, badgeVariant, description, bulletPoints, version, images }: TimelineCardType) {
  const bentoItems = (images || []).map((img, idx) => ({
    color: "#060010",
    title: cardTitle,
    description: `Screenshot ${idx + 1}`,
    label: `Image ${idx + 1}`,
    imageSrc: img,
    imageAlt: `${cardTitle} screenshot ${idx + 1}`
  }));

  return (
    <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(13, 28, 115, 0.9)">

      <div className="relative z-10 space-y-4">
        <CardHeader className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 px-0">
          <div className="space-y-1">
            {version && <div className="flex items-center gap-2">
              <Milestone className="w-5 h-5 text-blue-500" />
              <CardTitle className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Release {version}
              </CardTitle>
            </div>}
            <h4 className="text-2xl font-bold text-primary-foreground dark:text-foreground tracking-tight">
              {cardTitle}
            </h4>
          </div>
          <Badge
            variant={"secondary"}
            className={`w-fit rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${variantConfig[badgeVariant] || variantConfig.web}`}
          >
            {badgeTitle}
          </Badge>
        </CardHeader>

        <CardDescription className="text-neutral-400  leading-relaxed text-sm md:text-base">
          {description}
        </CardDescription>

        <CardContent>
          {bulletPoints && bulletPoints.length > 0 && (
            <ul className="flex flex-col gap-2">
              {bulletPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-neutral-400 ">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          )}
        </CardContent>

        <CardFooter className="w-full px-0 mx-auto items-center justify-center flex">
          {/* {images && images.length > 0 && (
            <div
              className={
                images.length > 2
                  ? "grid grid-cols-2 gap-4 w-full max-w-5xl mx-auto"
                  : "flex gap-4 w-full items-center justify-center max-w-5xl mx-auto overflow-x-auto"
              }
            >
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="rounded-[10px] overflow-hidden"
                >
                  <Image
                    src={img}
                    width={1000}
                    height={1000}
                    alt={`${cardTitle} screenshot ${idx + 1}`}
                    className="block h-auto w-auto max-h-[360px]"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )} */}
          {bentoItems.length > 0 && (
            <MagicBento
              items={bentoItems}
              textAutoHide={true}
              enableStars={false}
              enableSpotlight
              enableBorderGlow={true}
              enableTilt
              enableMagnetism
              clickEffect
              spotlightRadius={200}
              particleCount={12}
              glowColor="132, 0, 255"
              disableAnimations={false}
            />
          )}
        </CardFooter>

      </div>
    </SpotlightCard>
  )
}