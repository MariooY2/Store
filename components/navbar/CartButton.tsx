import { Button } from '@/components/ui/button';
import { LuShoppingCart } from 'react-icons/lu';
import Link from 'next/link';
import { getCartItems } from '@/Backend/actions/GetCartItems';
async function CartButton() {
  const items=await getCartItems();
  
  let number=0;
  items?.map((item)=>{
    number+=item.quantity;
  })
   
  
  return (
    <Button
      asChild
      variant='outline'
      size='icon'
      className='flex justify-center items-center relative'
    >
      <Link href='/cart'>
        <LuShoppingCart />
        <span className='absolute -top-3 -right-3 bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center text-xs'>
          {number}
        </span>
      </Link>
    </Button>
  );
}
export default CartButton;