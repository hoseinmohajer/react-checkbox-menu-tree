import React, { useEffect, useState } from 'react';
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
} from './style';
import { Close, Collapse, Down, Expand, Search, Up } from '../icons';
import scrollIntoView from 'scroll-into-view';
import USING_PROPERTY from '../constants/usingProperty';
import getPersianChar from '../helpers/getPersianChar';
import defaultTheme from "../constants/themes/defaultTheme";

const scrollIntoViewSetting = {
	time: 500,
	align: {
		top: 0,
		right: 0,
		topOffset: 0,
		leftOffset: 0,
		lockX: true,
		lockY: false,
	},
	validTarget: function (target) {
		return target !== window && target.matches('.scrollable');
	},
	isScrollable: function (target, defaultIsScrollable) {
		return defaultIsScrollable(target) || (target !== window && ~target.className.indexOf('scrollable'));
	},
	debug: false,
};

const Header = props => {
	const {
		nodeRef,
		hiddenIds,
		searchInputValue,
		title,
		searchResult,
		data,
		setHiddenIds,
		setMenuItems,
		setSearchInputValue,
		menuItems,
		setSearchResult,
		usingProperty,
	} = props;
	const theme = defaultTheme;
	const [showSearchBox, toggleShowSearchBox] = useState(false);
	const [searchItemCounter, setSearchItemCounter] = useState(0);
	useEffect(() => {
		if (searchResult.length) {
			scrollIntoView(nodeRef.current[searchResult[0]], scrollIntoViewSetting);
		} else {
			scrollIntoView(nodeRef.current[menuItems[0]?.id], scrollIntoViewSetting);
		}
	}, [searchResult, showSearchBox]);
	const searchedItemClickHandler = state => {
		if (hiddenIds.length) {
			setHiddenIds([]);
		}
		if (searchResult.length) {
			if (state === 'down') {
				if (searchItemCounter >= searchResult.length - 1) {
					scrollIntoView(nodeRef.current[searchResult[0]], scrollIntoViewSetting);

					setSearchItemCounter(0);
				} else {
					scrollIntoView(nodeRef.current[searchResult[searchItemCounter + 1]], scrollIntoViewSetting);

					setSearchItemCounter(searchItemCounter + 1);
				}
			}
			if (state === 'up') {
				if (searchItemCounter <= 0) {
					scrollIntoView(nodeRef.current[searchResult[searchResult.length - 1]], scrollIntoViewSetting);

					setSearchItemCounter(searchResult.length - 1);
				} else {
					scrollIntoView(nodeRef.current[searchResult[searchItemCounter - 1]], scrollIntoViewSetting);

					setSearchItemCounter(searchItemCounter - 1);
				}
			}
		}
		return false;
	};
	const closeAllNodes = () => {
		let ids = [];
		const finder = data => {
			if (data) {
				data.forEach(item => {
					ids.push(item[getProperty('id')]);
					finder(item[getProperty('children')]);
				});
			}
		};
		finder(JSON.parse(JSON.stringify(data)));
		setHiddenIds(ids);
	};
	const openAllNodes = () => {
		setHiddenIds([]);
	};
	const resetChangeHandler = () => {
		setSearchResult([]);
		setSearchInputValue('');
		toggleShowSearchBox(!showSearchBox);
		setMenuItems(JSON.parse(JSON.stringify(data)));
	};
	const getProperty = property => {
		if (usingProperty && usingProperty[property]) {
			return usingProperty[property];
		}
		return USING_PROPERTY[property];
	};
	const searchChangeHandler = e => {
		let keyword = e.target.value.replace(/\\/g, '\\\\');
		keyword = keyword.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '');
		setSearchInputValue(keyword);
		const finder = data => {
			data.forEach(item => {
				const regex = new RegExp(getPersianChar(keyword), 'gi');
				if (getPersianChar(keyword)) {
					if (
						(item[getProperty('title')] && getPersianChar(item[getProperty('title')].toString()).match(regex)) ||
						(item[getProperty('description')] &&
							getPersianChar(item[getProperty('description')].toString()).match(regex)) ||
						(item[getProperty('tags')] && getPersianChar(item[getProperty('tags')].toString()).match(regex))
					) {
						if (searchResult.indexOf(item[getProperty('id')]) === -1) {
							setHiddenIds(prevHiddenIds => prevHiddenIds.filter(id => id !== item[getProperty('id')]));
							setSearchResult(prevSearchResult => [...prevSearchResult, item[getProperty('id')]]);
						}
					} else {
						setSearchResult(prevSearchResult => prevSearchResult.filter(id => id !== item[getProperty('id')]));
					}
				} else {
					setSearchResult([]);
				}
				if (item[getProperty('children')].length) {
					finder(item[getProperty('children')]);
				}
			});
		};
		finder(menuItems);
	};
	return (
		<>
			<HeaderContainer>
				<ButtonContainer>
					{hiddenIds.length !== 0 ? (
						<IconWrapper onClick={openAllNodes} title={'بازکردن همه'}>
							<Collapse theme={theme} />
						</IconWrapper>
					) : (
						<IconWrapper onClick={closeAllNodes} title={'بستن همه'}>
							<Expand theme={theme} />
						</IconWrapper>
					)}
					<InputWrapper showSearchBox={showSearchBox}>
						<IconWrapper
							closeIcon={showSearchBox}
							onClick={
								showSearchBox
									? resetChangeHandler
									: () => {
											toggleShowSearchBox(!showSearchBox);
									  }
							}
							title={showSearchBox ? 'بستن' : 'جستجو'}
						>
							<IconWrapper>{showSearchBox ? <Close theme={theme} /> : <Search theme={theme} />}</IconWrapper>
						</IconWrapper>
						<Input showSearchBox={showSearchBox} type="text" onChange={searchChangeHandler} value={searchInputValue} />
					</InputWrapper>
				</ButtonContainer>
				{title && <Title>{title}</Title>}
			</HeaderContainer>
			{!!searchResult?.length && (
				<SearchResultContainer>
					<ButtonsContainer>
						<IconWrapper onClick={() => searchedItemClickHandler('up')}>
							<Up />
						</IconWrapper>
						<IconWrapper onClick={() => searchedItemClickHandler('down')}>
							<Down />
						</IconWrapper>
					</ButtonsContainer>
					<ResultMessage>
						<ResultMessageLabel>تعداد نتایج:</ResultMessageLabel>
						<ResultMessageText>{`${searchItemCounter + 1}/${searchResult?.length}`}</ResultMessageText>
						<ResultMessageText>نتیجه</ResultMessageText>
					</ResultMessage>
				</SearchResultContainer>
			)}
		</>
	);
};

export default Header;
