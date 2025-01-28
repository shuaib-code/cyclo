import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Bike,
  CheckCircle,
  Mountain,
  PenTool,
  ShoppingBag,
  Users,
} from "lucide-react";

import { useEffect, useState } from "react";

const AboutPicture: string =
  "https://images.unsplash.com/photo-1486413161838-08358ba654df?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const reasons = [
    {
      title: "Premium Quality",
      description:
        "We partner with renowned manufacturers to bring you durable and high-performance bicycles.",
    },
    {
      title: "Variety & Innovation",
      description:
        "Our collection includes road bikes, mountain bikes, electric bikes, and more, catering to all kinds of riders.",
    },
    {
      title: "Customer Satisfaction",
      description:
        "From expert advice to after-sales support, we prioritize your needs every step of the way.",
    },
    {
      title: "Sustainability Focus",
      description:
        "We are committed to promoting eco-friendly transportation and reducing our carbon footprint.",
    },
  ];

  const offerings = [
    {
      icon: Bike,
      title: "Wide Range of Bicycles",
      description: "From entry-level models to professional-grade rides.",
    },
    {
      icon: PenTool,
      title: "Maintenance & Repairs",
      description: "Expert servicing to keep your bike in peak condition.",
    },
    {
      icon: ShoppingBag,
      title: "Accessories & Gear",
      description:
        "Helmets, apparel, and components to complete your cycling experience.",
    },
    {
      icon: Users,
      title: "Community Events",
      description:
        "Organizing group rides, competitions, and cycling awareness programs.",
    },
  ];

  const teamMembers = [
    {
      name: "Mohammad Shuaib",
      role: "Founder & CEO",
      image: "https://avatars.githubusercontent.com/u/136048271?v=4",
    },
    {
      name: "John Smith",
      role: "Head of Product Design",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Emily Johnson",
      role: "Chief Marketing Officer",
      image:
        "https://images.unsplash.com/flagged/photo-1579500647742-5f34826ec327?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Michael Brown",
      role: "Lead Mechanic",
      image:
        "https://images.unsplash.com/photo-1552774021-9ebbb764f03e?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="bg-background text-foreground scroll-smooth">
      {/* Hero Section */}
      <section>
        <div className="py-36 relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={AboutPicture}
              alt="Cyclists riding through a scenic route"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          <div className="relative z-10 text-center text-white">
            <h1 className="text-2xl md:text-6xl font-bold mb-4 animate-fade-in-down">
              About {"  "}
              <span className="bg-gradient-to-r from-[#0061ff] to-[#60efff] text-transparent bg-clip-text">
                Cyclo
              </span>
            </h1>
            <p className="text-lg md:text-xl animate-fade-in-up">
              Redefining Your Cycling Experience
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-gradient-to-r from-[#0061ff] to-[#60efff] overflow-hidden">
        {/* Background Icon */}
        <Mountain className="absolute top-10 left-10 w-32 h-32 text-white opacity-10 dark:opacity-15" />
        <Mountain className="absolute bottom-10 right-10 w-32 h-32 text-white opacity-10 dark:opacity-15" />

        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white tracking-tight mb-6">
            Our Mission
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-white/90 leading-relaxed">
            We strive to provide top-tier bicycles and accessories that enhance
            your riding experience. Whether you're an urban commuter, a weekend
            adventurer, or a competitive racer, we support your journey with the
            best products and services.
          </p>
        </div>
      </section>

      {/* Products & Services Section */}
      <section className="py-20 bg-gray-200 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
            Our Products & Services
          </h2>
          <div className="flex justify-center items-center">
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-16">
              {offerings.map((offering, index) => (
                <Card
                  key={index}
                  className={`text-center transition-all duration-500 max-w-80 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <offering.icon className="w-16 h-16 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold text-xl mb-2">
                      {offering.title}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p>{offering.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background transition-colors duration-300">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">
            Why Choose Cyclo?
          </h2>
          <div className="flex justify-center items-center">
            <div className="grid md:grid-cols-2 gap-16">
              {reasons.map((reason, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex max-w-80 items-start space-x-4 transition-all duration-500",
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-xl mb-2 text-foreground">
                      {reason.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-200 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className={`bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-full h-64 overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-64 object-cover transition duration-300 ease-linear hover:scale-105 grayscale"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-xl mb-1 text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {member.role}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section
        className="py-20 text-white bg-cover bg-center bg-no-repeat relative bg-fixed"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1670002508281-fa935a5318eb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Glassmorphism Card */}
        <div className="relative container mx-auto px-6">
          <Card className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-10 max-w-3xl mx-auto shadow-lg">
            <CardHeader>
              <h2 className="text-4xl font-bold mb-6 text-center text-white drop-shadow-lg">
                Our Vision for the Future
              </h2>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-center text-white/80">
                We envision a world where cycling is not just a mode of
                transport but a lifestyle embraced by all. Through innovation
                and customer engagement, we strive to make Cyclo the go-to
                destination for every cycling enthusiast.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
