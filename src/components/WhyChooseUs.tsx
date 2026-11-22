const benefits = [
  {
    icon: "\uD83D\uDC96",
    title: "Professional Stylists",
    description: "Our experienced stylists help you achieve the look you love.",
  },
  {
    icon: "\uD83D\uDC96",
    title: "Quality Products",
    description:
      "We use quality salon products to care for your hair and skin.",
  },
  {
    icon: "\uD83D\uDC96",
    title: "Relaxing Experience",
    description:
      "Enjoy a comfortable and relaxing experience with our services.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-background px-4 py-10 sm:px-6 sm:py-14 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 text-center sm:mb-10">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
            Why Choose SalonHub?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            We care about your beauty, comfort, and confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-xl border border-border bg-card p-5 text-center shadow-sm sm:p-8"
            >
              <span className="text-4xl">{benefit.icon}</span>

              <h3 className="mt-4 text-lg font-bold text-foreground sm:text-xl">
                {benefit.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
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

