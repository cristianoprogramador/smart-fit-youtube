import Image from "next/image";

export function Header() {
  return (
    <div className="bg-black h-24 flex w-full justify-center items-center">
      <Image alt="logo" src={"/images/logo.svg"} width={150} height={100} />
    </div>
  );
}
