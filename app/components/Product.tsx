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
        query: { name, image, unit_amount, description, features, id },
      }}
    >
      <div>
        <Image
          src={image}
          alt={name}
          height={800}
          width={800}
          className='w-full h-80 object-cover rounded-lg'
        />
        <div className='py-2 font-medium'>
          <h1>{name}</h1>
          <h2 className='text-sm text-primary'>
            {unit_amount && formatPrice(unit_amount)}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default Product;
