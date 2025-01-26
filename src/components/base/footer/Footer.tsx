import Icon from "@/assets/crank1.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Facebook,
  Globe,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 pt-12 pb-6 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-start mb-4">
              <Link to={"/"} className="flex justify-center items-center gap-0">
                <img
                  src={Icon}
                  alt="Cycling Logo"
                  className="h-16 w-16 rounded-lg rotate-180"
                />
                <span className="font-bold pb-1 text-4xl bg-gradient-to-r from-[#0061ff] to-[#60efff] text-transparent bg-clip-text">
                  Cyclo
                </span>
              </Link>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-4">
              Your One-Stop Destination for Quality Bicycles!
            </p>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
                <address className="not-italic text-sm text-gray-600 dark:text-gray-400">
                  123 Cycle Street, Dhaka, Bangladesh
                </address>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  +880 1234-567890
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  support@bicyclestore.com
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Quick Links
            </h3>
            <nav>
              <ul className="space-y-2">
                {[
                  "Home",
                  "All Bicycles",
                  "About Us",
                  "Contact",
                  "Login / Sign Up",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      to="/"
                      className="hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Follow Us
            </h3>
            <div className="flex space-x-2">
              {[
                { icon: Globe, label: "Website" },
                { icon: Facebook, label: "Facebook" },
                { icon: Twitter, label: "Twitter" },
                { icon: Instagram, label: "Instagram" },
                { icon: Youtube, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <Button key={label} variant="outline" size="icon" asChild>
                  <Link to="#" aria-label={label}>
                    <Icon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Newsletter
            </h3>
            <p className="text-sm mb-4">
              Stay updated with our latest offers and news
            </p>
            <form className="flex space-x-2">
              <Input
                type="email"
                placeholder="Your email"
                className="max-w-[200px] bg-white dark:bg-gray-800 dark:text-gray-300"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Cyclo: Bicycle Store. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
