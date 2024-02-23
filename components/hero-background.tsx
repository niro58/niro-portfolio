import { blur_data } from "@/data/blur-data";
import { ScrollContext } from "@/lib/scroll-observer";
import style from "@/styles/hero-background.module.css";
import Image from "next/image";
import { useContext, useEffect, useRef } from "react";

interface HeroBackgroundProps {
  inView: boolean;
}

export default function HeroBackground({ inView }: HeroBackgroundProps) {
  const { hero_foreground_blur, hero_background_blur } = blur_data;

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
        <Image
          src={"/images/hero/hero-city-background.jpg"}
          width={1774}
          height={1440}
          placeholder="blur" //
          blurDataURL={hero_background_blur}
          className="absolute left-0 right-0 top-0 bottom-0 m-auto blur-xs"
          alt="hero"
        />
      </div>
      {inView && (
        <div
          className={`absolute left-0 right-0 top-0 bottom-0 m-auto  -z-10 w-3/4 h-full ${style.rain_effect_animation}`}
          style={{
            backgroundImage: `url(${"/images/hero/hero-rain-effect.png"})`,
            backgroundSize: "50% 50%"
          }}
        ></div>
      )}

      <div className="z-10">
        <Image
          src={"/images/hero/hero-foreground.png"}
          width={2560}
          height={1440}
          placeholder="blur"
          blurDataURL={hero_foreground_blur}
          alt="hero"
          priority
          sizes="100vw"
        />
      </div>
    </div>
  );
}
