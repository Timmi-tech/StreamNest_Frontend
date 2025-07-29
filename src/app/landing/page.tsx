"use client";
import { useEffect, useState } from "react";
import {
  Play,
  Upload,
  Users,
  Search,
  Star,
  ArrowRight,
  Menu,
  X,
  Video,
  Cloud,
  Shield,
  Zap,
  TrendingUp,
  Eye,
  Heart,
  Share2,
  Download,
  Sparkles,
  Globe,
  Lock,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function StreamNestLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const router = useRouter();

  const features = [
    {
      icon: <Upload className="w-6 h-6" />,
      title: "Fast Uploads",
      description:
        "Intelligent video processing with automatic optimization, thumbnail generation, and content analysis.",
      gradient: "from-blue-500 to-purple-600",
    },
    {
      icon: <Play className="w-6 h-6" />,
      title: "Ultra-Fast Streaming",
      description:
        "Edge-optimized delivery with 4K streaming, zero-latency playback, and adaptive quality.",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Social Ecosystem",
      description:
        "Built-in social features with real-time chat, collaborative playlists, and creator monetization.",
      gradient: "from-pink-500 to-rose-600",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Analytics Suite",
      description:
        "Advanced creator analytics with audience insights, performance metrics, and revenue tracking.",
      gradient: "from-orange-500 to-yellow-600",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global CDN",
      description:
        "Worldwide content delivery with 99.9% uptime and millisecond response times.",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Privacy First",
      description:
        "End-to-end encryption, granular privacy controls, and GDPR compliance built-in.",
      gradient: "from-indigo-500 to-blue-600",
    },
  ];

  const testimonials = [
    {
      name: "Alex Rivera",
      role: "Tech Reviewer",
      content:
        "StreamNest isn't just another platform—it's the future of content creation. The features are game-changing.",
      rating: 5,
      avatar: "AR",
      verified: true,
    },
    {
      name: "Sophia Chen",
      role: "Digital Artist",
      content:
        "The video quality is incredible, and the creator tools are intuitive. My engagement has increased 300%.",
      rating: 5,
      avatar: "SC",
      verified: true,
    },
    {
      name: "Marcus Thompson",
      role: "Educator",
      content:
        "Perfect for educational content. The analytics help me understand my students better than ever.",
      rating: 5,
      avatar: "MT",
      verified: true,
    },
  ];

  const stats = [
    { value: "1M+", label: "Creators", icon: <Users className="w-5 h-5" /> },
    { value: "50M+", label: "Videos", icon: <Video className="w-5 h-5" /> },
    { value: "2.5B", label: "Views", icon: <Eye className="w-5 h-5" /> },
    { value: "150+", label: "Countries", icon: <Globe className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div
          className="absolute w-96 h-96 rounded-full bg-primary/10 blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            opacity: 0.3,
          }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-chart-2 rounded-xl flex items-center justify-center">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  StreamNest
                </span>
                <Badge variant="secondary" className="ml-2 text-xs">
                  Beta
                </Badge>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-105"
              >
                Features
              </a>
              <a
                href="#creators"
                className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-105"
              >
                Creators
              </a>
              <a
                href="#pricing"
                className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-105"
              >
                Pricing
              </a>
              <Button
                onClick={() => router.push("/auth/login")}
                variant="ghost"
                className="hover:bg-accent/50 cursor-pointer"
              >
                Sign In
              </Button>
              <Button
                onClick={() => router.push("/auth/signup")}
                className=" cursor-pointer bg-gradient-to-r from-primary to-chart-2 hover:from-primary/90 hover:to-chart-2/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started
                <Sparkles className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden cursor-pointer"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl">
            <div className="px-4 py-4 space-y-3">
              <a
                href="#features"
                className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </a>
              <a
                href="#creators"
                className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Creators
              </a>
              <a
                href="#pricing"
                className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </a>
              <div className="pt-2 space-y-2">
                <Button
                  onClick={() => router.push("/auth/login")}
                  variant="ghost"
                  className="w-full justify-start cursor-pointer"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => router.push("/auth/signup")}
                  className="cursor-pointer w-full bg-gradient-to-r from-primary to-chart-2 text-white"
                >
                  Get Started
                  <Sparkles className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge
              variant="outline"
              className="mb-6 px-4 py-2 text-sm border-primary/20 bg-primary/5"
            >
              <Zap className="w-4 h-4 mr-2 text-primary" />
              Now in Public Beta
            </Badge>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight">
              Create, Stream,{" "}
              <span className="bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent animate-pulse">
                Inspire
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
              The next-generation video platform. Upload in seconds, stream in
              4K, and connect with millions of creators worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button
                onClick={() => router.push("/auth/signup")}
                size="lg"
                className="cursor-pointer bg-gradient-to-r from-primary to-chart-2 hover:from-primary/90 hover:to-chart-2/90 text-white text-lg px-8 py-6 rounded-2xl shadow-2xl hover:shadow-primary/25 transition-all duration-300 group"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                onClick={() =>
                  toast.message("Our Demo Video is coming Soon", {
                    description: "Stay tuned😉",
                  })
                }
                variant="outline"
                size="lg"
                className="cursor-pointer text-lg px-8 py-6 rounded-2xl border-2 hover:bg-accent/5 transition-all duration-300 group"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-chart-2/20 mb-3 group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge
              variant="outline"
              className="mb-4 px-4 py-2 border-primary/20 bg-primary/5"
            >
              <Sparkles className="w-4 h-4 mr-2 text-primary" />
              Features
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Built for the Future
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the next evolution of video sharing with cutting-edge
              technology and intuitive design
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-105"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>
                <CardHeader className="relative z-10">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                  <div className="mt-4 flex items-center text-sm text-primary group-hover:text-primary/80 transition-colors">
                    Learn more{" "}
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="creators"
        className="py-32 bg-gradient-to-br from-muted/20 to-accent/5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge
              variant="outline"
              className="mb-4 px-4 py-2 border-primary/20 bg-primary/5"
            >
              <Heart className="w-4 h-4 mr-2 text-primary" />
              Testimonials
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Loved by Creators
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of creators who are already building their
              communities on StreamNest
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-105"
              >
                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-500 fill-current"
                        />
                      ))}
                    </div>
                    {testimonial.verified && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-green-500/20 text-green-700"
                      >
                        Verified
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-base leading-relaxed italic">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12 ring-2 ring-primary/20">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-chart-2 text-white font-semibold">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-chart-2 to-primary"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Content?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
            Join the revolution. Create stunning videos, build your audience,
            and monetize your passion.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 rounded-2xl shadow-2xl transition-all duration-300 group"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className=" cursor-pointer text-lg px-8 py-6 rounded-2xl border-2 hover:border-blue/50 border-white/30 text-white bg-transparent transition-all duration-300"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/50 backdrop-blur-sm border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-chart-2 rounded-xl flex items-center justify-center">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">StreamNest</span>
              </div>
              <p className="text-muted-foreground mb-6">
                Empowering creators worldwide with cutting-edge video technology
                and unlimited possibilities.
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary/10 hover:text-primary"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary/10 hover:text-primary"
                >
                  <Heart className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary/10 hover:text-primary"
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-foreground">Platform</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    API
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Enterprise
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-foreground">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Creator Hub
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Community
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-foreground">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/50 pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              &copy; 2025 StreamNest. Crafted with ❤️ for creators worldwide.
            </p>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <Badge variant="outline" className="text-xs">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                All systems operational
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
