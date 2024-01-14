import Image from 'next/image';
import { Input } from "@/components/ui/input"

export default function Header() {
    return (
        <header className='flex flex-col items-center space-y-5'>
            <h1 className='text-4xl font-black'>새로운 취향을 찾아보세요</h1>
            <div className='text-center'>
                <p>나만아는 음악을 추천하고, 찾아보세요.</p>
                <p>새로운 만남이 기다리고 있어요.</p>
            </div>
            <a href={'https://www.instagram.com/diggingfrogclub/'}>
                <Image 
                src="icons/instagram_icon.svg" 
                alt="instagram_icon_1"
                width={30}
                height={30}
                />
            </a>
            {/* TODO :  Input 추가 */}
            <Input type='text' placeholder='검색어를 입력해주세요.' />
        </header>
    )
}