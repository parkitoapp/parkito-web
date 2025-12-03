

import Link from "next/link";
import Image from "next/image";


export default function DownloadButtons() {

    return (
        <div className="flex gap-4">
            <Link
                href="https://apps.apple.com/it/app/parkito-park-sharing/id6446240996"
                data-download-store="apple"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="apple download button"
            >
                <Image src="/applebtn.webp" alt="App Store" width={120} height={50} className="w-30" />
            </Link>

            <Link
                href="https://play.google.com/store/apps/details?id=it.autoindabox.mobile&hl=it"
                data-download-store="google"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="google download button"
            >
                <Image src="/googlebtn.webp" alt="Google Play" width={180} height={53} className="w-30" />
            </Link>
        </div>
    );
}


