import MusicList from "@/components/MusicList";

export default async function Page({searchParams} : {searchParams : {keyword:string}}) {
    return (
        <>
        <h2 className="text-lg mt-8">&apos;{searchParams.keyword}&apos;에 관한 음악</h2>
            <main className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3 mt-4">
                <MusicList keyword={searchParams.keyword} />
            </main>
        </>
    )
}