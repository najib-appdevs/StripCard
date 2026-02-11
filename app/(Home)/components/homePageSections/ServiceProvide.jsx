/* eslint-disable @next/next/no-img-element */
function ServiceProvide() {
  const services = [
    {
      id: 1,
      image: "https://mehedi.appdevs.team/stripcard/public/frontend/images/site-section/423ffbae-6f99-4809-b834-cee688ebdd0e.webp",
      title: "Buy Virtual Card",
      description:
        "Get your Virtual Card today and enjoy the ease of using the Virtual Card for online shopping, gaming, or your favorite subscriptions.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      image: "https://mehedi.appdevs.team/stripcard/public/frontend/images/site-section/d78871d3-ff5e-4d04-b026-7832c9a96a8e.webp",
      title: "Add Money",
      description:
        "Easily deposit funds into your digital wallet to ensure financial flexibility and convenience with our user-friendly and secure money-adding service.",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      id: 3,
      image: "https://mehedi.appdevs.team/stripcard/public/frontend/images/site-section/c8c4aaef-d419-4086-ad09-c3dbd4f3d488.webp",
      title: "Money Transfer",
      description:
        "Swift and securely transfer money within the platform, providing convenience and peace of mind for all your financial needs.",
      gradient: "from-violet-500 to-fuchsia-500",
    },
    {
      id: 4,
      image: "https://mehedi.appdevs.team/stripcard/public/frontend/images/site-section/25989242-5e9d-4bb1-bda0-3efed8f512b4.webp",
      title: "Withdraw Money",
      description:
        "Effortlessly transfer funds from your account to your preferred bank account or digital wallet.",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      id: 5,
      image: "https://mehedi.appdevs.team/stripcard/public/frontend/images/site-section/04a7bb97-51a5-4388-a668-b3f2208de6e4.webp",
      title: "Virtual Card TopUp",
      description:
        "Easily top up your virtual card balance to ensure uninterrupted spending for shopping, subscriptions, or gaming.",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      id: 6,
      image: "https://mehedi.appdevs.team/stripcard/public/frontend/images/site-section/de25f560-2415-4d37-acef-fd8eba428e35.webp",
      title: "Gift Card",
      description:
        "Purchase digital gift cards for popular services, directly from the app, for seamless gifting.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 7,
      image: "https://mehedi.appdevs.team/stripcard/public/frontend/images/site-section/43d05a5f-f7a8-4075-9364-58d50b35de24.webp",
      title: "Setup Virtual Card API",
      description:
        "Configure the API to enable virtual card generation and management for secure online payments.",
      gradient: "from-indigo-500 to-violet-500",
    },
    {
      id: 8,
      image: "https://mehedi.appdevs.team/stripcard/public/frontend/images/site-section/6858c3f1-fece-4935-99ab-5e79a392a6bd.webp",
      title: "Biometric Login",
      description:
        "Log in securely using biometric authentication using the fingerprint for added protection.",
      gradient: "from-blue-500 to-purple-500",
    },
    {
      id: 9,
      image: "https://mehedi.appdevs.team/stripcard/public/frontend/images/site-section/188cb7f7-c86e-44f1-a4e8-805c2f58fc94.webp",
      title: "Transaction Logs",
      description:
        "Access detailed logs of all your transactions to track spending and monitor account activities.",
      gradient: "from-violet-500 to-indigo-500",
    },
    {
      id: 10,
      image: "https://mehedi.appdevs.team/stripcard/public/frontend/images/site-section/3ace52a4-e272-47ef-8f24-1b675cfd6f83.webp",
      title: "Multi-Language",
      description:
        "Use in multiple languages, making it accessible and user-friendly for a global audience.",
      gradient: "from-cyan-500 to-indigo-500",
    },
  ];

  return (
    <section className="relative w-full py-16 lg:py-20 overflow-hidden bg-linear-to-br from-blue-50 via-indigo-50 to-violet-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-12 w-[320px] h-80 bg-linear-to-br from-blue-400/12 to-cyan-400/8 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-24 left-16 w-[380px] h-[380px] bg-linear-to-tr from-indigo-400/10 to-purple-400/6 rounded-full blur-3xl animate-pulse-slow [animation-delay:2s]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-10 lg:mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-white/75 backdrop-blur-sm shadow-md border border-white/50 text-xs sm:text-sm">
            <span className="font-semibold tracking-wide bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent uppercase">
              Services
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
            <span className="text-slate-900">Our Services</span>
            <span className="block mt-1 bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Simple & Powerful
            </span>
          </h2>

          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            Fast digital tools for everyday financial needs.
          </p>
        </div>

        {/* First 8 cards – 4 column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 auto-rows-fr mb-6 lg:mb-8">
          {services.slice(0, 8).map((service, index) => (
            <div
              key={service.id}
              className="group relative bg-white/92 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg border border-slate-100/70 transition-all duration-300 hover:-translate-y-1 flex flex-col min-h-[220px] sm:min-h-60 lg:min-h-[260px] overflow-hidden"
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <div
                className={`absolute inset-0 bg-linear-to-br ${service.gradient} opacity-0 group-hover:opacity-6 transition-opacity duration-400 pointer-events-none`}
              />

              <div className="relative p-4 sm:p-5 flex flex-col items-center text-center flex-1 space-y-2.5 sm:space-y-3">
                <div className="relative">
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${service.gradient} rounded-lg blur-md opacity-15 group-hover:opacity-30 transition-all duration-400`}
                  />
                  <div
                    className={`relative w-14 h-14 sm:w-16 sm:h-16 bg-linear-to-br ${service.gradient} bg-opacity-10 rounded-lg p-2.5 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300`}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-5/6 h-5/6 object-contain drop-shadow-sm"
                      loading="lazy"
                    />
                  </div>
                </div>

                <h3 className="text-sm sm:text-base font-semibold text-slate-800 group-hover:bg-linear-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 leading-tight min-h-[2.4rem] flex items-center justify-center text-center px-1">
                  {service.title}
                </h3>

                <p className="text-sm sm:text-[0.9375rem] lg:text-base text-slate-600 leading-relaxed flex-1 text-center mx-auto max-w-prose">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Last 2 cards – centered with same card size & same text style */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-5 lg:gap-6">
          {services.slice(8).map((service, index) => (
            <div
              key={service.id}
              className="group relative bg-white/92 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg border border-slate-100/70 transition-all duration-300 hover:-translate-y-1 flex flex-col min-h-[220px] sm:min-h-60 lg:min-h-[260px] overflow-hidden flex-1 basis-[calc(50%-1rem)] lg:basis-[calc(25%-1.5rem)] max-w-[calc(50%-1rem)] lg:max-w-[calc(25%-1.5rem)]"
              style={{ animationDelay: `${(index + 8) * 40}ms` }}
            >
              <div
                className={`absolute inset-0 bg-linear-to-br ${service.gradient} opacity-0 group-hover:opacity-6 transition-opacity duration-400 pointer-events-none`}
              />

              <div className="relative p-4 sm:p-5 flex flex-col items-center text-center flex-1 space-y-2.5 sm:space-y-3">
                <div className="relative">
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${service.gradient} rounded-lg blur-md opacity-15 group-hover:opacity-30 transition-all duration-400`}
                  />
                  <div
                    className={`relative w-14 h-14 sm:w-16 sm:h-16 bg-linear-to-br ${service.gradient} bg-opacity-10 rounded-lg p-2.5 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300`}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-5/6 h-5/6 object-contain drop-shadow-sm"
                      loading="lazy"
                    />
                  </div>
                </div>

                <h3 className="text-sm sm:text-base font-semibold text-slate-800 group-hover:bg-linear-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 leading-tight min-h-[2.4rem] flex items-center justify-center text-center px-1">
                  {service.title}
                </h3>

                <p className="text-sm sm:text-[0.9375rem] lg:text-base text-slate-600 leading-relaxed flex-1 text-center mx-auto max-w-prose">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServiceProvide;