"use client"

import Link from "next/link";
import { Linkedin } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileCard from "./ProfileCard";

type TeamMember = {
  name: string;
  role: string;
  linkedin: string;
  image: string;
  avatar: string;
  cit: string;
};

const isSafariUserAgent = (ua: string): boolean =>
  /safari/i.test(ua) && !/chrome|crios|android/i.test(ua);

export default function TeamCard({ name, role, linkedin, image, avatar, cit }: TeamMember) {
  const isSafari =
    typeof navigator !== "undefined" && isSafariUserAgent(navigator.userAgent || "");

  if (isSafari) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Avatar className="w-48 h-48 md:w-64 md:h-64">
          <AvatarImage src={image} />
          <AvatarFallback>{name?.charAt(0) ?? "?"}</AvatarFallback>
        </Avatar>
        <h2 className="text-lg md:text-2xl font-bold text-primary mt-2">{name}</h2>
        <p className="text-base md:text-xl mb-2 text-primary">{role}</p>
        <Link href={linkedin} target="_blank" rel="noopener noreferrer">
          <Linkedin className="w-5 h-5 md:w-6 md:h-6 hover:opacity-70 cursor-pointer text-primary" />
        </Link>
      </div>
    );
  }

  return (
    <ProfileCard
      name={name}
      title={role}
      handle={name}
      status={cit}
      contactText="LinkedIn"
      avatarUrl={avatar}
      miniAvatarUrl={image}
      showUserInfo
      enableTilt={true}
      enableMobileTilt
      onContactClick={() => window.open(linkedin, "_blank", "noopener,noreferrer")}
      behindGlowColor="hsla(226, 100%, 70%, 0.6)"
      behindGlowEnabled
      behindGlowSize="50%"
      innerGradient="linear-gradient(90deg, hsla(226, 40%, 45%, 0.55) 0%, hsla(166, 60%, 70%, 0.27) 100%)"
    />
  );
}