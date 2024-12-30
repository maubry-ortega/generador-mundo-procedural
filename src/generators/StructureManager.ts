import { cloneDeep } from "lodash";

interface StructureConfig {
    width: number;
    height: number;
    tiles: (string | null)[][];
}

interface StructureData {
    [key: string]: StructureConfig;
}

export class StructureManager {
    private structures: StructureData = {};

    async init(): Promise<void> {
        const response = await fetch("/assets/json/structures.json");
        this.structures = await response.json();
    }

    getStructure(name: string): StructureConfig | null {
        const structure = this.structures[name];
        if (!structure) return null;

        // Devuelve una copia profunda para evitar modificar los datos originales.
        return cloneDeep(structure);
    }
}