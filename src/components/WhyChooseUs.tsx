const benefits = [
  {
    icon: "✂️",
    title: "Professional Stylists",
    description: "Our experienced stylists help you achieve the look you love.",
  },
  {
    icon: "🌿",
    title: "Quality Products",
    description:
      "We use quality salon products to care for your hair and skin.",
  },
  {
    icon: "💖",
    title: "Relaxing Experience",
    description:
      "Enjoy a comfortable and relaxing experience with our services.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-background px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Why Choose SalonHub?
          </h2>
          <p className="mt-3 text-[#6B5B50]">
            We care about your beauty, comfort, and confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-xl border border-[#E8D8C3] bg-card p-8 text-center shadow-sm"
            >
              <span className="text-4xl">{benefit.icon}</span>

              <h3 className="mt-4 text-xl font-bold text-foreground">
                {benefit.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#6B5B50]">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
