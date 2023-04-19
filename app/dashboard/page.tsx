import { prisma } from '@/util/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import formatPrice from '@/util/priceFormat';
import Image from 'next/image';

export const revalidate = 0;

const fetchOrders = async () => {
  const user = await getServerSession(authOptions);

  if (!user) {
    return null;
  }

  const orders = await prisma.order.findMany({
    where: { userId: user?.user?.id },
    include: { products: true },
  });

  return orders;
};

export default async function Dashboard() {
  const orders = await fetchOrders();

  if (orders === null)
    return <div>You need to be logged in to view your orders</div>;

  if (orders.length === 0)
    return (
      <div>
        <h1>No orders placed</h1>
      </div>
    );

  return (
    <div className='pb-12'>
      {orders.length === 0 ? <h1>No Orders</h1> : <h1>Your Orders</h1>}

      <div className='font-medium'>
        {orders.map(order => (
          <div key={order.id} className='rounded-lg p-8 mt-12  bg-base-200'>
            <h2>Order reference: {order.id}</h2>
            <p className='text-md py-2'>
              Status:{' '}
              <span
                className={`${
                  order.status === 'complete' ? 'bg-success' : 'bg-accent'
                } text-white py-1 rounded-md px-2 mx-2 text-sm`}
              >
                {order.status}
              </span>
            </p>

            <p className='text-xs'>
              Time: {new Date(order.createdDate).toString()}
            </p>

            <div className='text-sm lg:flex items-center gap-2'>
              {order.products.map(product => (
                <div className='py-2 ' key={product.id}>
                  <Image
                    src={product.image!}
                    alt={product.name}
                    width={36}
                    height={36}
                    priority={true}
                    className='w-auto'
                  />
                  <p>{formatPrice(product.unit_amount)}</p>
                  <p>Quantity: {product.quantity}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
