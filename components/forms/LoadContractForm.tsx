import { FormEventHandler, useState } from "react";
import { Button } from "../common/buttons/Button";
import { Input } from "../common/form/Input";
import { ArrowRightIcon } from "@heroicons/react/outline";

export function LoadContractForm({
  onSubmit,
}: {
  onSubmit: (values: { address: string }) => void;
}) {
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const _onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setLoading(true);
    return onSubmit({ address });
  };

  return (
    <form onSubmit={_onSubmit}>
      <label htmlFor="address" className="sr-only">
        Contract address
      </label>
      <Input
        onChange={(e) => setAddress(e.target.value)}
        type="text"
        placeholder="Contract address"
        id="address"
        name="address"
        required
        className="mb-3 border-slate-500"
        size="large"
      />
      <Button
        loading={loading}
        size="large"
        className="w-full font-medium flex gap-2 hover:gap-2.5 transition-all"
      >
        Load contract <ArrowRightIcon className="w-4 h-4" />
      </Button>
    </form>
  );
}
