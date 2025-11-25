import React, { useState } from 'react';
import SEO from '../components/SEO';
import { useSite } from '../context/SiteContext';
import { MapPin, Phone, Mail, Send, CheckCircle, Facebook, Instagram, Linkedin, MessageSquare, PhoneCall } from 'lucide-react';

const Contact: React.FC = () => {
  const { settings, addContactSubmission } = useSite();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Save to internal CMS (so it still appears in Admin Dashboard)
    addContactSubmission({
      id: Date.now().toString(),
      ...formData,
      date: new Date().toLocaleDateString()
    });

    // 2. Divert to Gmail via Mailto link
    const targetEmail = "janakbuilder@gmail.com";
    const mailSubject = encodeURIComponent(`New Contact Form: ${formData.subject}`);
    const mailBody = encodeURIComponent(
      `You have received a new message via Janak Builders Website:\n\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n\n` +
      `Message:\n${formData.message}`
    );
    
    window.location.href = `mailto:${targetEmail}?subject=${mailSubject}&body=${mailBody}`;

    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div>
      <SEO 
        title="Contact Us" 
        description="Contact Janak Builders for home construction quotes, site visits, and consultation in Kathmandu, Bhaktapur, and Lalitpur."
        keywords="contact builders nepal, construction quote kathmandu, site visit nepal"
      />
      <div className="bg-neutral-900 dark:bg-gray-950 text-white py-16 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
           <h1 className="text-4xl font-serif font-bold mb-4">Contact Us</h1>
           <p className="text-xl text-gray-300">Get in touch for a consultation or quote.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold text-primary dark:text-white mb-6">Get in Touch</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Have a project in mind? Reach out to our team. We are available for site visits and consultations across the Kathmandu Valley.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-secondary/20 p-3 rounded-full text-primary dark:text-secondary"><MapPin /></div>
                <div>
                  <h4 className="font-bold text-primary dark:text-white">Our Office</h4>
                  <p className="text-gray-600 dark:text-gray-400">{settings.address}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-secondary/20 p-3 rounded-full text-primary dark:text-secondary"><Phone /></div>
                <div>
                  <h4 className="font-bold text-primary dark:text-white">Phone</h4>
                  <p className="text-gray-600 dark:text-gray-400">{settings.phone}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Mon-Fri, 9am - 6pm</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-secondary/20 p-3 rounded-full text-primary dark:text-secondary"><Mail /></div>
                <div>
                  <h4 className="font-bold text-primary dark:text-white">Email</h4>
                  <p className="text-gray-600 dark:text-gray-400">{settings.email}</p>
                </div>
              </div>
            </div>

            {/* Social Media & Apps Section */}
            <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-primary dark:text-white mb-6">Connect on Apps</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a 
                  href={`https://wa.me/${settings.whatsappNumber}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-3 bg-[#25D366]/10 p-4 rounded-lg hover:bg-[#25D366]/20 transition border border-[#25D366]/20 group"
                >
                  <MessageSquare className="text-[#25D366]" size={28} />
                  <div>
                    <h5 className="font-bold text-gray-800 dark:text-white">WhatsApp</h5>
                    <p className="text-sm text-gray-500 group-hover:text-[#25D366] transition">+{settings.whatsappNumber}</p>
                  </div>
                </a>

                <a 
                  href={`viber://chat?number=%2B${settings.whatsappNumber}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-3 bg-[#7360f2]/10 p-4 rounded-lg hover:bg-[#7360f2]/20 transition border border-[#7360f2]/20 group"
                >
                  <PhoneCall className="text-[#7360f2]" size={28} />
                  <div>
                    <h5 className="font-bold text-gray-800 dark:text-white">Viber</h5>
                    <p className="text-sm text-gray-500 group-hover:text-[#7360f2] transition">+{settings.whatsappNumber}</p>
                  </div>
                </a>

                <a 
                  href={settings.facebookUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-3 bg-[#1877F2]/10 p-4 rounded-lg hover:bg-[#1877F2]/20 transition border border-[#1877F2]/20 group"
                >
                  <Facebook className="text-[#1877F2]" size={28} />
                  <div>
                    <h5 className="font-bold text-gray-800 dark:text-white">Facebook</h5>
                    <p className="text-sm text-gray-500 group-hover:text-[#1877F2] transition">Follow Page</p>
                  </div>
                </a>

                <a 
                  href={settings.instagramUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-3 bg-[#E1306C]/10 p-4 rounded-lg hover:bg-[#E1306C]/20 transition border border-[#E1306C]/20 group"
                >
                  <Instagram className="text-[#E1306C]" size={28} />
                  <div>
                    <h5 className="font-bold text-gray-800 dark:text-white">Instagram</h5>
                    <p className="text-sm text-gray-500 group-hover:text-[#E1306C] transition">@janakbuilders</p>
                  </div>
                </a>

                 <a 
                  href={settings.linkedinUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-3 bg-[#0077b5]/10 p-4 rounded-lg hover:bg-[#0077b5]/20 transition border border-[#0077b5]/20 group"
                >
                  <Linkedin className="text-[#0077b5]" size={28} />
                  <div>
                    <h5 className="font-bold text-gray-800 dark:text-white">LinkedIn</h5>
                    <p className="text-sm text-gray-500 group-hover:text-[#0077b5] transition">Connect</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 w-full h-64 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden relative border border-gray-300 dark:border-gray-700">
              <iframe 
                title="Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56516.31625949266!2d85.29111309658248!3d27.70895594444539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sKathmandu%2044600!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                loading="lazy" 
              ></iframe>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300 h-fit sticky top-24">
            {submitted ? (
              <div className="h-full flex flex-col justify-center items-center text-center">
                <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full text-green-600 dark:text-green-400 mb-4">
                  <CheckCircle size={48} />
                </div>
                <h3 className="text-2xl font-bold text-primary dark:text-white mb-2">Message Prepared!</h3>
                <p className="text-gray-600 dark:text-gray-300">We have opened your email client to send this message to <strong>janakbuilder@gmail.com</strong>.</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Please hit 'Send' in your email app to complete the process.</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 text-secondary font-bold underline">Send another message</button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-primary dark:text-white mb-6">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Your Name</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary outline-none transition bg-white dark:bg-gray-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary outline-none transition bg-white dark:bg-gray-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                    <input required type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary outline-none transition bg-white dark:bg-gray-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Message</label>
                    <textarea required name="message" rows={4} value={formData.message} onChange={handleChange} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary outline-none transition bg-white dark:bg-gray-900 dark:text-white"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-secondary text-primary font-bold py-4 rounded hover:bg-yellow-400 transition flex items-center justify-center gap-2">
                    Send Message <Send size={18} />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;