/**
 * Suggested prompts for each advisor type
 */

export const suggestedPrompts = {
  // General financial prompts
  general: [
    "What costs can be capitalized as property plant and equipment?",
    "How are ALM swaps accounted for?",
    "What makes a loan a debt security instead?",
    "What is an embedded derivative?",
    "What is the fair value option election?",
    "If IFC invests in preferred shares of a company, how is that accounted for?",
    "Are IFC loans accounted for at amortized cost?",
    "When does IFC consolidate an equity investment?",
    "How does IFC account for its borrowings?"
  ],
  
  // Document analyzer prompts
  "document-analyzer": [
    "Can you analyze this financial statement for key metrics?",
    "What are the main risks mentioned in this document?",
    "Summarize the key points from this policy document",
    "Extract all financial figures from this report",
    "Compare these two financial statements",
    "What are the compliance requirements mentioned in this document?"
  ],
  
  // Financial controller prompts (previously ask-controllers)
  "financial-controller": [
    "Are IFC loans accounted for at amortized cost?",
    "When does IFC consolidate an equity investment?",
    "How does IFC account for its borrowings?",
    "What is the accounting treatment for equity investments?",
    "How are derivatives used for hedging accounted for?",
    "What is the difference between FVTPL and FVOCI?"
  ],
  
  // Budget & Admin prompts (previously askcba)
  "budget-admin": [
    "Explain the Annual Strategy and Budget Planning Process cycle?",
    "What types of expenses are not eligible for reimbursement under Hospitality Expenses?",
    "Can I extend the end date of an expired contract?",
    "When is the deadline for submitting timesheets in IFC TRS?",
    "What is the transaction code for expense reposting in SAP?",
    "How do I view previously approved and reviewed FAMS work Items in SailPoint?"
  ],
  
  // Blended Finance prompts
  "blended-finance": [
    "What is blended finance?",
    "How does IFC structure blended finance solutions?",
    "What are the eligibility criteria for blended finance?",
    "How are concessional funds accounted for?",
    "What is the difference between blended finance and traditional financing?",
    "What types of projects qualify for blended finance?"
  ],
  
  // Business Risk prompts
  "business-risk": [
    "What information should I request from the client if my project is subject to AML Due Diligence?",
    "What should I do if my client sends me some personal data of their employee?",
    "Can staff with grade GG be nominated to a non-early-stage company board?",
    "Please give me a few examples of operational Conflicts of Interest for IFC?",
    "What should I do if I identify a tax flag in an IFC project?",
    "What is the process to conduct Integrity Due Diligence (IDD)?"
  ],
  
  // Ask P&P prompts (renamed from askp&p for consistency)
  "askp&p": [
    "Who are the Mandatory Reviewers at Disbursement for an Openly Syndicated (OS) Bond project?",
    "Are material changes to investments reported to the Board? If so, how are they reported?",
    "Which Board approval process is used to increase IFC's own account amounts?",
    "What are the eligibility criteria for an Existing Client to qualify for Expedited Processing for Existing Clients (EPEC)?",
    "Who are the Mandatory and Additional Reviewers for a Tier II regional debt project at IRM?",
    "Who are the recommender and decider for Tier I global equity projects at Concept?"
  ]
};
