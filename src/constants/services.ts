import { 
  Calculator, 
  Shield, 
  FileText, 
  BarChart3, 
  Landmark, 
  Briefcase,
  Settings,
  XCircle,
  Users,
  Scale
} from 'lucide-react';

export const services = [
  {
    title: 'Business Advisory',
    icon: Briefcase,
    description: 'Practical guidance you can rely on—via email, phone, or meetings. We combine technical knowledge with real-world solutions.',
    details: ['Accounting & Taxation', 'Labour & Company Law', 'Updates & Regulations', 'Management Advisory']
  },
  {
    title: 'Tax Related Services',
    icon: Landmark,
    description: 'Strategic tax planning and compliance to minimize liabilities. Comprehensive support for all tax types in Myanmar.',
    details: ['Corporate Income Tax', 'Commercial Tax', 'Personal Income Tax', 'Capital Gain Tax', 'Withholding Tax', 'Stamp Duty', 'Tax Registration & Structuring']
  },
  {
    title: 'Payroll Services',
    icon: Calculator,
    description: 'End-to-end payroll management ensuring accuracy, confidentiality, and compliance with local regulations.',
    details: ['Salary & Benefit Calculation', 'SSB & PIT Management', 'Payslip Preparation', 'Monthly and Yearly PIT Reporting']
  },
  {
    title: 'Financial Audit',
    icon: FileText,
    description: 'Independent examination of financial statements to ensure accuracy and compliance with international standards.',
    details: ['Statutory & Special Audits', 'Compliance Assessment', 'Accounting Policy Review', 'Stakeholder Reporting']
  },
  {
    title: 'Internal Audit',
    icon: Shield,
    description: 'Evaluating internal controls and risk management processes to improve operational efficiency and prevent fraud.',
    details: ['Internal Control Evaluation', 'Risk & Compliance Assessment', 'Fraud Detection', 'Efficiency Recommendations']
  },
  {
    title: 'Accounting Services',
    icon: BarChart3,
    description: 'Accurate and timely financial record-keeping to help you make informed business decisions.',
    details: ['Bookkeeping & Reconciliations', 'Financial Statement Prep', 'Management Reporting', 'System Setup & Support']
  },
  {
    title: 'Business Setup',
    icon: Settings,
    description: 'Complete assistance for company registration and licensing, tailored for both local and foreign investors.',
    details: ['MyCO Registration', 'Business Licenses & Permits', 'Investment Advisory', 'Operational Setup']
  },
  {
    title: 'Mergers & Acquisitions',
    icon: Users,
    description: 'Strategic support for M&A activities, from due diligence to post-transaction integration.',
    details: ['Due Diligence & Valuation', 'Legal/Financial Documentation', 'Integration Planning', 'Risk Analysis']
  },
  {
    title: 'HR Services',
    icon: Users,
    description: 'Developing robust HR frameworks and policies to help your organization manage its most valuable asset.',
    details: ['Employment Contracts', 'HR Policy Development', 'Training & Development', 'Labour Law Alignment']
  },
  {
    title: 'Legal Services',
    icon: Scale,
    description: 'Expert guidance on corporate legal matters and ongoing compliance with Myanmar company laws.',
    details: ['Labour Law Compliance', 'MyCO Filings & Updates', 'Corporate Secretarial', 'Regulatory Advisory']
  },
  {
    title: 'Business Winding up',
    icon: XCircle,
    description: 'Professional support for voluntary winding up and de-registration of companies and overseas branches.',
    details: ['Insolvency Law Advisory', 'DICA/MyCO Filings', 'Tax Clearance Support', 'Asset Remittance Guidance']
  }
];
