export function useMergeRefs<T>(...refs: (React.Ref<T> | undefined | null)[]) {
  return (node: T) => {
    refs.forEach((ref) => {
      if (!ref) {
        return;
      }

      if (typeof ref === "function") {
        ref(node);
        return;
      }

      ref.current = node;
    });
  };
}
