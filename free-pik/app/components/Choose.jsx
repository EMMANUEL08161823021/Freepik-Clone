import React from "react";

const features = [
  {
    stat: "700K+",
    title: "Active Teams",
    blurb: "Designers, marketers and creators using Lorem to ship better work, faster.",
  },
  {
    stat: "99.9%",
    title: "Uptime & Reliability",
    blurb: "Rock-solid availability — your assets and workflows are always accessible when you need them.",
  },
  {
    stat: "2× Faster",
    title: "Time to Launch",
    blurb: "Templates, presets and automation that cut design-to-publish time in half.",
  },
  {
    stat: "10K+",
    title: "Trusted Customers",
    blurb: "Used by agencies, startups and enterprise teams around the world.",
  },
];

const Choose = () => {
  return (
    <section className="max-w-5xl px-4 mx-auto py-12">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#F3F4F6]">
          Why choose <span className="text-[#D6862E]">Lorem</span>?
        </h2>
        <p className="mt-2 text-sm text-gray-600 max-w-2xl">
          We give creative teams one place to store assets, build on-brand templates, and publish across channels — so you can focus on ideas, not repetitive tasks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((f, i) => (
          <article
            key={i}
            className="border rounded-lg p-5 bg-card shadow-sm hover:shadow-md transition-shadow"
            aria-labelledby={`feature-${i}-title`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="text-[#D6862E] font-extrabold text-2xl md:text-3xl">
                  {f.stat}
                </div>
              </div>

              <div>
                <h3 id={`feature-${i}-title`} className="text-lg font-semibold text-[#F3F4F6]">
                  {f.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600">{f.blurb}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Choose;
