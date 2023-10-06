export const generateId = () => {
  return Math.random().toString().split(".")[1] + Date.now();
};

export const listToTree = (dataset: any) => {
  const hashTable = Object.create(null);
  dataset.forEach(
    (aData: any) => (hashTable[aData.id] = { ...aData, children: [] })
  );
  const dataTree: any = [];
  dataset.forEach((aData: any) => {
    if (aData.parentId)
      hashTable[aData.parentId].children.push(hashTable[aData.id]);
    else dataTree.push(hashTable[aData.id]);
  });
  return dataTree;
};

export const colors: any = {
  1: "rgb(188, 186, 185)",
  2: "rgb(230, 132, 51)",
  3: "rgb(79, 154, 215)",
  4: "rgb(179, 154, 220)",
  5: "rgb(279, 154, 220)",
  6: "rgb(179, 164, 10)",
  7: "rgb(279, 44, 100)",
};
