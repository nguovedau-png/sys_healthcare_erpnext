import { PrismaClient } from '../../../node_modules/.prisma/client-ai-service';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding AI Service...');

    // Cleanup
    await prisma.recommendation.deleteMany();
    await prisma.aIStats.deleteMany();
    await prisma.modelPerformance.deleteMany();

    // Create Stats
    await prisma.aIStats.create({
        data: {
            accuracy: 0.945,
            dailySuggestions: 1250,
            acceptanceRate: 0.82,
            modelVersion: 'v2.4.1',
        },
    });

    // Create Model Performance
    await prisma.modelPerformance.create({
        data: {
            precision: 0.92,
            recall: 0.95,
            f1Score: 0.935,
        },
    });

    // Create Recommendations
    await prisma.recommendation.createMany({
        data: [
            {
                patientName: 'John Doe',
                symptoms: 'Persistent cough, fever, muscle aches',
                recommendedItem: 'Chest X-Ray, Flu Test',
                confidence: 0.89,
                reason: 'Symptoms match common viral infection patterns with high correlation to seasonal flu.',
                type: 'DIAGNOSIS',
                status: 'PENDING',
            },
            {
                patientName: 'Jane Smith',
                symptoms: 'Sharp chest pain, shortness of breath',
                recommendedItem: 'Dr. Sarah Wilson (Cardiology Specialist)',
                confidence: 0.97,
                reason: 'High priority match for cardiac events based on reported pain intensity and location.',
                type: 'DOCTOR',
                status: 'ACCEPTED',
            },
            {
                patientName: 'Robert Brown',
                symptoms: 'Chronic hypertension history, mild headache',
                recommendedItem: 'Lisinopril 10mg Adjustments',
                confidence: 0.85,
                reason: 'Patient historical data shows blood pressure trends requiring dosage optimization.',
                type: 'MEDICATION',
                status: 'PENDING',
            },
        ],
    });

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
