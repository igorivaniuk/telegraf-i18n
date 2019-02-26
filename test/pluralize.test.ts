import { pluralize } from '../src'

describe('pluralize', () => {
  it('french', () => {
    let fn = pluralize('fr')
    expect(fn(1, 'rul_0', 'rul_1')).toBe('1 rul_0')
    expect(fn(2, 'rul_0', 'rul_1')).toBe('2 rul_1')
    expect(fn(3, 'rul_0', 'rul_1')).toBe('3 rul_1')
    expect(fn(4, 'rul_0', 'rul_1')).toBe('4 rul_1')
  })

  it('czech', () => {
    let fn = pluralize('cs')
    expect(fn(1, 'rul_0', 'rul_1', 'rul_2')).toBe('1 rul_0')
    expect(fn(2, 'rul_0', 'rul_1', 'rul_2')).toBe('2 rul_1')
    expect(fn(3, 'rul_0', 'rul_1', 'rul_2')).toBe('3 rul_1')
    expect(fn(4, 'rul_0', 'rul_1', 'rul_2')).toBe('4 rul_1')
    expect(fn(5, 'rul_0', 'rul_1', 'rul_2')).toBe('5 rul_2')
  })

  it('polish', () => {
    let fn = pluralize('pl')
    expect(fn(1, 'rul_0', 'rul_1', 'rul_2')).toBe('1 rul_0')
    expect(fn(2, 'rul_0', 'rul_1', 'rul_2')).toBe('2 rul_1')
    expect(fn(3, 'rul_0', 'rul_1', 'rul_2')).toBe('3 rul_1')
    expect(fn(4, 'rul_0', 'rul_1', 'rul_2')).toBe('4 rul_1')
    expect(fn(5, 'rul_0', 'rul_1', 'rul_2')).toBe('5 rul_2')
    expect(fn(102, 'rul_0', 'rul_1', 'rul_2')).toBe('102 rul_1')
  })

  it('arabic', () => {
    let fn = pluralize('ar')
    let ruls = ['rul_0', 'rul_1', 'rul_2', 'rul_3', 'rul_4', 'rul_5']
    expect(fn(1, ...ruls)).toBe('1 rul_1')
    expect(fn(2, ...ruls)).toBe('2 rul_2')
    expect(fn(3, ...ruls)).toBe('3 rul_3')
    expect(fn(4, ...ruls)).toBe('4 rul_3')
    expect(fn(5, ...ruls)).toBe('5 rul_3')
    expect(fn(6, ...ruls)).toBe('6 rul_3')
    expect(fn(12, ...ruls)).toBe('12 rul_4')
    expect(fn(12990, ...ruls)).toBe('12990 rul_4')
  })
})
