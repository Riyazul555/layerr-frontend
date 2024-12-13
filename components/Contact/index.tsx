'use client';

import { useState } from 'react';
import NewsLatterBox from './NewsLatterBox';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    industry: '',
    companyName: '',
    message: '',
  });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/tickets/open-ticket`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Ticket submitted successfully!');
        setFormData({ name: '', email: '', industry: '', companyName: '', message: '' });
      } else {
        const errorData = await response.json();
        setStatus(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setStatus('Error submitting ticket. Please try again.');
    }
  };

  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div className="mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Register Today
              </h2>
              <p className="mb-12 text-base font-medium text-body-color">
                Our support team will get back to you ASAP via email.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="-mx-4 flex flex-wrap">
                  {['name', 'email', 'industry', 'companyName', 'message'].map((field) => (
                    <div
                      key={field}
                      className={`w-full px-4 ${field !== 'message' ? 'md:w-1/2' : ''}`}
                    >
                      <div className="mb-8">
                        <label
                          htmlFor={field}
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          {field === 'message' ? 'Your Message' : `Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                        </label>
                        {field === 'message' ? (
                          <textarea
                            id={field}
                            name={field}
                            rows={5}
                            placeholder={`Enter your ${field}`}
                            value={formData[field as keyof typeof formData]}
                            onChange={handleChange}
                            className="w-full resize-none rounded-sm border px-6 py-3 text-base outline-none focus:border-primary"
                          />
                        ) : (
                          <input
                            type={field === 'email' ? 'email' : 'text'}
                            id={field}
                            name={field}
                            placeholder={`Enter your ${field}`}
                            value={formData[field as keyof typeof formData]}
                            onChange={handleChange}
                            className="w-full rounded-sm border px-6 py-3 text-base outline-none focus:border-primary"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="w-full px-4">
                    <button
                      type="submit"
                      className="rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit hover:bg-primary/90"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
              {status && <p className="mt-4 text-base font-medium text-red-500">{status}</p>}
            </div>
          </div>
          {/* NewsLatterBox */}
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <NewsLatterBox />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
