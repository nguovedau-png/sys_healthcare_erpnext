export const APPOINTMENT_STATUSES = [
  'pending',
  'confirmed',
  'checked_in',
  'in_progress',
  'completed',
  'cancelled',
  'no_show',
] as const;

export type AppointmentStatus = (typeof APPOINTMENT_STATUSES)[number];

const ALLOWED_TRANSITIONS: Record<AppointmentStatus, readonly AppointmentStatus[]> = {
  pending: ['confirmed', 'cancelled', 'no_show'],
  confirmed: ['checked_in', 'cancelled', 'no_show'],
  checked_in: ['in_progress', 'cancelled'],
  in_progress: ['completed'],
  completed: [],
  cancelled: [],
  no_show: [],
};

const VIETNAM_PHONE = /^(?:0|84)(?:3|5|7|8|9)\d{8}$/;
const APPOINTMENT_FIELDS = new Set([
  'patientId', 'patientName', 'patientPhone', 'email', 'address', 'dob', 'sex', 'doctorId', 'doctorName',
  'appointmentDate', 'date', 'time', 'service', 'serviceId', 'type', 'treatmentPlaceBooking', 'noExpected', 'note',
  'treatmentInfo', 'status',
]);
const PRESCRIPTION_FIELDS = new Set(['code', 'patientName', 'patientPhone', 'diagnosis', 'doctorName', 'hospitalName', 'status', 'dispensedDate', 'pharmacistName', 'medicines']);
const LAB_TEST_STATUSES = ['pending', 'processing', 'completed', 'cancelled'] as const;
const PHARMACY_ORDER_STATUSES = ['pending', 'processing', 'shipping', 'completed', 'cancelled'] as const;
const REFUND_STATUSES = ['pending', 'approved', 'rejected'] as const;
const CONSULTATION_STATUSES = ['waiting', 'examining', 'completed', 'absent'] as const;

export function normalizeVietnamesePhone(phone: unknown): string {
  if (typeof phone !== 'string') throw new Error('patientPhone is required');
  const compact = phone.replace(/[\s().-]/g, '');
  const normalized = compact.startsWith('+84') ? `0${compact.slice(3)}` : compact.startsWith('84') ? `0${compact.slice(2)}` : compact;
  if (!VIETNAM_PHONE.test(normalized)) throw new Error('patientPhone must be a valid Vietnamese mobile number');
  return normalized;
}

export function sanitizeAppointmentData(data: Record<string, unknown>): Record<string, unknown> {
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Appointment payload is required');
  const unknownFields = Object.keys(data).filter((key) => !APPOINTMENT_FIELDS.has(key));
  if (unknownFields.length) throw new Error(`Unsupported appointment fields: ${unknownFields.join(', ')}`);
  return { ...data };
}

export function assertAppointmentInput(data: Record<string, unknown>, options: { requireSlot?: boolean } = {}): void {
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Appointment payload is required');
  if (typeof data.patientName !== 'string' || data.patientName.trim().length < 2 || data.patientName.length > 160) throw new Error('patientName is invalid');
  normalizeVietnamesePhone(data.patientPhone);
  if (data.email !== undefined && data.email !== null && (typeof data.email !== 'string' || data.email.length > 254 || !/^\S+@\S+\.\S+$/.test(data.email))) throw new Error('email is invalid');
  if (data.dob !== undefined && data.dob !== null && Number.isNaN(new Date(String(data.dob)).getTime())) throw new Error('dob is invalid');
  if (data.appointmentDate !== undefined && data.appointmentDate !== null && Number.isNaN(new Date(String(data.appointmentDate)).getTime())) throw new Error('appointmentDate is invalid');
  if (options.requireSlot && !data.appointmentDate) throw new Error('appointmentDate is required');
  if (data.noExpected !== undefined && data.noExpected !== null && (!Number.isInteger(data.noExpected) || Number(data.noExpected) < 1 || Number(data.noExpected) > 100)) throw new Error('noExpected is invalid');
  if (data.serviceId !== undefined && data.serviceId !== null && (!Number.isInteger(data.serviceId) || Number(data.serviceId) < 1)) throw new Error('serviceId is invalid');
  if (data.status !== undefined && !APPOINTMENT_STATUSES.includes(data.status as AppointmentStatus)) throw new Error('appointment status is invalid');
}

export function assertAppointmentTransition(from: string, to: string): asserts to is AppointmentStatus {
  if (!APPOINTMENT_STATUSES.includes(from as AppointmentStatus) || !APPOINTMENT_STATUSES.includes(to as AppointmentStatus)) throw new Error('appointment status is invalid');
  if (from !== to && !ALLOWED_TRANSITIONS[from as AppointmentStatus].includes(to as AppointmentStatus)) throw new Error(`Invalid appointment transition: ${from} -> ${to}`);
}

