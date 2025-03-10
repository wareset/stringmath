import {
  ProgramNode,
  ConditionNode,
  VariableNode,
  ConstantNode,
  FunctionNode,
  OperatorNode,
} from './classes'

// |\[[^\]]*\]
const REG_FOR_OPERATORS =
  /\?\??|\|\|?|\*\*?|&&?|<<|>>>?|[!=]=?=?|[<>]=?|(?<!\d\.?[eE])[-+]|[-+](?!\d)|[,:~^%/()[\]]/g
///\?\??|\|\|?|\*\*?|&&?|<<|>>>?|[!=]=?=?|[<>]=?|(?<!\d\.?[eE])[-+]|[,:~^%/()[\]]/g

// const REG_FOR_NUMBERS = /^((?:\d*\.)?\d+(?:[eE][-+]?\d+)?)\s*([^]*)$/

// const REG_FOR_NUMBER = /^(?:\d*\.)?\d+(?:[eE][-+]?\d+)?$/

// const REG_FOR_FNS = /^[a-z][$\w]*$/

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
// prettier-ignore
const OPERATORS: any = {
  // '('  : 19,
  // ')'  : 19,
  '!'  : 14,
  '~'  : 14,
  '**' : 13,
  '*'  : 12,
  '/'  : 12,
  '%'  : 12,
  '+'  : 11,
  '-'  : 11,
  '<<' : 10,
  '>>' : 10,
  '>>>': 10,
  '<'  : 9,
  '<=' : 9,
  '>'  : 9,
  '>=' : 9,
  '='  : 8,
  '==' : 8,
  '!=' : 8,
  '===': 8,
  '!==': 8,
  '&'  : 7,
  '^'  : 6,
  '|'  : 5,
  '&&' : 4,
  '||' : 3,
  '??' : 3,
  '?'  : 2,
  ':'  : 2,
  ','  : 1,
}

type OperatorsTmp = {
  // deep        // idx  // priority
  [key: string]: number[][]
}

type Operators = {
  // deep        // idx
  [key: string]: number[]
}

type Grouping_and_Ternaries = {
  // deep          // first   // second
  [key: string]: { f: number; s: number }[]
}

function last<T>(a: T[]): T | undefined {
  return a[a.length - 1]
}

// prettier-ignore
function parse(
  A: string[], deep: number, offset: number,
  grouping: Grouping_and_Ternaries, ternaries: Grouping_and_Ternaries,
  commas: Operators, operators: Operators
): any {
  let a: any[], i: number, f: number, s: number | string
  // ,
  if (commas[deep] && commas[deep].length) {
    for (a = commas[deep], i = a.length; i-- > 0;) {
      if ((f = a[i] - offset) > -1 && f < A.length) {
        a.splice(i, 1)
        return [].concat(
  parse(A.slice(0, f), deep, offset, grouping, ternaries, commas, operators),
  parse(A.slice(f + 1), deep, offset + f + 1, grouping, ternaries, commas, operators),
        )
      }
    }
  }
  //- ? :
  if (ternaries[deep] && ternaries[deep].length) {
    for (a = ternaries[deep], i = a.length; i-- > 0;) {
      if ((f = a[i].f - offset) > -1 && f < A.length && (s = a[i].s - offset) > f) {
        a.splice(i, 1)
        const nodeElse = last([].concat(
  parse(A.slice(s + 1), deep, offset + s + 1, grouping, ternaries, commas, operators)
        ))
        const nodeThen = last([].concat(
  parse(A.slice(f + 1, s), deep, offset + f + 1, grouping, ternaries, commas, operators)
        ))
        const nodeIf = last([].concat(
  parse(A.slice(0, f), deep, offset, grouping, ternaries, commas, operators)
        ))
        return new ConditionNode(nodeIf, nodeThen, nodeElse)
      }
    }
  }
  // /*-+
  if (operators[deep] && operators[deep].length) {
    for (a = operators[deep], i = a.length; i-- > 0;) {
      if ((f = a[i] - offset) > -1 && f < A.length) {
        a.splice(i, 1)
        const nodeRight = last([].concat(
  parse(A.slice(f + 1), deep, offset + f + 1, grouping, ternaries, commas, operators)
        ))
        const nodeLeft = last([].concat(
  parse(A.slice(0, f), deep, offset, grouping, ternaries, commas, operators)
        ))
        return new OperatorNode(A[f], nodeLeft, nodeRight)
      }
    }
  }
  // ()
  if (grouping[deep] && grouping[deep].length) {
    for (a = grouping[deep], i = a.length; i-- > 0;) {
      if ((f = a[i].f - offset) > -1 && f < A.length && (s = a[i].s - offset) > f) {
        a.splice(i, 1)
        return A[f] === '('
          ? // new GroupingNode(
            last([].concat(
  parse(A.slice(f + 1, s), deep + 1, offset + f + 1, grouping, ternaries, commas, operators)
            ))
          // )
          : new FunctionNode(
            A[f],
            [].concat(
  parse(A.slice(f + 2, s), deep + 1, offset + f + 2, grouping, ternaries, commas, operators)
            )
          )
      }
    }
  }

  return (s = A.join(''))
    ? ((f = +s) !== f && s !== 'NaN')
      ? new VariableNode(s) : new ConstantNode(f)
    : []
}

