import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "David Carter",
    role: "Cycling Enthusiast",
    feedback:
      "The bicycles here are top-notch! The quality, comfort, and pricing are unmatched. Highly recommend for anyone looking for a reliable ride.",
    img: "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
  },
  {
    name: "Lisa Thompson",
    role: "Professional Cyclist",
    feedback:
      "I found the perfect bike for my training sessions. The team helped me choose the best model, and the customer service was excellent!",
    img: "https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
  },
  {
    name: "Mark Wilson",
    role: "Commuter & Daily Rider",
    feedback:
      "This store made my daily commute so much better! The bicycle is durable, smooth, and perfect for city rides.",
    img: "https://images.pexels.com/photos/1680175/pexels-photo-1680175.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1",
  },
];

export default function Testimonial() {
  return (
    <section className="w-full pt-6 pb-12 md:py-24 lg:py-32 bg-muted">
      <div className="container grid max-w-5xl items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10 mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h2 className="scroll-m-20 border-b pb-2 sm:text-4xl md:text-5xl font-semibold tracking-tight transition-colors first:mt-0">
            What Our Customers Say
          </h2>
          <p className="mt-1 text-muted-foreground lg:text-xl">
            Hear from our satisfied customers about their experience with our
            products and services.
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map(({ name, role, feedback, img }, idx) => (
            <div
              key={idx}
              className="flex flex-col items-start gap-4 rounded-lg bg-background p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border">
                  <AvatarImage
                    src={img}
                    alt={`@${name}`}
                    className="object-cover"
                  />
                  <AvatarFallback>{name.split(" ")[0][0]}</AvatarFallback>
                </Avatar>
                <div className="grid gap-0.5">
                  <h4 className="text-lg font-semibold text-left">{name}</h4>
                  <p className="text-sm text-muted-foreground">{role}</p>
                </div>
              </div>
              <blockquote className="text-sm leading-relaxed text-muted-foreground">
                &ldquo;{feedback}&rdquo;
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
