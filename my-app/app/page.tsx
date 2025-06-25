import Image from "next/image";
import Hello from "@/app/components/hello"
import Link from "next/Link"

export default function Home() {
  console.log("welcome from server component");
  return (
    <>
      <h1 className="text-3xl"> Welcome to nextjs </h1>
      <Hello />
    </>
  );
}

