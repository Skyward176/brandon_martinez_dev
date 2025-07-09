import React from 'react';
import LinkNext from 'next/link';

interface LinkProps {
    href: string;
    icon?: React.ReactNode;
    size?: 'small' | 'medium' | 'large';
    variant?: 'default';
    clickable?: boolean;
    active?: boolean;
    onClick?: () => void;
    className?: string;
    children:React.ReactNode;
}
const sizeClasses = {
    small: 'text-md py-1 px-1',
    medium: 'text-lg py-2 px-2',
    large: 'text-xl py-3 px-3',
};

const variantClasses = {
    default: 'font-extralight transition-all ease-in-out duration-300 hover:text-bold',
};

const Link: React.FC<LinkProps> = ({
    href,
    icon = null,
    size = 'medium',
    variant = 'default',
    clickable=true,
    active = true,
    onClick,
    className = '',
    children
}) => {
    const combinedClasses = `
        inline-flex items-center gap-2 rounded transition-colors duration-150
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${active ? 'text-teal-300' : 'text-gray-100'}
        ${className}
        ${clickable  ? 'cursor-pointer transform hover:text-teal-300 hover:scale-110 hover:underline' : ''} 
    `.trim().replace(/\s+/g, ' ');

    return (
        <LinkNext href={href} passHref legacyBehavior>
            <a className={combinedClasses} onClick={onClick}>
                {icon && <span className="flex items-center">{icon}</span>}
                <span>{children}</span>
            </a>
        </LinkNext>
    );
};

export default Link;