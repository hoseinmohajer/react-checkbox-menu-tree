import {TPropertiesMapper, TData} from "../types/common.ts";
import {getPropertyName} from "./getPropertyName.ts";


const findCheckedItems = (data: Array<TData>, propertiesMapper: TPropertiesMapper | null): Array<number | string> => {

  let IDS: Array<number | string> = [];
  const finder = (data: Array<TData>) => {
    if (data) {
      data?.forEach((item: TData) => {
        if (propertiesMapper) {
          const _status = item[getPropertyName("checked", propertiesMapper)]
          if ( _status === "FULL" || _status === "HALF" ) {
            const _id = item[getPropertyName("id", propertiesMapper)] as string | number
            if (IDS.indexOf(_id) === -1) {
              IDS.push(_id);
            }
          } else {
            IDS = IDS.filter(
                (id) => Number(id) !== Number(item[getPropertyName("id", propertiesMapper)])
            );
          }
          const _children = getPropertyName("children", propertiesMapper)
          finder(item[_children] as unknown as Array<TData>);
        }
      });
    }
    return IDS;
  };

  return finder(data);
};

export default findCheckedItems;
