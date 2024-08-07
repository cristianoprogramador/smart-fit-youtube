import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import Image from "next/image";

export default function Home() {
  const periods = [
    {
      label: "Manhã",
      value: "manha",
      time: "06:00 às 12:00",
    },
    {
      label: "Tarde",
      value: "tarde",
      time: "12:01 às 18:00",
    },
    {
      label: "Noite",
      value: "noite",
      time: "18:01 às 23:00",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <Header />

      <div className="w-[80%] max-w-[1050px] mt-20">
        <div className="text-4xl font-semibold">
          <div>REABERTURA</div>
          <div>SMART FIT</div>
          <div className="h-[10px] mt-6 bg-black w-20" />
        </div>

        <div className="mt-8">
          O horário de funcionamento das nossas unidades está seguindo os
          decretos de cada município. Por isso, confira aqui se a sua unidade
          está aberta e as medidas de segurança que estamos seguindo.
        </div>

        <div className="mt-10 rounded-lg border-4 p-4 text-[#808080]">
          <div className="flex flex-row gap-3 items-center">
            <div>
              <Image
                alt="icon-clock"
                src={"/images/icon-hour.png"}
                width={30}
                height={70}
              />
            </div>
            <div>Horário</div>
          </div>

          <div className="text-2xl mt-10 font-light">
            Qual período quer treinar?
          </div>
          <div className="h-[2px] w-full flex bg-gray-300 my-4" />

          {periods.map((period, index) => (
            <div key={index} className="text-lg">
              <div className="flex flex-row justify-between">
                <label className="flex flex-row gap-2">
                  <input type="radio" value={period.value} name="periodo" />
                  <div>{period.label}</div>
                </label>
                <div>{period.time}</div>
              </div>
              <div className="h-[2px] w-full flex bg-gray-300 my-3" />
            </div>
          ))}

          <div className="flex flex-row justify-between mt-10 text-black text-lg">
            <label className="flex flex-row gap-3">
              <input type="checkbox" name="" id="" />
              <div>Exibir unidades fechadas</div>
            </label>

            <div className="flex flex-row gap-1">
              <div>Resultados encontrados:</div>
              <div className="font-semibold">102</div>
            </div>
          </div>

          <div className="flex flex-row gap-3 text-black font-semibold text-lg justify-center items-center mt-7">
            <button className="rounded w-64 h-12 bg-[#FFB612]">Encontrar Unidade</button>
            <button className="rounded w-64 h-12 border">Limpar</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
