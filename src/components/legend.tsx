import { legends } from "@/utils/mockData";
import Image from "next/image";


export function Legend(){
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-7 bg-gray-100 p-3 gap-7">
          {legends.map((legend, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center"
            >
              <div className="font-semibold">{legend.title}</div>
              <div className="flex flex-row gap-4">
                {legend.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center"
                  >
                    <Image
                      alt="mask"
                      src={`/${item.src}.png`}
                      width={60}
                      height={70}
                    />
                    <div>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
  )
}
