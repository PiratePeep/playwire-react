declare global {
  interface Window {
    ramp: {
      passiveMode: boolean;
      que: any[];
      forcePath?: string;
      config?: string;
      settings?: {
        slots:
          | {
              type: string;
            }
          | { videoType: string }[];
      };
      displayUnits: () => void;
      addUnits: (units: { type: string }[]) => Promise<void>;
      setPath: (path: string) => Promise<void>;
      destroyUnits: (units: string[] | string) => Promise<void>;
    };
    _pwRampComponentLoaded: boolean;
  }
}

export {};
