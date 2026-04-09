"use client";

import { motion } from "framer-motion";
import {
  TelegramLogoIcon,
  WhatsappLogoIcon,
  LockKeyIcon,
  LockOpenIcon,
  InstagramLogoIcon,
} from "@phosphor-icons/react";
import { LinkButton } from "../components/LinkButton";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.35 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 120, damping: 22 },
  },
} as const;

const socialLinks = [
  { href: "https://instagram.com/", icon: <InstagramLogoIcon weight="fill" size={20} />, label: "Instagram" },
  { href: "https://t.me/", icon: <TelegramLogoIcon weight="fill" size={20} />, label: "Telegram" },
  { href: "https://wa.me/", icon: <WhatsappLogoIcon weight="fill" size={20} />, label: "WhatsApp" },
];

export default function Home() {
  return (
    <main className="relative min-h-[100dvh] w-full flex flex-col overflow-hidden">

      {/* Background — object-position foca o topo da foto no mobile */}
      <div className="absolute inset-0 z-0">
        <img
          src="/bg.jpg"
          alt=""
          className="w-full h-full object-cover object-top"
        />
        {/* Gradiente pesado na parte inferior para legibilidade dos botões */}
        <div className="absolute inset-0 bg-gradient-to-t from-black from-40% via-black/70 via-65% to-black/10" />
      </div>

      {/* Conteúdo — empurrado para baixo, sobre o gradiente escuro */}
      <div className="relative z-10 mt-auto w-full px-5 pb-10 pt-6 flex flex-col items-center gap-5">

        {/* Avatar + nome + bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-3 text-center"
        >
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-white/20">
              <img
                src="/foto de perfil.jpeg"
                alt="Foto de perfil"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-black" />
          </div>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">Anna</h1>
            <p className="text-sm text-white/55 mt-1 leading-snug max-w-[28ch]">
              Conteúdo exclusivo para quem quer o melhor.
            </p>
          </div>
        </motion.div>

        {/* Ícones sociais */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center gap-2.5"
        >
          {socialLinks.map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 flex items-center justify-center rounded-full liquid-glass text-white/65 active:scale-95 transition-transform"
            >
              {icon}
            </a>
          ))}
        </motion.div>

        {/* Botões de link */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-3 w-full"
        >
          <motion.div variants={itemVariants}>
            <LinkButton
              href="https://t.me/"
              title="Grupo Free"
              subtitle="Entre no grupo gratuito"
              icon={<TelegramLogoIcon weight="fill" size={22} />}
              glow="#3b82f6"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <LinkButton
              href="https://wa.me/5511941222896?text=oi%20ana%20pode%20me%20passar%20os%20valores%20dos%20pack%2C%20estou%20interessado"
              title="WhatsApp Exclusivo"
              subtitle="Venda de Packs"
              icon={<WhatsappLogoIcon weight="fill" size={22} />}
              glow="#22c55e"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <LinkButton
              href="https://privacy.com.br/profile/aduarte"
              title="Privacy"
              subtitle="Todo o conteúdo sem censura"
              icon={<LockKeyIcon weight="fill" size={22} />}
              glow="#f97316"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="relative opacity-50 pointer-events-none select-none">
              <LinkButton
                href="#"
                title="Roleta da Ana"
                subtitle="Ganhe prêmios, encontros, assinaturas, descontos e muito mais"
                icon={<LockOpenIcon weight="fill" size={22} />}
              />
              <span className="absolute top-3 right-14 text-[11px] font-semibold tracking-widest uppercase bg-white/10 text-white/70 px-2 py-0.5 rounded-full border border-white/15">
                Em breve
              </span>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </main>
  );
}
