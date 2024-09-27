import {
  ButtonContainer,
  Input,
  InputWrapper,
  IconWrapper,
  Title,
  HeaderContainer,
  SearchResultContainer,
  ResultMessage,
  ButtonsContainer,
  ResultMessageLabel,
  ResultMessageText,
} from "./style";
import { Close, Collapse, Down, Expand, Search, Up } from "../../assets/icons";
import {THeaderProps} from "../../types/common.ts";
import {useHeader} from "./useHeader.ts";

export const Header = (props: THeaderProps) => {
  const {
    hiddenIds,
    searchInputValue,
    title,
    searchResult,
    theme,
  } = props;

  const {
    showSearchBox,
    openAllNodes,
    closeAllNodes,
    resetChangeHandler,
    toggleShowSearchBox,
    searchChangeHandler,
    searchedItemClickHandler,
    searchItemCounter,
    getTranslate
  } = useHeader(props);

  return (
    <>
      <HeaderContainer>
        <ButtonContainer>
          {hiddenIds.length !== 0 ? (
            <IconWrapper onClick={openAllNodes} title={getTranslate("openAll")}>
              <Collapse theme={theme} />
            </IconWrapper>
          ) : (
            <IconWrapper
              onClick={closeAllNodes}
              title={getTranslate("closeAll")}
            >
              <Expand theme={theme} />
            </IconWrapper>
          )}
          <InputWrapper $showSearchBox={showSearchBox}>
            <IconWrapper
              onClick={
                showSearchBox
                  ? resetChangeHandler
                  : () => {
                      toggleShowSearchBox(!showSearchBox);
                    }
              }
              title={
                showSearchBox ? getTranslate("close") : getTranslate("search")
              }
            >
              <IconWrapper>
                {showSearchBox ? (
                  <Close theme={theme} />
                ) : (
                  <Search theme={theme} />
                )}
              </IconWrapper>
            </IconWrapper>
            <Input
              $showSearchBox={showSearchBox}
              type="text"
              onChange={searchChangeHandler}
              value={searchInputValue}
            />
          </InputWrapper>
        </ButtonContainer>
        {title && <Title>{title}</Title>}
      </HeaderContainer>
      {!!searchResult?.length && (
        <SearchResultContainer>
          <ButtonsContainer>
            <IconWrapper onClick={() => searchedItemClickHandler("up")}>
              <Up />
            </IconWrapper>
            <IconWrapper onClick={() => searchedItemClickHandler("down")}>
              <Down />
            </IconWrapper>
          </ButtonsContainer>
          <ResultMessage>
            <ResultMessageLabel>
              {getTranslate("resultCount")}:
            </ResultMessageLabel>
            <ResultMessageText>{`${searchItemCounter + 1}/${searchResult?.length}`}</ResultMessageText>
            <ResultMessageText>{getTranslate("result")}</ResultMessageText>
          </ResultMessage>
        </SearchResultContainer>
      )}
    </>
  );
};
