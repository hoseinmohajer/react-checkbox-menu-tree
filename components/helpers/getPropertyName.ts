import {TMenuTreeProps, TPropertiesMapper} from "../types/common.ts";
import PROPERTIES_MAPPER from "../constants/propertiesMapper.ts";

export const getPropertyName = (property: keyof TPropertiesMapper, propertiesMapper: TMenuTreeProps['propertiesMapper']): string => {
    if (propertiesMapper && propertiesMapper[property]) {
        return propertiesMapper[property];
    }
    return PROPERTIES_MAPPER[property] as string;
};