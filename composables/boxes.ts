import type { Box } from '~/types/types';
export const useBoxes = () => {
  const boxes = useState<Box[]>('boxes', () => {
    return [
      {
        name: '20 X 20 X 20',
        refId: 5678,
        price: 30,
        weightTare: 1,
        weightMax: 50,
        dimensions: { x: 20, y: 20, z: 20 },
        centerOfMass: { x: 0, y: 10, z: 10 },
        reservedSpace: 0.2,
        itemSetsPerBoxMax: 0,
        itemsPerBoxMax: 0
      },
      {
        name: '10 X 20 X 30',
        refId: 7654,
        price: 30,
        weightTare: 1,
        weightMax: 75,
        dimensions: { x: 10, y: 20, z: 30 },
        centerOfMass: { x: 0, y: 10, z: 15 },
        reservedSpace: 0,
        itemSetsPerBoxMax: 0,
        itemsPerBoxMax: 0
      },
      {
        name: '40 X 20 X 20',
        refId: 6543,
        price: 30,
        weightTare: 1,
        weightMax: 100,
        dimensions: { x: 40, y: 20, z: 20 },
        centerOfMass: { x: 0, y: 10, z: 10 },
        reservedSpace: 0.15,
        itemSetsPerBoxMax: 0,
        itemsPerBoxMax: 0
      }
    ];
  });

  const setBox = async (box: Box) => {
    const keys = boxes.value.map((box) => box.refId);
    const boxIndex = keys.indexOf(box.refId);

    if (boxIndex >= 0) {
      boxes.value[boxIndex] = box;
    } else {
      box.refId = generateId();
      boxes.value.push(box);
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

  return { boxes, setBox };
};
