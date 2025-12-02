import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FaApple, FaGooglePlay } from "react-icons/fa"

export default function DownloadButtons() {
    return (
        <div className="flex gap-4">
            <Button asChild className="h-12 px-6 bg-transparent" data-download-store="apple">
                <Link href="https://apps.apple.com/it/app/parkito-park-sharing/id6446240996" aria-label="apple download button">
                    <FaApple className="w-6 h-6 mr-2" />
                    <div className="flex flex-col items-start leading-none">
                        <span className="text-[10px]">Scarica su</span>
                        <span className="text-sm font-semibold">App Store</span>
                    </div>
                </Link>
            </Button>
            <Button asChild className="h-12 px-6 bg-transparent" data-download-store="android">
                <Link href="https://play.google.com/store/apps/details?id=it.autoindabox.mobile&hl=it" aria-label="android download button">
                    <FaGooglePlay className="w-5 h-5 mr-2" />
                    <div className="flex flex-col items-start leading-none">
                        <span className="text-[10px]">DISPONIBILE SU</span>
                        <span className="text-sm font-semibold">Google Play</span>
                    </div>
                </Link>
            </Button>
        </div>
    )
}