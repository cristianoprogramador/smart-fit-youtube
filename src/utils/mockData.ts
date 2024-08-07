export const periods = [
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

export const legends = [
  {
    title: "Máscara",
    items: [
      { src: "images/required-mask", label: "Obrigatório" },
      { src: "images/recommended-mask", label: "Recomendado" },
    ],
  },
  {
    title: "Toalha",
    items: [
      { src: "images/required-towel", label: "Obrigatório" },
      { src: "images/recommended-towel", label: "Recomendado" },
    ],
  },
  {
    title: "Bebedouro",
    items: [
      { src: "images/partial-fountain", label: "Parcial" },
      { src: "images/forbidden-fountain", label: "Proibido" },
    ],
  },
  {
    title: "Vestiários",
    items: [
      { src: "images/required-lockerroom", label: "Liberado" },
      { src: "images/partial-lockerroom", label: "Parcial" },
      { src: "images/forbidden-lockerroom", label: "Fechado" },
    ],
  },
];
