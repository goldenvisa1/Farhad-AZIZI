import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { Translation } from '../lib/translations';

interface FAQProps {
  t: Translation;
}

export default function FAQ({ t }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white" id="faq">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold-600 font-bold tracking-widest uppercase text-sm mb-4 block">{t.faq.badge}</span>
          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            {t.faq.title} <span className="text-gold-600">{t.faq.titleGold}</span>
          </h2>
        </div>
        
        <div className="space-y-4">
          {t.faq.questions.map((faq, index) => (
            <div key={index} className="border border-zinc-100 rounded-2xl overflow-hidden bg-[#FCFAF7]">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left font-bold"
              >
                {faq.q}
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-gold-600" />
                ) : (
                  <Plus className="w-5 h-5 text-zinc-400" />
                )}
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-zinc-600 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
