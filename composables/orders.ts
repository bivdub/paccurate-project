export const useOrders = () => {
  const orders = useState<any[]>('orders', () => {
    return [];
  });

  const setOrder = async (order: any) => {
    const keys = orders.value.map((order: any) => order.packUuid);
    const itemIndex = keys.indexOf(order.packUuid);

    if (itemIndex >= 0) {
      orders.value[itemIndex] = order;
    } else {
      orders.value.push(order);
    }
  };

  return { orders, setOrder };
};
