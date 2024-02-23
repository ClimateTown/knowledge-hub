import { describe, expect, it } from "vitest"
import { darkColors, lightColors } from "./resources"

describe('lightColors', () => {
    it('lavender should be #c8cdea', () => {
        expect(lightColors.lavender).toBe('#c8cdea')
    })

    it('orange should be #f1d7c0', () => {
        expect(lightColors.orange).toBe('#f1d7c0')
    })

    it('green should be #e0e9c9', () => {
        expect(lightColors.green).toBe('#e0e9c9')
    })

    it('red should be #e9cac9', () => {
        expect(lightColors.red).toBe('#e9cac9')
    })

    it('teal should be #cfe2e0', () => {
        expect(lightColors.teal).toBe('#cfe2e0')
    })

    it('yellow should be #efebc2', () => {
        expect(lightColors.yellow).toBe('#efebc2')
    })

    it('purple should be #dccdea', () => {
        expect(lightColors.purple).toBe('#dccdea')
    })
})

describe('darkColors', () => {
    it('lavender should be #141a38', () => {
        expect(darkColors.lavender).toBe('#141a38')
    })

    it('orange should be #3f250e', () => {
        expect(darkColors.orange).toBe('#3f250e')
    })

    it('green should be #2d3616', () => {
        expect(darkColors.green).toBe('#2d3616')
    })

    it('red should be #361716', () => {
        expect(darkColors.red).toBe('#361716')
    })

    it('teal should be #1d302e', () => {
        expect(darkColors.teal).toBe('#1d302e')
    })

    it('yellow should be #3c3910', () => {
        expect(darkColors.yellow).toBe('#3c3910')
    })

    it('purple should be #29183a', () => {
        expect(darkColors.purple).toBe('#29183a')
    })
})