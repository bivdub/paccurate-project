export const useItems = () => {
  type Item = {
    name: String;
    refId: String;
    color: String;
    weight: Number;
    dimensions: { x: Number; y: Number; z: Number };
    sequence: String;
    centerOfMass: { x: Number; y: Number; z: Number };
    quantity: Number;
  };

  const items = useState<Item[]>('items', () => {
    return [
      {
        name: 'Tomatoes',
        refId: 'tiSSQKX0ualKgZ3rXyxo',
        color: 'tomato',
        weight: 2,
        dimensions: { x: 5, y: 6, z: 4 },
        sequence: '',
        centerOfMass: { x: 0, y: 0, z: 0 },
        quantity: 1
      },
      {
        name: 'Olives',
        refId: 'jd275iV6R59DyzKoJ1UD',
        color: 'olive',
        weight: 4,
        sequence: '',
        dimensions: { x: 3, y: 3, z: 2 },
        centerOfMass: { x: 0, y: 0, z: 0 },
        quantity: 1
      },
      {
        name: 'Papayas',
        refId: 'pCk9EGl7C5psWLxejv14',
        color: 'papaya',
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
      console.log(item);
      items.value.push(item);
    }
    console.log(items.value);
  };

  const generateId = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY';
    let id = '';
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters[randomIndex];
    }
    return id;
  };

  return { items, setItem };
};
