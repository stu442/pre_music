import Image from 'next/image';

export default function Spinner() {
    return (
        <Image
        src="icons/spinner.svg"
        alt="loading_spinner"
        className='animate-spin'
        width={30}
        height={30}
        />
    )
}