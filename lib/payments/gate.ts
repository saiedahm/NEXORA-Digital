 export type ProjectExecutionGateInput = {
  paymentStatus: string;
  executionUnlocked: boolean;
};

export function canExecuteProject(
  input: ProjectExecutionGateInput
): boolean {
  return (
    input.paymentStatus === "paid" &&
    input.executionUnlocked === true
  );
}
