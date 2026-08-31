import apiService from './api';

export interface DrugReference {
    id: number;
    name: string;
    activeIngredient: string;
    indications: string;
    contraindications: string;
    dosage: string;
    sideEffects: string;
    interactions: string;
}

class DrugService {
    private readonly baseUrl = '/erp/drug-reference';

    async getDrugReferences(search?: string): Promise<DrugReference[]> {
        return apiService.get(this.baseUrl, { search });
    }
}

const drugService = new DrugService();
export default drugService;
