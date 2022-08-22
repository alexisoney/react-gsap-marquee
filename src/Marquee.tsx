import React, { ReactNode, useEffect, useRef } from "react";
import gsap, { Linear } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface MarqueeProps {
  children?: ReactNode;
  className?: string;
  speed?: number;
  maxVelocity?: number;
  velocityFactor?: number;
  accellerationDuration?: number;
  reverseOnScrollUp?: boolean;
  isReversed?: boolean;
}

const Marquee = ({
  children,
  className,
  speed = 75,
  maxVelocity = 1000,
  velocityFactor = 1,
  accellerationDuration = 0.2,
  reverseOnScrollUp = true,
  isReversed = false,
}: MarqueeProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween>();
  const scrollTriggerRef = useRef<ScrollTrigger>();

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const child = container ? container.firstElementChild : null;

    // Refresh animation if content size change
    // Triggered on init
    const resizeObserver = new ResizeObserver(() => {
      // We wrap it in requestAnimationFrame to avoid this error - ResizeObserver loop limit exceeded
      // https://stackoverflow.com/a/58701523
      window.requestAnimationFrame(() => {
        initAnimation();
      });
    });

    if (container) {
      const firstElementChild = container.firstElementChild;
      if (firstElementChild) resizeObserver.observe(firstElementChild);
    }

    if (section) {
      resizeObserver.observe(section);
    }

    function initAnimation() {
      if (section && container && child) {
        clearAnimation();
        cloneContent(section, container, child);

        const distance = child.clientWidth;
        const time = distance / speed;

        // Set styles
        gsap.set(section, {
          overflowX: "hidden",
        });

        gsap.set(container, {
          justifyContent: isReversed ? "flex-end" : "flex-start",
          display: "flex",
          whiteSpace: "nowrap",
        });

        gsap.set(container.children, {
          flex: "0 0 auto",
          marginLeft: 0,
          marginRight: 0,
        });

        // Marquee Animation
        const tween = gsap.to(container, {
          repeat: -1,
          x: (isReversed ? "+" : "-") + distance,
          ease: Linear.easeNone,
          duration: time,
          // Prevent reverse for stopping
          // https://greensock.com/forums/topic/28078-reverse-repeat/
          onReverseComplete: function () {
            this.totalTime(time * 100 + this.rawTime());
            // include rawTime() to compensate for the tiny offset between frames (zero time drift)
            // https://greensock.com/forums/topic/30722-how-to-properly-reverse-a-repeating-hover-animation-on-mouseleave/#comment-153497
          },
        });

        // Accelerate on scroll
        let lastUpdateTimestamp: number;

        const scrollTrigger = ScrollTrigger.create({
          animation: tween,
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          toggleActions: "play pause resume pause",
          onUpdate(self) {
            const velocity = Math.abs(self.getVelocity());

            if (velocity > 200) {
              const speed =
                (velocity >= maxVelocity ? maxVelocity : velocity) *
                (velocityFactor / 100);
              const direction = reverseOnScrollUp ? self.direction : 1;
              const timestamp = Date.now();

              gsap.to(tween, {
                duration: accellerationDuration,
                ease: Linear.easeNone,
                timeScale: speed * direction,
                onStart() {
                  lastUpdateTimestamp = timestamp;
                },
                onComplete() {
                  if (timestamp === lastUpdateTimestamp) {
                    gsap.to(tween, {
                      duration: accellerationDuration,
                      ease: Linear.easeNone,
                      timeScale: direction,
                    });
                  }
                },
              });
            }
          },
        });

        // Store tween & scrollTrigger
        tweenRef.current = tween;
        scrollTriggerRef.current = scrollTrigger;
      }
    }

    function cloneContent(
      section: Element,
      container: Element,
      child: Element
    ) {
      // Clear clones
      const clones = container.querySelectorAll('[data-is-clone="true"]');
      clones.forEach((el) => el.remove());

      // Get amount of clones needed
      const count = Math.ceil(section.clientWidth / child.clientWidth) + 1;

      // Create clones
      for (let i = 0; i < count; i++) {
        const clone = child.cloneNode(true) as HTMLElement;
        clone.dataset.isClone = "true";
        container.appendChild(clone);
      }
    }

    function clearAnimation() {
      if (tweenRef.current)
        tweenRef.current.progress(0).pause().revert().kill();
      if (scrollTriggerRef.current) scrollTriggerRef.current.kill();
    }

    return () => {
      clearAnimation();
      resizeObserver.disconnect();
      window.removeEventListener("resize", initAnimation);
    };
  });

  return (
    <section ref={sectionRef} className={className}>
      <div ref={containerRef}>
        {typeof children === "string" ? <span>{children}</span> : children}
      </div>
    </section>
  );
};

export default Marquee;
