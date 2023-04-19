import Image from 'next/image';

import { SearchParamTypes } from '@/types/search-param-type';
import formatPrice from '@/util/priceFormat';
import { features } from 'process';
import AddCart from './AddCart';

const Product = ({ searchParams }: SearchParamTypes) => {
  const { name, image, unit_amount, description, features } = searchParams;


  return (
    <div className='flex flex-col lg:flex-row 2xl items-center justify-between gap-16 py-12 '>
      <Image
        src={image}
        alt={name}
        width={300}
        height={300}
        className='w-full rounded-lg'
        priority={true}
      />

      <div className='font-medium '>
        <h1 className='text-2xl  py-2'>{name}</h1>
        <p className='py-2'>{description}</p>
        <p>{features}</p>

        <div className='flex gap-2'>
          <p className='font-bold text-primary'>
            {unit_amount && formatPrice(unit_amount)}
          </p>
        </div>
        <AddCart {...searchParams} />
      </div>
    </div>
  );
};

export default Product;
