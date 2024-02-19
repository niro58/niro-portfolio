import { ScrollContext } from "@/lib/scroll-observer";
import Image from "next/image";
import { useContext, useEffect, useRef } from "react";

interface HeroBackgroundProps {
  inView: boolean;
}

export default function HeroBackground({ inView }: HeroBackgroundProps) {
  const parallaxContainer = useRef(null);
  const { scrollY } = useContext(ScrollContext);
  useEffect(() => {
    if (!parallaxContainer.current) return;
    const background: HTMLDivElement = parallaxContainer.current;
    background.style.transform = `translate3d(0, -${scrollY * 0.5}px, 0)`;
  }, [scrollY]);

  return (
    <div className="relative overflow-hidden">
      <div className="absolute w-full h-full -z-20" ref={parallaxContainer}>
        {
          //TODO: Do a correct blur data url
        }
        <Image
          src={"/images/hero/city-background.jpg"}
          width={2560}
          height={1440}
          placeholder="blur" //
          blurDataURL="data:image/svg+xml;base64,L21{]VjrVWoftUactmo#t.ogZ~kC"
          className="blur-sm"
          alt="hero"
          sizes="100vw"
        />
      </div>
      {inView && (
        <div
          className="absolute left-0 right-0 top-0 bottom-0 m-auto -z-10 bg-rain-pattern animate-rain-effect w-3/4 h-full"
          style={{
            backgroundSize: "50% 50%"
          }}
        ></div>
      )}
      {
        //TODO: Do a correct blur data url
      }
      <div className="z-10">
        <Image
          src={"/images/hero/foreground.png"}
          width={2560}
          height={1440}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,LDEeP;Mx01XS_Nr?9GR*9abv$6ae"
          alt="hero"
          priority
          sizes="100vw"
        />
      </div>
    </div>
  );
}
