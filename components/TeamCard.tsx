"use client"

import ProfileCard from "./ProfileCard";

type TeamMember = {
  name: string;
  role: string;
  linkedin: string;
  image: string;
  avatar: string;
  cit: string;
}

export default function TeamCard({ name, role, linkedin, image, avatar, cit }: TeamMember) {
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
      onContactClick={() => window.open(linkedin, '_blank')}
      behindGlowColor="hsla(226, 100%, 70%, 0.6)"
      behindGlowEnabled
      behindGlowSize="50%"
      innerGradient="linear-gradient(90deg, hsla(226, 40%, 45%, 0.55) 0%, hsla(166, 60%, 70%, 0.27) 100%)"
    />

  )
}