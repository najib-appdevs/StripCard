/* eslint-disable @next/next/no-img-element */
function HowItWorks() {
  const steps = [
    {
      id: 1,
      number: "01",
      image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      title: "Create Your Account",
      description:
        "Sign up easily by providing your details, verifying your email, and completing KYC verification for secure access.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      number: "02",
      image: "https://cdn-icons-png.flaticon.com/512/4290/4290854.png",
      title: "Loading Funds",
      description:
        "Deposit money into your digital wallet through multiple payment methods for a seamless experience.",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      id: 3,
      number: "03",
      image: "https://cdn-icons-png.flaticon.com/512/3515/3515469.png",
      title: "Buy a Virtual Card",
      description:
        "Purchase a virtual card tailored to your needs for online shopping, gaming, or subscriptions.",
      gradient: "from-violet-500 to-fuchsia-500",
    },
    {
      id: 4,
      number: "04",
      image: "https://cdn-icons-png.flaticon.com/512/1087/1087815.png",
      title: "Manage Your Virtual Card",
      description:
        "Top up your card balance, track transactions, and use it across various platforms securely.",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      id: 5,
      number: "05",
      image: "https://cdn-icons-png.flaticon.com/512/3062/3062634.png",
      title: "Make Transactions",
      description:
        "Transfer money, pay bills, and shop online with confidence using your virtual card.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 6,
      number: "06",
      image: "https://cdn-icons-png.flaticon.com/512/747/747376.png",
      title: "Stay Secure",
      description:
        "Leverage services like biometric login, 2FA, and detailed transaction logs to protect your account.",
      gradient: "from-indigo-500 to-violet-500",
    },
    {
      id: 7,
      number: "07",
      image: "https://cdn-icons-png.flaticon.com/512/4290/4290853.png",
      title: "Access Support",
      description:
        "Reach out via the support ticket system for quick resolutions and assistance anytime.",
      gradient: "from-blue-500 to-purple-500",
    },
    {
      id: 8,
      number: "08",
      image: "https://cdn-icons-png.flaticon.com/512/2919/2919600.png",
      title: "Enjoy Global Flexibility",
      description:
        "Use multi-language support and gift card options for a versatile, global experience.",
      gradient: "from-cyan-500 to-indigo-500",
    },
  ];

  return (
    <section className="relative w-full py-20 md:py-24 overflow-hidden bg-white">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-linear-to-bl from-blue-100/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-0 w-[500px] h-[500px] bg-linear-to-tr from-indigo-100/40 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Subtle Dots Pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle, #4F46E5 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          {/* Section Badge */}
          <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-100 mb-6">
            <div className="w-2 h-2 bg-linear-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse-slow" />
            <span className="text-sm font-bold tracking-wide bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent uppercase">
              How It Works
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            <span className="block">How It Works</span>
            <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Step-by-Step Process Explained
            </span>
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Discover how StripCard empowers you with an easy step-by-step
            process to manage virtual cards, add funds, transfer money, and
            ensure secure transactions—all designed for convenience,
            flexibility, and seamless financial management.
          </p>
        </div>

        {/* Steps Grid - 2 Columns with Process Flow Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 relative">
          {/* Connecting Line (hidden on mobile) */}
          <div className="hidden md:block absolute top-0 left-1/2 w-0.5 h-full bg-linear-to-b from-blue-200 via-indigo-200 to-violet-200 -translate-x-1/2 opacity-30" />

          {steps.map((step, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={step.id}
                className={`relative group animate-fade-in-up ${
                  isLeft ? "md:pr-12" : "md:pl-12"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Step Number Badge - Positioned at center line on desktop */}
                <div
                  className={`absolute top-8 ${isLeft ? "md:right-0 md:-mr-6" : "md:left-0 md:-ml-6"} hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-linear-to-br ${step.gradient} text-white font-bold text-lg shadow-lg z-10`}
                >
                  {step.number}
                </div>

                {/* Card */}
                <div className="relative bg-white rounded-2xl border-2 border-slate-100 shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden group-hover:-translate-y-1">
                  {/* Gradient Border Effect on Hover */}
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}
                    style={{ padding: "2px", borderRadius: "1rem" }}
                  >
                    <div className="w-full h-full bg-white rounded-2xl" />
                  </div>

                  {/* Subtle Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${step.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  <div className="relative p-6 flex items-start gap-5">
                    {/* Icon Container */}
                    <div className="shrink-0">
                      <div className="relative">
                        {/* Glow Effect */}
                        <div
                          className={`absolute inset-0 bg-linear-to-br ${step.gradient} rounded-xl opacity-20 blur-lg group-hover:opacity-40 group-hover:blur-xl transition-all duration-500`}
                        />

                        {/* Icon Background */}
                        <div
                          className={`relative w-16 h-16 bg-linear-to-br ${step.gradient} bg-opacity-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}
                        >
                          <img
                            src={step.image}
                            alt={step.title}
                            className="w-10 h-10 object-contain"
                          />
                        </div>

                        {/* Mobile Step Number (inside icon on mobile) */}
                        <div className="md:hidden absolute -top-2 -right-2 w-7 h-7 rounded-full bg-linear-to-br from-slate-700 to-slate-900 text-white text-xs font-bold flex items-center justify-center shadow-lg">
                          {step.number}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:bg-linear-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Accent Line */}
                  <div
                    className={`h-1 bg-linear-to-r ${step.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                  />
                </div>

                {/* Connector Dot for Mobile */}
                <div className="md:hidden flex justify-center my-4">
                  {index < steps.length - 1 && (
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                      <div className="w-1.5 h-1.5 bg-violet-400 rounded-full" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
