import React, { useEffect, useMemo, useState } from "react";

type CheckedState = Record<number, boolean>;

interface UseCheckboxProps<T> {
  items: T[];
  keyFn: (item: T) => number;
}

type UseCheckboxReturnType = {
  checkedState: CheckedState;
  setCheckedState: React.Dispatch<React.SetStateAction<CheckedState>>;
  isAllChecked: boolean;
  handleCheckboxChange: (id: number) => void;
  handleMasterCheckboxChange: () => void;
  checkedCount: number;
};

export function useCheckbox<T>({
  items,
  keyFn,
}: UseCheckboxProps<T>): UseCheckboxReturnType {
  const [checkedState, setCheckedState] = useState<CheckedState>({});
  const [isAllChecked, setIsAllChecked] = useState(false);

  const handleCheckboxChange = (id: number) => {
    setCheckedState((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleMasterCheckboxChange = () => {
    const newCheckedState = !isAllChecked;
    setIsAllChecked(newCheckedState);

    const newItemsCheckedState = items.reduce(
      (acc, item) => ({
        ...acc,
        [keyFn(item)]: newCheckedState,
      }),
      {}
    );

    setCheckedState(newItemsCheckedState);
  };

  const checkedCount = useMemo(
    () => Object.values(checkedState).filter(Boolean).length,
    [checkedState]
  );

  useEffect(() => {
    const allChecked =
      items.length > 0 && items.every((item) => checkedState[keyFn(item)]);
    setIsAllChecked(allChecked);
  }, [checkedState, items, keyFn]);

  return {
    checkedState,
    setCheckedState,
    isAllChecked,
    handleCheckboxChange,
    handleMasterCheckboxChange,
    checkedCount,
  };
}
