export type Item = {
  name: String;
  refId: Number;
  color: String;
  weight: Number;
  dimensions: { x: Number; y: Number; z: Number };
  sequence: String;
  centerOfMass: { x: Number; y: Number; z: Number };
  quantity: Number;
};

export type Box = {
  name: String;
  refId: Number;
  price: Number;
  weightTare: Number;
  weightMax: Number;
  dimensions: { x: Number; y: Number; z: Number };
  centerOfMass: { x: Number; y: Number; z: Number };
  reservedSpace: Number;
  itemsPerBoxMax: Number;
  itemSetsPerBoxMax: Number;
};
