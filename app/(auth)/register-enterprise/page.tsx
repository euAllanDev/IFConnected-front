"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/services/api";
import Link from "next/link";
import {
  Building2,
  Mail,
  Lock,
  Globe,
  Briefcase,
  ArrowRight,
  Loader2,
  ChevronRight,
} from "lucide-react";

const SECTORS = [
  "Tecnologia",
  "Educação",
  "Saúde",
  "Finanças",
  "Indústria",
  "Consultoria",
  "Outro",
];

const STEPS = ["Conta", "Empresa", "Confirmar"];

export default function RegisterEnterprise() {
  const router = useRouter();
  const { login } = useAuth();

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    sector: "",
    website: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const validateStep = () => {
    if (step === 0) {
      if (!formData.email || !formData.password || !formData.confirmPassword) {
        setError("Preencha todos os campos.");
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("As senhas não coincidem.");
        return false;
      }
      if (formData.password.length < 6) {
        setError("A senha deve ter pelo menos 6 caracteres.");
        return false;
      }
    }
    if (step === 1) {
      if (!formData.username) {
        setError("Informe o nome da empresa.");
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) setStep((s) => s + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setLoading(true);
    setError("");

    try {
      await api.register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: "COMPANY",
      } as any);

      const user = await api.login({
        email: formData.email,
        password: formData.password,
      });

      login(user);
      router.push("/jobs");
    } catch (err: any) {
      setError(err.message || "Erro ao criar conta. Tente novamente.");
      setStep(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080d18] flex">
      {/* Painel esquerdo — identidade */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-16 overflow-hidden">
        {/* Fundo com grid sutil */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(16,185,129,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16,185,129,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />

        {/* Gradiente de canto */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl translate-x-1/4 translate-y-1/4" />

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/apresentation" className="flex items-center gap-2 group">
            <span className="text-2xl font-black text-white tracking-tight">
              IF<span className="text-emerald-400">Connected</span>
            </span>
          </Link>
        </div>

        {/* Conteúdo central */}
        <div className="relative z-10 space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-bold tracking-[0.2em] text-emerald-400 uppercase">
              Para Empresas
            </span>
            <h1 className="text-5xl font-black text-white leading-tight">
              Encontre os
              <br />
              <span className="text-emerald-400">talentos</span>
              <br />
              do IFPB.
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
              Acesse portfólios reais, veja projetos e conecte-se com estudantes
              antes mesmo da entrevista.
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-8">
            {[
              { value: "20+", label: "Campus" },
              { value: "100%", label: "Técnico" },
              { value: "Grátis", label: "Para empresas" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-black text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rodapé esquerdo */}
        <div className="relative z-10">
          <p className="text-gray-600 text-sm">
            Já tem uma conta?{" "}
            <Link
              href="/login"
              className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              Entrar
            </Link>
          </p>
        </div>
      </div>

      {/* Painel direito — formulário */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-20 py-12">
        {/* Mobile logo */}
        <div className="lg:hidden mb-10">
          <span className="text-2xl font-black text-white tracking-tight">
            IF<span className="text-emerald-400">Connected</span>
          </span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-black text-white mb-1">
            Cadastro Corporativo
          </h2>
          <p className="text-gray-500 text-sm">
            Crie sua conta e comece a recrutar talentos
          </p>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-0 mb-10">
          {STEPS.map((label, i) => (
            <React.Fragment key={label}>
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    i < step
                      ? "bg-emerald-500 text-white"
                      : i === step
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50"
                      : "bg-white/5 text-gray-600 border border-white/10"
                  }`}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <span
                  className={`text-xs font-semibold transition-colors ${
                    i === step ? "text-white" : "text-gray-600"
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-px mx-3 transition-all duration-500 ${
                    i < step ? "bg-emerald-500" : "bg-white/10"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Erro */}
        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Step 0 — Credenciais */}
          {step === 0 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <Field
                icon={<Mail className="w-4 h-4" />}
                label="E-mail Corporativo"
                name="email"
                type="email"
                placeholder="vagas@empresa.com"
                value={formData.email}
                onChange={handleChange}
              />
              <Field
                icon={<Lock className="w-4 h-4" />}
                label="Senha"
                name="password"
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={formData.password}
                onChange={handleChange}
              />
              <Field
                icon={<Lock className="w-4 h-4" />}
                label="Confirmar Senha"
                name="confirmPassword"
                type="password"
                placeholder="Repita a senha"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              <button
                type="button"
                onClick={nextStep}
                className="w-full mt-2 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-gray-900 font-bold py-3.5 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                Continuar <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Step 1 — Dados da empresa */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <Field
                icon={<Building2 className="w-4 h-4" />}
                label="Nome da Empresa"
                name="username"
                type="text"
                placeholder="Ex: Nubank, Google, IFPB"
                value={formData.username}
                onChange={handleChange}
              />

              {/* Setor */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Setor{" "}
                  <span className="text-gray-600 normal-case font-normal">
                    (opcional)
                  </span>
                </label>
                <select
                  name="sector"
                  value={formData.sector}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500/50 focus:bg-white/8 transition-all"
                >
                  <option value="" className="bg-gray-900">
                    Selecione um setor
                  </option>
                  {SECTORS.map((s) => (
                    <option key={s} value={s} className="bg-gray-900">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <Field
                icon={<Globe className="w-4 h-4" />}
                label={
                  <>
                    Site{" "}
                    <span className="text-gray-600 normal-case font-normal">
                      (opcional)
                    </span>
                  </>
                }
                name="website"
                type="url"
                placeholder="https://suaempresa.com"
                value={formData.website}
                onChange={handleChange}
                required={false}
              />

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="flex-1 py-3.5 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/20 text-sm font-semibold transition-all"
                >
                  Voltar
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex-[2] flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-gray-900 font-bold py-3.5 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  Continuar <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2 — Confirmação */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  Resumo do cadastro
                </p>
                {[
                  { label: "Empresa", value: formData.username },
                  { label: "E-mail", value: formData.email },
                  {
                    label: "Setor",
                    value: formData.sector || "Não informado",
                  },
                  {
                    label: "Site",
                    value: formData.website || "Não informado",
                  },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex justify-between items-center py-1.5 border-b border-white/5 last:border-0"
                  >
                    <span className="text-xs text-gray-500">{label}</span>
                    <span className="text-sm text-white font-medium truncate max-w-[200px]">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3.5 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/20 text-sm font-semibold transition-all"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-[2] flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-gray-900 font-bold py-3.5 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Criando conta...
                    </>
                  ) : (
                    <>
                      Criar Conta <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>

        {/* Rodapé mobile */}
        <p className="lg:hidden mt-8 text-center text-gray-600 text-sm">
          Já tem uma conta?{" "}
          <Link
            href="/login"
            className="text-emerald-400 hover:text-emerald-300 font-semibold"
          >
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}

// Componente auxiliar de campo
function Field({
  icon,
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  required = true,
}: {
  icon: React.ReactNode;
  label: React.ReactNode;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
        {icon}
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:bg-white/8 transition-all"
      />
    </div>
  );
}