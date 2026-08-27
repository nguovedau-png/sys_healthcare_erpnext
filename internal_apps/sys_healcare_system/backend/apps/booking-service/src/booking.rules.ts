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

export function normalizeVietnamesePhone(phone: unknown): string {
  if (typeof phone !== 'string') throw new Error('patientPhone is required');
  const compact = phone.replace(/[\s().-]/g, '');
  const normalized = compact.startsWith('+84') ? `0${compact.slice(3)}` : compact.startsWith('84') ? `0${compact.slice(2)}` : compact;
  if (!VIETNAM_PHONE.test(normalized)) throw new Error('patientPhone must be a valid Vietnamese mobile number');
  return normalized;
}

export function sanitizeAppointmentData(data: Record<string, unknown>): Record<string, unknown> {
  if (!data || typeof data !== 'object') throw new Error('Appointment payload is required');
  const unknownFields = Object.keys(data).filter((key) => !APPOINTMENT_FIELDS.has(key));
  if (unknownFields.length) throw new Error(`Unsupported appointment fields: ${unknownFields.join(', ')}`);
  return { ...data };
}

export function assertAppointmentInput(data: Record<string, unknown>): void {
  if (!data || typeof data !== 'object') throw new Error('Appointment payload is required');
  if (typeof data.patientName !== 'string' || data.patientName.trim().length < 2 || data.patientName.length > 160) throw new Error('patientName is invalid');
  normalizeVietnamesePhone(data.patientPhone);
  if (data.email !== undefined && data.email !== null && (typeof data.email !== 'string' || data.email.length > 254 || !/^\S+@\S+\.\S+$/.test(data.email))) throw new Error('email is invalid');
  if (data.appointmentDate !== undefined && data.appointmentDate !== null && Number.isNaN(new Date(String(data.appointmentDate)).getTime())) throw new Error('appointmentDate is invalid');
  if (data.status !== undefined && !APPOINTMENT_STATUSES.includes(data.status as AppointmentStatus)) throw new Error('appointment status is invalid');
}

export function assertAppointmentTransition(from: string, to: string): asserts to is AppointmentStatus {
  if (!APPOINTMENT_STATUSES.includes(from as AppointmentStatus) || !APPOINTMENT_STATUSES.includes(to as AppointmentStatus)) throw new Error('appointment status is invalid');
  if (from !== to && !ALLOWED_TRANSITIONS[from as AppointmentStatus].includes(to as AppointmentStatus)) throw new Error(`Invalid appointment transition: ${from} -> ${to}`);
}

export function assertConsultationUpdateAllowed(status: string, data: Record<string, unknown>): void {
  if (status === 'completed' && Object.keys(data).some((key) => !['status'].includes(key))) throw new Error('Completed consultation is immutable');
  if (data.status !== undefined && !['waiting', 'examining', 'completed', 'absent'].includes(String(data.status))) throw new Error('consultation status is invalid');
}
