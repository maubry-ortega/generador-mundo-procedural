// Declaración para seedrandom
declare module 'seedrandom' {
    function seedrandom(seed: string): () => number;
    export default seedrandom; // Export default para la importación adecuada
}

// Declaración para matter-js (solo si no puedes obtener los tipos)
declare module 'matter-js' {
    var Matter: any;
    export = Matter; // Asegúrate de usar export = para que sea compatible
}

// También puedes agregar otros módulos que necesites aquí, como `noisejs`, `chance`, etc.
declare module 'noisejs' {
    export class Noise {
        constructor(seed: number);
        simplex2(x: number, y: number): number;
    }
}

declare module "chance" {
    export default class Chance {
        constructor(seed?: any);
        integer(options: { min: number; max: number }): number;
    }
}

declare module 'keyboardjs' {
    const keyboardjs: any;
    export = keyboardjs;
}