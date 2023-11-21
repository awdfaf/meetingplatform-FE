import { ReactNode } from "react";

const RootLayout = ({ children } : { children: ReactNode }) => {
    return (
        <div className="bg-white">
        {children}
        </div>
    )
}

export default RootLayout;