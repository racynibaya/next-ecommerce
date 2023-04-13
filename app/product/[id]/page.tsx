import Image from 'next/image';

import { SearchParamTypes } from '@/types/search-param-type';
import formatPrice from '@/util/priceFormat';
import { features } from 'process';
import AddCart from './AddCart';

const Product = ({ searchParams }: SearchParamTypes) => {
  const { name, image, unit_amount, description, features } = searchParams;
  console.log(searchParams);

  return (
    <div className='flex justify-between gap-24 py-12 text-gray-700'>
      <Image
        src={image}
        alt={name}
        width={600}
        height={600}
        className='h-60 w-60'
      />

      <div font-medium text-gray-700>
        <h1 className='text-2xl  py-2'>{name}</h1>
        <p className='py-2'>{description}</p>
        <p>{features}</p>

        <div className='flex gap-2'>
          <p className='font-bold text-teal-700'>
            {unit_amount && formatPrice(unit_amount)}
          </p>
        </div>
        <AddCart {...searchParams} />
      </div>
    </div>
  );
};

export default Product;
