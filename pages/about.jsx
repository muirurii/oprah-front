import Heading from "../components/Heading";
import Meta from "../components/Meta";

const About = () => {
  return (
    <main className="min-h-screen px-4">
      <Meta title={"About"} />
      <Heading text={"About Me"} />
      <section className="flex flex-wrap items-center justify-evenly gap-8 pb-8">
        <img
          className="max-h-[600px] max-w-[600px] w-full h-full rounded"
          src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
        <article className="leading-6 max-w-[800px]">
          <p className="pb-1">
            Welcome to my world of words! I'm a dedicated wordsmith weaving
            tales and sharing insights through the art of blogging. Writing has
            always been my passion, a medium through which I express my
            thoughts, experiences, and imagination.
          </p>

          <p className="pb-1">
            My journey as a blogger began years ago when I realized the power of
            words to inspire, educate, and entertain. From personal anecdotes to
            thought-provoking essays, my blog is a canvas where I paint a
            tapestry of diverse topics.
          </p>
          <p className="pb-1">
            My writing journey is a reflection of my eclectic interests. Travel
            holds a special place in my heart, as I believe in the
            transformative power of exploring new places, cultures, and
            cuisines. Through vivid narratives and travel tips, I aim to
            transport readers to captivating destinations and inspire their
            wanderlust.
          </p>
          <p className="pb-1">
            Food is another realm where I find joy and inspiration. From
            culinary adventures in my kitchen to savoring delicacies around the
            globe, I share recipes, reviews, and food stories that celebrate the
            art of gastronomy and its cultural significance.
          </p>
          <p className="pb-1">
            Beyond external adventures, my blog delves into the realms of
            mindfulness, personal growth, and introspection. I believe in the
            power of self-care, mindfulness practices, and holistic well-being.
            Through reflective essays and actionable tips, I strive to empower
            readers to lead fulfilling lives and nurture their mental,
            emotional, and physical health.
          </p>
          <p className="pb-1">
            When I'm not immersed in crafting blog posts, you'll find me
            indulging in my love for literature, exploring nature's beauty, or
            engaging in creative pursuits. As a lifelong learner, I constantly
            seek new experiences and knowledge to enrich my writing and connect
            with my audience on a deeper level.
          </p>

          <p className="pb-1">
            Whether you're a fellow adventurer, food enthusiast, mindfulness
            seeker, or simply someone who enjoys a good story, I invite you to
            join me on this enriching journey. Let's embark on a voyage of
            discovery, inspiration, and meaningful connections through the power
            of words.
          </p>

          <p className="pb-1">
            Thank you for being part of my blogging community. Together, let's
            explore the vast tapestry of life's experiences and share stories
            that resonate with hearts and minds around the world.
          </p>
        </article>
      </section>
    </main>
  );
};

export default About;