// prettier-ignore
function setOperator(
  operators: OperatorsTmp, deep: number, priority: number, A: string[]
): void {
  operators[deep] || (operators[deep] = [])
  operators[deep][priority] || (operators[deep][priority] = [])
  operators[deep][priority][priority === OPERATORS['**'] ? 'unshift' : 'push'](A.length)
}

// prettier-ignore
function setMultiply(
  operators: OperatorsTmp, deep: number, a: string[]
): void {
  setOperator(operators, deep, OPERATORS['*'], a)
  a.push('*')
}

// prettier-ignore
export function program(source: string) {
  source = '(' + source + ')'
  REG_FOR_OPERATORS.lastIndex = 0

  const A: string[] = []
  let idx = 0
  let v: string, vLast: string = '', vAny: string
  let deep = 0, squares = 0, tmp: any

  const grouping: Grouping_and_Ternaries = {}
  const groupingTmp: Grouping_and_Ternaries = {}
  const ternaries: Grouping_and_Ternaries = {}
  const ternariesTmp: Grouping_and_Ternaries = {}

  let d = OPERATORS['!']
  let priority: number

  const commas: Operators = {}
  const operators: Operators = {}
  const operatorsTmp: OperatorsTmp = {}

  let m: RegExpExecArray | null
  // let m2: RegExpMatchArray | null
  for (; m = REG_FOR_OPERATORS.exec(source);) {
    // console.log(m)

    switch (v = m[0]) {
      case '[': {
        squares++
        break
      }
      case ']': {
        squares--
        break
      }
      default: {
        if (squares !== 0) break

        if (m.index > idx && (vAny = source.slice(idx, m.index).trim())) {
          if (vLast === ')') setMultiply(operatorsTmp, deep, A)

          // // this code need for like 2.5xy => 2.5 * xy
          // if (m2 = vAny.match(REG_FOR_NUMBERS)) {
          //   // console.log('m2', m2)
          //   '.' === (vAny = m2[1]!)[0] && (vAny = '0' + vAny)
          //   m2[2] && (A.push(vAny), setMultiply(operatorsTmp, deep, A), vAny = m2[2])
          // }

          A.push(vLast = vAny)
        }

        switch (v) {
          case '(': {
            ;(groupingTmp[deep] || (groupingTmp[deep] = []))
              .push({ f: A.length, s: -1 })
            if (vLast && vLast !== '(' && !(OPERATORS[vLast] > 0)) {
              if (
                !source[m.index - 1].trim() ||
                vLast === 'NaN' || '' + +vLast !== 'NaN'
              ) {
                setMultiply(operatorsTmp, deep, A)
                if (tmp = groupingTmp[deep] && last(groupingTmp[deep])) tmp.f++
              } else {
                // eslint-disable-next-line no-lonely-if
                if (tmp = groupingTmp[deep] && last(groupingTmp[deep])) tmp.f--
              }
            }
            deep++
            break
          }
          case ')': {
            --deep
            if (tmp = groupingTmp[deep] && last(groupingTmp[deep])) {
              tmp.s = A.length
              ;(grouping[deep] || (grouping[deep] = []))
                .push(groupingTmp[deep].pop()!)
            }
            break
          }
          default: {
            if (vLast === ')' && !(OPERATORS[v] > 0)) {
              setMultiply(operatorsTmp, deep, A)
              vLast = '*'
            }

            switch (v) {
              case ',': {
                ;(commas[deep] || (commas[deep] = []))
                  .push(A.length)
                break
              }
              case '?': {
                ;(ternariesTmp[deep] || (ternariesTmp[deep] = []))
                  .push({ f: A.length, s: -1 })
                break
              }
              case ':': {
                if (tmp = ternariesTmp[deep] && last(ternariesTmp[deep])) {
                  tmp.s = A.length
                  ;(ternaries[deep] || (ternaries[deep] = []))
                    .push(ternariesTmp[deep].pop()!)
                }
                break
              }
              default: {
                if (vLast === '(' || OPERATORS[vLast] > 0) {
                  if (v === '+' || v === '-' || v === '!' || v === '~') priority = ++d
                  else { idx = m.index + v.length; continue }
                } else priority = OPERATORS[v]
                setOperator(operatorsTmp, deep, priority, A)
              }
            }
          }
        }

        idx = m.index + v.length
        A.push(vLast = v)
      }
    }
  }

  const push = Array.prototype.push
  for (const d in operatorsTmp) {
    operators[d] = []
    for (let o = operatorsTmp[d], j = o.length; j-- > 0;) {
      if (o[j]) push.apply(operators[d], o[j])
    }
  }

  return new ProgramNode(
    last([].concat(
  parse(A.slice(1, -1), 1, 1, grouping, ternaries, commas, operators)
    ))
  )
}
