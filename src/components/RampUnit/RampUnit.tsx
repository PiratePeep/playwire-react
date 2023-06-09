import React from "react";
import store from "./store";

export type UnitType =
  | "leaderboard_atf"
  | "leaderboard_btf"
  | "med_rect_atf"
  | "med_rect_btf"
  | "sky_atf"
  | "sky_btf";

const inPageUnits = [
  "leaderboard_atf",
  "leaderboard_btf",
  "med_rect_atf",
  "med_rect_btf",
  "sky_atf",
  "sky_btf",
];

// find a new unique element ID to place this ad
const getUniqueId = (type: string) => {
  return store.getUnitId(type);
};

// sets up the object and adds a selectorId if necessary
const getInitialUnit = (
  props: RampUnitProps
): {
  type: UnitType;
  selectorId?: string;
} => {
  const unit: {
    type: UnitType;
    selectorId?: string;
  } = {
    type: props.type,
  };

  if (inPageUnits.includes(props.type)) {
    unit.selectorId = getUniqueId(props.type);
  }
  return unit;
};

// destroy the unit when componenent unmounts
const cleanUp = (parentId: string) => {
  // possible that component was removed before first ad was created
  if (!window.ramp.settings || !window.ramp.settings.slots) return;

  let slotToRemove = null;
  Object.entries(window.ramp.settings.slots).forEach(([slotName, slot]) => {
    if (
      slot.element &&
      slot.element.parentElement &&
      slot.element.parentElement.id === parentId
    ) {
      slotToRemove = slotName;
    }
  });

  if (slotToRemove) {
    window.ramp.destroyUnits(slotToRemove);
  }
};

export type RampUnitProps = { type: UnitType; className?: string };

export default class RampUnit extends React.Component<RampUnitProps> {
  rendered: boolean;
  unitToAdd: {
    type: UnitType;
    selectorId?: string;
  };

  constructor(props: RampUnitProps) {
    super(props);
    this.rendered = false;
    this.unitToAdd = getInitialUnit(props);
  }

  componentDidMount() {
    if (this.rendered) return;

    window.ramp = window.ramp || {};
    window.ramp.que = window.ramp.que || [];

    this.rendered = true;
    window.ramp.que.push(() => {
      window.ramp
        .addUnits([this.unitToAdd])
        .catch((e) => {
          console.warn(e);
        })
        .finally(() => {
          window.ramp.displayUnits();
        });
    });
  }

  componentWillUnmount() {
    window.ramp.que.push(() => {
      cleanUp(this.unitToAdd.selectorId as string);
    });
  }

  render() {
    return (
      <div id={this.unitToAdd.selectorId} className={this.props.className}></div>
    );
  }
}
