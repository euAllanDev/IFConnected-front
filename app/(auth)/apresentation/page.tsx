"use client";

import { useEffect, useRef, useState } from "react";
import { LandingNav } from "@/components/LandingNav";
import {
  MapPin,
  Users,
  Briefcase,
  Code2,
  Globe2,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Zap,
  Heart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Animation hook
function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isInView };
}

// Animated section component
function AnimatedSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isInView } = useInView();

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700",
        isInView
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// Feature card component
function FeatureCard({
  icon: Icon,
  title,
  description,
  color,
  delay = 0,
}: {
  icon: typeof MapPin;
  title: string;
  description: string;
  color: string;
  delay?: number;
}) {
  const { ref, isInView } = useInView();

  return (
    <Card
      ref={ref}
      className={cn(
        "group overflow-hidden border-0 bg-card/50 backdrop-blur-sm hover-lift transition-all duration-500",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <CardContent className="p-8">
        <div
          className={cn(
            "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110",
            color
          )}
        >
          <Icon size={28} />
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}

export default function ApresentationPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20,
        y: (e.clientY / window.innerHeight) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-background dark:bg-slate-800/15 overflow-x-hidden">
      <LandingNav />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with parallax */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')",
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background" />

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/4 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"
            style={{
              transform: `translate(calc(-50% + ${mousePosition.x * -2}px), calc(-50% + ${mousePosition.y * -2}px))`,
            }}
          />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20">
          <AnimatedSection>
            <Badge
              variant="secondary"
              className="mb-6 px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-0"
            >
              <Sparkles size={14} className="mr-2" />
              A Rede Social do Instituto Federal
            </Badge>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight">
              Mais que uma{" "}
              <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                rede.
              </span>
              <br />
              Uma{" "}
              <span className="bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 bg-clip-text text-transparent">
                Comunidade.
              </span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Conectamos mentes brilhantes do Instituto Federal através de
              geolocalização e tecnologia de ponta. Compartilhe, aprenda e
              cresça com sua comunidade acadêmica.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button
                  size="lg"
                  className="rounded-full px-8 py-6 text-lg font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all hover:-translate-y-0.5"
                >
                  Começar Agora
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 py-6 text-lg font-semibold border-2 hover:bg-accent"
                >
                  Fazer Login
                </Button>
              </Link>
            </div>
          </AnimatedSection>

          {/* Stats */}
          <AnimatedSection delay={400}>
            <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto">
              {[
                { value: "50+", label: "Campus" },
                { value: "10K+", label: "Estudantes" },
                { value: "100+", label: "Projetos" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl sm:text-3xl font-black text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="space-y-6">
                <Badge
                  variant="outline"
                  className="text-primary border-primary/30"
                >
                  O Propósito
                </Badge>
                <h2 className="text-4xl md:text-5xl font-black leading-tight">
                  Eliminando as barreiras entre os{" "}
                  <span className="text-primary">campus.</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  O IFConnected nasceu da necessidade de integrar alunos de
                  diferentes turmas e unidades. Muitas vezes, projetos incríveis
                  e eventos importantes ficam restritos às paredes de uma única
                  sala de aula.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Nossa plataforma centraliza a vida acadêmica: publicações,
                  grupos de estudo, portfólio de projetos e vagas de estágio,
                  tudo em um único ecossistema digital.
                </p>
                <Button variant="outline" className="group">
                  Saiba mais
                  <ArrowRight
                    size={16}
                    className="ml-2 transition-transform group-hover:translate-x-1"
                  />
                </Button>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl blur-2xl" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
                    alt="Estudantes colaborando"
                    width={800}
                    height={600}
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <Card className="bg-background/90 backdrop-blur-xl border-0">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center">
                          <Heart className="text-white" size={24} />
                        </div>
                        <div>
                          <p className="font-semibold">Comunidade Ativa</p>
                          <p className="text-sm text-muted-foreground">
                            +500 novas conexões por dia
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 lg:px-20 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <Badge
              variant="outline"
              className="mb-4 text-primary border-primary/30"
            >
              Recursos
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Tudo o que você precisa em um só lugar
            </h2>
            <p className="text-muted-foreground text-lg">
              Ferramentas desenvolvidas especificamente para as necessidades do
              estudante do IF.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={MapPin}
              title="Feed Regional"
              description="Usamos tecnologia geoespacial para mostrar o que está acontecendo no seu campus e nas unidades vizinhas num raio de 50km."
              color="bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
              delay={0}
            />
            <FeatureCard
              icon={Code2}
              title="Vitrine de Projetos"
              description="Construa seu portfólio acadêmico exibindo seus projetos, links para o GitHub e as tecnologias que você domina."
              color="bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
              delay={100}
            />
            <FeatureCard
              icon={Briefcase}
              title="Mural de Oportunidades"
              description="Fique sabendo de vagas de estágio, emprego e editais de monitoria exclusivos divulgados pela coordenação."
              color="bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400"
              delay={200}
            />
            <FeatureCard
              icon={Users}
              title="Grupos de Estudo"
              description="Encontre grupos de estudo no seu campus, organize encontros e compartilhe materiais de forma colaborativa."
              color="bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400"
              delay={300}
            />
            <FeatureCard
              icon={Zap}
              title="Networking Inteligente"
              description="Nossa IA sugere conexões baseadas em seus interesses, curso e localização geográfica."
              color="bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400"
              delay={400}
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Segurança em Primeiro Lugar"
              description="Ambiente moderado e seguro, exclusivo para a comunidade do Instituto Federal."
              color="bg-cyan-100 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-400"
              delay={500}
            />
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="py-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-3xl blur-2xl" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.pexels.com/photos/3153198/pexels-photo-3153198.jpeg"
                    alt="Empresas parceiras"
                    width={800}
                    height={600}
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection className="order-1 lg:order-2" delay={200}>
              <div className="space-y-6">
                <Badge
                  variant="outline"
                  className="text-amber-600 border-amber-300"
                >
                  Para Empresas
                </Badge>
                <h2 className="text-4xl md:text-5xl font-black leading-tight">
                  Encontre talentos{" "}
                  <span className="text-amber-500">IF.</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Nossa rede social oferece uma comunicação dinâmica entre os
                  campus e a divulgação pode ser em conjunto ou por campus
                  separados. Encontre os melhores talentos em tecnologia.
                </p>
                <Link href="/infoEnterprise">
                  <Button className="rounded-full px-8 bg-amber-500 hover:bg-amber-600">
                    Saiba mais
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-24 px-6 lg:px-20 bg-gradient-to-br from-emerald-950 via-slate-950 to-teal-950 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="space-y-6">
                <Badge className="bg-white/10 text-white border-0">Tecnologia</Badge>
                <h2 className="text-3xl md:text-4xl font-black leading-tight">
                  Arquitetura de Software Moderna e Escalável
                </h2>
                <p className="text-emerald-100/80 text-lg leading-relaxed">
                  O IFConnected não é apenas uma rede social, é um laboratório
                  de persistência poliglota. Combinamos bancos relacionais para
                  integridade, NoSQL para alto volume de dados, e processamento
                  espacial em tempo real.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Code2, text: "Java 17 + Spring Boot 3" },
                    { icon: Globe2, text: "Next.js + TypeScript" },
                    { icon: Users, text: "PostgreSQL + MongoDB" },
                    { icon: Zap, text: "Redis + Docker" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-emerald-100"
                    >
                      <item.icon className="text-emerald-400" size={20} />
                      <span className="font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="bg-slate-950/50 rounded-2xl p-6 border border-emerald-500/20 backdrop-blur-sm">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <pre className="font-mono text-sm text-slate-300 overflow-x-auto">
                  <code>
                  {`{
                    "query": "FindStudentsNearby",
                    "campus": "Campus João Pessoa",
                    "radius": 50000,
                    "technologies": ["Java", "React", "Spring"],
                    "results": 4902
                  }`}
                  </code>
                </pre>
                <div className="mt-4 p-3 bg-emerald-500/10 rounded-lg">
                  <p className="text-emerald-400 text-sm">
                    ✓ Query executada em 12ms
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-20">
        <AnimatedSection className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute -inset-8 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-3xl blur-2xl" />
            <div className="relative space-y-6">
              <h2 className="text-4xl md:text-5xl font-black">
                Sua jornada acadêmica{" "}
                <span className="text-primary">integrada.</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Crie sua conta agora, encontre seus colegas e comece a
                compartilhar seu mundo no IF.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="rounded-full px-8 bg-primary hover:bg-primary/90"
                  >
                    Criar Conta Grátis
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8 border-2"
                  >
                    Fazer Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <span className="text-white font-black text-sm">IF</span>
            </div>
            <span className="font-bold">Connected</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} IFConnected. Desenvolvido com ❤️ para
            a comunidade IF.
          </p>
        </div>
      </footer>
    </div>
  );
}
