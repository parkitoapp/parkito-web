import { Timeline } from "@/components/ui/timeline"
import { changeLog } from "@/data/changelog"

export default function page() {
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={changeLog} />
    </div>
  )
}