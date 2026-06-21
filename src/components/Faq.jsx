import { useState } from 'react';
import { EVENT } from '../data/event.js';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{EVENT.faq.tag}</span>
          <h2 className="section-title">{EVENT.faq.title.prefix} <span className="red">{EVENT.faq.title.highlight}</span></h2>
        </div>
        <div className="faq-list">
          {EVENT.faq.items.map((item, i) => (
            <div key={i} className={`faq-item ${openIndex === i ? 'open' : ''}`}>
              <button className="faq-q" onClick={() => toggleFaq(i)}>
                {item.q} <span className="faq-icon">+</span>
              </button>
              <div className="faq-a">{item.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
