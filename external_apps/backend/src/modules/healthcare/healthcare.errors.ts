export class HealthcareError extends Error {
    constructor(public readonly statusCode: number, message: string, public readonly code: string, public readonly details?: unknown) {
        super(message);
        this.name = 'HealthcareError';
    }
}

export class BadRequestError extends HealthcareError {
    constructor(message: string) { super(400, message, 'BAD_REQUEST'); }
}
export class ForbiddenError extends HealthcareError {
    constructor(message = 'Healthcare scope denied') { super(403, message, 'FORBIDDEN'); }
}
export class NotFoundError extends HealthcareError {
    constructor(message = 'Resource not found') { super(404, message, 'NOT_FOUND'); }
}
export class ConflictError extends HealthcareError {
    constructor(message: string, details?: unknown) { super(409, message, 'CONFLICT', details); }
}
