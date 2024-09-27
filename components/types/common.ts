import { Dispatch, ReactElement, SetStateAction } from "react";

export type TPropertiesMapper = {
  id?: string;
  parentId?: string;
  title?: string;
  tags?: string;
  description?: string;
  iconName?: string;
  children?: string;
  checked?: string;
};

export type TMappedProperties = {
  ID: string;
  PARENT_ID: string;
  TITLE: string;
  TAGS: string;
  DESCRIPTION: string;
  ICON_NAME: string;
  CHILDREN: string;
  CHECKED: string;
};

export type TChecked = "FULL" | "HALF" | "NOT";

export type TData = {
  [key: string]:
      | Array<string | number | TData>
      | number
      | string
      | null
      | TChecked
      | undefined;
};

export type TTheme = {
  name: string;
  colors?: {
    white?: string;
    white_200?: string;
    white_300?: string;
    white_500?: string;
    black_100?: string;
    black_200?: string;
    black_300?: string;
    black_400?: string;
    primary?: string;
    secondary_100?: string;
    tertiary?: string;
    warning?: string;
    shadow_100?: string;
    shadow_200: string;
  };
  fontSize?: {
    h5?: string;
    h6?: string;
    h8?: string;
  };
  fontWeight?: {
    bold?: string | number;
    normal?: string | number;
    high?: string | number;
  };
};

type TTranslate = {
  result:string;
  resultCount:string;
  close:string;
  search:string;
  closeAll:string;
  openAll:string;
};

export interface TMenuTreeProps {
  data: Array<TData>;
  leftSideWidget?: (data?: Array<TData> | TData) => ReactElement;
  hasCheckBox?: boolean;
  loading?: boolean;
  title?: string;
  headerLess?: boolean;
  disabled?: boolean;
  onClick?: (
      data?: Array<TData> | TData | null,
      ids?: Array<number | string> | null | number | string,
  ) => void;
  propertiesMapper?: TPropertiesMapper | null;
  theme?: TTheme;
  translation?: TTranslate;
}

export type THeaderProps = {
  nodeRef: null | { current: any };
  setSearchInputValue: Dispatch<SetStateAction<string>>;
  hiddenIds: Array<string | number | null>;
  searchInputValue: string;
  title: TData["title"];
  searchResult: Array<number | string>;
  data: Array<TData>;
  setHiddenIds: Dispatch<SetStateAction<Array<string | number | null>>>;
  setMenuItems: Dispatch<SetStateAction<Array<TData>>>;
  menuItems: TData[];
  setSearchResult: Dispatch<SetStateAction<Array<number | string>>>;
  theme?: TTheme;
  mappedProperties: TMappedProperties;
  translation?: TTranslate;
};

export type TScrollTarget = HTMLInputElement & (Window & typeof globalThis);

export type TScrollIntoViewSetting = {
  time: number;
  align: {
    top: number;
    right: number;
    topOffset: number;
    leftOffset: number;
    lockX: boolean;
    lockY: boolean;
  };
  validTarget: (target: TScrollTarget) => boolean;
  isScrollable: (
      target: TScrollTarget,
      defaultIsScrollable: (target: TScrollTarget) => boolean,
  ) => boolean | number;
  debug: boolean;
};
