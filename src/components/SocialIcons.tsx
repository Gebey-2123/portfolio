import React from "react";
import { Mail } from "lucide-react"; // Mail icon is used here for the email link

export const GithubIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
);

export const LinkedinIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

export const InstagramIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
);

export const TelegramIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
    </svg>
);

export const TiktokIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);

// Interface for a generic social link item
export interface SocialLinkItem {
    id: string;
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    color?: string; // Optional color property, used in Contact.tsx
}

// All social links in one place
export const ALL_SOCIAL_LINKS: SocialLinkItem[] = [
    {
        id: "email",
        href: "mailto:gebregebey@gmail.com",
        label: "Email",
        icon: Mail,
        color: "cyan"
    },
    {
        id: "instagram",
        href: "https://instagram.com/gigi1232073",
        label: "Instagram",
        icon: InstagramIcon,
        color: "cyan"
    },
    {
        id: "telegram",
        href: "https://t.me/GebeyG",
        label: "Telegram",
        icon: TelegramIcon,
        color: "cyan"
    },
    {
        id: "tiktok",
        href: "https://tiktok.com/@gebregebey",
        label: "TikTok",
        icon: TiktokIcon,
        color: "cyan"
    },
    {
        id: "github",
        href: "https://github.com/Gebey-2123",
        label: "GitHub",
        icon: GithubIcon,
        color: "cyan"
    },
    {
        id: "linkedin",
        href: "https://linkedin.com/in/gebregebey",
        label: "LinkedIn",
        icon: LinkedinIcon,
        color: "cyan"
    },
];

// Helper to render icons
export const SocialIcon = ({ link, className }: { link: SocialLinkItem, className?: string }) => {
    const IconComponent = link.icon;
    return (
        <IconComponent className={className} />
    );
};
