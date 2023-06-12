import React from "react";

const oopUnits = [
  // "trendi_native",
  "trendi_video",
  "site_skin",
  "flex_leaderboard",
  // "top_rail",
  "right_rail",
  "bottom_rail",
  "left_rail",
];

// destroy the units when componenent unmounts
const cleanUp = (): Promise<void> =>
  new Promise((resolve, reject) => {
    // possible that component was removed before first ad was created
    if (!window.ramp.settings || !window.ramp.settings.slots) return resolve();

    delete window.ramp.forcePath;

    let slotsToRemove: string[] = [];
    Object.entries(window.ramp.settings.slots).forEach(([slotName, slot]) => {
      if (oopUnits.includes(slot.type) || slot.videoType === "Bolt Player") {
        slotsToRemove.push(slotName);
      }
    });

    if (slotsToRemove.length > 0) {
      window.ramp.destroyUnits(slotsToRemove).finally(() => resolve());
    }
  });

export type RampProps = {
  publisherId: string;
  id: string;
  forcePath?: string;
};

export default class Ramp extends React.Component<RampProps> {
  constructor(props: RampProps) {
    super(props);

    if (!props || !props.publisherId || !props.id) {
      console.error("publisherId and id are required props.");
      return;
    }
  }

  init({ publisherId, id, forcePath }: RampProps) {
    if (forcePath) window.ramp.forcePath = forcePath;

    // make sure we only do this once per "app" load
    if (!window._pwRampComponentLoaded) {
      window._pwRampComponentLoaded = true;

      //window.ramp.config = `https://config.playwire.com/${publisherId}/v2/websites/${id}/banner.json`;
      const configScript = document.createElement("script");
      configScript.src = `https://cdn.intergient.com/${publisherId}/${id}/ramp.js`;
      document.head.appendChild(configScript);
    }

    this.displayTaglessUnits();
  }

  componentDidMount() {
    window.ramp = window.ramp || {};
    window.ramp.que = window.ramp.que || [];
    window.ramp.passiveMode = true;
    window._pwRampComponentLoaded = window._pwRampComponentLoaded || false;

    this.init(this.props);
  }
  
  displayTaglessUnits() {
    window.ramp.que.push(() => {
      window.ramp
        .addUnits([
          // { type: "trendi_native" },
          { type: "trendi_video" },
          { type: "site_skin" },
          { type: "flex_leaderboard" },
          // { type: "top_rail" },
          { type: "right_rail" },
          { type: "bottom_rail" },
          { type: "left_rail" },
          // {type: 'behind_page'},
          // {type: 'in_image'},
          // {type: 'above_page'},
          // {type: 'in_content'},
          // {type: 'inimg'},
          // {type: 'skin'}
        ])
        .finally(() => {
          window.ramp.displayUnits();
        });
    });
  }

  componentDidUpdate(prevProps: RampProps) {
    if (this.props.forcePath && prevProps.forcePath !== this.props.forcePath) {
      window.ramp.forcePath = this.props.forcePath;
      window.ramp.que.push(() => {
        window.ramp
          .setPath(this.props.forcePath as string)
          .then(() => {
            return cleanUp();
          })
          .then(() => {
            this.displayTaglessUnits();
          });
      });
    }
  }

  componentWillUnmount() {
    window.ramp.que.push(() => {
      cleanUp();
    });
  }

  render() {
    return null;
  }
}
