export type LeadPayload = {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  budget?: string;
  message: string;
  source?: string;
};

export type ValidationResult = {
  isValid: boolean;
  errors: Partial<Record<keyof LeadPayload, string>>;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[+()\-\s\d]{7,20}$/;

export function validateLeadPayload(payload: Partial<LeadPayload>): ValidationResult {
  const errors: ValidationResult["errors"] = {};

  if (!payload.fullName || payload.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name.";
  }

  if (!payload.email || !emailRegex.test(payload.email.trim())) {
    errors.email = "Please provide a valid email address.";
  }

  if (!payload.phone || !phoneRegex.test(payload.phone.trim())) {
    errors.phone = "Please provide a valid phone number.";
  }

  if (!payload.service || payload.service.trim().length < 2) {
    errors.service = "Please select a service.";
  }

  if (!payload.message || payload.message.trim().length < 10) {
    errors.message = "Please share at least 10 characters about your project.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function normalizeLeadPayload(payload: LeadPayload): LeadPayload {
  return {
    ...payload,
    fullName: payload.fullName.trim(),
    email: payload.email.trim().toLowerCase(),
    phone: payload.phone.trim(),
    company: payload.company?.trim(),
    service: payload.service.trim(),
    budget: payload.budget?.trim(),
    message: payload.message.trim(),
    source: payload.source?.trim() || "website-contact-form",
  };
}
