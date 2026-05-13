"use client";

import { LandingNav } from "@/components/LandingNav";
import Link from "next/link";
import {
  Building2,
  Target,
  Users,
  Zap,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function infoEnterprisePage() {
  const benefits = [
    {
      icon: Target,
      title: "Filtro de Talentos Reais",
      description:
        "Divulgue vagas direcionadas para cursos específicos. Encontre exatamente o estagiário de TI, Edificações ou Automação que você precisa.",
    },
    {
      icon: Users,
      title: "Portfólio Vivo",
      description:
        "Acesse o perfil do aluno e veja os projetos que ele postou na rede. Avalie a capacidade técnica (Hard Skills) na prática.",
    },
    {
      icon: Zap,
      title: "Conexão Institucional",
      description:
        "Sua empresa ganha visibilidade dentro do Instituto Federal, criando uma marca empregadora forte entre os futuros profissionais.",
    },
  ];

  const steps = [
    {
      step: "1",
      title: "Cadastro Empresarial",
      description:
        "Crie seu perfil com CNPJ e logo da empresa para passar credibilidade.",
    },
    {
      step: "2",
      title: "Publicação de Vagas",
      description:
        "Poste oportunidades de estágio ou emprego. Os alunos recebem notificações baseadas no curso deles.",
    },
    {
      step: "3",
      title: "Seleção Direta",
      description:
        "Receba candidaturas, visite o perfil do aluno na rede social e agende entrevistas.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <LandingNav />

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <Badge
            variant="secondary"
            className="mb-8 px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-0"
          >
            <Building2 size={16} className="mr-2" />
            Soluções para Recrutamento
          </Badge>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Sua empresa conectada aos{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              talentos do IF.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            O <strong>IFConnected</strong> não é apenas um banco de currículos.
            É uma rede social acadêmica viva, onde você vê os projetos, a evolução
            e o potencial real dos estudantes antes mesmo da entrevista.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register-enterprise">
              <Button
                size="lg"
                className="rounded-full px-8 py-6 text-lg font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-primary/25"
              >
                Cadastrar Empresa
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
            <Link href="#beneficios">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-6 text-lg font-semibold border-2"
              >
                Entenda a Lógica
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Benefits Section */}
      <section
        id="beneficios"
        className="py-24 bg-muted/30 border-y border-border"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-4 text-primary border-primary/30"
            >
              Benefícios
            </Badge>
            <h2 className="text-3xl font-bold mb-4">
              Por que recrutar no IFConnected?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Diferente de sites de emprego genéricos, aqui o foco é técnico e
              acadêmico.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <Card
                key={i}
                className="group border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-card/50 backdrop-blur-sm"
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform"
                  >
                    <benefit.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <Badge
                  variant="outline"
                  className="mb-4 text-primary border-primary/30"
                >
                  Como Funciona
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Como funciona a parceria?
                </h2>
              </div>

              <div className="space-y-6">
                {steps.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-primary-foreground"
                    >
                      {step.step}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">{step.title}</h4>
                      <p className="text-muted-foreground text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card className="relative h-[400px] border-0 overflow-hidden bg-gradient-to-br from-emerald-900/20 to-slate-900"
            >
              <CardContent className="p-8 h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <CheckCircle2 size={48} className="text-primary opacity-80" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Painel do Recrutador</h3>
                <p className="text-muted-foreground text-sm">
                  Em breve: dashboard exclusivo para gestão de vagas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-emerald-500/10 to-teal-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            Encontre seu próximo estagiário hoje.
          </h2>
          <Link href="/register-enterprise">
            <Button
              size="lg"
              className="rounded-full px-8 py-6 text-lg font-semibold"
            >
              Criar Conta Corporativa
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} IFConnected para Empresas.
          </p>
        </div>
      </footer>
    </div>
  );
}
