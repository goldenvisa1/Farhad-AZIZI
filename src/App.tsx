/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  Globe, 
  ShieldCheck, 
  Clock, 
  MessageCircle, 
  Award, 
  ChevronRight, 
  MapPin, 
  Home, 
  Briefcase, 
  Star,
  Handshake,
  Users,
  Menu,
  X,
  Phone,
  Send,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  GraduationCap,
  Heart,
  Building2,
  UserCheck,
  Languages,
  FileText
} from "lucide-react";
import React, { useState, useEffect } from "react";
import ChatWidget from "./components/ChatWidget";
import FAQ from "./components/FAQ";
import { translations, Language as LangType } from "./lib/translations";

const WHATSAPP_NUMBER = "989001068866"; // Primary contact number
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=درود.%20درخواست%20ارزیابی%20تخصصی%20برای%20اقامت%20اروپا%20دارم.`;

export default function App() {
  const [lang, setLang] = useState<LangType>('fa');
  const t = translations[lang];
  const isRtl = lang === 'fa';

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  const completionPercentage = (() => {
    const fields = Object.keys(formData);
    const validFields = fields.filter(key => {
      const value = formData[key as keyof typeof formData];
      return value.trim().length > 0 && !errors[key];
    });
    return (validFields.length / fields.length) * 100;
  })();

  const validateField = (name: string, value: string) => {
    let error = "";
    const trimmedValue = value.trim();

    if (name === "name") {
      if (!trimmedValue) {
        error = lang === 'fa' ? "نام و نام خانوادگی الزامی است" : "Full name is required";
      } else if (trimmedValue.length < 3) {
        error = lang === 'fa' ? "نام باید حداقل ۳ کاراکتر باشد" : "Name must be at least 3 characters";
      } else if (lang === 'fa' && !/^[\u0600-\u06FF\s]+$/.test(trimmedValue)) {
        error = "لطفا فقط از حروف فارسی استفاده کنید";
      }
    } else if (name === "phone") {
      const cleanPhone = value.replace(/\s/g, "");
      if (!cleanPhone) {
        error = lang === 'fa' ? "شماره تماس الزامی است" : "Phone number is required";
      } else if (lang === 'fa' && !/^09\d{9}$/.test(cleanPhone)) {
        error = "شماره تماس باید با ۰۹ شروع شده و ۱۱ رقم باشد (مثال: 09123456789)";
      }
    } else if (name === "email") {
      if (trimmedValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
        error = lang === 'fa' ? "فرمت ایمیل وارد شده صحیح نیست" : "Invalid email format";
      }
    } else if (name === "message") {
      if (!trimmedValue) {
        error = lang === 'fa' ? "لطفا پیام خود یا سوال خود را مطرح کنید" : "Please enter your message";
      } else if (trimmedValue.length < 20) {
        error = lang === 'fa' 
          ? "پیام شما باید حداقل ۲۰ کاراکتر باشد تا بتوانیم بهتر راهنمایی‌تان کنیم" 
          : "Your message must be at least 20 characters to help us better guide you";
      }
    }
    return error;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setActiveField(name);
    
    // Real-time validation
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setActiveField(null);
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
      setFormData({ name: "", phone: "", email: "", message: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setErrors({ submit: lang === 'fa' ? "خطایی رخ داد. لطفا دوباره تلاش کنید." : "An error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const LanguageSwitcher = () => (
    <div className="flex items-center gap-2 bg-zinc-100 p-1 rounded-full">
      {(['fa', 'en', 'de'] as LangType[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-3 py-1 text-[10px] font-black rounded-full transition-all ${
            lang === l ? "bg-white text-gold-600 shadow-sm" : "text-zinc-500 hover:text-zinc-900"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );

  return (
    <div className={`min-h-screen bg-[#FCFAF7] text-zinc-900 font-sans selection:bg-gold-500/30 ${isRtl ? 'font-farsi' : ''}`} dir={isRtl ? "rtl" : "ltr"}>
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-white/90 backdrop-blur-lg border-b border-gold-500/10 py-4 shadow-sm" : "bg-transparent py-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-gold-500/20">
              <Award className="text-black w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-zinc-900 uppercase">EURO <span className="text-gold-600">NOBEL</span></span>
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            {[
              { id: "home", label: t.nav.home },
              { id: "خدمات", label: t.nav.services },
              { id: "مقاصد", label: t.nav.destinations },
              { id: "داستان‌ها", label: t.nav.stories },
              { id: "فرآیند", label: t.nav.process },
              { id: "تماس", label: t.nav.contact },
              { id: "درباره ما", label: t.nav.about }
            ].map((item) => (
              <a key={item.id} href={`#${item.id}`} className="hover:text-gold-600 transition-colors text-zinc-700">
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold-500 text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-gold-400 transition-all transform hover:scale-105 shadow-lg shadow-gold-500/20"
            >
              {t.nav.onlineAssessment}
            </a>
            <button 
              className="md:hidden text-zinc-900"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <div className="mb-4">
              <LanguageSwitcher />
            </div>
            {[
              { id: "home", label: t.nav.home },
              { id: "خدمات", label: t.nav.services },
              { id: "مقاصد", label: t.nav.destinations },
              { id: "داستان‌ها", label: t.nav.stories },
              { id: "فرآیند", label: t.nav.process },
              { id: "تماس", label: t.nav.contact },
              { id: "درباره ما", label: t.nav.about }
            ].map((item) => (
              <a 
                key={item.id} 
                href={`#${item.id}`} 
                className="text-2xl font-bold hover:text-gold-600 text-zinc-900"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1467226632440-65f0b4957563?q=80&w=1920&auto=format&fit=crop"
            alt="Lisbon Portugal"
            className="w-full h-full object-cover scale-110 opacity-60"
            referrerPolicy="no-referrer"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FCFAF7] via-transparent to-[#FCFAF7]/30" />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-600 text-xs font-bold tracking-[0.2em] mb-6 uppercase">
              {t.hero.badge}
            </span>
            <h1 className="text-4xl lg:text-7xl font-black mb-8 leading-tight text-zinc-900">
              {t.hero.title} <br />
              <span className="text-gold-600">{t.hero.titleGold}</span>
            </h1>
            <p className="text-xl text-zinc-600 mb-10 max-w-lg leading-relaxed">
              {t.hero.desc}
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href={WHATSAPP_LINK} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-zinc-900 text-white px-8 py-4 rounded-full font-black hover:bg-gold-500 hover:text-black transition-all group shadow-xl"
              >
                {t.hero.ctaPrimary}
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="#خدمات" 
                className="flex items-center gap-3 px-8 py-4 rounded-full border border-zinc-200 text-zinc-900 font-bold hover:bg-zinc-100 transition-all"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Metrics Section */}
      <section className="py-24 border-y border-zinc-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center text-zinc-900">
          {[
            { label: t.metrics.targetCountries, value: "12", icon: Globe },
            { label: t.metrics.yearsExperience, value: "+8", icon: Clock },
            { label: t.metrics.customerSatisfaction, value: "99%", icon: ShieldCheck },
            { label: t.metrics.lawyers, value: "15", icon: Users },
          ].map((metric, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <metric.icon className="w-8 h-8 text-gold-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-3xl font-black mb-2">{metric.value}</h3>
              <p className="text-sm text-zinc-500 font-bold uppercase tracking-wider">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Us */}
      <section id="درباره ما" className="py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gold-500/[0.05] -skew-x-12 transform translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-gold-600 font-bold tracking-widest uppercase text-sm mb-6 block">{t.about.badge}</span>
              <h2 className="text-4xl md:text-5xl font-black mb-10 leading-tight">
                {t.about.title} <span className="text-gold-600">{t.about.titleGold}</span>.
              </h2>
              <div className="space-y-6 text-zinc-600 text-lg font-medium leading-relaxed">
                <p>{t.about.p1}</p>
                <p>{t.about.p2}</p>
                <p>{t.about.p3}</p>
                <p className="text-gold-600 font-black pt-4">{t.about.p4}</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden border border-zinc-200 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop" 
                  alt="Office" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className={`absolute -bottom-8 ${isRtl ? '-left-8' : '-right-8'} bg-white/90 backdrop-blur-xl border border-gold-500/30 p-8 rounded-3xl max-w-xs shadow-xl`}>
                <ShieldCheck className="text-gold-600 w-10 h-10 mb-4" />
                <p className="text-zinc-900 font-bold leading-relaxed">{t.about.commitment}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section id="فرآیند" className="py-32 relative bg-[#F8F4F0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-black mb-10 leading-tight">
                {t.whyUs.title} <span className="text-gold-600">{t.whyUs.titleGold}</span> <br />
                {t.whyUs.subtitle}
              </h2>
              <div className="space-y-10">
                {t.whyUs.features.map((feature, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="flex gap-6"
                  >
                    <div className="flex-shrink-0 w-14 h-14 bg-white shadow-sm border border-gold-500/10 rounded-xl flex items-center justify-center">
                      {i === 0 ? <ShieldCheck className="text-gold-600 w-7 h-7" /> : i === 1 ? <Award className="text-gold-600 w-7 h-7" /> : <Globe className="text-gold-600 w-7 h-7" />}
                    </div>
                    <div>
                      <h4 className="text-xl font-black mb-3">{feature.title}</h4>
                      <p className="text-zinc-600 leading-relaxed font-medium">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-white p-4 rounded-3xl relative overflow-hidden group shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1600880210830-8045f866440f?q=80&w=1000&auto=format&fit=crop"
                  alt="Meeting"
                  className="rounded-2xl transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end">
                  <p className="text-gold-600 font-bold text-sm mb-2">{t.whyUs.ctaTitle}</p>
                  <p className="text-zinc-900 text-xl font-bold">{t.whyUs.ctaDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section id="مقاصد" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="text-gold-500 font-bold tracking-widest uppercase text-sm mb-4 block">{t.destinations.badge}</span>
              <h2 className="text-4xl md:text-6xl font-black leading-tight">{t.destinations.title} <br /><span className="text-zinc-500">{t.destinations.titleGrey}</span></h2>
            </div>
            <p className="text-zinc-500 text-lg font-medium max-w-sm">
              {t.destinations.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: lang === 'fa' ? "فرانسه" : "France", city: lang === 'fa' ? "پاریس" : "Paris", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop", flag: "🇫🇷" },
              { name: lang === 'fa' ? "اسپانیا" : "Spain", city: lang === 'fa' ? "مادرید" : "Madrid", image: "https://images.unsplash.com/photo-1544918877-460635b6420e?q=80&w=1200&auto=format&fit=crop", flag: "🇪🇸" },
              { name: lang === 'fa' ? "آلمان" : "Germany", city: lang === 'fa' ? "برلین" : "Berlin", image: "https://images.unsplash.com/photo-1534313314376-7824029d0174?q=80&w=1200&auto=format&fit=crop", flag: "🇩🇪" }
            ].map((destination, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.2 }}
                className="group relative overflow-hidden rounded-[2.5rem] aspect-[4/5] bg-zinc-100 cursor-pointer shadow-lg"
              >
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-10 flex flex-col justify-end">
                  <h3 className="text-4xl font-black text-white mb-1 flex items-center gap-3">
                    {destination.name}
                    <span className="text-2xl opacity-80">{destination.flag}</span>
                  </h3>
                  <p className="text-white/70 font-medium">{destination.city}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="خدمات" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 text-zinc-900 border-b border-gold-500/10 pb-12">
            <span className="text-gold-600 font-bold tracking-widest uppercase text-sm mb-4 block">{t.servicesSection.badge}</span>
            <h2 className="text-4xl lg:text-5xl font-black mb-6">{t.servicesSection.title} <span className="text-gold-600">{t.servicesSection.titleGold}</span></h2>
            <p className="text-zinc-600 max-w-3xl mx-auto text-lg font-medium leading-relaxed">
              {t.servicesSection.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(lang === 'fa' ? [
              { id: "skilled-worker", title: "ویزای کار متخصصین (Skilled Worker)", desc: "مسیری حرفه‌ای برای متخصصانی که به دنبال ارتقای شغلی و زندگی در محیط‌های کاری مدرن اروپا هستند. این ویزا فرصت حضور در شرکت‌های تراز اول جهانی را فراهم می‌کند.", icon: UserCheck, tags: ["آلمان", "هلند", "اتریش"], benefits: ["دریافت پیشنهاد شغلی معتبر (Job Offer)", "حقوق و مزایای بین‌المللی", "بیمه کامل و امنیت شغلی بالا"], time: "۳ تا ۶ ماه", expertise: "تیم ما تخصصی‌ترین مشاوره‌ها را برای معادل‌سازی مدارک و آماده‌سازی رزومه مطابق استانداردهای اروپا ارائه می‌دهد." },
              { id: "student-visa", title: "ویزای تحصیلی (Student Visa)", desc: "پلی به سوی معتبرترین دانشگاه‌های جهان. این ویزا به شما امکان تحصیل در رشته‌های مدرن و دسترسی به امکانات آموزشی پیشرفته در قلب اروپا را می‌دهد.", icon: GraduationCap, tags: ["ایتالیا", "آلمان", "فرانسه"], benefits: ["امکان تحصیل رایگان یا با هزینه اندک", "دریافت مجوز کار حین تحصیل", "فرصت ویژه یافتن شغل پس از تحصیل"], time: "۲ تا ۴ ماه", expertise: "ما در تمامی مراحل از اخذ پذیرش تحصیلی (Admission) تا دریافت ویزا و ثبت‌نام نهایی در کنار شما هستیم." },
              { id: "business-immigration", title: "مهاجرت تجاری و ثبت شرکت", desc: "ورود به قلب بازارهای جهانی. با ثبت شرکت یا سرمایه‌گذاری در بیزنس‌های موجود، نه تنها اقامت دریافت می‌کنید، بلکه برند خود را بین‌المللی می‌کنید.", icon: Building2, tags: ["آلمان", "امارات", "عمان"], benefits: ["معافیت‌های مالیاتی استراتژیک", "دسترسی به بازار آزاد شینگن", "امکان افتتاح حساب‌های بانکی معتبر تجاری"], time: "۴ تا ۸ ماه", expertise: "تدوین بیزنس‌پلان‌های حرفه‌ای و راهبری فرآیندهای مالیاتی پیچیده با نظارت وکلای پایه یک اروپایی." },
              { id: "financial-independence", title: "ویزای تمکن مالی", desc: "این برنامه برای افرادی طراحی شده است که دارای درآمد مستمر در کشور خود هستند. این ویزا اجازه می‌دهد بدون نیاز به انتقال سرمایه کلان، اقامت اروپا را دریافت کنید.", icon: Home, tags: ["اسپانیا", "پرتغال", "یونان"], benefits: ["دریافت اقامت برای تمام اعضای خانواده", "بدون نیاز به مدرک زبان یا تحصیلی", "تردد آزاد در تمامی کشورهای حوزه شینگن"], time: "۴ تا ۶ ماه", expertise: "اثبات تمکن مالی و جریان نقدینگی یکی از مراحل حساس است که متخصصان ما با دقت بالا آن را مدیریت می‌کنند." },
              { id: "golden-visa", title: "ویزای طلایی (Golden Visa)", desc: "سرمایه‌گذاری استراتژیک در املاک یا صندوق‌های مالی. این برنامه امنیت سرمایه شما را تضمین کرده و مسیری مستقیم به سوی شهروندی اروپا فراهم می‌سازد.", icon: Star, tags: ["پرتغال", "مجارستان", "اسپانیا"], benefits: ["شرط حضور بسیار اندک (فقط ۷ روز در سال)", "امکان دریافت شهروندی پس از ۵ سال", "سرمایه گذاری مطمئن با بازگشت ارزی"], time: "۶ تا ۹ ماه", expertise: "مشاوره تخصصی در انتخاب بهترین گزینه‌های سرمایه‌گذاری با بالاترین نرخ بازگشت و امنیت حقوقی." },
              { id: "family-reunification", title: "الحاق به خانواده", desc: "تسهیم آرامش و زندگی در اروپا با عزیزان. این فرآیند قانونی تضمین می‌کند که اعضای خانواده شما بتوانند به زندگی شما در اروپا بپیوندند.", icon: Heart, tags: ["سراسر اروپا"], benefits: ["حفظ انسجام و کانون گرم خانواده", "برخورداری تمامی اعضا از حقوق مشابه", "تسهیل در فرآیند تطبیق اجتماعی و فرهنگی"], time: "۳ تا ۷ ماه", expertise: "تسریع در فرآیندهای اداری و پیگیری مستقیم پرونده‌ها در کنسولگری‌ها برای جلوگیری از جدایی طولانی‌مدت." }
            ] : (lang === 'en' ? [
              { id: "skilled-worker", title: "Skilled Worker Visa", desc: "Professional path for experts seeking career growth and living in modern European work environments.", icon: UserCheck, tags: ["Germany", "Netherlands", "Austria"], benefits: ["Valid Job Offer", "International salary", "Full insurance"], time: "3-6 Months", expertise: "Our team provides specialized advice for document evaluation." },
              { id: "student-visa", title: "Student Visa", desc: "Bridge to prestigious universities. Study modern fields in the heart of Europe.", icon: GraduationCap, tags: ["Italy", "Germany", "France"], benefits: ["Free education options", "Work permit during studies", "Post-grad job search"], time: "2-4 Months", expertise: "Aide through admission and visa stages." },
              { id: "business-immigration", title: "Business Immigration", desc: "Enter global markets. Register companies or invest in existing firms.", icon: Building2, tags: ["Germany", "UAE", "Oman"], benefits: ["Tax exemptions", "Schengen access", "Corporate accounts"], time: "4-8 Months", expertise: "Business planning and tax guidance." },
              { id: "financial-independence", title: "Financial Independence", desc: "Residency based on continuous home-country income.", icon: Home, tags: ["Spain", "Portugal", "Greece"], benefits: ["Family residency", "No language requirement", "Free Schengen movement"], time: "4-6 Months", expertise: "Managing financial proof requirements." },
              { id: "golden-visa", title: "Golden Visa", desc: "Investment in real estate or funds with a citizenship path.", icon: Star, tags: ["Portugal", "Hungary", "Spain"], benefits: ["Low stay (7 days/year)", "Citizenship in 5 years", "Secure USD/EUR returns"], time: "6-9 Months", expertise: "Strategic investment selection." },
              { id: "family-reunification", title: "Family Reunification", desc: "Bring your loved ones with you to Europe legally.", icon: Heart, tags: ["EU-Wide"], benefits: ["Family unity", "Equal rights", "Social adaptation"], time: "3-7 Months", expertise: "Expedited administrative handling." }
            ] : [
              { id: "skilled-worker", title: "Fachkräftevisum", desc: "Beruflicher Weg für Experten, die Karrierewachstum in Europa suchen.", icon: UserCheck, tags: ["Deutschland", "Niederlande", "Österreich"], benefits: ["Gültiges Jobangebot", "Inter. Gehalt", "Versicherungsschutz"], time: "3-6 Monate", expertise: "Spezialisierte Beratung zur Dokumentenbewertung." },
              { id: "student-visa", title: "Visum für Studenten", desc: "Studieren Sie an prestigeträchtigen Universitäten im Herzen Europas.", icon: GraduationCap, tags: ["Italien", "Deutschland", "Frankreich"], benefits: ["Kostenlose Bildung", "Arbeitserlaubnis", "Jobsuche nach Abschluss"], time: "2-4 Monate", expertise: "Unterstützung bei Zulassung und Visum." },
              { id: "business-immigration", title: "Unternehmen & Investitionen", desc: "Firmenregistrierung und Investitionen in globale Märkte.", icon: Building2, tags: ["Deutschland", "VAE", "Oman"], benefits: ["Steuerbefreiungen", "Schengen-Zugang", "Geschäftskonten"], time: "4-8 Monate", expertise: "Businessplanung und Steuerberatung." },
              { id: "financial-independence", title: "Finanzielle Unabhängigkeit", desc: "Residenz basierend auf kontinuierlichem Einkommen im Heimatland.", icon: Home, tags: ["Spanien", "Portugal", "Griechenland"], benefits: ["Familienresidenz", "Keine Sprachprüfung", "Schengen-Freizügigkeit"], time: "4-6 Monate", expertise: "Verwaltung von Finanznachweisen." },
              { id: "golden-visa", title: "Goldenes Visum", desc: "Investition in Immobilien oder Fonds mit Staatsbürgerschaftspfad.", icon: Star, tags: ["Portugal", "Ungarn", "Spanien"], benefits: ["Wenig Aufenthalt (7 Tage)", "Pass nach 5 Jahren", "Sichere Rendite"], time: "6-9 Monate", expertise: "Strategische Investitionswahl." },
              { id: "family-reunification", title: "Familienzusammenführung", desc: "Bringen Sie Ihre Lieben legal nach Europa.", icon: Heart, tags: ["EU-weit"], benefits: ["Familieneinheit", "Gleiche Rechte", "Soziale Anpassung"], time: "3-7 Monate", expertise: "Beschleunigte Verwaltung." }
            ])).map((service, i) => (
              <motion.div 
                key={i}
                id={service.id}
                whileHover={{ y: -10 }}
                className="bg-[#FCFAF7] border border-zinc-100 p-8 md:p-10 rounded-[2.5rem] hover:border-gold-500/30 transition-all group shadow-sm hover:shadow-2xl flex flex-col"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-16 h-16 bg-zinc-900 text-gold-500 rounded-3xl flex items-center justify-center shadow-lg group-hover:bg-gold-500 group-hover:text-black transition-colors">
                    <service.icon className="w-8 h-8" />
                  </div>
                  <div className={isRtl ? "text-left" : "text-right"}>
                    <span className="text-[10px] font-black text-gold-600/50 uppercase tracking-widest block mb-1">{t.servicesSection.processTime}</span>
                    <span className="text-zinc-900 font-bold text-sm bg-gold-500/10 px-3 py-1 rounded-full">{service.time}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-black mb-4 text-zinc-900">{service.title}</h3>
                <p className="text-zinc-600 mb-8 leading-relaxed font-medium text-sm">{service.desc}</p>
                
                <div className="space-y-4 mb-8 flex-grow">
                  <div className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-2 border-b border-zinc-100 pb-1">{t.servicesSection.keyBenefits}</div>
                  {service.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm font-bold text-zinc-700">
                      <div className="w-1.5 h-1.5 bg-gold-500 rounded-full shrink-0" />
                      {benefit}
                    </div>
                  ))}
                </div>

                <div className="mb-8 p-6 bg-white/50 rounded-3xl border border-zinc-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="w-4 h-4 text-gold-600" />
                    <span className="text-zinc-900 text-[11px] font-black uppercase tracking-wider">{t.servicesSection.whyEuroNobel}</span>
                  </div>
                  <p className="text-zinc-600 text-xs font-bold leading-relaxed">{service.expertise}</p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-zinc-100">
                  <div className="flex flex-wrap gap-2 text-[10px] font-black text-zinc-500">
                    {service.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-zinc-100 rounded-full group-hover:text-gold-600 transition-colors uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ChevronRight className={`w-5 h-5 text-zinc-300 group-hover:text-gold-500 transition-colors ${isRtl ? 'rotate-180' : ''}`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="داستان‌ها" className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <span className="text-gold-600 font-bold tracking-widest uppercase text-sm mb-4 block">Case Studies</span>
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-zinc-900">{lang === 'fa' ? 'داستان‌های موفقیت' : (lang === 'en' ? 'Success Stories' : 'Erfolgsgeschichten')} <span className="text-gold-600">EURO NOBEL</span></h2>
        </div>
      </section>

      {/* Downloads Section */}
      <section id="downloads" className="py-32 bg-[#F8F4F0] border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold-600 font-bold tracking-widest uppercase text-sm mb-4 block">{t.downloads.badge}</span>
            <h2 className="text-4xl lg:text-5xl font-black mb-6">{t.downloads.title} <span className="text-gold-600">{t.downloads.titleGold}</span></h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: t.downloads.formDescription, icon: FileText, link: "#" },
              { title: t.downloads.requirementsDescription, icon: FileText, link: "#" }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-zinc-100 flex items-center justify-between gap-6 hover:shadow-lg transition-all">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-gold-50 rounded-2xl flex items-center justify-center text-gold-600">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <p className="font-bold text-zinc-900 leading-relaxed">{item.title}</p>
                </div>
                <a href={item.link} className="flex-shrink-0 bg-zinc-900 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-gold-500 transition-colors">
                  {t.downloads.downloadLabel}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ t={t} />

      {/* Contact Section */}
      <section id="تماس" className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-gold-600 font-bold tracking-widest uppercase text-sm mb-4 block">{t.contact.badge}</span>
              <h2 className="text-4xl md:text-5xl font-black mb-8 text-zinc-900 leading-tight">
                {t.contact.title} <br />
                <span className="text-gold-600">{t.contact.titleGold}</span>
              </h2>
              <p className="text-zinc-600 text-lg mb-10 leading-relaxed font-medium">
                {t.contact.desc}
              </p>

              <div className="space-y-8">
                <div className="flex gap-6 items-center">
                  <div className="w-14 h-14 bg-gold-50 rounded-2xl flex items-center justify-center text-gold-600">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-sm font-bold uppercase tracking-wider mb-1">{t.contact.phone}</p>
                    <p className="text-zinc-900 text-xl font-black font-sans">0900 106 8866</p>
                  </div>
                </div>
                <div className="flex gap-6 items-center">
                  <div className="w-14 h-14 bg-gold-50 rounded-2xl flex items-center justify-center text-gold-600">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-sm font-bold uppercase tracking-wider mb-1">{t.contact.email}</p>
                    <p className="text-zinc-900 text-xl font-black font-sans">goldenvisa3@gmail.com</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-[#FCFAF7] p-8 md:p-12 rounded-[3.5rem] border border-zinc-100 shadow-2xl relative"
            >
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <motion.div className="w-24 h-24 bg-gold-500 rounded-full flex items-center justify-center mb-10">
                    <ShieldCheck className="w-12 h-12 text-black" />
                  </motion.div>
                  <h3 className="text-3xl font-black text-zinc-900 mb-4">{t.contact.success.title}</h3>
                  <p className="text-zinc-600 font-medium">{t.contact.success.desc} <span className="text-gold-600 font-bold">{t.contact.success.descGold}</span> {t.contact.success.descPart2}</p>
                  <button onClick={() => setIsSuccess(false)} className="mt-12 bg-white border border-zinc-200 px-8 py-3 rounded-2xl text-zinc-900 font-bold hover:border-gold-500 transition-all">
                    {t.contact.success.resubmit}
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-8">
                  <div className="relative pt-2">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gold-500 rounded-2xl flex items-center justify-center text-black font-black italic">
                          {Math.round(completionPercentage)}%
                        </div>
                        <div>
                          <p className="text-zinc-900 font-bold text-sm">{t.contact.form.progress}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-gold-600 font-black text-xs">
                          {Object.values(formData).filter(v => typeof v === 'string' && v.trim()).length} {t.contact.form.fieldCount}
                        </span>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                      <motion.div animate={{ width: `${completionPercentage}%` }} className="h-full bg-gold-500" />
                    </div>
                  </div>

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-zinc-500">{t.contact.form.name}</label>
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} onBlur={handleBlur} placeholder={t.contact.form.placeholderName} className="w-full bg-white border border-zinc-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-gold-500" />
                        {errors.name && <p className="text-red-500 text-xs font-bold">{errors.name}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-zinc-500">{t.contact.form.phone}</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} onBlur={handleBlur} placeholder={t.contact.form.placeholderPhone} className="w-full bg-white border border-zinc-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-gold-500 font-sans" />
                        {errors.phone && <p className="text-red-500 text-xs font-bold">{errors.phone}</p>}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-zinc-500">{t.contact.form.email}</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} onBlur={handleBlur} placeholder={t.contact.form.placeholderEmail} className="w-full bg-white border border-zinc-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-gold-500 font-sans" />
                      {errors.email && <p className="text-red-500 text-xs font-bold">{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-zinc-500">{t.contact.form.message}</label>
                      <textarea name="message" value={formData.message} onChange={handleInputChange} onBlur={handleBlur} rows={4} placeholder={t.contact.form.placeholderMessage} className="w-full bg-white border border-zinc-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-gold-500" />
                      {errors.message && <p className="text-red-500 text-xs font-bold">{errors.message}</p>}
                    </div>
                    <button disabled={isSubmitting} className="w-full bg-zinc-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-gold-500 transition-all disabled:opacity-50">
                      {isSubmitting ? "..." : t.contact.form.submit}
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-zinc-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-16">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Award className="text-gold-600 w-8 h-8" />
              <span className="text-xl font-black tracking-tighter text-zinc-900 uppercase">EURO <span className="text-gold-600">NOBEL</span></span>
            </div>
            <p className="text-zinc-600 font-medium leading-loose">
              {lang === 'fa' ? 'یورو نوبل با سال‌ها تجربه در زمینه مشاوره مهاجرت، راهنمای شما برای دستیابی به زندگی با استانداردهای جهانی در کشورهای اروپایی است.' : 'Euro Nobel is your guide to world-class standards in Europe.'}
            </p>
          </div>
          <div>
            <h4 className="text-zinc-900 font-black mb-8">{t.nav.contact}</h4>
            <ul className="space-y-4 text-zinc-600 font-medium">
              <li className="flex gap-4"><Phone className="text-gold-600" /> 09001068866</li>
              <li className="flex gap-4"><Mail className="text-gold-600" /> goldenvisa3@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-20 mt-20 border-t border-zinc-100 text-center text-zinc-500 text-sm font-bold">
          © 2024 Euro Nobel. All rights reserved.
        </div>
      </footer>
      <ChatWidget />
    </div>
  );
}