export function assertPrescriptionInput(data: Record<string, unknown>, options: { existingStatus?: string } = {}): void {
  const unknownFields = Object.keys(data || {}).filter((key) => !PRESCRIPTION_FIELDS.has(key));
  if (unknownFields.length) throw new Error(`Unsupported prescription fields: ${unknownFields.join(', ')}`);
  for (const field of ['code', 'patientName', 'diagnosis', 'doctorName', 'hospitalName']) {
    if (typeof data[field] !== 'string' || String(data[field]).trim().length === 0 || String(data[field]).length > 500) throw new Error(`${field} is invalid`);
  }
  normalizeVietnamesePhone(data.patientPhone);
  if (!Array.isArray(data.medicines) || data.medicines.length === 0 || data.medicines.length > 100) throw new Error('medicines is invalid');
  const status = String(data.status ?? options.existingStatus ?? 'new');
  if (!['new', 'dispensed', 'cancelled'].includes(status)) throw new Error('prescription status is invalid');
  if (options.existingStatus && ['dispensed', 'cancelled'].includes(options.existingStatus) && Object.keys(data).some((key) => !['status', 'dispensedDate', 'pharmacistName'].includes(key))) throw new Error('Completed prescription is immutable');
}

export function assertLabTestInput(data: Record<string, unknown>): void {
  for (const field of ['orderCode', 'patientId', 'patientName', 'patientPhone', 'testType', 'hospital', 'testDate']) {
    if (typeof data[field] !== 'string' || String(data[field]).trim().length === 0 || String(data[field]).length > 255) throw new Error(`${field} is invalid`);
  }
  normalizeVietnamesePhone(data.patientPhone);
  if (typeof data.fee !== 'number' || !Number.isFinite(data.fee) || data.fee < 0) throw new Error('fee is invalid');
  if (data.status !== undefined && !LAB_TEST_STATUSES.includes(String(data.status) as (typeof LAB_TEST_STATUSES)[number])) throw new Error('lab test status is invalid');
}

export function assertPharmacyOrderInput(data: Record<string, unknown>): void {
  for (const field of ['code', 'customerId', 'customerName', 'customerPhone', 'pharmacy', 'date']) {
    if (typeof data[field] !== 'string' || String(data[field]).trim().length === 0 || String(data[field]).length > 255) throw new Error(`${field} is invalid`);
  }
  normalizeVietnamesePhone(data.customerPhone);
  if (!Number.isInteger(data.itemsCount) || Number(data.itemsCount) < 1 || Number(data.itemsCount) > 10_000) throw new Error('itemsCount is invalid');
  if (typeof data.totalAmount !== 'number' || !Number.isFinite(data.totalAmount) || data.totalAmount < 0) throw new Error('totalAmount is invalid');
  if (data.status !== undefined && !PHARMACY_ORDER_STATUSES.includes(String(data.status) as (typeof PHARMACY_ORDER_STATUSES)[number])) throw new Error('pharmacy order status is invalid');
}

export function assertRefundInput(data: Record<string, unknown>): void {
  for (const field of ['orderCode', 'customerId', 'customerName', 'originalOrder', 'reason', 'requestDate']) {
    if (typeof data[field] !== 'string' || String(data[field]).trim().length === 0 || String(data[field]).length > 1000) throw new Error(`${field} is invalid`);
  }
  if (typeof data.amount !== 'number' || !Number.isFinite(data.amount) || data.amount <= 0) throw new Error('amount is invalid');
  if (data.status !== undefined && !REFUND_STATUSES.includes(String(data.status) as (typeof REFUND_STATUSES)[number])) throw new Error('refund status is invalid');
}

export function assertConsultationInput(data: Record<string, unknown>): void {
  if (typeof data.patientId !== 'string' || data.patientId.trim().length === 0 || data.patientId.length > 120) throw new Error('patientId is invalid');
  if (typeof data.patientName !== 'string' || data.patientName.trim().length < 2 || data.patientName.length > 160) throw new Error('patientName is invalid');
  if (data.patientAge !== undefined && data.patientAge !== null && (!Number.isInteger(data.patientAge) || Number(data.patientAge) < 0 || Number(data.patientAge) > 150)) throw new Error('patientAge is invalid');
  if (data.status !== undefined && !CONSULTATION_STATUSES.includes(String(data.status) as (typeof CONSULTATION_STATUSES)[number])) throw new Error('consultation status is invalid');
}

export function assertConsultationUpdateAllowed(status: string, data: Record<string, unknown>): void {
  if (status === 'completed' && Object.keys(data).some((key) => !['status'].includes(key))) throw new Error('Completed consultation is immutable');
  assertConsultationInput({ patientId: 'valid', patientName: 'Valid patient', ...data });
  if (data.status !== undefined && !CONSULTATION_STATUSES.includes(String(data.status) as (typeof CONSULTATION_STATUSES)[number])) throw new Error('consultation status is invalid');
}
