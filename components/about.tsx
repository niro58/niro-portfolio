import Image from "next/image";

export const About: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-between p-24 bg-gradient-to-b from-gray-950 to-black">
      <div className="relative container flex flex-row justify-between ">
        <div>
          <Image
            src={"/images/about-me.webp"}
            className="object-cover h-full shadow-lg shadow-white"
            width={600}
            height={600}
            alt="about"
          />
        </div>
        <div className="w-1/2 p-9 space-y-5">
          <div className="text-4xl font-normal tracking-wide text-primary">
            About
          </div>
          <div className="text-xl leading-relaxed text-gray-300 text-left">
            Just a coder who found the passion post-high school<br/> <span className="bg-primary-foreground">in 2022</span>.
            My journey began with <span className="bg-primary-foreground">game development</span>, transitioning from high school where I dabbled <br/>in 3D modeling and web dev.
            After the first half of 2023, <br/>I shifted more towards <span className="bg-primary-foreground">app/web development</span>, finding it more personally valuable.
            I'm all about exploring and <span className="bg-primary-foreground">learning multiple things simultaneously</span>, constantly swapping between projects.
            It's a dynamic ride,<br/> and although I've made strides, there's still a long way to go before I conquer what I have in mind.
          </div>
        </div>
      </div>
    </div>
  );
};
