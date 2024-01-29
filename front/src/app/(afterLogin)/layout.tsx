import React from "react";

export default async function AfterLoginLayout({children}:
                                                   {children:React.ReactNode }) {

    return (
        <div>
            afterLogin layout
    {children}
    </div>
);
}

