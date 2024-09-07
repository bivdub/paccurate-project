export type Item = {
  name: String;
  refId: String;
  color: String;
  weight: Number;
  dimensions: { x: Number; y: Number; z: Number };
  sequence: String;
  centerOfMass: { x: Number; y: Number; z: Number };
  quantity: Number;
};
