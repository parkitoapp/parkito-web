/**
 * Error component to display error messages.
 * 
 * @param {ErrorType} props - The properties including title, message, and optional onClick handler.
 * @returns {JSX.Element} The rendered Error component.
 */

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { ErrorType } from "@/types";
import { Button } from "./ui/button";

export default function Error({ title, message, onClick }: ErrorType) {
    return (
        <Alert variant="destructive" className="w-[50%]">
            <AlertTitle>
                <AlertCircle className="mr-2" /> Error {title}
            </AlertTitle>
            <AlertDescription>{message}</AlertDescription>
            {onClick && <Button variant="destructive" className="mt-4" onClick={onClick}>Retry</Button>}
        </Alert>
    )
}