 import { PaymentStatus } from "@prisma/client";

export type ProjectExecutionGateInput = {
  paymentStatus: PaymentStatus;
  executionUnlocked: boolean;
};

export function canExecuteProject(
  input: ProjectExecutionGateInput
): boolean {
  return (
    input.paymentStatus === PaymentStatus.PAID &&
    input.executionUnlocked === true
  );
}

export function assertProjectExecutionAllowed(
  input: ProjectExecutionGateInput
): void {
  if (!canExecuteProject(input)) {
    throw new Error(
      "Project execution is locked. Payment must be completed and execution must be unlocked."
    );
  }
}
