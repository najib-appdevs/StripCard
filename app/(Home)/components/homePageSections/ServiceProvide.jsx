/* eslint-disable @next/next/no-img-element */
function ServiceProvide() {
  const services = [
    {
      id: 1,
      image:
        "https://mehedi.appdevs.team/stripcard/public/frontend/images/site-section/423ffbae-6f99-4809-b834-cee688ebdd0e.webp",
      title: "Buy Virtual Card",
      description:
        "Get your Virtual Card today and enjoy the ease of using the Virtual Card for online shopping, gaming, or your favorite subscriptions.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      image:
        "https://mehedi.appdevs.team/stripcard/public/frontend/images/site-section/d78871d3-ff5e-4d04-b026-7832c9a96a8e.webp",
      title: "Add Money",
      description:
        "Easily deposit funds into your digital wallet to ensure financial flexibility and convenience with our user-friendly and secure money-adding service.",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      id: 3,
      image:
        "https://mehedi.appdevs.team/stripcard/public/frontend/images/site-section/c8c4aaef-d419-4086-ad09-c3dbd4f3d488.webp",
      title: "Money Transfer",
      description:
        "Swift and securely transfer money within the platform, providing convenience and peace of mind for all your financial needs.",
      gradient: "from-violet-500 to-fuchsia-500",
    },
    {
      id: 4,
      image:
        "https://mehedi.appdevs.team/stripcard/public/frontend/images/site-section/25989242-5e9d-4bb1-bda0-3efed8f512b4.webp",
      title: "Withdraw Money",
      description:
        "Effortlessly transfer funds from your account to your preferred bank account or digital wallet.",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      id: 5,
      image:
        "https://mehedi.appdevs.team/stripcard/public/frontend/images/site-section/04a7bb97-51a5-4388-a668-b3f2208de6e4.webp",
      title: "Virtual Card TopUp",
      description:
        "Easily top up your virtual card balance to ensure uninterrupted spending for shopping, subscriptions, or gaming.",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      id: 6,
      image:
        "https://mehedi.appdevs.team/stripcard/public/frontend/images/site-section/de25f560-2415-4d37-acef-fd8eba428e35.webp",
      title: "Gift Card",
      description:
        "Purchase digital gift cards for popular services, directly from the app, for seamless gifting.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 7,
      image:
        "https://mehedi.appdevs.team/stripcard/public/frontend/images/site-section/43d05a5f-f7a8-4075-9364-58d50b35de24.webp",
      title: "Setup Virtual Card API",
      description:
        "Configure the API to enable virtual card generation and management for secure online payments.",
      gradient: "from-indigo-500 to-violet-500",
    },
    {
      id: 8,
      image:
        "https://mehedi.appdevs.team/stripcard/public/frontend/images/site-section/6858c3f1-fece-4935-99ab-5e79a392a6bd.webp",
      title: "Biometric Login",
      description:
        "Log in securely using biometric authentication using the fingerprint for added protection.",
      gradient: "from-blue-500 to-purple-500",
    },
    {
      id: 9,
      image:
        "https://mehedi.appdevs.team/stripcard/public/frontend/images/site-section/188cb7f7-c86e-44f1-a4e8-805c2f58fc94.webp",
      title: "Transaction Logs",
      description:
        "Access detailed logs of all your transactions to track spending and monitor account activities.",
      gradient: "from-violet-500 to-indigo-500",
    },
    {
      id: 10,
      image:
        "https://mehedi.appdevs.team/stripcard/public/frontend/images/site-section/3ace52a4-e272-47ef-8f24-1b675cfd6f83.webp",
      title: "Multi-Language",
      description:
        "Use in multiple languages, making it accessible and user-friendly for a global audience.",
      gradient: "from-cyan-500 to-indigo-500",
    },
  ];

  return (
    <section className="relative w-full py-20 lg:py-24 overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 dark:from-gray-950 dark:via-indigo-950/40 dark:to-violet-950/30">
      {/* Enhanced Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/20 via-cyan-400/15 to-transparent dark:from-blue-600/10 dark:via-cyan-600/8 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-400/20 via-purple-400/15 to-transparent dark:from-indigo-600/10 dark:via-purple-600/8 rounded-full blur-3xl animate-pulse-slow [animation-delay:1.5s]" />
        <div className="absolute bottom-20 right-1/4 w-[550px] h-[550px] bg-gradient-to-bl from-violet-400/20 via-fuchsia-400/15 to-transparent dark:from-violet-600/10 dark:via-fuchsia-600/8 rounded-full blur-3xl animate-pulse-slow [animation-delay:3s]" />
        <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-400/15 via-blue-400/10 to-transparent dark:from-cyan-600/8 dark:via-blue-600/5 rounded-full blur-3xl animate-pulse-slow [animation-delay:2s]" />
      </div>

      {/* Animated Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating Dots Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse-slow dark:bg-blue-500/70" />
        <div className="absolute top-60 right-1/3 w-3 h-3 bg-indigo-400 rounded-full animate-pulse-slow [animation-delay:1s] dark:bg-indigo-500/70" />
        <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-violet-400 rounded-full animate-pulse-slow [animation-delay:2s] dark:bg-violet-500/70" />
        <div className="absolute bottom-60 right-1/4 w-3 h-3 bg-purple-400 rounded-full animate-pulse-slow [animation-delay:0.5s] dark:bg-purple-500/70" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header Section */}
        <div className="text-center space-y-6 mb-16">
          {/* Enhanced Section Badge */}
          <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/80 backdrop-blur-md shadow-xl shadow-blue-500/20 border border-white/50 dark:bg-slate-900/70 dark:border-slate-700/60 dark:shadow-indigo-500/10 hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse-slow dark:from-blue-600 dark:to-indigo-600" />
              <div className="w-2 h-2 bg-white rounded-full dark:bg-slate-900" />
            </div>
            <span className="text-sm font-bold tracking-wide bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400 bg-clip-text text-transparent uppercase">
              Service Provide
            </span>
          </div>

          {/* Main Title with Gradient */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6 leading-tight">
            Our Upheld Administrations <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
              What We Serve To You
            </span>
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl mx-auto">
            Unlock seamless digital transactions with our powerful services,
            from virtual card management and secure payments to multi-language
            support and real-time notifications—designed for convenience and
            security.
          </p>
        </div>

        {/* First 8 cards – 4 column grid with consistent heights using grid-rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-6 lg:mb-8">
          {services.slice(0, 8).map((service, index) => (
            <div
              key={service.id}
              className="group relative bg-white/90 backdrop-blur-sm dark:bg-slate-900/70 rounded-3xl shadow-lg hover:shadow-2xl border border-white/50 dark:border-slate-700/60 transition-all duration-500 overflow-hidden hover:-translate-y-2 animate-fade-in-up flex"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Gradient Background on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-500`}
              />

              {/* Glowing Border Effect */}
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 blur-xl dark:group-hover:opacity-30 transition-opacity duration-500`}
              />

              <div className="relative p-7 flex flex-col items-center text-center space-y-4 w-full">
                {/* Icon Container with Individual Gradient */}
                <div className="relative flex-shrink-0">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-2xl opacity-20 blur-2xl group-hover:blur-3xl group-hover:opacity-40 dark:opacity-30 dark:group-hover:opacity-50 transition-all duration-500`}
                  />
                  <div
                    className={`relative w-20 h-20 bg-gradient-to-br ${service.gradient} bg-opacity-10 dark:bg-opacity-20 rounded-2xl p-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-contain drop-shadow-lg"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Content with flex structure for consistent spacing */}
                <div className="flex flex-col space-y-3 flex-1 w-full">
                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 leading-tight">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <div className="flex-1 flex items-start">
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Last 2 cards – centered with same structure and equal width */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Spacer columns on large screens to center the last 2 cards */}
          <div className="hidden lg:block" />

          {services.slice(8).map((service, index) => (
            <div
              key={service.id}
              className="group relative bg-white/90 backdrop-blur-sm dark:bg-slate-900/70 rounded-3xl shadow-lg hover:shadow-2xl border border-white/50 dark:border-slate-700/60 transition-all duration-500 overflow-hidden hover:-translate-y-2 animate-fade-in-up flex"
              style={{ animationDelay: `${(index + 8) * 80}ms` }}
            >
              {/* Gradient Background on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-500`}
              />

              {/* Glowing Border Effect */}
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 blur-xl dark:group-hover:opacity-30 transition-opacity duration-500`}
              />

              <div className="relative p-7 flex flex-col items-center text-center space-y-4 w-full">
                {/* Icon Container with Individual Gradient */}
                <div className="relative flex-shrink-0">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-2xl opacity-20 blur-2xl group-hover:blur-3xl group-hover:opacity-40 dark:opacity-30 dark:group-hover:opacity-50 transition-all duration-500`}
                  />
                  <div
                    className={`relative w-20 h-20 bg-gradient-to-br ${service.gradient} bg-opacity-10 dark:bg-opacity-20 rounded-2xl p-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-contain drop-shadow-lg"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Content with flex structure for consistent spacing */}
                <div className="flex flex-col space-y-3 flex-1 w-full">
                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 leading-tight">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <div className="flex-1 flex items-start">
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Spacer column on large screens */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}

export default ServiceProvide;
