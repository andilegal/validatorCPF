function ValidateCPF(cpfSend){
  Object.defineProperty(this, 'cleanCpf',{
    enumerable: true,
    get: function () { 
      return cpfSend.replace(/\D+/g, '')
    }
  })
}

ValidateCPF.prototype.validate = function () { 
  if(typeof this.cleanCpf === "undefined") return false
  if(this.cleanCpf.length !== 11) return false

  if(this.isSequence())return false

  const partialCpf = this.cleanCpf.slice(0, -2)
  const digit1 = this.createDigit(partialCpf)
  const digit2 = this.createDigit(partialCpf + digit1)

  const newCPF = partialCpf + digit1 + digit2
  return newCPF === this.cleanCpf
}

ValidateCPF.prototype.createDigit = function(partialCpf) {
  const cpfArray = Array.from(partialCpf)
  let regressive = cpfArray.length + 1
  const total = cpfArray.reduce((accumulate, actual) =>  {
    accumulate += (regressive * Number(actual))
    regressive--
    return accumulate
  }, 0)
  
  const digit = 11 - (total % 11)
  return digit > 9 ? '0' : String(digit) 
}

ValidateCPF.prototype.isSequence = function() {
  const sequence = this.cleanCpf[0].repeat(this.cleanCpf.length)
  return sequence == this.cleanCpf
}

const cpf = new ValidateCPF('107.277.538-78')
console.log(cpf.validate())