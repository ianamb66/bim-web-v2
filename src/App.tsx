import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ChevronRight,
  Minimize2,
  Lightbulb,
  Maximize2,
  Sun,
  Moon,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

import { Reveal } from "./components/Reveal";
import { NeuronBackground } from "./components/NeuronBackground";
import { servicesData, type Service } from "./data/services";

function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [currentView, setCurrentView] = useState<"home" | "service" | "contact">(
    "home"
  );
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);

  const activeService = useMemo<Service | null>(() => {
    if (!activeServiceId) return null;
    return servicesData.find((s) => s.id === activeServiceId) ?? null;
  }, [activeServiceId]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentView, activeServiceId]);

  const toggleTheme = () => setTheme((p) => (p === "dark" ? "light" : "dark"));

  const openService = (service: Service) => {
    setActiveServiceId(service.id);
    setCurrentView("service");
  };

  const isDark = theme === "dark";

  const bgMain = isDark ? "bg-[#050505]" : "bg-gray-50";
  const textMain = isDark ? "text-white" : "text-gray-900";
  const bgSection = isDark ? "bg-[#020202]" : "bg-white";
  const bgCard = isDark ? "bg-[#0a0a0a]" : "bg-white";
  const borderSubtle = isDark ? "border-white/10" : "border-gray-200";
  const textMuted = isDark ? "text-gray-400" : "text-gray-600";

  const ServiceView = () => {
    if (!activeService) return null;
    const Icon = activeService.icon;

    return (
      <div className={cn("min-h-screen pt-32 pb-24", bgMain, textMain, "px-8")}>
        <div className="container mx-auto max-w-4xl">
          <button
            onClick={() => setCurrentView("home")}
            className="flex items-center gap-2 mb-12 text-yellow-500 hover:text-yellow-600 font-bold uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> Regresar
          </button>

          <Reveal type="fade-up">
            <div className="text-yellow-500 mb-6">
              <Icon className="w-10 h-10" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-tight">
              {activeService.category}
            </h1>
            <p className={cn("text-xl md:text-2xl font-medium mb-12", textMuted)}>
              {activeService.description}
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-16 mt-16">
            <Reveal type="fade-left" delay={200}>
              <h3 className="text-2xl font-bold mb-6 uppercase tracking-widest">
                Ejecución Estratégica
              </h3>
              <p className={cn("text-lg leading-relaxed", textMuted)}>
                {activeService.details}
              </p>
            </Reveal>

            <Reveal type="fade-up" delay={400}>
              <div
                className={cn(
                  "p-8 border-2 rounded-xl",
                  isDark
                    ? "border-yellow-500/30 bg-black/50"
                    : "border-yellow-500 bg-yellow-50/50"
                )}
              >
                <h3 className="text-xl font-bold mb-6 uppercase tracking-widest">
                  Entregables
                </h3>
                <ul className="space-y-4">
                  {activeService.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setCurrentView("contact")}
                  className="mt-10 w-full py-4 bg-yellow-500 text-black font-bold uppercase tracking-widest hover:bg-yellow-400 transition-colors"
                >
                  Solicitar Implementación
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    );
  };

  const ContactView = () => (
    <div
      className={cn(
        "min-h-screen pt-32 pb-24",
        bgMain,
        textMain,
        "px-8 flex items-center"
      )}
    >
      <div className="container mx-auto max-w-6xl">
        <button
          onClick={() => setCurrentView("home")}
          className="flex items-center gap-2 mb-12 text-yellow-500 hover:text-yellow-600 font-bold uppercase tracking-widest transition-colors"
        >
          <ArrowLeft className="w-5 h-5" /> Volver al Inicio
        </button>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <Reveal type="fade-left">
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6">
              Inicia tu <br />
              <span className="text-yellow-500">Blindaje.</span>
            </h1>
            <p className={cn("text-xl font-medium mb-12 max-w-md", textMuted)}>
              Agenda una sesión confidencial de diagnóstico con nuestros
              directores de estrategia. La discreción es absoluta.
            </p>

            <div className="space-y-6">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-yellow-500 mb-1">
                  Email Directo
                </p>
                <p className="text-2xl font-medium">estrategia@bim.agency</p>
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-yellow-500 mb-1">
                  Línea Cifrada
                </p>
                <p className="text-2xl font-medium">+52 55 1234 5678</p>
              </div>
            </div>
          </Reveal>

          <Reveal type="scale" delay={300}>
            <form
              className={cn("p-10 border shadow-2xl space-y-6", borderSubtle, bgCard)}
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2">
                  Nombre / Entidad
                </label>
                <input
                  type="text"
                  className={cn(
                    "w-full p-4 bg-transparent border focus:border-yellow-500 outline-none transition-colors",
                    borderSubtle
                  )}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  className={cn(
                    "w-full p-4 bg-transparent border focus:border-yellow-500 outline-none transition-colors",
                    borderSubtle
                  )}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2">
                  Situación / Requerimiento
                </label>
                <textarea
                  rows={4}
                  className={cn(
                    "w-full p-4 bg-transparent border focus:border-yellow-500 outline-none transition-colors resize-none",
                    borderSubtle
                  )}
                />
              </div>

              <button className="w-full py-4 bg-yellow-500 text-black font-bold uppercase tracking-widest hover:bg-yellow-400 transition-colors">
                Enviar Solicitud Segura
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </div>
  );

  const HomeView = () => (
    <>
      {/* HERO SECTION */}
      <section
        className={cn(
          "relative min-h-screen w-full flex flex-col justify-between pt-32 overflow-hidden transition-colors duration-500",
          bgMain
        )}
      >
        <NeuronBackground theme={theme} />

        <div className="relative z-10 flex flex-col items-center justify-center flex-grow px-4 text-center w-full mt-8 md:mt-0">
          <Reveal type="fade-up" delay={100}>
            <h2 className="text-sm md:text-xl font-bold tracking-[0.3em] uppercase mb-4 text-yellow-500 drop-shadow-md">
              Agencia de Marketing & Reputación
            </h2>
          </Reveal>

          <Reveal type="scale" delay={300}>
            <h1
              className={cn(
                "text-[clamp(3.5rem,10vw,9rem)] leading-[0.9] font-black tracking-tighter uppercase drop-shadow-2xl",
                textMain
              )}
            >
              Poder <br />
              <span
                className={cn(
                  "text-transparent bg-clip-text",
                  isDark
                    ? "bg-gradient-to-r from-gray-600 to-white"
                    : "bg-gradient-to-r from-gray-400 to-black"
                )}
                style={{
                  WebkitTextStroke: isDark
                    ? "1px rgba(255,255,255,0.2)"
                    : "1px rgba(0,0,0,0.2)",
                }}
              >
                Absoluto
              </span>
            </h1>
          </Reveal>

          <Reveal type="fade-up" delay={500}>
            <p
              className={cn(
                "max-w-xl mt-8 mb-16 text-lg font-medium leading-relaxed drop-shadow-md p-6 rounded-xl backdrop-blur-md border",
                isDark
                  ? "text-gray-300 bg-black/40 border-white/5"
                  : "text-gray-800 bg-white/40 border-black/5"
              )}
            >
              Estrategias de blindaje digital, control de la conversación pública
              y posicionamiento de alto prestigio. Dominamos la narrativa.
            </p>
          </Reveal>

          <Reveal type="fade-up" delay={650}>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href="#services"
                className={cn(
                  "inline-flex items-center gap-2 text-sm font-bold border px-6 py-3 transition-colors uppercase tracking-widest",
                  isDark
                    ? "border-white text-white hover:bg-yellow-500 hover:border-yellow-500 hover:text-black"
                    : "border-black text-black hover:bg-yellow-500 hover:border-yellow-500"
                )}
              >
                Servicios <ArrowDown className="w-5 h-5" />
              </a>
              <button
                onClick={() => setCurrentView("contact")}
                className="inline-flex items-center gap-2 text-sm font-bold bg-yellow-500 px-6 py-3 text-black uppercase tracking-widest hover:bg-yellow-400 transition-colors"
              >
                Contacto <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </Reveal>
        </div>

        {/* Bottom bar + métricas */}
        <div
          className={cn(
            "relative z-20 w-full border-t transition-colors duration-500 mt-auto",
            bgSection,
            borderSubtle
          )}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[99%] w-32 h-16 overflow-hidden flex justify-center pointer-events-none">
            <svg
              viewBox="0 0 100 50"
              preserveAspectRatio="none"
              className={cn("w-full h-full", isDark ? "fill-[#020202]" : "fill-white")}
            >
              <path d="M0,50 Q50,50 50,0 Q50,50 100,50 Z" />
            </svg>
            <button
              type="button"
              onClick={() =>
                document.getElementById("about")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="absolute top-2 w-12 h-12 bg-yellow-500 text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-[0_0_20px_rgba(234,179,8,0.5)] pointer-events-auto"
              aria-label="Scroll a sección Nosotros"
            >
              <ArrowDown className="w-6 h-6" />
            </button>
          </div>

          <div className="container mx-auto px-4 py-8 relative z-30">
            <div
              className={cn(
                "grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left divide-x",
                isDark ? "divide-gray-800" : "divide-gray-300"
              )}
            >
              <div className="px-4">
                <p className="text-[10px] md:text-xs uppercase tracking-widest text-yellow-500 mb-2 font-bold">
                  Enfoque
                </p>
                <p className="text-lg md:text-2xl font-black tracking-tight">
                  Reputación Digital
                </p>
              </div>
              <div className="px-4">
                <p className="text-[10px] md:text-xs uppercase tracking-widest text-yellow-500 mb-2 font-bold">
                  Metodología
                </p>
                <p className="text-lg md:text-2xl font-black tracking-tight">
                  Control & Blindaje
                </p>
              </div>
              <div className="px-4 hidden md:block">
                <p className="text-[10px] md:text-xs uppercase tracking-widest text-yellow-500 mb-2 font-bold">
                  Alcance
                </p>
                <p className="text-lg md:text-2xl font-black tracking-tight">
                  Posicionamiento SEO
                </p>
              </div>
              <div className="px-4 hidden md:block">
                <p className="text-[10px] md:text-xs uppercase tracking-widest text-yellow-500 mb-2 font-bold">
                  Impacto
                </p>
                <p className="text-lg md:text-2xl font-black tracking-tight">
                  Prestigio Total
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ¿QUÉ HACEMOS? */}
      <section id="about" className={cn("relative py-32 px-8", bgMain, "overflow-hidden border-b", borderSubtle)}>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <Reveal type="fade-left">
              <div>
                <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase">
                  ¿Qué hacemos?
                </h2>
                <p className={cn("text-lg md:text-xl leading-relaxed max-w-lg", textMuted)}>
                  A partir de{" "}
                  <span className={cn("font-bold", textMain)}>
                    diversas herramientas de recolección e interpretación de data
                  </span>{" "}
                  cualitativa y cuantitativa,{" "}
                  <span className="text-yellow-500 font-bold">
                    observamos, recolectamos y analizamos
                  </span>{" "}
                  el comportamiento digital de los posibles votantes y audiencias.
                </p>
              </div>
            </Reveal>

            <Reveal type="fade-up" delay={200}>
              <div className="relative border-l-2 border-yellow-500/30 pl-8 space-y-12 py-4">
                <div className="absolute left-[-17px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[15px] border-t-transparent border-l-[16px] border-l-yellow-500 border-b-[15px] border-b-transparent hidden md:block" />

                <div className="mb-4">
                  <p className={cn("font-medium mb-8", textMain)}>
                    Metodología propia para identificación de audiencias y
                    amplificación de contenidos.
                  </p>
                </div>

                <div className="relative space-y-10">
                  <div className="flex items-start gap-4 group">
                    <Minimize2 className="w-8 h-8 text-yellow-500 flex-shrink-0 transition-transform group-hover:scale-110" />
                    <div>
                      <h3 className="text-xl font-bold text-yellow-500 mb-2 tracking-wide">
                        IN PUT
                      </h3>
                      <p className={cn("text-sm", textMuted)}>
                        Recopilación masiva de información en tiempo real.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <Lightbulb className="w-8 h-8 text-yellow-500 flex-shrink-0 transition-transform group-hover:scale-110" />
                    <div>
                      <h3 className="text-xl font-bold text-yellow-500 mb-2 tracking-wide">
                        INSIGHTS
                      </h3>
                      <p className={cn("text-sm", textMuted)}>
                        Procesamiento de data, cruce de variables y creación de
                        accionables.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <Maximize2 className="w-8 h-8 text-yellow-500 flex-shrink-0 transition-transform group-hover:scale-110" />
                    <div>
                      <h3 className="text-xl font-bold text-yellow-500 mb-2 tracking-wide">
                        OUT PUT
                      </h3>
                      <p className={cn("text-sm", textMuted)}>
                        Salidas estratégicas de información y amplificación del
                        mensaje.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {isDark && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/10 via-transparent to-transparent pointer-events-none" />
        )}
      </section>

      {/* TÍTULO INTERMEDIO */}
      <section className={cn("py-32 px-8", bgSection, "border-b", borderSubtle)}>
        <div className="container mx-auto">
          <Reveal type="scale">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] max-w-4xl">
              <span className="block mb-4 text-yellow-500">● Domina el</span>
              <span className="block">Algoritmo.</span>
            </h2>
            <p className={cn("mt-8 text-xl max-w-2xl font-medium", textMuted)}>
              Combinamos expertise profundo en SEO, estrategia inteligente y
              análisis de datos para blindar tu marca, controlar la conversación
              y asegurar que tu mensaje sea el único que importe.
            </p>
            <button
              onClick={() => setCurrentView("contact")}
              className="mt-12 text-yellow-500 font-bold tracking-widest uppercase flex items-center gap-2 hover:gap-6 transition-all"
            >
              [ Iniciar Diagnóstico ] <ChevronRight className="w-6 h-6" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* GRID DE SERVICIOS */}
      <section id="services" className={cn("py-24", bgMain)}>
        <div className="container mx-auto px-8">
          <Reveal type="fade-up">
            <div className={cn("mb-16 flex flex-col md:flex-row justify-between items-end border-b pb-8", borderSubtle)}>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
                Capacidades
                <br />
                <span className="text-yellow-500">Estratégicas</span>
              </h2>
              <p className={cn("text-lg font-medium max-w-sm text-right mt-4 md:mt-0", textMuted)}>
                Selecciona un servicio para ver los detalles y arquitectura de
                ejecución.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {servicesData.map((service, index) => {
              const Icon = service.icon;
              return (
                <Reveal key={service.id} type="fade-up" delay={index * 100}>
                  <div
                    onClick={() => openService(service)}
                    className={cn(
                      "group h-full p-8 md:p-10 border hover:border-yellow-500 transition-all duration-500 cursor-pointer flex flex-col justify-between shadow-lg hover:shadow-yellow-500/20",
                      bgCard,
                      borderSubtle
                    )}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") openService(service);
                    }}
                  >
                    <div className="transform group-hover:-translate-y-2 transition-transform duration-500">
                      <div className="text-yellow-500 bg-yellow-500/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">
                        {service.category}
                      </h3>
                      <p className={cn("text-sm mb-6 font-medium line-clamp-3", textMuted)}>
                        {service.description}
                      </p>
                      <ul className="space-y-3 mb-8">
                        {service.items.slice(0, 3).map((item) => (
                          <li
                            key={item}
                            className={cn(
                              "flex items-start text-xs font-bold uppercase tracking-wider transition-colors",
                              textMuted,
                              isDark ? "group-hover:text-white" : "group-hover:text-gray-900"
                            )}
                          >
                            <span className="mr-2 mt-0.5 block w-1.5 h-1.5 bg-yellow-500 rounded-full flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                        <li className="text-xs font-bold text-yellow-500 mt-2 italic">
                          + Ver más...
                        </li>
                      </ul>
                    </div>

                    <div className="mt-auto flex items-center text-yellow-500 font-bold uppercase tracking-widest text-sm group-hover:gap-2 transition-all">
                      Explorar <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER GLOBAL */}
      <footer
        className={cn(
          bgSection,
          "pt-32 pb-12 px-8 border-t",
          isDark ? "border-yellow-500/20" : "border-gray-300"
        )}
      >
        <div className="container mx-auto">
          <Reveal type="scale">
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase mb-12">
              Hablemos.
            </h2>
          </Reveal>

          <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-12 border-t pt-12", borderSubtle)}>
            <div>
              <h4 className="text-xl font-bold mb-4 text-yellow-500">BIM Agency</h4>
              <p className={cn("font-medium", textMuted)}>
                Blindaje, Marketing y Prestigio Digital para marcas que exigen la
                excelencia.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4 text-yellow-500">Contacto</h4>
              <p className={cn(textMuted, "hover:text-yellow-500 cursor-pointer transition-colors mb-2 font-bold")}>
                estrategia@bim.agency
              </p>
              <p className={cn(textMuted, "hover:text-yellow-500 cursor-pointer transition-colors font-bold")}>
                +52 55 1234 5678
              </p>
            </div>
            <div className="text-right md:text-left">
              <button
                onClick={() => setCurrentView("contact")}
                className="bg-yellow-500 text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-yellow-400 transition-colors w-full md:w-auto shadow-lg shadow-yellow-500/30"
              >
                Solicitar Auditoría
              </button>
            </div>
          </div>

          <div className={cn("mt-24 pt-8 border-t text-xs font-bold flex flex-col md:flex-row justify-between uppercase tracking-widest gap-4", borderSubtle, textMuted)}>
            <p>© {new Date().getFullYear()} BIM. Todos los derechos reservados.</p>
            <p className="hover:text-yellow-500 cursor-pointer transition-colors">
              Aviso de Privacidad / Términos
            </p>
          </div>
        </div>
      </footer>
    </>
  );

  return (
    <div
      className={cn(
        bgMain,
        textMain,
        "font-sans selection:bg-yellow-500 selection:text-black transition-colors duration-500"
      )}
    >
      {/* NAVEGACIÓN GLOBAL */}
      <nav className="fixed w-full top-0 z-50 flex justify-between items-center px-6 md:px-8 py-6 backdrop-blur-md border-b border-white/5 bg-black/10">
        <div
          onClick={() => setCurrentView("home")}
          className="text-2xl font-black tracking-tighter cursor-pointer text-white mix-blend-difference"
        >
          BIM.
        </div>

        <div className="flex items-center gap-6 md:gap-8">
          {currentView === "home" && (
            <div className="hidden md:flex gap-8 text-sm font-bold tracking-widest uppercase text-white mix-blend-difference">
              <a href="#about" className="hover:text-yellow-500 transition-colors">
                Nosotros
              </a>
              <a href="#services" className="hover:text-yellow-500 transition-colors">
                Servicios
              </a>
            </div>
          )}

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/10 text-white mix-blend-difference transition-colors"
            title="Cambiar Tema"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setCurrentView("contact")}
            className={cn(
              "text-sm font-bold border px-6 py-2 transition-colors uppercase tracking-widest",
              isDark
                ? "border-white text-white hover:bg-yellow-500 hover:border-yellow-500 hover:text-black"
                : "border-black text-black hover:bg-yellow-500 hover:border-yellow-500"
            )}
          >
            CONTACTO
          </button>
        </div>
      </nav>

      {/* RENDERIZADO CONDICIONAL DE VISTAS */}
      {currentView === "service" && <ServiceView />}
      {currentView === "contact" && <ContactView />}
      {currentView === "home" && <HomeView />}
    </div>
  );
}
