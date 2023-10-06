import React, { useState, useMemo } from "react";
import TemplateItem from "./TemplateItem";
import { listToTree } from "../utils/utils";
import "../style/tree.css";
import useDragger from "../hooks/useDragger";

const PinkBox: React.FC = () => {
  useDragger("categories");
  const [structure, setStructure] = useState([
    {
      value: "Categories",
      id: 1,
      level: "1",
    },
  ]);
  const [newElements, setNewElements] = useState([]);

  const treeRendering = (treeData: any) => {
    return (
      <>
        <ul>
          {treeData.map((item: any, index: number) => (
            <li key={item.value + index}>
              <TemplateItem
                element={item}
                setStructure={setStructure}
                newElements={newElements}
                setNewElements={setNewElements}
              />
              {item.children && item.children.length
                ? treeRendering(item.children)
                : ""}
            </li>
          ))}
        </ul>
      </>
    );
  };
  let tempData = useMemo(() => {
    return listToTree(structure);
  }, [structure]);

  return (
    <div id="categories" className="box">
      <div className="tree">{treeRendering(tempData)}</div>
    </div>
  );
};

export default PinkBox;
