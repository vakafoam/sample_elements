import React, { useState, useEffect, KeyboardEvent } from "react";
import styled from "../style/styled-components";
import { ITEM_WIDTH, SETTINGS } from "./constants";
import { findSelectedItemIndex } from "./helpers";
import { OptionType, SettingsType } from "./";

const SelectWrapper = styled.section`
  // display: flex;
  width: 80%;
  position: relative;
  overflow: hidden;
  margin: auto;
  background: black;
`;

const SelectContent = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-start;
  flex-flow: row nowrap;
  flex-shrink: 1;
  flex-grow: 0;
  background: pink;
  overflow: hidden;
  left: calc(50% - ${ITEM_WIDTH / 2}px); // active item in the middle
`;

const SelectOptions = styled.div`
  display: flex;
  position: relative;
  background: white;
  //   align-items: center;
  cursor: pointer;
  justify-content: center;

  // From info element
  position: relative;
  //   display: block;
  flex-direction: column;
  background: yellow;
  height: 80px;
  flex-shrink: 0;
  width: ${ITEM_WIDTH}px;
`;

const TimelineInfo = styled.div`
  position: relative;
  display: block;
  background: yellow;
  height: 100%;
  flex-shrink: 0;
  width: ${ITEM_WIDTH}px;
`;

const SelectedTag = styled.span`
  position: absolute;
  width: 100%;
  top: 5px;
  display: block;
  justify-self: flex-start;
  text-align: center;
  font-size: 12px;
`;

const SelectOption = styled.p<{ isActive: boolean }>`
  box-sizing: border-box;
  justify-self: center;
  line-height: 1;
  text-align: center;
  position: relative;
  font-size: ${({ isActive }) => (isActive ? "26px" : "24px")};
  font-weight: 400;
  margin: 0;
  color: ${({ isActive }) => (isActive ? "blue" : "black")};
  transition: font-size 0.1s ease-out;
  transition-delay: 0.2s;
`;

interface PropsType {
  options: OptionType[];
  settings: SettingsType;
}

const SwipeToSelect = ({ options, settings }: PropsType) => {
  const [itemsNum, setItemsNum] = useState<number>(0);
  const [i, setI] = useState<number>(0);
  const [x0, setX0] = useState<number | null>(null);
  const [tx, setTx] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [transformValue, setTransformValue] = useState<string>();

  useEffect(() => {
    const selectedIndex = findSelectedItemIndex(options);
    setI(selectedIndex);
    setSelected(selectedIndex);
    if (options.length) setItemsNum(options.length);
  }, []);

  useEffect(() => {
    const newTransform = `translate(${(i * -100) /
      itemsNum}%) translate(${tx}px)`;
    setTransformValue(newTransform);
  }, [i, tx]);

  // Lock the Options from moving to the next slide while user drags
  const lock = (e: any) => {
    const X0 = unify(e).clientX;
    setX0(X0);
    setIsDragging(true);
  };

  //   unlock = e => {
  //     const x0 = this.unify(e).clientX;
  //     this.setState({ x0, isDragging: false });
  //   };

  const isItemActive = (id: number) => {
    const el = document.getElementById(`item_${id}`);
    console.log("Element", el && el.getBoundingClientRect());
  };

  const move = (e: any, idx?: number) => {
    const dx = unify(e).clientX - (x0 || 0);
    if (idx !== undefined && Math.abs(dx) < 5) {
      // handle only click
      setI(idx);
      setIsDragging(false);
    } else if (isDragging) {
      const s = Math.round((dx * 1) / ITEM_WIDTH);

      if ((i > 0 || s < 0) && (i < itemsNum - 1 || s > 0)) {
        const newI = i - s < 0 ? 0 : i - s >= itemsNum ? itemsNum - 1 : i - s; // not sliding beyond min-max values
        setI(newI);
      }
      setTx(0);
      setIsDragging(false);
      setX0(null);
    }
  };

  // Get the right event object depending on if it's Touch or Mouse
  const unify = (e: any) => {
    return e.changedTouches ? e.changedTouches[0] : e;
  };

  // Manage the UI response while user drags the Timeline
  const drag = (e: any) => {
    if (isDragging) {
      // console.log("EVENT", e);
      if (!e.changedTouches) e.preventDefault();
      e.stopPropagation();

      const tX = unify(e).clientX - (x0 || 0);
      setTx(tX);
    }
  };

  const updateItem = (e: any, idx: number) => {
    e.stopPropagation();
    // TODO: check if dragging, then don't update
    const dx = unify(e).clientX - (x0 || 0);
    console.log("click: ", dx);

    if (idx && Math.abs(dx)) {
      // handle only click
      console.log("IDX", idx);
      setI(idx);
      setIsDragging(false);
    }
    //   this.setState({ i: index  })
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === 37 || e.keyCode === 40) {
      if (i === 0) return;
      setI(i - 1);
    } else if (e.keyCode === 38 || e.keyCode === 39) {
      if (i === itemsNum - 1) return;
      setI(i + 1);
    }
  };

  // const onScroll = (e: any) => {
  //   console.log("Scroll", e);
  //   e = window.event || e;
  //   var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
  //   // @ts-ignore
  //   document.getElementById("selectContent").scrollLeft -= delta * 40; // Multiplied by 40
  //   e.preventDefault();
  // };

  const getContentStyles = () => {
    return {
      width: `${itemsNum * ITEM_WIDTH}px`,
      transform: transformValue,
      transition: isDragging ? "none" : "transform 0.5s ease-out",
    };
  };

  return (
    <SelectWrapper>
      <SelectContent
        // id="selectContent"
        onMouseDown={lock}
        //   onMouseUp={this.move}
        // onMouseUp={this.unlock}
        onMouseMove={drag}
        onTouchStart={lock}
        onTouchEnd={move}
        onTouchMove={drag}
        onKeyDown={onKeyDown}
        onMouseLeave={move}
        style={getContentStyles()}
        // onScroll={onScroll}
        tabIndex={0}
      >
        {options.map(({ value, text }, idx) => (
          <SelectOptions id={`item_${idx}`} key={`item_${idx}`}>
            {selected === i && i === idx && (
              <SelectedTag>Current choice</SelectedTag>
            )}
            <SelectOption
              onClick={e => move(e, idx)}
              onDoubleClick={e => {
                e.preventDefault();
                move(e, idx);
              }}
              isActive={i === idx}
              // isActive={this.isItemActive(idx)}
            >
              {text}
            </SelectOption>
          </SelectOptions>
        ))}
      </SelectContent>
    </SelectWrapper>
  );
};

export default SwipeToSelect;
