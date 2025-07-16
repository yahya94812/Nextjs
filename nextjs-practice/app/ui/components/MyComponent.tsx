import styles from "@/app/ui/components/MyComponent.module.css";
import clsx from "clsx";
import Image from "next/image";

export default function MyComponent() {
  let dark: boolean = true;
  return (
    <div>
      <p
        className={`bg-white text-black my-class ${styles.my_component_class}`}
      >
        From MyComponent
      </p>
      <p
        className={clsx("text-2xl", {
          "bg-black text-white": dark === true,
          "bg-white text-black": dark === false,
        })}
      >
        It uses clsx for theme
      </p>
      <br />
      <Image src="/bird.jpeg" width={1200} height={900} alt="bird img" />
      <p> keep eye on layout shift</p>
    </div>
  );
}
