import React from "react";
import {
  Container,
  Header,
  Title,
  IconContainer,
  Icon,
  MenuTreeWrapper,
  TreeMenuTitle,
} from "./style";
import { Shimmer } from "../shimmer";

type TMenuItems = {
  id: number;
  children: TMenuItems[];
};

const menuEngine = (menuItems: TMenuItems[]) => {
  const _WIDTH = Number(
    Math.random()
      .toString()
      .substring(
        Math.random().toString().length,
        Math.random().toString().length - 2,
      ),
  );

  return (
    <MenuTreeWrapper>
      <ul className="tree-menu-ul">
        {menuItems?.map((item, index) => {
          const hasChildren = item.children && item.children.length !== 0;
          const status = item.children && item.children.length !== 0;
          return (
            <React.Fragment key={item.id}>
              {hasChildren && index === 0 && (
                <span className="vertical-line-of-first-node" />
              )}
              <li className="tree-menu-li">
                <div className="right-side">
                  {hasChildren && (
                    <>
                      <i className={`arrow-icon g-triangle-left show`} />
                      <span className="horizontal-line" />
                    </>
                  )}
                  {!hasChildren && (
                    <>
                      <span className="horizontal-line-leaves" />
                    </>
                  )}
                  <TreeMenuTitle width={_WIDTH} />
                </div>
              </li>
              {status && menuEngine(item.children)}
            </React.Fragment>
          );
        })}
      </ul>
    </MenuTreeWrapper>
  );
};

const MenuTreeSkeleton = () => {
  return (
    <Container>
      <Shimmer />
      <Header>
        <Title />
        <IconContainer>
          <Icon />
          <Icon />
        </IconContainer>
      </Header>
      {menuEngine(Tree)}
    </Container>
  );
};

export default MenuTreeSkeleton;

const Tree = [
  {
    id: Math.random(),
    children: [],
  },
  {
    id: Math.random(),
    children: [
      {
        id: Math.random(),
        children: [
          {
            id: Math.random(),
            children: [],
          },
        ],
      },
      {
        id: Math.random(),
        children: [],
      },
    ],
  },
  {
    id: Math.random(),
    children: [],
  },
  {
    id: Math.random(),
    children: [
      {
        id: Math.random(),
        children: [
          {
            id: Math.random(),
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: Math.random(),
    children: [
      {
        id: Math.random(),
        children: [],
      },
      {
        id: Math.random(),
        children: [
          {
            id: Math.random(),
            children: [],
          },
        ],
      },
      {
        id: Math.random(),
        children: [],
      },
    ],
  },
  {
    id: Math.random(),
    children: [],
  },
];
