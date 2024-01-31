'use client'

import { RecoilRoot } from "recoil";

export default function PageLayout({children}: {children: React.ReactNode}) {
    return (
        <>
            <RecoilRoot>
                {children}
            </RecoilRoot>
        </>
    )
}