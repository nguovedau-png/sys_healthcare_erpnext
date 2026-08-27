jest.mock('./prisma', () => ({ PrismaService: class PrismaService {} }));

import { AIService } from './ai.service';

describe('AIService symptom intake', () => {
  const service = new AIService({} as never);

  it('rejects empty symptom text', async () => {
    await expect(service.analyzeSymptoms('   ')).rejects.toThrow('Symptoms are required');
  });

  it('routes red-flag symptoms as emergency without diagnosing', async () => {
    const result = await service.analyzeSymptoms('Đau ngực dữ dội và khó thở');
    expect(result.triageLevel).toBe('EMERGENCY');
    expect(result.redFlags).toEqual(expect.arrayContaining(['CHEST_PAIN', 'BREATHING_DIFFICULTY']));
    expect(result.requiresClinicianReview).toBe(true);
    expect(result).not.toHaveProperty('possibleConditions');
  });

  it('routes routine symptoms to clinician review and bounds input length', async () => {
    const result = await service.analyzeSymptoms(`Ho nhẹ ${'x'.repeat(2500)}`);
    expect(result.triageLevel).toBe('ROUTINE_REVIEW');
    expect(result.redFlags).toHaveLength(0);
    expect(result.symptoms.length).toBe(2000);
    expect(result.disclaimer).toContain('không phải chẩn đoán');
  });
});
