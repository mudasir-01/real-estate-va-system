import React, { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const elements =
      document.querySelectorAll(".reveal");

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("show");

              observer.unobserve(
                entry.target
              );
            }
          });
        },
        {
          threshold: 0.12,
        }
      );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}