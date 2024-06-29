import { useMutationState } from "@tanstack/react-query";
import { Doc } from "shared/model/schema.ts";
import { MUTATION_KEYS } from "shared/lib/react-query.ts";

const MUTATIONS = [MUTATION_KEYS.createDoc, MUTATION_KEYS.updateDoc];

export const useIsPending = (rowId: Doc["id"]) => {
  const mutationState = useMutationState({
    filters: {
      predicate: (mutation) =>
        (mutation.state.variables as { docId: Doc["id"] })?.docId === rowId &&
        MUTATIONS.includes(mutation.options.mutationKey?.[0] as (typeof MUTATIONS)[number]),
    },
    select: (mutation) => mutation.state.status === "pending",
  });

  return Boolean(mutationState[0]);
};
