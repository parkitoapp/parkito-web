/**
 * Error component to display error messages.
 * 
 * @param {ErrorType} props - The properties including title, message, and optional onClick handler.
 * @returns {JSX.Element} The rendered Error component.
 */

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ArrowLeftIcon } from "lucide-react";
import { ErrorType } from "@/types";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Error({ title, message, onClick, src }: ErrorType) {
    return (
        <Alert variant="destructive" className="w-[50%]">
            <AlertTitle>
                <AlertCircle className="mr-2" /> Error {title}
            </AlertTitle>
            <AlertDescription>{message}</AlertDescription>
            {onClick && <Button variant="destructive" className="mt-4" onClick={onClick}>Retry</Button>}
            {src && <Button variant="destructive" className="mt-4" asChild>
                <Link href={src}><ArrowLeftIcon className="inline" /> Torna indietro</Link>
            </Button>}
        </Alert>
    )
}