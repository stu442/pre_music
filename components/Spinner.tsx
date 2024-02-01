import Image from 'next/image';

export default function Spinner() {
    return (
        <Image
        src="/icons/spinner.svg"
        alt="loading_spinner"
        className='animate-spin fixed inset-x-0 mx-auto'
        width={150}
        height={150}
        />
    )
}