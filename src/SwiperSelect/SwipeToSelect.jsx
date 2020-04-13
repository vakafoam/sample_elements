import React from "react";
import styled from "styled-components";
import { ITEM_WIDTH, SETTINGS } from "./constants";

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

const SelectOption = styled.p`
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

class SwipeToSelect extends React.Component {
  state = {
    itemsNum: 0,
    i: 0,
    x0: null,
    tx: 0,
    isDragging: false,
    selected: null,
  };

  componentDidMount() {
    const { options } = this.props;
    this.findSelectedItem(options);
    if (options.length) {
      this.setState({ itemsNum: options.length });
    }
  }

  findSelectedItem = arr => {
    let selected = arr.findIndex(el => {
      if (el.selected) return true;
    });
    // TODO: implement initial value from options
    if (selected === -1) selected = 0;
    console.log("selected", selected);
    this.setState({ ...this.state, i: selected, selected });
  };

  // Lock the Timeline from moving to the next slide while user drags
  lock = e => {
    const x0 = this.unify(e).clientX;
    this.setState({ x0, isDragging: true });
  };

  //   unlock = e => {
  //     const x0 = this.unify(e).clientX;
  //     this.setState({ x0, isDragging: false });
  //   };

  isItemActive = i => {
    const el = document.getElementById(`item_${i}`);
    console.log("Element", el && el.getBoundingClientRect());
  };

  move = (e, idx = null) => {
    const { x0, i, itemsNum, isDragging } = this.state;
    const dx = this.unify(e).clientX - x0;
    if (idx !== null && Math.abs(dx) < 5) {
      // handle only click
      console.log("IDX", idx);
      this.setState(prevState => {
        return { ...prevState, i: idx, isDragging: false };
      });
    } else if (isDragging) {
      const s = Math.round((dx * 1) / ITEM_WIDTH);

      if ((i > 0 || s < 0) && (i < itemsNum - 1 || s > 0)) {
        const newI = i - s < 0 ? 0 : i - s >= itemsNum ? itemsNum - 1 : i - s; // not sliding beyond min-max values
        this.setState({ i: newI, tx: 0, isDragging: false, x0: null });
      }
      this.setState({ tx: 0, x0: null, isDragging: false });
    }
  };

  // Get the right event object depending on if it's Touch or Mouse
  unify = e => {
    return e.changedTouches ? e.changedTouches[0] : e;
  };

  // Manage the UI response while user drags the Timeline
  drag = e => {
    const { x0, isDragging } = this.state;

    if (isDragging) {
      console.log("EVENT", e);
      if (!e.changedTouches) e.preventDefault();
      e.stopPropagation();

      const tx = this.unify(e).clientX - x0;
      this.setState({ tx });
    }
  };

  updateItem = (e, idx) => {
    const { x0, i, itemsNum, isDragging } = this.state;

    e.stopPropagation();
    // TODO: check if dragging, then don't update
    const dx = this.unify(e).clientX - x0;
    console.log("click: ", dx);

    if (idx && Math.abs(dx)) {
      // handle only click
      console.log("IDX", idx);
      this.setState(prevState => {
        return { ...prevState, i: idx, isDragging: false };
      });
    }

    //   this.setState({ i: index  })
  };

  onKeyDown = e => {
    const { i, itemsNum } = this.state;
    if (e.keyCode === 37 || e.keyCode === 40) {
      if (i === 0) return;
      this.setState(prevState => {
        return { ...prevState, i: prevState.i - 1 };
      });
    } else if (e.keyCode === 38 || e.keyCode === 39) {
      if (i === itemsNum - 1) return;
      this.setState(prevState => {
        return { ...prevState, i: prevState.i + 1 };
      });
    }
  };

  render() {
    const { i, itemsNum, tx, isDragging, selected } = this.state;
    const { options } = this.props;

    const transformValue = `translate(${(i * -100) /
      itemsNum}%) translate(${tx}px)`;

    const contentStyles = {
      width: `${itemsNum * ITEM_WIDTH}px`,
      transform: transformValue,
      transition: isDragging ? "none" : "transform 0.5s ease-out",
    };
    const translatePoints = -((i - 2) / itemsNum) * 100;

    return (
      <SelectWrapper>
        <SelectContent
          onMouseDown={this.lock}
          //   onMouseUp={this.move}
          // onMouseUp={this.unlock}
          onMouseMove={this.drag}
          onTouchStart={this.lock}
          onTouchEnd={this.move}
          onTouchMove={this.drag}
          onKeyDown={this.onKeyDown}
          onMouseLeave={this.move}
          style={contentStyles}
          tabIndex="0"
        >
          {options.map(({ value, text }, idx) => (
            <SelectOptions id={`item_${idx}`} key={value}>
              {/* <TimelineInfo> */}
              {selected === i && i === idx && (
                <SelectedTag>Current choice</SelectedTag>
              )}
              <SelectOption
                onClick={e => this.move(e, idx)}
                onDoubleClick={e => {
                  e.preventDefault();
                  this.move(e, idx);
                }}
                isActive={i === idx}
                // isActive={this.isItemActive(idx)}
              >
                {text}
              </SelectOption>

              {/* </TimelineInfo> */}
            </SelectOptions>
          ))}
        </SelectContent>
        {/* <TimelinePointsWidget
          i={i}
          translatePoints={
            translatePoints < 0
              ? translatePoints >= -50
                ? translatePoints
                : -50
              : 0
          }
          timelineYears={options.map(item => item.year)}
          updateItem={this.updateItem}
        /> */}
      </SelectWrapper>
    );
  }
}

export default SwipeToSelect;
