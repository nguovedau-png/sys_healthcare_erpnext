import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BookingService } from './booking.service';
import { PaginationDto } from '@app/common';

@Controller()
export class BookingController {
    constructor(private readonly bookingService: BookingService) { }

    // --- Appointments ---
    @MessagePattern({ cmd: 'get_appointments' })
    getAppointments(@Payload() query: PaginationDto) {
        return this.bookingService.getAppointments(query);
    }

    @MessagePattern({ cmd: 'get_appointment' })
    getAppointment(@Payload() id: number) {
        return this.bookingService.getAppointment(id);
    }

    @MessagePattern({ cmd: 'create_appointment' })
    createAppointment(@Payload() data: any) {
        return this.bookingService.createAppointment(data);
    }

    @MessagePattern({ cmd: 'update_appointment' })
    updateAppointment(@Payload() payload: { id: number, data: any }) {
        return this.bookingService.updateAppointment(payload.id, payload.data);
    }

    @MessagePattern({ cmd: 'delete_appointment' })
    deleteAppointment(@Payload() id: number) {
        return this.bookingService.deleteAppointment(id);
    }

    // --- Lab Tests ---
    @MessagePattern({ cmd: 'get_lab_tests' })
    getLabTests(@Payload() query: PaginationDto) {
        return this.bookingService.getLabTests(query);
    }

    @MessagePattern({ cmd: 'get_lab_test' })
    getLabTest(@Payload() id: number) {
        return this.bookingService.getLabTest(id);
    }

    @MessagePattern({ cmd: 'create_lab_test' })
    createLabTest(@Payload() data: any) {
        return this.bookingService.createLabTest(data);
    }

    @MessagePattern({ cmd: 'update_lab_test' })
    updateLabTest(@Payload() payload: { id: number, data: any }) {
        return this.bookingService.updateLabTest(payload.id, payload.data);
    }

    @MessagePattern({ cmd: 'delete_lab_test' })
    deleteLabTest(@Payload() id: number) {
        return this.bookingService.deleteLabTest(id);
    }

    // --- Pharmacy Orders ---
    @MessagePattern({ cmd: 'get_pharmacy_orders' })
    getPharmacyOrders(@Payload() query: PaginationDto) {
        return this.bookingService.getPharmacyOrders(query);
    }

    @MessagePattern({ cmd: 'get_pharmacy_order' })
    getPharmacyOrder(@Payload() id: number) {
        return this.bookingService.getPharmacyOrder(id);
    }

    @MessagePattern({ cmd: 'create_pharmacy_order' })
    createPharmacyOrder(@Payload() data: any) {
        return this.bookingService.createPharmacyOrder(data);
    }

    @MessagePattern({ cmd: 'update_pharmacy_order' })
    updatePharmacyOrder(@Payload() payload: { id: number, data: any }) {
        return this.bookingService.updatePharmacyOrder(payload.id, payload.data);
    }

    @MessagePattern({ cmd: 'delete_pharmacy_order' })
    deletePharmacyOrder(@Payload() id: number) {
        return this.bookingService.deletePharmacyOrder(id);
    }

    // --- Refunds ---
    @MessagePattern({ cmd: 'get_refund_requests' })
    getRefundRequests(@Payload() query: PaginationDto) {
        return this.bookingService.getRefundRequests(query);
    }

    @MessagePattern({ cmd: 'get_refund_request' })
    getRefundRequest(@Payload() id: number) {
        return this.bookingService.getRefundRequest(id);
    }

    @MessagePattern({ cmd: 'create_refund_request' })
    createRefundRequest(@Payload() data: any) {
        return this.bookingService.createRefundRequest(data);
    }

    @MessagePattern({ cmd: 'update_refund_request' })
    updateRefundRequest(@Payload() payload: { id: number, data: any }) {
        return this.bookingService.updateRefundRequest(payload.id, payload.data);
    }

    @MessagePattern({ cmd: 'delete_refund_request' })
    deleteRefundRequest(@Payload() id: number) {
        return this.bookingService.deleteRefundRequest(id);
    }

    // --- Prescriptions ---
    @MessagePattern({ cmd: 'get_prescriptions' })
    getPrescriptions(@Payload() query: PaginationDto) {
        return this.bookingService.getPrescriptions(query);
    }

    @MessagePattern({ cmd: 'get_prescription' })
    getPrescription(@Payload() id: number) {
        return this.bookingService.getPrescription(id);
    }

    @MessagePattern({ cmd: 'create_prescription' })
    createPrescription(@Payload() data: any) {
        return this.bookingService.createPrescription(data);
    }

    @MessagePattern({ cmd: 'update_prescription' })
    updatePrescription(@Payload() payload: { id: number, data: any }) {
        return this.bookingService.updatePrescription(payload.id, payload.data);
    }

    @MessagePattern({ cmd: 'delete_prescription' })
    deletePrescription(@Payload() id: number) {
        return this.bookingService.deletePrescription(id);
    }

    // --- Consultations ---
    @MessagePattern({ cmd: 'get_consultations' })
    getConsultations(@Payload() query: PaginationDto) {
        return this.bookingService.getConsultations(query);
    }

    @MessagePattern({ cmd: 'get_consultation' })
    getConsultation(@Payload() id: number) {
        return this.bookingService.getConsultation(id);
    }

    @MessagePattern({ cmd: 'create_consultation' })
    createConsultation(@Payload() data: any) {
        return this.bookingService.createConsultation(data);
    }

    @MessagePattern({ cmd: 'update_consultation' })
    updateConsultation(@Payload() payload: { id: number, data: any }) {
        return this.bookingService.updateConsultation(payload.id, payload.data);
    }

    @MessagePattern({ cmd: 'delete_consultation' })
    deleteConsultation(@Payload() id: number) {
        return this.bookingService.deleteConsultation(id);
    }
}
