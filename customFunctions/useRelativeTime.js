import { useEffect, useState } from "react";

const isPlural = (val) => (val !== 1 ? "s" : "");
const msPerMinute = 60 * 1000;
const msPerHour = msPerMinute * 60;
const msPerDay = msPerHour * 24;

const useRelativeTime = (time) => {
    const [relativeTime, setRelativeTime] = useState(0);

    useEffect(() => {
        const current = Date.now();
        const previous = new Date(time).getTime();
        const elapsed = current - previous;

        if (elapsed < msPerMinute) {
            const seconds = Math.round(elapsed / 1000);
            const amount = `${seconds} second${isPlural(seconds)} ago`;
            setRelativeTime(amount);
        } else if (elapsed < msPerHour) {
            const minutes = Math.round(elapsed / msPerMinute);
            const amount = `${minutes} minute${isPlural(minutes)} ago`;
            setRelativeTime(amount);
        } else if (elapsed < msPerDay) {
            const hours = Math.round(elapsed / msPerHour);
            const amount = `${hours} hour${isPlural(hours)} ago`;
            setRelativeTime(amount);
        } else {
            setRelativeTime(
                new Date(time).toLocaleDateString("en-GB", {
                    dateStyle: "medium",
                })
            );
        }
    }, [time]);

    return relativeTime;
};

export default useRelativeTime;