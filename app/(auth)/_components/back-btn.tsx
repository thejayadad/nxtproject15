import Link from "next/link";

interface BackButtonProps {
    label: string;
    href: string;

}
export const BackButton = ({href,label}: BackButtonProps) => {
    return(
        <Link
        className="flex items-center justify-center w-full gap-x-2"
        href={href}>
            {label}
        </Link>
    )
}