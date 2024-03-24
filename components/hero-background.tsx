import { blur_data } from "@/data/blur-data";
import { ScrollContext } from "@/lib/scroll-observer";
import style from "@/styles/hero-background.module.css";
import Image from "next/image";
import { useContext, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

export default function HeroBackground() {
  const { ref, inView, entry } = useInView({
    threshold: 0
  });
  const { hero_foreground_blur, hero_background_blur } = blur_data;

  const parallaxContainer = useRef(null);
  const { scrollY } = useContext(ScrollContext);
  useEffect(() => {
    if (!parallaxContainer.current) return;
    const background: HTMLDivElement = parallaxContainer.current;
    background.style.transform = `translate3d(0, -${scrollY * 0.5}px, 0)`;
  }, [scrollY]);

  return (
    <div className="relative overflow-hidden" ref={ref}>
      <Image
        src={"/images/hero/hero-foreground.png"}
        width={2560}
        height={1440}
        placeholder="blur"
        blurDataURL={hero_foreground_blur}
        alt="hero"
        priority
        sizes="100vw"
        className="z-10"
      />
      <Image
        src={"/images/hero/hero-city-background.jpg"}
        ref={parallaxContainer}
        width={1774}
        height={1440}
        placeholder="blur"
        blurDataURL={hero_background_blur}
        priority
        className="absolute bottom-0 left-0 right-0 top-0 -z-20 m-auto h-full w-full"
        alt="hero"
      />
      <div className={`${style.rainEffectBG}`}></div>
    </div>
  );
}
