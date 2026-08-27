import { Controller, Get, Post, Put, Delete, Body, Param, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from '@app/common';

@Controller('bookings')
export class BookingController {
    constructor(@Inject('BOOKING_SERVICE') private readonly client: ClientProxy) { }

    // --- Appointments ---
    @Get('appointments')
    getAppointments(@Query() query: PaginationDto) {
        return this.client.send({ cmd: 'get_appointments' }, query);
    }

    @Get('appointments/:id')
    getAppointment(@Param('id') id: string) {
        return this.client.send({ cmd: 'get_appointment' }, parseInt(id));
    }

    @Post('appointments')
    createAppointment(@Body() data: any) {
        return this.client.send({ cmd: 'create_appointment' }, data);
    }

    @Put('appointments/:id')
    updateAppointment(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_appointment' }, { id: parseInt(id), data });
    }

    @Delete('appointments/:id')
    deleteAppointment(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_appointment' }, parseInt(id));
    }

    // --- Lab Tests ---
    @Get('lab-tests')
    getLabTests(@Query() query: PaginationDto) {
        return this.client.send({ cmd: 'get_lab_tests' }, query);
    }

    @Get('lab-tests/:id')
    getLabTest(@Param('id') id: string) {
        return this.client.send({ cmd: 'get_lab_test' }, parseInt(id));
    }

    @Post('lab-tests')
    createLabTest(@Body() data: any) {
        return this.client.send({ cmd: 'create_lab_test' }, data);
    }

    @Put('lab-tests/:id')
    updateLabTest(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_lab_test' }, { id: parseInt(id), data });
    }

    @Delete('lab-tests/:id')
    deleteLabTest(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_lab_test' }, parseInt(id));
    }

    // --- Pharmacy Orders ---
    @Get('pharmacy-orders')
    getPharmacyOrders(@Query() query: PaginationDto) {
        return this.client.send({ cmd: 'get_pharmacy_orders' }, query);
    }

    @Get('pharmacy-orders/:id')
    getPharmacyOrder(@Param('id') id: string) {
        return this.client.send({ cmd: 'get_pharmacy_order' }, parseInt(id));
    }

    @Post('pharmacy-orders')
    createPharmacyOrder(@Body() data: any) {
        return this.client.send({ cmd: 'create_pharmacy_order' }, data);
    }

    @Put('pharmacy-orders/:id')
    updatePharmacyOrder(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_pharmacy_order' }, { id: parseInt(id), data });
    }

    @Delete('pharmacy-orders/:id')
    deletePharmacyOrder(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_pharmacy_order' }, parseInt(id));
    }

    // --- Refunds ---
    @Get('refunds')
    getRefundRequests(@Query() query: PaginationDto) {
        return this.client.send({ cmd: 'get_refund_requests' }, query);
    }

    @Get('refunds/:id')
    getRefundRequest(@Param('id') id: string) {
        return this.client.send({ cmd: 'get_refund_request' }, parseInt(id));
    }

    @Post('refunds')
    createRefundRequest(@Body() data: any) {
        return this.client.send({ cmd: 'create_refund_request' }, data);
    }

    @Put('refunds/:id')
    updateRefundRequest(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_refund_request' }, { id: parseInt(id), data });
    }

    @Delete('refunds/:id')
    deleteRefundRequest(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_refund_request' }, parseInt(id));
    }

    // --- Prescriptions ---
    @Get('prescriptions')
    getPrescriptions(@Query() query: PaginationDto) {
        return this.client.send({ cmd: 'get_prescriptions' }, query);
    }

    @Get('prescriptions/:id')
    getPrescription(@Param('id') id: string) {
        return this.client.send({ cmd: 'get_prescription' }, parseInt(id));
    }

    @Post('prescriptions')
    createPrescription(@Body() data: any) {
        return this.client.send({ cmd: 'create_prescription' }, data);
    }

    @Put('prescriptions/:id')
    updatePrescription(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_prescription' }, { id: parseInt(id), data });
    }

    @Delete('prescriptions/:id')
    deletePrescription(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_prescription' }, parseInt(id));
    }

    // --- Consultations ---
    @Get('consultations')
    getConsultations(@Query() query: PaginationDto) {
        return this.client.send({ cmd: 'get_consultations' }, query);
    }

    @Get('consultations/:id')
    getConsultation(@Param('id') id: string) {
        return this.client.send({ cmd: 'get_consultation' }, parseInt(id));
    }

    @Post('consultations')
    createConsultation(@Body() data: any) {
        return this.client.send({ cmd: 'create_consultation' }, data);
    }

    @Put('consultations/:id')
    updateConsultation(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_consultation' }, { id: parseInt(id), data });
    }

    @Delete('consultations/:id')
    deleteConsultation(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_consultation' }, parseInt(id));
    }
}
