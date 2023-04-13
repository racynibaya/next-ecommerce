import formatPrice from '@/util/priceFormat';
import Image from 'next/image';
import Link from 'next/link';
import ProductType from '@/types/product-type';

const Product = ({
  name,
  image,
  unit_amount,
  id,
  description,
  metadata,
}: ProductType) => {
  const { features } = metadata;

  return (
    <Link
      href={{
        pathname: `/product/${id}`,
        query: { name, image, unit_amount, description, features },
      }}
    >
      <div className='text-gray-700'>
        <Image
          src={image}
          alt={name}
          height={800}
          width={800}
          className='w-full h-80 object-cover rounded-lg'
        />
        <div className='font-medium py-2'>
          <h1>{name}</h1>
          <h2 className='text-sm text-teal-700'>
            {unit_amount && formatPrice(unit_amount)}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default Product;
