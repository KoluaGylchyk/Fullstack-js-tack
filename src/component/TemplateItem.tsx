import { useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdOutlineDone } from "react-icons/md";
import { RiDeleteBin2Fill, RiEditFill } from "react-icons/ri";
import { FcCancel } from "react-icons/fc";
import { generateId, colors } from "../utils/utils";

type Props = {
  element: any;
  setStructure: any;
  newElements: any;
  setNewElements: any;
};

const TemplateItem = ({
  element,
  setStructure,
  setNewElements,
  newElements,
}: Props) => {
  const [inputValue, setInputValue] = useState(element.value);
  const [isCliced, setIsCliced] = useState(false);

  const handleEditInput = () => {
    setIsCliced((prev) => !prev);
  };
  const handleAddChildren = () => {
    const newId = generateId();
    const tempItems = {
      value: "",
      parentId: element.id,
      id: newId,
      level: String(+element.level + 1),
    };
    setNewElements((prev: any) => [...prev, newId]);
    setStructure((prev: any) => [...prev, tempItems]);
    setInputValue("");
  };

  const handleSaveInput = () => {
    if (inputValue.length === 0) return;
    setStructure((prev: any) => {
      const tempData = [...prev].filter((el) => el.id !== element.id);
      const tempElement = { ...element };
      tempElement.value = inputValue;
      tempData.push(tempElement);
      setNewElements((prev: any) => {
        const tempId = [...prev].filter((el) => el !== element.id);
        return tempId;
      });
      return tempData;
    });
  };

  let tempTemp: any = [];
  const deleteElement = (par: any) => {
    const tempEl = tempTemp.find((el: any) => el.id === par);
    tempTemp = [...tempTemp].filter((el: any) => el.id !== tempEl.id);
    const cildrens = tempTemp.filter((el: any) => el.parentId === tempEl.id);
    console.log(tempTemp);
    if (cildrens.length) {
      for (let i of cildrens) {
        deleteElement(i.id);
      }
    }
    return;
  };

  const handleDeleteItem = () => {
    setStructure((prev: any) => {
      tempTemp = [...prev];
      deleteElement(element.id);
      return tempTemp;
    });
  };

  return (
    <div
      className="parent-box"
      style={{ backgroundColor: `${colors[element.level]}` }}
    >
      {isCliced || newElements.find((el: any) => el === element.id) ? (
        <input
          style={{ width: "120px", height: "40px" }}
          autoFocus={true}
          type="text"
          value={inputValue}
          placeholder="type..."
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      ) : (
        <div>
          <div className="name-categorie">{element.value}</div>
        </div>
      )}
      <div className="button-container">
        <div className="button-box">
          {isCliced || newElements.find((el: any) => el === element.id) ? (
            <>
              <MdOutlineDone
                onClick={handleSaveInput}
                style={{ width: "15px", height: "15px", marginLeft: "5px" }}
              >
                save
              </MdOutlineDone>
              <FcCancel
                style={{ width: "15px", height: "15px", marginLeft: "5px" }}
                onClick={() => {
                  setIsCliced(false);
                  setNewElements((prev: any) => {
                    const tempId = [...prev].filter((el) => el !== element.id);
                    return tempId;
                  });
                }}
              >
                cancel
              </FcCancel>
            </>
          ) : (
            <>
              {element.level !== "1" ? (
                <>
                  <RiDeleteBin2Fill
                    style={{
                      width: "15px",
                      height: "15px",
                      marginLeft: "5px",
                    }}
                    onClick={
                      isCliced || newElements.length
                        ? () => {}
                        : handleDeleteItem
                    }
                  >
                    delete
                  </RiDeleteBin2Fill>
                  <RiEditFill
                    style={{
                      width: "15px",
                      height: "15px",
                      marginLeft: "5px",
                      marginRight: "5px",
                    }}
                    onClick={
                      isCliced || newElements.length
                        ? () => {}
                        : handleEditInput
                    }
                  ></RiEditFill>
                </>
              ) : (
                ""
              )}

              <IoAddCircleSharp
                style={{ width: "20px", height: "20px", marginRight: "5px" }}
                onClick={
                  isCliced || newElements.length ? () => {} : handleAddChildren
                }
                disabled={isCliced || newElements.length ? true : false}
              ></IoAddCircleSharp>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateItem;
