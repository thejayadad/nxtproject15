import { Header } from "@/components/header/header";


export default function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return (
        <div> 
            <Header />
            {children}
        </div>
    )
}