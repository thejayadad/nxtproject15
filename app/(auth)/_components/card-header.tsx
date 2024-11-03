
interface HeaderTitleProps {
    label: string;
}

export const Header = ({label}: HeaderTitleProps)=> {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <h1 className="text-2xl text-gray-600 font-semibold">
                Safe Space
            </h1>
            <p className="text-sm text-muted-foreground">
                {label}
            </p>
        </div>
    )
}