export function canExecuteProject(input:{paymentStatus:string;executionUnlocked:boolean}){return input.paymentStatus==="paid"&&input.executionUnlocked===true}
