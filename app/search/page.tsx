import MusicList from "@/components/MusicList";
import Spinner from "@/components/Spinner";
import { Suspense } from "react";

export default async function Page({searchParams} : {searchParams : {keyword:string}}) {
    return (
        <>
        <h2 className="text-lg mt-8">&apos;{searchParams.keyword}&apos;에 관한 음악</h2>
            <main className="grid grid-cols-4 gap-3 mt-4">
                <MusicList keyword={searchParams.keyword} />
            </main>
        </>
    )
}