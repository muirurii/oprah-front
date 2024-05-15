import { InView, useInView } from "react-intersection-observer";
import { BiBookOpen } from "react-icons/bi";
import { TbBulbFilled } from "react-icons/tb";
import { RiInformationFill, RiCommunityFill } from "react-icons/ri";
import { GiJourney } from "react-icons/gi";
const sections = [
    {
        heading: "Explore Diverse Topics",
        content:
            "Dive into a world of diverse topics, from technology trends to creative writing tips.",
        icon: <BiBookOpen />,
    },
    {
        heading: "Engage with Expert Insights",
        content:
            "Gain valuable insights from industry experts and thought leaders in every field.",
        icon: <TbBulbFilled />,
    },
    {
        heading: "Stay Updated and Informed",
        content:
            "Stay updated with the latest news, trends, and insights shaping our world today.",
        icon: <RiInformationFill />,
    },
    {
        heading: "Join Our Community",
        content:
            "Join a vibrant community of like-minded individuals passionate about learning and growth.",
        icon: <RiCommunityFill />,
    },
    {
        heading: "Start Your Journey",
        content:
            "Start your journey of discovery, learning, and empowerment with us today!",
        icon: <GiJourney />,
    },
];

const HomeCard = ({ section, index }) => {
    const { ref, inView, entry } = useInView({
        threshold: 0.9,
    });
    return (
        <InView triggerOnce={true}>
            <section ref={ref}
                key={index}
                className={`py-12 relative after:absolute after:w-[1px] after:bottom-0 after:-left-4 after:rounded-full after:top-0 after:bg-secondary mb-12
                after:transition-all after:duration-1000 after:origin-top ${inView ? "after:scale-100" : "after:scale-0"}`}
            >
                <h1 className="text-secondary text-2xl font-sec pb-4">
                    {section.heading}
                </h1>
                <p className="max-w-[300px]">{section.content}</p>
                <div className={`absolute -bottom-12 -left-10 h-12 w-12 rounded-full
                transition-all duration-500 delay-500 
                ${inView ? "shadow-sm shadow-black" : ""}
                 border-secondary flex items-center justify-center`}>
                    {section.icon}
                </div>
            </section>
        </InView>
    )
}

const HomeCards = () => {
    return (
        sections.map((section, index) => (
            <HomeCard section={section} index={index} />
        ))
    )
}
export default HomeCards;