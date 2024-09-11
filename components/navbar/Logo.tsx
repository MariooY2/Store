import Link from 'next/link';
import { Button } from '../ui/button';
import { LuArmchair } from 'react-icons/lu';
import { VscCode } from 'react-icons/vsc';

function Logo() {
  return (
    <Button size='icon' asChild className='sm:w-10 sm:h-10 h-8 w-8'>
      <Link href='/'>
        <VscCode className='w-6 h-6' />
      </Link>
    </Button>
  );
}

export default Logo;