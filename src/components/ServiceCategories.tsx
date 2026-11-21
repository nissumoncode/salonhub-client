import Link from "next/link";

const categories = [
  {
    name: "Haircut & Styling",
    icon: "✂️",
    description: "Refresh your look with beautiful hairstyles.",
  },
  {
    name: "Hair Coloring",
    icon: "🎨",
    description: "Explore beautiful hair colors and highlights.",
  },
  {
    name: "Hair Treatment",
    icon: "💆",
    description: "Give your hair the care it deserves.",
  },
  {
    name: "Facial & Skincare",
    icon: "✨",
    description: "Keep your skin fresh and glowing.",
  },
  {
    name: "Makeup",
    icon: "💄",
    description: "Look stunning for every occasion.",
  },
  {
    name: "Manicure & Pedicure",
    icon: "💅",
    description: "Give your hands and feet extra care.",
  },
  {
    name: "Spa & Massage",
    icon: "🧖",
    description: "Relax and enjoy a refreshing experience.",
  },
];

const ServiceCategories = () => {
  return (
    <section className="bg-card px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Explore Our Categories
          </h2>
          <p className="mt-3 text-muted-foreground">
            Find the perfect service for your beauty and wellness needs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/services?category=${encodeURIComponent(category.name)}`}
              className="rounded-xl border border-border bg-background p-6 text-center transition hover:-translate-y-1 hover:shadow-lg"
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
