import { blur_data } from "@/data/blur-data";
import { ScrollContext } from "@/lib/scroll-observer";
import Image from "next/image";
import { useContext, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Rain } from "./rain";

export default function HeroBackground() {
  const { ref, inView, entry } = useInView({
    threshold: 0
  });
  const { hero_foreground_blur } = blur_data;

  const parallaxContainer = useRef(null);
  const { scrollY } = useContext(ScrollContext);
  useEffect(() => {
    if (!parallaxContainer.current) return;
    const background: HTMLDivElement = parallaxContainer.current;
    background.style.transform = `translate3d(0, -${scrollY * 0.2}px, 0)`;
  }, [scrollY]);

  return (
    <div className="relative flex h-full justify-center" ref={ref}>
      <Rain />
      <Image
        src={"/images/hero/hero-foreground.png"}
        placeholder="blur"
        blurDataURL={hero_foreground_blur}
        alt="hero"
        priority
        fill
        className="z-20 object-cover"
      />
      <Image
        src={"/images/hero/hero-city-background.jpg"}
        ref={parallaxContainer}
        fill
        quality={50}
        className="z-0 object-cover"
        alt="hero"
      />
    </div>
  );
}
