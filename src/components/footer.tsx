import Image from "next/image";

export function Footer() {
  return (
    <div className="bg-[#333333] text-white w-full flex flex-col justify-center items-center h-52 gap-4">
      <Image alt="logo" src={"/images/logo.svg"} width={100} height={100} />

      <div>Todos os direitos reservados - 2024</div>
    </div>
  );
}
