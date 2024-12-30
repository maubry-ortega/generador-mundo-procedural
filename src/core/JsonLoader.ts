export class JsonLoader {
    static async load<T>(path: string): Promise<T> {
        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`Error loading JSON at ${path}: ${response.statusText}`);
            return await response.json();
        } catch (error) {
            console.error('Error cargando archivo JSON:', error);
            throw error;
        }
    }
}
