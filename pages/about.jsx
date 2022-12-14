import Meta from "../components/Meta";

const About = () => {
    return ( 
        <main className="min-h-screen px-4"> 
        <Meta 
              title={"About"}
        />  
        <h1 className="text-3xl py-8">About me</h1>
          <section className="grid md:grid-cols-2 gap-8 pb-8">
              <img className="h-[400px] w-full rounded" src="/pic.jpg" alt="" />
              <article className="leading-6 text-sm font-light">
                <p className="pb-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti sunt est assumenda ea porro quidem ex iure praesentium rerum. Blanditiis facere id eaque dolorum sit beatae fugiat maxime quas corporis.
                </p>
                <p className="pb-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti sunt est assumenda ea porro quidem ex iure praesentium rerum. Blanditiis facere id eaque dolorum sit beatae fugiat maxime quas corporis.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti sunt est assumenda ea porro quidem ex iure praesentium rerum. Blanditiis facere id eaque dolorum sit beatae fugiat maxime quas corporis.
                </p>
                <p className="text-secondary text-xl font-bold mt-8 font-sec">Phoebe Raquel</p>
              </article>
          </section>
        </main>
    )
}

export default About