import React, { useState, useEffect, KeyboardEvent } from "react";
import {
  SelectWrapper,
  SelectContent,
  SelectOptions,
  SelectedTag,
  SelectOption,
  SubmitButton,
  ValueUnits,
} from "SwiperSelect/componentsStyled";
import { ITEM_WIDTH } from "SwiperSelect/constants";
import { findSelectedItemIndex } from "SwiperSelect/helpers";
import { OptionType, SettingsType } from "SwiperSelect";

interface PropsType {
  options: OptionType[];
  settings: SettingsType;
  onSubmit: (v: Pick<OptionType, "value">) => void;
}

const SwipeToSelect = ({ options, settings, onSubmit }: PropsType) => {
  const [itemsNum, setItemsNum] = useState<number>(0);
  const [i, setI] = useState<number>(0);
  const [x0, setX0] = useState<number | null>(null);
  const [tx, setTx] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [transformValue, setTransformValue] = useState<string>();
  const [tempI, setTempI] = useState<number>();

  useEffect(() => {
    const selectedIndex = findSelectedItemIndex(options);
    setI(selectedIndex);
    setSelected(selectedIndex);
    if (options.length) setItemsNum(options.length);
  }, [options]);

  useEffect(() => {
    const newTransform = `translate(${(i * -100) /
      itemsNum}%) translate(${tx}px)`;
    setTransformValue(newTransform);
    // tempI highlights a passing option while dragging
    setTempI(i - Math.round(tx / ITEM_WIDTH));
  }, [i, tx, itemsNum]);

  // Lock the Options from moving to the next slide while user drags
  const lock = (e: any) => {
    const X0 = unify(e).clientX;
    setX0(X0);
    setIsDragging(true);
  };

  const move = (e: any, idx?: number): void => {
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
  const drag = (e: any): void => {
    if (isDragging) {
      if (!e.changedTouches) e.preventDefault();
      e.stopPropagation();

      const tX = unify(e).clientX - (x0 || 0);
      setTx(tX);
    }
  };

  const onKeyDown = (e: KeyboardEvent): void => {
    if (e.keyCode === 37 || e.keyCode === 40) {
      if (i === 0) return;
      setI(i - 1);
    } else if (e.keyCode === 38 || e.keyCode === 39) {
      if (i === itemsNum - 1) return;
      setI(i + 1);
    }
  };

  const getContentStyles = () => {
    return {
      width: `${itemsNum * ITEM_WIDTH}px`,
      transform: transformValue,
      transition: isDragging ? "none" : "transform 0.5s ease-out",
    };
  };

  const getOptionOpacity = (id: number): number => {
    if (id === tempI) return 1;
    if (Math.abs((tempI || i) - id) > 4) return 0.3;
    return 1 - Math.abs((((tempI || i) - id) * 2) / 10);
  };

  return (
    <>
      <SelectWrapper settings={settings}>
        <SelectContent
          onMouseDown={lock}
          onMouseMove={drag}
          onTouchStart={lock}
          onTouchEnd={move}
          onTouchMove={drag}
          onKeyDown={onKeyDown}
          onMouseLeave={move}
          style={getContentStyles()}
          tabIndex={0}
          settings={settings}
        >
          {options.map(({ text }, idx) => (
            <SelectOptions
              id={`item_${idx}`}
              key={`item_${idx}`}
              settings={settings}
            >
              {selected === i && i === idx && (
                <SelectedTag settings={settings}>Current choice</SelectedTag>
              )}
              <SelectOption
                onClick={e => move(e, idx)}
                onDoubleClick={e => {
                  e.preventDefault();
                  move(e, idx);
                }}
                isActive={i === idx || idx === tempI}
                opacity={getOptionOpacity(idx)}
                settings={settings}
              >
                {text}
              </SelectOption>
            </SelectOptions>
          ))}
        </SelectContent>
      </SelectWrapper>
      <ValueUnits settings={settings}>{settings.units}</ValueUnits>
      <br />
      <SubmitButton
        type="submit"
        // @ts-ignore
        onClick={() => onSubmit(options[i].value)}
        settings={settings}
      >
        Submit
      </SubmitButton>
    </>
  );
};

export default SwipeToSelect;
