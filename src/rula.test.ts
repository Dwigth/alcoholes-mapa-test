import { expect, test } from 'vitest'
import { Rula } from "./rula";

const uri = '?rfc=XAXX010101000&licenciatario=Micheladas%20El%20Capi&licencia=0000LA2500&domicilio=Manuel%20A.%20Jimenez%20113,%20Centro,%2086800%20Teapa,Tab.&rula=IUAA0000LA2500MSLAP17D549286LOM92D947944EC12345';

test('should instantiate a valid rula', () => {
    const rula = new Rula(uri);
    expect(rula.isValid).toBe(true);
});

test('should instantiate an invalid rula if we pass an incomplete search string', () => {
    const rula = new Rula('?');
    expect(rula.isValid).toBe(false);
});

test('should instantiate an invalid rula if we pass an empty string value as search string', () => {
    const rula = new Rula('');
    expect(rula.isValid).toBe(false);
});

test('should throw error if we pass a null value as search string', () => {
    expect(() => new Rula(String(null))).toThrowError(`Cannot read properties of undefined (reading 'slice')`)
});

test('should return correct coordinates', () => {
    const rula = new Rula(uri);
    expect(rula.coordinates).toStrictEqual({
        latitude: -92.947944,
        longitude: 17.549286,
    });
})

test('should return correct license information', () => {
    const rula = new Rula(uri);
    expect(rula.getLicenseData()).toStrictEqual({
        address: "Manuel A. Jimenez 113, Centro, 86800 Teapa,Tab.",
        license: "0000LA2500",
        licenseName: "Micheladas El Capi",
        rfc: "XAXX010101000",
        rula: "IUAA0000LA2500MSLAP17D549286LOM92D947944EC12345",
    });
})