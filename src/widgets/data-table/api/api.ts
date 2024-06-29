import { UseMutationOptions } from "@tanstack/react-query";
import { MUTATION_KEYS, queryClient } from "shared/lib/react-query.ts";
import { createDoc, deleteDoc, docsQuery, updateDoc } from "shared/api/api.ts";
import { Doc } from "shared/model/schema";

const onMutate = async () => {
  await queryClient.cancelQueries({ queryKey: docsQuery.queryKey });
  const previousDocs = queryClient.getQueryData(docsQuery.queryKey);
  return { previousDocs };
};

const onError = (err: Error, _: unknown, context: { previousDocs?: Doc[] } | undefined) => {
  console.log("Error", { err, context });
  queryClient.setQueryData(docsQuery.queryKey, [...(context?.previousDocs ?? [])]);
};

export const addRecordMutation: UseMutationOptions<
  Doc,
  Error,
  { doc: Omit<Doc, "id">; docId: Doc["id"] },
  { previousDocs: Doc[] | undefined }
> = {
  mutationKey: [MUTATION_KEYS.createDoc],
  mutationFn: ({ doc }) => createDoc(doc),
  onMutate,
  onError,
  onSuccess: (data) => {
    queryClient.setQueryData(docsQuery.queryKey, (old) => [...(old ?? []), data]);
  },
};

export const updateRecordMutation: UseMutationOptions<
  Doc,
  Error,
  { doc: Doc; docId: Doc["id"] },
  { previousDocs: Doc[] | undefined }
> = {
  mutationKey: [MUTATION_KEYS.updateDoc],
  mutationFn: ({ doc }) => updateDoc(doc),
  onMutate,
  onError,
  onSuccess: (data, { docId }) => {
    queryClient.setQueryData(docsQuery.queryKey, (old) =>
      old?.map((item) => (item.id === docId ? data : item)),
    );
  },
};

export const deleteRecordMutation: UseMutationOptions<
  { error_code: number },
  Error,
  { docId: Doc["id"] },
  { previousDocs: Doc[] | undefined }
> = {
  mutationKey: [MUTATION_KEYS.deleteDoc],
  mutationFn: ({ docId }) => deleteDoc(docId),
  onMutate,
  onError,
  onSuccess: (_, { docId }) => {
    queryClient.setQueryData(docsQuery.queryKey, (old) => old?.filter((item) => item.id !== docId));
  },
};
