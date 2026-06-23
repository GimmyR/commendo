import { useAuth } from "@/libs/hooks/use-auth";

type Props = {
    children: React.ReactNode
};

export default function SignedIn({ children } : Props) {
    const account = useAuth((state) => state.account);

    if(!account) return null;
    
    return (
        <>{children}</>
    );
}