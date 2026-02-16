'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

const roles = ['DJ', 'Rapper', 'Dancer', 'Promoter', 'Others'];

export default function ConnectForm({ onSubmit }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
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

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => Math.max(0, s - 1));
  const updateField = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = () => {
    setSubmitted(true);
    setShowConfetti(true);
    if (onSubmit) onSubmit(); // <-- Call parent onSubmit to close modal
    setTimeout(() => setShowConfetti(false), 5000);
  };

  return (
    <section className="w-full min-h-[300px] rounded-2xl bg-gradient-to-r from-black via-purple-900 to-black text-white flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <div className="max-w-3xl w-full p-6 bg-black/40 rounded-xl backdrop-blur-md shadow-2xl border border-purple-700 space-y-6 text-lg">
        {!submitted ? (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {step === 0 && (
                  <input
                    type="text"
                    placeholder="What's your name?"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    className="w-full p-3 rounded-md border border-purple-500 bg-black text-white"
                  />
                )}

                {step === 1 && (
                  <div>
                    <p className="mb-3">Select your role:</p>
                    <div className="grid grid-cols-2 gap-3">
                      {roles.map((role) => (
                        <button
                          key={role}
                          className={`p-2 rounded-md ${
                            formData.role === role ? 'bg-purple-800' : 'bg-purple-600'
                          } hover:bg-purple-900`}
                          onClick={() => updateField('role', role)}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && formData.role === 'DJ' && (
                  <div>
                    <p>Do you have your own equipment?</p>
                    <div className="flex gap-4 justify-center mt-2">
                      {['Yes', 'No'].map((v) => (
                        <button
                          key={v}
                          className={`btn ${formData.equipment === v ? 'bg-purple-800' : ''}`}
                          onClick={() => updateField('equipment', v)}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && formData.role === 'Rapper' && (
                  <div>
                    <p>Do you have a demo?</p>
                    <div className="flex gap-4 justify-center mt-2">
                      {['Yes', 'No'].map((v) => (
                        <button
                          key={v}
                          className={`btn ${formData.demo === v ? 'bg-purple-800' : ''}`}
                          onClick={() => updateField('demo', v)}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && formData.role === 'Dancer' && (
                  <input
                    type="text"
                    placeholder="What's your dance style?"
                    value={formData.style}
                    onChange={(e) => updateField('style', e.target.value)}
                    className="w-full p-3 rounded-md border border-purple-500 bg-black text-white"
                  />
                )}

                {step === 2 &&
                  (formData.role === 'Promoter' || formData.role === 'Others') && (
                    <textarea
                      rows="3"
                      placeholder="Describe your role/experience"
                      value={formData.description}
                      onChange={(e) => updateField('description', e.target.value)}
                      className="w-full p-3 rounded-md border border-purple-500 bg-black text-white"
                    />
                  )}

                {step === 3 && (
                  <input
                    type="text"
                    placeholder="Rate or expected fee"
                    value={formData.rate}
                    onChange={(e) => updateField('rate', e.target.value)}
                    className="w-full p-3 rounded-md border border-purple-500 bg-black text-white"
                  />
                )}

                {step === 4 && (
                  <input
                    type="text"
                    placeholder="Location"
                    value={formData.location}
                    onChange={(e) => updateField('location', e.target.value)}
                    className="w-full p-3 rounded-md border border-purple-500 bg-black text-white"
                  />
                )}

                {step === 5 && (
                  <input
                    type="text"
                    placeholder="Availability"
                    value={formData.availability}
                    onChange={(e) => updateField('availability', e.target.value)}
                    className="w-full p-3 rounded-md border border-purple-500 bg-black text-white"
                  />
                )}

                {step === 6 && (
                  <button
                    onClick={handleSubmit}
                    className="w-full py-3 bg-green-500 hover:bg-green-700 rounded-md text-black font-semibold"
                  >
                    Submit
                  </button>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between pt-4">
              <button
                onClick={prevStep}
                disabled={step === 0}
                className="py-2 px-4 border border-purple-600 hover:bg-purple-700 rounded disabled:opacity-40"
              >
                Back
              </button>
              {step < 6 && (
                <button
                  onClick={nextStep}
                  className="py-2 px-4 bg-purple-600 hover:bg-purple-800 rounded"
                >
                  Next
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">Thank you, {formData.name} 🎉</h2>
            <p>Your info has been submitted successfully.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .btn {
          background-color: #9333ea;
          padding: 10px 20px;
          border-radius: 6px;
          color: white;
          transition: 3s;
        }
        .btn:hover {
          background-color: #6b21a8;
        }
      `}</style>
    </section>
  );
}
