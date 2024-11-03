

export default function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return (
        <main className="flex h-full flex-col items-center justify-center">
            {children}
        </main>
    )
}