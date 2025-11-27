import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
    return (
        <div className="min-h-screen w-full p-8">
            <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link href="/admin/studio">
                    <Button className="w-full h-32 text-xl">
                        Sanity Studio
                    </Button>
                </Link>
                <Link href="/admin/parkings">
                    <Button className="w-full h-32 text-xl">
                        Manage Parkings
                    </Button>
                </Link>
            </div>
        </div>
    );
}