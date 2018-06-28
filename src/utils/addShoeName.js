/**
 * Gets the brand name from the Brand model and concatenates with the shoe model
 * so this doesn't have to be done manually.
 */
export default (shoe) => {
  if (shoe && shoe.Brand) {
    shoe.name = `${shoe.Brand.name} ${shoe.model}`;
  }
  return shoe;
};
