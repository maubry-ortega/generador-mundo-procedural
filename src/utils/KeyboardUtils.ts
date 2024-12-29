import keyboardjs from "keyboardjs";

/**
 * Utilidad para la gestión de entradas de teclado.
 */
export class KeyboardUtils {
    /**
     * Vincula una tecla a un callback.
     * @param key La tecla a escuchar.
     * @param callback La función a ejecutar al presionar la tecla.
     */
    static bindKey(key: string, callback: () => void): void {
        keyboardjs.bind(key, callback);
    }

    /**
     * Desvincula una tecla.
     * @param key La tecla a desvincular.
     */
    static unbindKey(key: string): void {
        keyboardjs.unbind(key);
    }
}
