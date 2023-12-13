import type { ComponentProps } from 'react';

interface IconProps {
    props?: ComponentProps<'svg'>;
}

export function UserIcon({ props }: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
            <path
                d="M4.25167 14.5957C4.77054 12.1733 7.16123 10.8335 9.63854 10.8335V10.8335C12.1159 10.8335 14.5065 12.1733 15.0254 14.5957C15.1 14.9441 15.1613 15.3038 15.2026 15.6689C15.2648 16.2177 14.8133 16.6668 14.261 16.6668H5.01605C4.46377 16.6668 4.01233 16.2177 4.07446 15.6689C4.11579 15.3038 4.17705 14.9441 4.25167 14.5957Z"
                fill="#D9D9D9"
            />
            <ellipse cx="9.63854" cy="6.66683" rx="3.21285" ry="3.33333" fill="#D9D9D9" />
        </svg>
    );
}
