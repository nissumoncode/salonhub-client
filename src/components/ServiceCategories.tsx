import Link from "next/link";

const categories = [
  {
    name: "Haircut & Styling",
    icon: "\u2702\uFE0F",
    description: "Refresh your look with beautiful hairstyles.",
  },
  {
    name: "Hair Coloring",
    icon: "\uD83C\uDFA8",
    description: "Explore beautiful hair colors and highlights.",
  },
  {
    name: "Hair Treatment",
    icon: "\uD83D\uDC86",
    description: "Give your hair the care it deserves.",
  },
  {
    name: "Facial & Skincare",
    icon: "\u2728",
    description: "Keep your skin fresh and glowing.",
  },
  {
    name: "Makeup",
    icon: "\uD83D\uDC84",
    description: "Look stunning for every occasion.",
  },
  {
    name: "Manicure & Pedicure",
    icon: "\uD83D\uDC85",
    description: "Give your hands and feet extra care.",
  },
  {
    name: "Spa & Massage",
    icon: "\uD83E\uDDD6",
    description: "Relax and enjoy a refreshing experience.",
  },
];

const ServiceCategories = () => {
  return (
    <section className="bg-card px-4 py-10 sm:px-6 sm:py-14 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 text-center sm:mb-10">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
            Explore Our Categories
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            Find the perfect service for your beauty and wellness needs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/services?category=${encodeURIComponent(category.name)}`}
              className="rounded-xl border border-border bg-background p-5 text-center transition hover:-translate-y-1 hover:shadow-lg sm:p-6"
            >
              <span className="text-4xl">{category.icon}</span>
              <h3 className="mt-4 text-lg font-bold text-foreground">
                {category.name}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;