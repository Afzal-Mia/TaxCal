import { useState } from 'react';

const Footer = () => {
  const [openSection, setOpenSection] = useState(null);

  const sections = [
    {
      id: '80c',
      title: 'Section 80C Investments',
      content: 'Tax deductions up to ₹1.5 lakh for investments in PPF, ELSS, NSC, 5-year FDs, Tuition fees, Home loan principal repayment, etc.'
    },
    {
      id: '80d',
      title: 'Section 80D Health Insurance',
      content: 'Deductions up to ₹75,000 for health insurance premiums (₹1.5 lakh for senior citizens). Includes preventive health check-ups up to ₹5,000.'
    },
    {
      id: 'hra',
      title: 'House Rent Allowance (HRA)',
      content: 'Exemption based on rent paid, salary structure, and location. Requires rent receipts for claims above ₹1 lakh annually.'
    },
    {
      id: 'lta',
      title: 'Leave Travel Allowance (LTA)',
      content: 'Exemption for travel expenses during leave. Covers domestic travel only. Can claim twice in a block of 4 years.'
    },
    {
      id: 'standard',
      title: 'Standard Deduction',
      content: 'Flat deduction of ₹50,000 for salaried individuals. Replaces transport allowance and medical reimbursement.'
    }
  ];

  const toggleSection = (sectionId) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
  };

  return (
    <footer className="bg-white border-t border-gray-200 mt-12 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
          📚 Tax Terms Explained
        </h3>

        <div className="space-y-2">
          {sections.map((section) => (
            <div key={section.id} className="border-b border-gray-200">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex justify-between items-center py-4 hover:bg-gray-50 px-4 transition-colors"
              >
                <span className="text-left font-medium text-gray-700">
                  {section.title}
                </span>
                <svg
                  className={`w-6 h-6 transform transition-transform text-gray-600 ${
                    openSection === section.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openSection === section.id ? 'max-h-[1000px]' : 'max-h-0'
                }`}
              >
                <div className="p-4 text-gray-600 bg-gray-50">
                  {section.content}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p className="mt-2">Please consider me, Md Afjal Ansari, for this position. I am eager to contribute my skills and experience to your team</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;