'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { ChevronRight, ChevronLeft, Check, User, Mail, Phone, Music, Mic, Star, MapPin, Calendar, Info } from 'lucide-react';

const roles = [
  { id: 'DJ', label: 'DJ', icon: Music },
  { id: 'Rapper', label: 'Rapper', icon: Mic },
  { id: 'Dancer', label: 'Dancer', icon: Star },
  { id: 'Promoter', label: 'Promoter', icon: Info },
  { id: 'Others', label: 'Others', icon: User },
];

const InputField = ({ label, icon: Icon, errors, ...props }) => (
  <div className="group">
    <label className="block text-sm font-medium text-purple-200 mb-1 ml-1">{label}</label>
    <div className={`relative flex items-center transition-all duration-300 ${errors && errors[props.name] ? 'animate-shake' : ''}`}>
      <div className="absolute left-3 text-purple-400 group-focus-within:text-purple-200 transition-colors">
        <Icon size={18} />
      </div>
      <input
        {...props}
        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors && errors[props.name] ? 'border-red-500 focus:border-red-500' : 'border-purple-500/30 focus:border-purple-400'
          } bg-black/40 text-white placeholder-purple-300/30 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 backdrop-blur-sm`}
      />
    </div>
    {errors && errors[props.name] && <span className="text-red-400 text-xs ml-1 mt-1 block">{errors[props.name]}</span>}
  </div>
);

export default function ConnectForm({ onSubmit }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    equipment: '',
    demo: '',
    style: '',
    description: '',
    rate: '',
    location: '',
    availability: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [errors, setErrors] = useState({});

  const validateStep = (currentStep) => {
    const newErrors = {};
    let isValid = true;

    if (currentStep === 0) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    } else if (currentStep === 1) {
      if (!formData.role) newErrors.role = 'Please select a role';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((s) => s + 1);
    }
  };

  const prevStep = () => setStep((s) => Math.max(0, s - 1));
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = () => {
    fetch('http://localhost:5000/api/connect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        setSubmitted(true);
        setShowConfetti(true);
        if (onSubmit) onSubmit();
        setTimeout(() => setShowConfetti(false), 5000);
      })
      .catch((err) => {
        console.error('Failed to submit form:', err);
        setSubmitted(true);
        setShowConfetti(true);
        if (onSubmit) onSubmit();
        setTimeout(() => setShowConfetti(false), 5000);
      });
  };

  return (
    <section className="w-full min-h-[400px] flex items-center justify-center p-4 relative">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={200} />}

      <div className="max-w-2xl w-full bg-gradient-to-b from-gray-900/90 to-black/90 rounded-2xl backdrop-blur-xl shadow-2xl border border-purple-500/20 overflow-hidden relative">
        {/* Progress Bar */}
        {!submitted && (
          <div className="h-1 w-full bg-gray-800">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / 5) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}

        <div className="p-8">
          {!submitted ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {step === 0 && (
                  <>
                    <div className="text-center mb-6">
                      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                        Let's Get Started
                      </h2>
                      <p className="text-purple-300/60 mt-2">Tell us a bit about yourself</p>
                    </div>
                    <div className="space-y-4">
                      <InputField
                        label="Full Name"
                        icon={User}
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        errors={errors}
                      />
                      <InputField
                        label="Email Address"
                        icon={Mail}
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        errors={errors}
                      />
                      <InputField
                        label="Phone Number"
                        icon={Phone}
                        type="tel"
                        name="phone"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        errors={errors}
                      />
                    </div>
                  </>
                )}

                {step === 1 && (
                  <>
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-white">Choose Your Role</h2>
                      <p className="text-purple-300/60 mt-2">How would you like to contribute?</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {roles.map(({ id, label, icon: Icon }) => (
                        <button
                          key={id}
                          className={`p-4 rounded-xl border transition-all duration-300 flex flex-col items-center gap-3 ${formData.role === id
                            ? 'bg-purple-600 border-purple-400 shadow-[0_0_20px_rgba(147,51,234,0.3)]'
                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-500/50'
                            }`}
                          onClick={() => updateField('role', id)}
                        >
                          <Icon size={24} className={formData.role === id ? 'text-white' : 'text-purple-400'} />
                          <span className="font-medium text-white">{label}</span>
                        </button>
                      ))}
                    </div>
                    {errors.role && <p className="text-red-400 text-center text-sm">{errors.role}</p>}
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-white">Specific Details</h2>
                      <p className="text-purple-300/60 mt-2">Tell us more about your craft</p>
                    </div>

                    {formData.role === 'DJ' && (
                      <div className="space-y-4">
                        <label className="block text-sm font-medium text-purple-200">Do you have your own equipment?</label>
                        <div className="flex gap-4">
                          {['Yes', 'No'].map((v) => (
                            <button
                              key={v}
                              className={`flex-1 py-3 rounded-xl border transition-all ${formData.equipment === v
                                ? 'bg-purple-600 border-purple-400 text-white'
                                : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                                }`}
                              onClick={() => updateField('equipment', v)}
                            >
                              {v}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {formData.role === 'Rapper' && (
                      <div className="space-y-4">
                        <label className="block text-sm font-medium text-purple-200">Do you have a demo?</label>
                        <div className="flex gap-4">
                          {['Yes', 'No'].map((v) => (
                            <button
                              key={v}
                              className={`flex-1 py-3 rounded-xl border transition-all ${formData.demo === v
                                ? 'bg-purple-600 border-purple-400 text-white'
                                : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                                }`}
                              onClick={() => updateField('demo', v)}
                            >
                              {v}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {formData.role === 'Dancer' && (
                      <InputField
                        label="Dance Style"
                        icon={Star}
                        type="text"
                        name="style"
                        placeholder="e.g. Afrobeat, Hip Hop, Contemporary"
                        value={formData.style}
                        onChange={(e) => updateField('style', e.target.value)}
                        errors={errors}
                      />
                    )}

                    {(formData.role === 'Promoter' || formData.role === 'Others') && (
                      <div className="group">
                        <label className="block text-sm font-medium text-purple-200 mb-1 ml-1">Description</label>
                        <textarea
                          rows="4"
                          placeholder="Tell us about your experience..."
                          value={formData.description}
                          onChange={(e) => updateField('description', e.target.value)}
                          className="w-full p-4 rounded-xl border border-purple-500/30 bg-black/40 text-white placeholder-purple-300/30 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all backdrop-blur-sm resize-none"
                        />
                      </div>
                    )}
                  </>
                )}

                {step === 3 && (
                  <>
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-white">Logistics</h2>
                      <p className="text-purple-300/60 mt-2">Where and how much?</p>
                    </div>
                    <div className="space-y-4">
                      <InputField
                        label="Rate / Expected Fee"
                        icon={Star}
                        type="text"
                        name="rate"
                        placeholder="e.g. $100/hr or Negotiable"
                        value={formData.rate}
                        onChange={(e) => updateField('rate', e.target.value)}
                        errors={errors}
                      />
                      <InputField
                        label="Location"
                        icon={MapPin}
                        type="text"
                        name="location"
                        placeholder="e.g. San Diego, CA"
                        value={formData.location}
                        onChange={(e) => updateField('location', e.target.value)}
                        errors={errors}
                      />
                    </div>
                  </>
                )}

                {step === 4 && (
                  <>
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-white">Availability</h2>
                      <p className="text-purple-300/60 mt-2">When are you free?</p>
                    </div>
                    <InputField
                      label="Availability"
                      icon={Calendar}
                      type="text"
                      name="availability"
                      placeholder="e.g. Weekends, Evenings"
                      value={formData.availability}
                      onChange={(e) => updateField('availability', e.target.value)}
                      errors={errors}
                    />
                  </>
                )}

                <div className="flex gap-4 pt-6">
                  {step > 0 && (
                    <button
                      onClick={prevStep}
                      className="px-6 py-3 rounded-xl border border-purple-500/30 text-purple-200 hover:bg-purple-500/10 transition-colors flex items-center gap-2"
                    >
                      <ChevronLeft size={18} /> Back
                    </button>
                  )}
                  {step < 4 ? (
                    <button
                      onClick={nextStep}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold shadow-lg shadow-purple-900/40 transition-all flex items-center justify-center gap-2 group"
                    >
                      Next <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-green-900/40 transition-all flex items-center justify-center gap-2"
                    >
                      Submit Application <Check size={18} />
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={40} className="text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Application Received!</h2>
              <p className="text-purple-200 text-lg mb-8">
                Thanks for connecting, <span className="text-white font-semibold">{formData.name}</span>.<br />
                We'll be in touch regarding your role as a <span className="text-white font-semibold">{formData.role}</span>.
              </p>
              <button
                onClick={onSubmit}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
              >
                Close
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
