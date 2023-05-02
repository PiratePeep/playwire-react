import dynamic from "next/dynamic";

const RampNext = dynamic(() => import("./Ramp"), {
    ssr: false,
});

export default RampNext;