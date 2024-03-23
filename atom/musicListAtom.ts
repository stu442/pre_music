import { atom } from "recoil"

export const musicListState = atom<SpotifyTrack[]>({
    key: "musicListState",
    default: []
})

export const nextLinkState = atom<string | null>({
    key: "nextLinkState",
    default: null
})

export const loadingState = atom<boolean>({
    key: "loadingState",
    default: true
})

export const base64State = atom({
    key: "base64State",
    default: [] as (string | undefined)[]
})