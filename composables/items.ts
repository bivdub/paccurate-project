import type { Item } from '~/types/types';
export const useItems = () => {
  const items = useState<Item[]>('items', () => {
    return [
      {
        name: 'Tomatoes',
        refId: 0,
        color: 'tomato',
        weight: 2,
        dimensions: { x: 5, y: 6, z: 4 },
        sequence: '',
        centerOfMass: { x: 0, y: 0, z: 0 },
        quantity: 1
      },
      {
        name: 'Olives',
        refId: 1,
        color: 'olive',
        weight: 4,
        sequence: '',
        dimensions: { x: 3, y: 3, z: 2 },
        centerOfMass: { x: 0, y: 0, z: 0 },
        quantity: 1
      },
      {
        name: 'Papayas',
        refId: 2,
        color: 'papayawhip',
        weight: 2,
        sequence: '',
        dimensions: { x: 2, y: 6, z: 6 },
        centerOfMass: { x: 0, y: 0, z: 0 },
        quantity: 1
      }
    ];
  });

  const setItem = async (item: Item) => {
    const keys = items.value.map((item) => item.refId);
    const itemIndex = keys.indexOf(item.refId);

    if (itemIndex >= 0) {
      items.value[itemIndex] = item;
    } else {
      item.refId = generateId();
      items.value.push(item);
    }
  };

  function generateId() {
    const characters = '1234567890';
    let id = '';
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters[randomIndex];
    }
    return Number(id);
  }

  return { items, setItem };
};
