import { AIController } from './ai.controller';
import { of } from 'rxjs';

describe('AIController', () => {
  it('forwards validated symptom text as a string to the AI service', async () => {
    const send = jest.fn().mockReturnValue(of({ triageLevel: 'ROUTINE_REVIEW' }));
    const controller = new AIController({ send } as never);

    await expect(controller.analyzeSymptoms({ symptoms: 'Ho nhẹ' })).resolves.toEqual({ triageLevel: 'ROUTINE_REVIEW' });
    expect(send).toHaveBeenCalledWith({ cmd: 'analyze_symptoms' }, 'Ho nhẹ');
  });
});
