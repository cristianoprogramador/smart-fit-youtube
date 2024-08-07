"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Legend } from "@/components/legend";
import { periods } from "@/utils/mockData";
import Image from "next/image";
import { SetStateAction, useState } from "react";

interface Schedule {
  weekdays: string;
  hour: string;
}

interface Location {
  id: number;
  title: string;
  content: string;
  opened?: boolean;
  mask: string;
  towel: string;
  fountain: string;
  locker_room: string;
  schedules: Schedule[];
  street?: string;
  region?: string;
  city_name?: string;
  state_name?: string;
  uf?: string;
}

export default function Home() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [showCloseUnits, setShowCloseUnits] = useState<boolean>(false);
  const [periodSelected, setPeriodSelected] = useState<string | null>(null);

  const fetchLocations = async () => {
    try {
      const response = await fetch(
        "https://test-frontend-developer.s3.amazonaws.com/data/locations.json"
      );
      const data = await response.json();
      return data.locations;
    } catch (error) {
      console.error("Failed to fetch location", error);
    }
  };

  const getImageSrc = (type: string, value: string) => {
    const map: { [key: string]: { [key: string]: string } } = {
      mask: {
        required: "required-mask",
        recommended: "recommended-mask",
      },
      towel: {
        required: "required-towel",
        recommended: "recommended-towel",
      },
      fountain: {
        partial: "partial-fountain",
        not_allowed: "forbidden-fountain",
      },
      locker_room: {
        allowed: "required-lockerroom",
        partial: "partial-lockerroom",
        closed: "forbidden-lockerroom",
      },
    };

    return map[type][value] || "";
  };

  const handleShowCloseUnit = () => {
    setShowCloseUnits(!showCloseUnits);
  };

  const handleSelectedPeriod = (event: {
    target: { value: SetStateAction<string | null> };
  }) => {
    setPeriodSelected(event?.target.value);
  };

  const handleFilterSchedule = (result: Location, period: string) => {
    const { time } = periods.find((p) => p.value === period) || { time: "" };
    const [periodStart, periodEnd] = time
      .split(" às ")
      .map((t) => parseInt(t.replace(":", "")));

    return result.schedules?.some((schedule) => {
      if (schedule.hour.toLowerCase() === "fechado") return false;
      const [scheduleStart, scheduleEnd] = schedule.hour
        .split(" às ")
        .map((t) => parseInt(t.replace("h", "").replace(":", "")));

      const correctStart = scheduleStart * 100;
      const correctEnd = scheduleEnd * 100;

      return (
        (correctStart >= periodStart && correctStart < periodEnd) ||
        (correctEnd > periodStart && correctEnd <= periodEnd) ||
        (correctStart <= periodStart && correctEnd >= periodEnd)
      );
    });
  };

  const handleFilter = async () => {
    const result = await fetchLocations();
    let filteredLocations = result;

    if (!showCloseUnits) {
      filteredLocations = filteredLocations.filter(
        (location: { opened: any }) => location.opened
      );
    }

    if (periodSelected) {
      filteredLocations = filteredLocations.filter((location: Location) =>
        handleFilterSchedule(location, periodSelected)
      );
    }

    setLocations(filteredLocations);
  };

  const handleCleanFilter = () => {
    setShowCloseUnits(false);
    setPeriodSelected(null);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <Header />

      <div className="w-[95%] md:w-[80%] max-w-[1050px] mt-20">
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
                <label className="custom-radio flex flex-row gap-2">
                  <input
                    type="radio"
                    name="periodo"
                    value={period.value}
                    checked={periodSelected === period.value}
                    onChange={handleSelectedPeriod}
                  />
                  <span>{period.label}</span>
                </label>
                <div>{period.time}</div>
              </div>
              <div className="h-[2px] w-full flex bg-gray-300 my-3" />
            </div>
          ))}

          <div className="flex flex-col md:flex-row justify-center items-center md:gap-0 gap-4 md:justify-between mt-10 text-black text-lg">
            <label className="flex flex-row gap-3 custom-checkbox">
              <input
                type="checkbox"
                name=""
                id=""
                checked={showCloseUnits}
                onChange={handleShowCloseUnit}
              />
              <span>Exibir unidades fechadas</span>
            </label>

            <div className="flex flex-row gap-1">
              <div>Resultados encontrados:</div>
              <div className="font-semibold">{locations.length}</div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3 text-black font-semibold text-lg justify-center items-center mt-7">
            <button
              onClick={handleFilter}
              className="rounded w-64 h-12 bg-[#FFB612] hover:bg-[#b98e29bd]"
            >
              Encontrar Unidade
            </button>
            <button
              onClick={handleCleanFilter}
              className="rounded w-64 h-12 border hover:bg-gray-100"
            >
              Limpar
            </button>
          </div>
        </div>

        <Legend />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 gap-7 mb-20">
          {locations.map((location, index) => {
            const isOpen = location.opened === true ? "Aberto" : "Fechado";
            return (
              <div
                key={index}
                className="bg-gray-100 flex flex-col p-5 shadow-inner rounded-md"
              >
                <div
                  className={`font-semibold ${
                    isOpen === "Aberto" ? "text-[#2FC022]" : "text-[#dc0a17]"
                  }`}
                >
                  {isOpen}
                </div>
                <div className="mt-1 font-semibold text-2xl text-[#333333]">
                  {location.title}
                </div>
                {"opened" in location ? (
                  <>
                    <div className="h-[2px] w-full flex bg-gray-300 my-3" />
                    <div
                      className="text-gray-500 mt-3 text-sm"
                      dangerouslySetInnerHTML={{ __html: location.content }}
                    />
                    <div className="flex flex-row justify-between gap-2 mt-3">
                      <Image
                        alt="mask-icon"
                        src={`/images/${getImageSrc(
                          "mask",
                          location.mask
                        )}.png`}
                        width={60}
                        height={60}
                      />
                      <Image
                        alt="towel-icon"
                        src={`/images/${getImageSrc(
                          "towel",
                          location.towel
                        )}.png`}
                        width={60}
                        height={60}
                      />
                      <Image
                        alt="fountain-icon"
                        src={`/images/${getImageSrc(
                          "fountain",
                          location.fountain
                        )}.png`}
                        width={60}
                        height={60}
                      />
                      <Image
                        alt="lockerroom-icon"
                        src={`/images/${getImageSrc(
                          "locker_room",
                          location.locker_room
                        )}.png`}
                        width={60}
                        height={60}
                      />
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-gray-500 mt-4">
                    {location.street} {location.region} {location.city_name}{" "}
                    {location.state_name} {location.uf}
                  </div>
                )}
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {location?.schedules?.map((schedule, index) => (
                    <div key={index} className="flex flex-col">
                      <div className="text-xl font-semibold text-[#333333]">
                        {schedule.weekdays}
                      </div>
                      <div className="text-gray-500 text-sm">
                        {schedule.hour}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}
