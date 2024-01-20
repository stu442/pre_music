import Image from 'next/image';
import Form from './HeaderForm';
import Link from 'next/link';

export default function Header() {
    return (
        <header className='flex flex-col items-center space-y-5'>
            <Link href='/' className='text-4xl font-black'>새로운 취향을 찾아보세요</Link>
            <div className='text-center'>
                <p>나만아는 음악을 추천하고, 찾아보세요.</p>
                <p>새로운 만남이 기다리고 있어요.</p>
            </div>
            <a href={'https://www.instagram.com/diggingfrogclub/'}>
                <Image 
                src="/icons/instagram_icon.svg" 
                alt="instagram_icon_1"
                width={30}
                height={30}
                />
            </a>
            <Form />
        </header>
    )
}