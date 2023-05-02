import dynamic from "next/dynamic";

const RampUnitNext = dynamic(() => import("./RampUnit"), {
    ssr: false,
});

export default RampUnitNext;
